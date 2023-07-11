import 'bulma/css/bulma.css'
import './components/style.css'
import { useState } from 'react'
import TitleBar from './components/TitleBar'
import CurrentBalance from './components/CurrentBalance'
import TransferMoney from './components/TransferMoney'
import RequestLoan from './components/RequestLoan'
import CloseAccount from './components/CloseAccount'
import LoginForm from './components/LoginForm'
import CreateAccount from './components/CreateAccount'
import AccountHistory from './components/AccountHistory'
import useAccountContext from './hooks/useAccountContexts'


function App() {

  const { account } = useAccountContext()
  const [formType, setFormType] = useState("login")

  return (<div>
    {
      account ? <div>
        <TitleBar />
        < CurrentBalance />
        <TransferMoney />
        <AccountHistory />
        <RequestLoan />
        <CloseAccount />
      </div> :
        <div>
          {formType === "login" ? <LoginForm switchForm={() => setFormType("register")} /> : <CreateAccount switchForm={() => setFormType("login")} />}
        </div>
    }
  </div>)
}
export default App 