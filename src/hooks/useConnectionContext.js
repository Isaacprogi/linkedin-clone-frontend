import { ConnectionContext } from "../context/ConnectionContext"
import { useContext } from "react"

export const useConnectionContext = () => {
    const context = useContext(ConnectionContext)
    
    if(!context) {
        throw Error('useConectionContext must be used inside a ConnectionContextProvider')
    }

    return context
}
