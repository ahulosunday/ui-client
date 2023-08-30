import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import { AuthContextProvider } from './context/authContext';
import {usePromiseTracker } from 'react-promise-tracker';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress &&
    <div style={{ 
       marginTop:'3%',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       }}>
      <ClipLoader color="#52bfd9" size={100}/>
    </div>
  
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> 
   <Provider store={store}>
 <AuthContextProvider> 
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
   <LoadingIndicator />
    <App />
     </AuthContextProvider>
     </Provider>
 // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
