import { createContext, useReducer} from 'react'

export const FeedContext = createContext()


export const userReducer = (state, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return {
                feeds:  [action.payload, ...state.feeds]
            }
        case 'ADD_POST':
              console.log([action.payload, ...state.feeds])
            return {
                feeds: [action.payload, ...state.feeds]
            }
        case 'DELETE_POST':
            return {
                feeds: action.payload
            }
        case 'UPDATE_POST':
            return {
                feeds: action.payload
            }
        case 'LIKE_POST':
            return {
                feeds: action.payload
            }
        case 'REPOST':
            return {
                feeds: action.payload
            }
        default:
            return state
    }
}


const FeedProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { feeds: [] })
    const PFI = "http://localhost:4000/public/post/images/"
    const PFV = "http://localhost:4000/public/post/videos/"
    




    return (
        <FeedContext.Provider value={{
            ...state, dispatch, PFV, PFI
        }}>
            {children}
        </FeedContext.Provider>
    )

}

export default FeedProvider
