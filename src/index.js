import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google'

console.log('process.env.GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.Fragment>
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={
          process.env.GOOGLE_CLIENT_ID ||
          '310950414989-siv91r8jor55nv6mjjcp0f9ooct6qjct.apps.googleusercontent.com'
        }
      >
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.Fragment>
)
