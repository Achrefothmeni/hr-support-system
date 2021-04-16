import 'assets/plugins/nucleo/css/nucleo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'
import 'assets/css/style.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { REMOVE_ERROR } from './constants/alertConstant'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AdminLayout from 'layouts/Admin.js'
import AuthLayout from 'layouts/Auth.js'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './actions/userActions'
import store from './store'
import { useToasts } from 'react-toast-notifications'
function App() {
  const dispatch = useDispatch()

  const { error } = useSelector((state) => state.alerts)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { addToast } = useToasts()
  React.useEffect(() => {
    if (!isAuthenticated) store.dispatch(loadUser())
    if (error) {
      addToast(error.message, { appearance: error.type })
      dispatch({ type: REMOVE_ERROR })
    }
  }, [error])
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
        <Route path='/auth' render={(props) => <AuthLayout {...props} />} />
        <Redirect from='/' to='/admin/index' />
      </Switch>
    </BrowserRouter>
  )
}

export default App
