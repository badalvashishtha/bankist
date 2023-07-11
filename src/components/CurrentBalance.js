import useAccountContext from "../hooks/useAccountContexts"
import Amount from './amount/Amount';


function CurrentBalance() {

  const { account } = useAccountContext()

  return (
    <div className='balanceContainer'>
      <div className='currentBalanceText'>
        <div className="currentBalanceHeading" >Current Balance</div>
        <div className="currentDate">As of {new Date().toLocaleDateString()}</div>
      </div>
      <Amount amount={account.balance} style={{ fontSize: 32 }} />
      {/* <div className="currentAmount">{account.balance}</div> */}
    </div>
  )
}
export default CurrentBalance
