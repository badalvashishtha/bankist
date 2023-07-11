import { useContext } from 'react'
import AccountContext from '../context/bankistContext'

function useAccountContext() {
  return useContext(AccountContext)
}
export default useAccountContext