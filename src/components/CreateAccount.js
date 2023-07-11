// import { useState } from "react"
import useAccountContext from "../hooks/useAccountContexts"


function CreateAccount({ switchForm }) {

  const { CreateAccount, addAccount } = useAccountContext()

  const handleCreateAccount = function (event) {
    event.preventDefault()
    const FirstName = event.target[0].value
    const LastName = event.target[1].value
    const pin = event.target[2].value
    const owner = FirstName.charAt(0).toUpperCase() + FirstName.slice(1).toLowerCase() + " " + LastName.charAt(0).toUpperCase() + LastName.slice(1).toLowerCase();
    const username = FirstName.charAt(0).toLowerCase() + LastName.charAt(0).toLowerCase()

    addAccount(owner, pin, username)

  }


  return (
    <div className="login-form">
      <form onSubmit={handleCreateAccount}>
        <div className="title is-4">Create New Account</div>
        <div style={{ marginTop: 40 }}>
          <div className="login-items">
            <div className="field">
              <label className="label">Enter First name</label>
              <div className="control">
                <input
                  required
                  className="input loginInput"
                  type="text"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  required
                  className="input loginInput"
                  type="text"
                  placeholder="Surname"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Create pin</label>
              <div className="control">
                <input
                  className="input loginInput"
                  type="number" minLength={3}
                  maxLength={5}
                  required
                  placeholder="4 Digit Pin"
                />
              </div>
            </div>
            <button
              type="submit"
              style={{ marginTop: 20 }}
              className="button block is-primary"
            >Create
            </button>
            <button
              onClick={switchForm}
              style={{ marginTop: 20 }}
              className="button block is-primary"
            >Login
            </button>

          </div>
        </div>
      </form>
    </div>

  )
}
export default CreateAccount