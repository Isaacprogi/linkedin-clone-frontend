import { createContext,useState} from 'react'

export const ConnectionContext = createContext()




const ConnectionContextProvider = ({ children }) => {
    const [pendingConnections, setPendingConnections] = useState('')
    const [connections,setConnections] = useState([])
    const [pendingSentConnections,setPendingSentConnections] = useState('')
    const PF = "http://localhost:4000/public/images/"


    return (
        <ConnectionContext.Provider value={{
             pendingConnections,
             setPendingConnections,
             pendingSentConnections,
             setPendingSentConnections,
             connections,
             setConnections, PF
        }}>
            {children}
        </ConnectionContext.Provider>
    )

}

export default ConnectionContextProvider