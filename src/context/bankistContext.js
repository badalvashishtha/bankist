import { createContext, useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

// Error to fix
// 1. Anyone can send money to himself
// 2. Close account with his transaction is not working properly
// 3. 

const AccountContext = createContext({
  account: null,
  transactions: [],
  loginUser: (username, pin) => { },
  logout: () => { },
  fetchTransactions: (account) => { },
  transferMoney: (receiverUsername, amount) => { },
  requestLoan: (amount) => { },
  addAccount: (owner, pin, username) => { },
})

function updateLocalUser(user) {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

function Provider({ children }) {
  const [account, setAccount] = useState(null)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    let user = localStorage.getItem('user')

    if (user) {
      user = JSON.parse(user)
      setAccount(user)
      fetchUserDetails(user.username)
        .then(user => {
          setAccount(user)
          updateLocalUser(user)
        })
        .catch(() => { })
    }
  }, [])

  const loginUser = useCallback(async (username, pin) => {
    try {
      const accountResponse = await axios.get('http://localhost:3001/accounts', {
        params: {
          username, pin
        }
      });

      if (accountResponse.data.length) {
        let account = accountResponse.data[0];

        setAccount(account)
        updateLocalUser(account)
      } else {
        // login failed
      }

    } catch (err) { }

  }, [])


  const logout = useCallback(() => {
    setAccount(null)
    localStorage.removeItem("user")
  }, [])

  const fetchUserDetails = useCallback(async (userId) => {
    try {
      const userAccounts = await axios.get('http://localhost:3001/accounts', {
        params: {
          username: userId
        }
      })
      if (userAccounts.data.length) {
        return userAccounts.data[0];
      }
    } catch (err) { console.log(err) }

  }, []);

  const deleteAccount = useCallback(async (username, pin, transactions) => {
    console.log(username, Number(pin))
    console.log(account)

    if (account.username === username && account.pin === pin) {
      console.log('hi')
      try {
        await axios.delete(`http://localhost:3001/accounts/${account.id}`)

        console.log(account.id)
        try {

          await axios.delete(`http://localhost:3001/transactions`, {
            params: {
              accountId: account.id
            }
          })
        } catch (err) {
          // ignore
        }

        // deleteTransaction()
        logout()
      } catch (err) {
        console.log(err.response);
      }
    } else {
      console.log("error")
    }

  }, [account])

  // const deleteTransaction = useCallback(async () => {

  //   console.log(transactions)
  //   await axios.delete(`http://localhost:3001/transactions/${transactions.accountId}`)

  // }, [transactions])

  const transferMoney = useCallback(async (userId, amount) => {
    try {
      if (amount <= 0 || amount > account.balance) {
        console.log(amount, account)
        toast("Invalid Amount", {
          type: "error",
        })
        return;
      }
      const receiverAccount = await fetchUserDetails(userId)
      if (receiverAccount) {
        addTransaction(receiverAccount, amount)
      } else {
        toast("Account does not exist", { type: "error" })
      }

    } catch (err) {

    }
  })

  const updateCurrentBalance = useCallback(async (receiverAccount, transferAmount) => {
    try {
      const updatedSenderAccountResponse = await axios.put(`http://localhost:3001/accounts/${account.id}`, {
        ...account,
        balance: account.balance - transferAmount
      })

      await axios.put(`http://localhost:3001/accounts/${receiverAccount.id}`, {
        ...receiverAccount,
        balance: receiverAccount.balance + transferAmount
      })

      // console.log(updateSenderAmount)
      // console.log(updateReciverAmount)
      setAccount(updatedSenderAccountResponse.data)

    } catch (error) {
      console.log(error)
    }

  }, [account])

  const addTransaction = useCallback(async (receiverAccount, amount) => {
    try {

      const reciverResponse = await axios.post('http://localhost:3001/transactions', {
        accountId: receiverAccount.id,
        id: new Date().valueOf(),
        user: account.owner,
        date: new Date().toLocaleDateString(),
        amount: amount
      })

      const sanderResponse = await axios.post('http://localhost:3001/transactions', {
        accountId: account.id,
        id: new Date().valueOf() + 1,
        user: receiverAccount.owner,
        date: new Date().toLocaleDateString(),
        amount: (-amount)
      })

      console.log(reciverResponse)
      console.log(sanderResponse)

      fetchTransactions()
      updateCurrentBalance(receiverAccount, amount)
    } catch (err) { console.log(err) }
  }, [account])

  const fetchTransactions = useCallback(async () => {
    try {
      // console.log("hi")
      // console.log(account)
      const response = await axios.get('http://localhost:3001/transactions', {
        params: {
          accountId: account.id
        }
      });

      setTransactions(response.data)
      // console.log(response.data)

    } catch (err) { }

  }, [account])

  const requestLoan = useCallback((amount) => {
    // console.log(amount, account)
    if (amount > 0 && amount < account.balance * 3) {
      // console.log(`amount:${amount}`)
      addLoanTransaction(amount)
      return
    } if (amount > account.balance * 3.5) {
      toast("Loan Amount should be less", {
        type: "error",
      })
      return;
    } else {
      toast("Invalid Amount", {
        type: "error",
      })
      return;

    }
  }, [account])

  const addLoanTransaction = useCallback(async (amount) => {
    try {
      console.log(amount)
      console.log(account)
      const reciverLoanResponse = await axios.post('http://localhost:3001/transactions', {
        accountId: account.id,
        id: new Date().valueOf(),
        user: "Bank Loan",
        date: new Date().toLocaleDateString(),
        amount: amount
      })

      console.log(reciverLoanResponse)

      fetchTransactions()
      updateCurrentBalance(account, -amount)
    } catch (err) { console.log(err) }
  }, [account])

  const addAccount = useCallback(async (owner, pin, username) => {

    const accountsResponse = await axios.get('http://localhost:3001/accounts')
    console.log(accountsResponse.data.length)
    const id = accountsResponse.data.length + 1
    console.log(owner, pin, username, id)

    const addAccountDetails = await axios.post('http://localhost:3001/accounts', {
      id: id,
      owner: owner,
      username: username,
      balance: 10000,
      pin: pin
    })
    console.log(addAccountDetails)

    loginUser(username, pin)

  }, [])

  const valueToShare = {
    account,
    transactions,
    loginUser,
    logout,
    addTransaction,
    fetchTransactions,
    transferMoney,
    requestLoan,
    addAccount,
    deleteAccount

  }

  return (
    <AccountContext.Provider value={valueToShare}>
      {children}
    </AccountContext.Provider>
  )
}

export { Provider }
export default AccountContext
