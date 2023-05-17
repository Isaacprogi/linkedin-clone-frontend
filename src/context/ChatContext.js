import { createContext, useReducer} from 'react'

export const ChatContext = createContext()


export const userReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CHATS':
            return {
                chats: action.payload
            }
        case 'ADD_CHAT':
            return {
                chats: [action.payload,...state?.chats]
            }
        case 'UPDATE_CHAT':
            return {
                chats: action.payload
            }
        case 'DELETE_CHAT':
            return {
                chats: action.payload
            }
        case 'LATEST_MESSAGE':
            return {
                chats: action.payload
            }
        default:
            return state
    }
}


const ChatContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { chats: [] })
    const PF = "http://localhost:4000/public/images/"
    




    return (
        <ChatContext.Provider value={{
            ...state, dispatch, PF
        }}>
            {children}
        </ChatContext.Provider>
    )

}

export default ChatContextProvider