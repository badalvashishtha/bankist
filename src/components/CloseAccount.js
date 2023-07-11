import useAccountContext from "../hooks/useAccountContexts"

function CloseAccount() {

  const { deleteAccount, transactions } = useAccountContext()

  const renderDeletAccountDetails = function (event) {
    event.preventDefault()
    const username = event.target[0].value
    const pin = event.target[1].value
    console.log(username, pin)
    deleteAccount(username, pin, transactions)
  }

  return (
    <div className='closeAccount p-10'>
      <form className="box" onSubmit={renderDeletAccountDetails}>
        <div className="title is-4">Close Account</div>
        <div className='inputFields'>
          <div className="field">
            <label className="label">Your User Name</label>
            <div className="control">
              <input required className="input" type="text" placeholder="user id" />
            </div>
          </div>
          <div className="field">
            <label className="label">Conferm Pin</label>
            <div className="control">
              <input required className="input" type="number" placeholder="password" />
            </div>
          </div>
        </div>

        <button type="submit" className="button is-primary">Close Account </button>
      </form>
    </div>
  )
}
export default CloseAccount 