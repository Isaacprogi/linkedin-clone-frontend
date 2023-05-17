import {createContext,useReducer} from 'react'



export const UsersContext = createContext()


export const userReducer = (state,action) => {
      switch(action.type) {
          case 'GET_USERS':
            return {
                users: action.payload
            }
          case 'UPDATE_USERS':
              console.log(action.payload)
              const newUsers = state?.users?.map((user,index)=>{
                  if(action.payload?._id === user?._id){
                      return action.payload
                  }
                      return user
                  
              })
              return {
                  users: newUsers
              }
            default:
                return state
      } 
}


export const UsersContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(userReducer, {users:[]})
    const PF = "http://localhost:4000/public/images/"

    // useEffect(()=>{
    //    if(state.user){
    //        console.log(state.user)
    //    }
    // },[state.user])
 
       
    
   return(
    <UsersContext.Provider value={{
        ...state,dispatch,
        PF
    }}>
    {children}
    </UsersContext.Provider>
   ) 

}