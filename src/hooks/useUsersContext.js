import {useContext} from 'react'
import { UsersContext } from '../context/UsersContext'


 export const useUsersContext = () => {
    const context = useContext(UsersContext)
    if(!context) {
        return console.log('You cannot use UsersContext outside UsersProvider')
    }
    return context
}