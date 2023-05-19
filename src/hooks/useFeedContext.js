import { FeedContext } from "../context/FeedContext"
import { useContext } from "react"


export const useFeedContext = () => {
    const context = useContext(FeedContext)
    
    if(!context) {
        throw Error('useGlobalContext must be used inside a GlobalContextProvider')
    }

    return context
}
