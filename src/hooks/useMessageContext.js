import {useContext} from 'react'
import { MessageContext } from '../context/MessageContext'


 export const useMessageContext = () => {
    const context = useContext(MessageContext)
    if(!context) {
        return console.log('You cannot use UserContext outside UserProvider')
    }
    return context
}