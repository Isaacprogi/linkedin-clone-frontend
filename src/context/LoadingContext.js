import { createContext , useState} from "react";

export const LoadingContext = createContext()


export const LoadingContextProvider = ({children}) => {
    const [pageLoading, setPageLoading] = useState(true)


    return <LoadingContext.Provider value={{
        pageLoading, setPageLoading
         
    }}>

        {children}
    </LoadingContext.Provider>
}