import useAccountContext from '../hooks/useAccountContexts'
function TitleBar() {
  const { account, logout } = useAccountContext()

  const handleLogoutClick = function () {
    logout()
  }

  return <div className="titleBar" >
    <div className="userName">Welcome {account.owner} </div>
    <div className="appIcon"></div>
    <div className="logout">
      <button className="logout-btn" onClick={handleLogoutClick} >Logout</button>
    </div>
  </div>
}
export default TitleBar