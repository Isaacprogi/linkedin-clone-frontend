import { useNavigate } from 'react-router-dom'
import {useThemeContext} from '../hooks/useThemeContext'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import {useRef} from 'react'

export const PeopleCardF = ({user,setSearchActive}) => {
 const navigate = useNavigate()
 const {switchTheme} = useThemeContext()
 const profilePicRef = useRef('')

    return user &&( <div  className="w-full flex items-center cursor-pointer  mb-2">
        <span className='flex-auto flex items-center' onClick={()=>{
            setSearchActive(false)
            navigate(`/linkedin/${user.username}`)
        }
    }>
        <div  className="flex-none  mr-2 w-[4rem] h-[4rem] flex rounded-full overflow-hidden p-1 items-center justify-center">
        <div ref={profilePicRef} className='w-full h-full rounded-full overflow-hidden'>
        <LazyLoadImage
                    width={profilePicRef?.current.clientWidth}
                    height={profilePicRef?.current.clientHeight}
                    effect='blur'
                    src={user?.photo}
                    placeholderSrc={PLACEHOLDERIMAGE}
                  />
        </div>
        </div>
        <div className="flex-auto text-lg  br-red-600">
          <span className={`font-[500] ${switchTheme?"text-gray-300":"text-gray-600"} `}>{user.firstname + " " + user.lastname}</span>
            <p className={` ${switchTheme?"text-gray-300":"text-gray-500"} w-full text-sm elipSingle `}>{user.title}</p>
        </div>
        </span>
        
       
    </div>)



}
