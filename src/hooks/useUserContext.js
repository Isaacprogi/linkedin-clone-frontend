import {useContext} from 'react'
import { UserContext } from '../context/UserContext'


 export const useUserContext = () => {
    const context = useContext(UserContext)
    if(!context) {
        return console.log('You cannot use UserContext outside UserProvider')
    }
    return context
}