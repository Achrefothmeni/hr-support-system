import 'assets/plugins/nucleo/css/nucleo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'
import 'assets/css/style.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AdminLayout from 'layouts/Admin.js'
import AuthLayout from 'layouts/Auth.js'
import Home from 'layouts/Home.js'
import ResetPassword from 'views/examples/resetPassword.js'
import ForgotPassword from 'views/examples/ForgotPassword.js'

import { loadUser } from './actions/userActions'
import store from './store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

    React.useEffect(() => {
        store.dispatch(loadUser())
      }, []);
    

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                <Route path="/home" render={(props) => <Home {...props} />} />
                <Route path="/resetPassword/:token" render={(props) => <ResetPassword {...props} />} />
                <Redirect from="/" to="/admin/index" />
            </Switch>
            <ToastContainer/>
        </BrowserRouter>)
}

export default App;