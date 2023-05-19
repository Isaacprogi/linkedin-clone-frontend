import {createContext,useState} from 'react'




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