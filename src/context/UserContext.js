import {createContext,useReducer} from 'react'

export const UserContext = createContext()


export const userReducer = (state,action) => {
      switch(action.type) {
          case 'GET_USER':
            return {
                user: action.payload
            }
          case 'UPDATE_USER':
            return {
                user:{...state.user, ...action.payload}
            }
            case 'LOG_OUT':
              return {
                  user: action.payload
              }
            default:
                return state
      } 
}


export const UserContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(userReducer, {user:{}})
    const PF = "http://localhost:4000/public/images/"
 

       
    
   return(
    <UserContext.Provider value={{
        ...state,dispatch,PF
    }}>
    {children}
    </UserContext.Provider>
   ) 

}