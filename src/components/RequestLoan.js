import useAccountContext from "../hooks/useAccountContexts"
// import { useEffect } from "react"

function RequestLoan() {

  const { requestLoan } = useAccountContext()

  const handleRequestLoan = function (event) {
    event.preventDefault()
    const amount = Number(event.target[0].value)
    console.log(amount)

    requestLoan(amount)
    event.target[0].value = ''

  }

  // useEffect(() => {

  // }, {})

  return (
    <div className='requestLon p-10'>
      <form className="box" onSubmit={handleRequestLoan}>
        <div className="title is-4">Request Loan</div>
        <div className='inputFields'>
          <div className="field">
            <label className="label">Amount</label>
            <div className="control">
              <input required className="input" type="number" placeholder="Amount" />
            </div>
          </div>
          <div></div>
        </div>

        <button className="button is-primary">Send Request</button>
      </form>
    </div>
  )
}
export default RequestLoan 