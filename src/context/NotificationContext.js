<<<<<<< HEAD
import {createContext,useState} from 'react'
=======
import {createContext,useReducer,useState} from 'react'
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856



export const NotificationContext = createContext()


export const NotificationContextProvider = ({children}) =>{

    const [messageNotifications, setMessageNotifications] = useState([])
    const [navMessageNotifications, setNavMessageNotifications] = useState(false)
      
   return(
    <NotificationContext.Provider value={{
        messageNotifications, setMessageNotifications,
        navMessageNotifications, setNavMessageNotifications
    }}>

    {children}
    </NotificationContext.Provider>
   ) 




}