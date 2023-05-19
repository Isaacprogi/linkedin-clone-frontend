import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import FeedProvider from './context/FeedContext'
import FeedUploadProvider from './context/FeedUploadContext'
import { UserContextProvider } from './context/UserContext'
import { UsersContextProvider } from './context/UsersContext'
import { MessageContextProvider } from './context/MessageContext'
import { LoadingContextProvider } from './context/LoadingContext'
import ChatContextProvider from './context/ChatContext'
import ConnectionContextProvider from './context/ConnectionContext'
<<<<<<< HEAD
import { NotificationContextProvider } from './context/NotificationContext'
import ThemeContextProvider from './context/ThemeContext'

import { disableReactDevTools } from '@fvilers/disable-react-devtools'

import App from './App'
import './index.css'


if (process.env.NODE_ENV === 'production') disableReactDevTools()


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <FeedProvider>
      <NotificationContextProvider>
        <ThemeContextProvider>
          <UserContextProvider>
            <FeedUploadProvider>
              <MessageContextProvider>
                <ConnectionContextProvider>
                  <UsersContextProvider>
                    <ChatContextProvider>
                      <LoadingContextProvider>
                        {/* <React.StrictMode> */}
                        <App />
                        {/* </React.StrictMode> */}
                      </LoadingContextProvider>
                    </ChatContextProvider>
                  </UsersContextProvider>
                </ConnectionContextProvider>
              </MessageContextProvider>
            </FeedUploadProvider>
          </UserContextProvider>
        </ThemeContextProvider>
      </NotificationContextProvider>
=======
import {NotificationContextProvider} from './context/NotificationContext'
import ThemeContextProvider from './context/ThemeContext'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
     <FeedProvider>
      <NotificationContextProvider>
     <ThemeContextProvider>
          <UserContextProvider>
      <FeedUploadProvider>
        <MessageContextProvider>
              <ConnectionContextProvider>
            <UsersContextProvider>
              <ChatContextProvider>
                <LoadingContextProvider>
                  {/* <React.StrictMode> */}
                    <App />
                  {/* </React.StrictMode> */}
                </LoadingContextProvider>
              </ChatContextProvider>
            </UsersContextProvider>
              </ConnectionContextProvider>
        </MessageContextProvider>
      </FeedUploadProvider>
          </UserContextProvider>
     </ThemeContextProvider>
      </NotificationContextProvider>     
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856
    </FeedProvider>
  </Router>
)
