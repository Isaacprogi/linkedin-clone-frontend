import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import {useRef} from 'react'

export const PeopleCardG = ({user,PF,setSearchActiveSmall}) => {
 const navigate = useNavigate()
 const {switchTheme} = useThemeContext()
 const profilePicRef = useRef('')

    return user &&( <div  className="w-full flex items-center cursor-pointer  mb-2">
        <span className='flex-auto flex items-center' onClick={()=>{
            setSearchActiveSmall(false)
            navigate(`/linkedin/${user.username}`)
        }
         }>
        <div  className="flex-none  mr-2 w-[4rem] h-[4rem] rounded-full flex items-center justify-center overflow-hidden  p-1">
        <div ref={profilePicRef} className='w-full h-full overflow-hidden rounded-full '>
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
          <span className={`${switchTheme?"text-gray-300":""} font-[500]`}>{user.firstname + " " + user.lastname}</span>
            <p className='text-gray-500 font-[400] italic w-full text-sm elipSingle '>{user.title} djd</p>
        </div>
        </span>
        
       
    </div>)



}
