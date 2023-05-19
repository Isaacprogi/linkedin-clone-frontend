import {createContext,useReducer} from 'react'


export const MessageContext = createContext()


export const messageReducer = (state,action) => {
      switch(action.type) {
          case 'GET_MESSAGE':
            return {
                messages: action.payload
            }
          case 'GET_MESSAGE_ON_SCROLL':
            return {
                messages: [...state?.messages,...action.payload]
            }
          case 'SET_MESSAGE':
            return {
                messages: [...state?.messages, action.payload]
            }
            default:
                return state
      } 
}





export const MessageContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(messageReducer, {messages:[]})
       
   return(
    <MessageContext.Provider value={{
        ...state,dispatch
    }}>
    {children}
    </MessageContext.Provider>
   ) 




}