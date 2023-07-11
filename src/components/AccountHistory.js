import ShowTransaction from './ShowTransaction'
import AccountContext from '../context/bankistContext'
import { useContext } from 'react'

function AccountHistory() {

  const { transactions } = useContext(AccountContext)


  const sortTransaction = transactions.sort((a, b) => {
    const c = new Date(a.id)
    const d = new Date(b.id)
    return d - c
  })

  const transactionStatemant = (sortTransaction.map((transaction, id) => {
    return <ShowTransaction key={id} transaction={transaction} />
  }))

  return (
    <div className="p-10">
      <div className='title is-4 mx-5'>Transaction History</div>
      <div className="transaction-history">
        {transactionStatemant}
      </div>
    </div >
  )
}
export default AccountHistory