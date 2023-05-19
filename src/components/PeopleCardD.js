import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext'
import {timeFormatting} from '../utils/timeFormatting'
import {useState,useEffect,useRef} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'


export const PeopleCardD = ({user,time, handleEnterChat}) => {
 const profilePicRef = useRef('')

 const navigate = useNavigate()
 const {switchTheme} = useThemeContext()
 const [connectedTime,setConnectedTime] = useState("")
 


 useEffect(()=>{
    setConnectedTime(timeFormatting(time))   
 },[time])

    return user &&( <div   className={`w-full flex  items-center cursor-pointer px-3 mb-2`}>
        <span className='flex-auto flex items-center' onClick={()=>navigate(`/linkedin/${user.username}`)}>
        <div ref={profilePicRef} className="flex-none  mr-2 w-[3rem] h-[3rem] rounded-full overflow-hidden flex   sm:w-[3.4rem] sm:h-[3.4rem] ">
        {
                    <LazyLoadImage
                    width={profilePicRef?.current?.clientWidth}
                    height={profilePicRef?.current?.clientHeight}
                    effect='blur'
                    src={user?.photo}
                    placeholderSrc={PLACEHOLDERIMAGE}
                  />
                   }
        </div>
        <div className="flex-auto text-lg  br-red-600">
          <span className={`${switchTheme?"text-gray-300":""} font-[500]`}>{user.firstname + " " + user.lastname}</span>
            <p className='text-gray-500 w-full text-sm elipSingle '>{user.title}</p>
            <p className={`text-gray-500 text-sm elipSingle border-b-2 ${switchTheme?"border-gray-700":""} pb-2`}>{`${connectedTime} 'ago`}</p>
        </div>
        </span>
        <span className="flex-none flex items-center pr-2 pl-2">
            <span onClick={()=>{
                handleEnterChat(user)
                }} className={`${switchTheme?"bg-gray-700 text-white hover:bg-gray-600":" hover:bg-blue-100 border"} rounded-full mr-2 cursor-pointer  hover:border-blue-600 hover:border-3 overflow-hidden px-2 py-1  `}>Message</span>
        </span>
       
    </div>)



}
