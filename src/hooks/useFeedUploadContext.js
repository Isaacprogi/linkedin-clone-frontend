import { FeedUploadContext } from "../context/FeedUploadContext"
import { useContext } from "react"


export const useFeedUploadContext = () => {
    const context = useContext(FeedUploadContext)
    
    if(!context) {
        throw Error('useGlobalContext must be used inside a GlobalContextProvider')
    }

    return context
}
