import useAccountContext from '../hooks/useAccountContexts'
// import axios from 'axios'
import { useEffect } from "react"


function TransferMoney() {

  const { fetchTransactions, account, transferMoney, addTransaction } = useAccountContext()

  const handleTransfer = function (event) {
    event.preventDefault()
    const userId = event.target[0].value
    const transferAmount = Number(event.target[1].value)

    console.log(userId, transferAmount)
    transferMoney(userId, transferAmount)
    event.target[0].value = ''
    event.target[1].value = ''
  }


  useEffect(() => {
    fetchTransactions(account)
  }, [addTransaction])


  return (
    <div className='tansferMoney p-10'>
      <form className="box" onSubmit={handleTransfer}>
        <div className="title is-4">Transfer Money</div>
        <div className='inputFields'>
          <div className="field">
            <label className="label">User Name</label>
            <div className="control">
              <input required className="input" type="text" placeholder="User Id" />
            </div>
          </div>
          <div className="field">
            <label className="label">Amount</label>
            <div className="control">
              <input required className="input" type="number" placeholder="Amount" />
            </div>
          </div>
        </div>

        <button type="submit" className="button is-primary">Transfer Amount</button>
      </form>
    </div>
  )
}
export default TransferMoney 