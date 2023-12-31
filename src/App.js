import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Logins = React.lazy(() => import('./views/pages/login/Logins'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const PaymentOptions = React.lazy(() => import('./views/pages/payment/selectoptions'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const ForgotPassword = React.lazy(()=> import('./views/pages/forgetpassword/ForgotPassword'))
const Toggle1 = React.lazy(()=> import('./views/pages/payment/GifshipModal'))
const PayOptions = React.lazy(()=> import('./views/pages/payment/payOptions'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
             <Route exact path="/logins" name="Login Page" element={<Logins />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path='/payment/option' name="Programme Types" element={<PaymentOptions />} />
             <Route exact path='/payment/' name="Programme Types" element={<PayOptions />} />
             <Route exact path='/payment/toggle' name="Programme Types" element={<Toggle1 />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/forgot" name="Forgot Password" element={<ForgotPassword />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
