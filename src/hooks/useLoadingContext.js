import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";



export const useLoadingContext = () => {
    const context = useContext(LoadingContext)
    
    if(!context) {
        throw Error('useGlobalContext must be used inside a GlobalContextProvider')
    }

    return context
}