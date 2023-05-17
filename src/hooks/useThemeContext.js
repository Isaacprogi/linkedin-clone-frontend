import {useContext} from 'react'
import { ThemeContext } from '../context/ThemeContext'


 export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if(!context) {
        return console.log('You cannot use UsersContext outside UsersProvider')
    }
    return context
}