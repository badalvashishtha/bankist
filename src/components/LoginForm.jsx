import React from "react";
// import CreateAccount from "./CreateAccount";
import useAccountContext from "../hooks/useAccountContexts";

function LoginForm({ switchForm }) {
  const { loginUser } = useAccountContext();

  const handleSubmit = function (event) {
    event.preventDefault();
    const username = event.target[0].value;
    const pin = event.target[1].value;
    username && pin
      ? loginUser(username, pin)
      : console.error("incorrect data");
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="title is-4">Login</div>
        <div style={{ marginTop: 40 }}>
          <div className="login-items">
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  required
                  className="input loginInput"
                  type="text"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Pin</label>
              <div className="control">
                <input
                  required
                  className="input loginInput"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <button
              type="submit"
              style={{ marginTop: 20 }}
              className="button block is-primary"
            >
              Login
            </button>
            <button
              onClick={switchForm}
              style={{ marginTop: 20 }}
              className="button block is-primary"
            >
              Create New Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
