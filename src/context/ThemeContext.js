import { createContext,useState} from 'react'

export const ThemeContext = createContext()


const ThemeContextProvider = ({ children }) => {
    const [switchTheme, setSwitchTheme] = useState(JSON.parse(localStorage.getItem('switchTheme'))?.switchTheme)
    



    return (
        <ThemeContext.Provider value={{
             switchTheme,
             setSwitchTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeContextProvider