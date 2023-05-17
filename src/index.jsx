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
    </FeedProvider>
  </Router>
)
