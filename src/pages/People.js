import React from 'react'
import { useState } from 'react'
import NavBar from '../components/NavBar'
import FootBar from '../components/FootBar'
import { useScroller } from '../hooks/useScroller'
import { BsThreeDots } from 'react-icons/bs'
import { BsChevronCompactDown } from 'react-icons/bs'
import {  AiFillLinkedin } from 'react-icons/ai'
import {useUsersContext} from '../hooks/useUsersContext'
import { useUserContext } from '../hooks/useUserContext'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {PeopleCardFF} from '../components/PeopleCardFF'
import {GrKey} from 'react-icons/gr'
import { useThemeContext } from '../hooks/useThemeContext'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import {useRef} from 'react'

const People = ({type}) => {
  const displayNav = useScroller('scroll-network')
  const connections = true
  const {PF} = useUsersContext()
  const {user} = useUserContext()
  const [borderActive, setBorderActive] = useState({following:false,followers:false})
  const navigate = useNavigate()
  const {switchTheme} = useThemeContext()
  const profilePicRef = useRef('')


 

  useEffect(()=>{
    if(type === 'following'){
       return  setBorderActive({following:true,followers:false})
    }
    else if(type === 'followers') return  setBorderActive({following:false,followers:true})
    },[type])



    



  return (
    <div id='scroll-network' className={` w-full h-full relative overflow-auto`}>
      <NavBar connections={connections} displayNav={displayNav} />
      <div className="container mt-1 w-full flex-auto container mx-auto h-full">
        <div className='w-full h-[max-content] md:pt-6 md:px-[4.5rem] md:grid md:grid-cols-medium-connections md:gap-4 '>
          <div className={`${switchTheme?"bg-gray-800":"sm:border-gray-200 sm:border"} bg-white sm:rounded-lg   h-full `}>
            <div className="w-full p-4 flex flex-col ">
              <span className={`${switchTheme?"text-gray-300":""} text-xl  `}>{`${user?.firstname}'s newtork`}</span>
            </div>
            <hr className={`${switchTheme?"border-gray-700":""}`} />
            <span className={`${switchTheme?"text-gray-300":"text-gray-600"} flex items-center py-2 font-[600]  justify-start px-4`}>
                  <span className={`${borderActive?.following?'border-b-2 border-gray-600':""} cursor-pointer h-[2rem]`} onClick={()=>{
                   navigate('/people/following')
                   setBorderActive({following:true, followers:false})}
                  }>
                      following
                  </span>
                  <span className={`${borderActive?.followers?'border-b-2 border-gray-600':""} cursor-pointer h-[2rem] ml-2`} onClick={()=>{
                      navigate('/people/followers')
                      setBorderActive({followers:true, following:false})
                  }}>
                      followers
                  </span>
            </span>
            <hr className={`${switchTheme?"border-gray-700":""}`} />

             {
               type === 'following' && 
               <span className={`${switchTheme?"text-gray-300":"text-gray-600"} flex items-center py-2 font-[200]  justify-start px-4`}>
               {
                 user?.following?.length === 1?
                 `You are following ${user?.following?.length} person`:
                 `You are following ${user?.following?.length} people`
               }
            </span>
             }
             {
               type === 'followers' && 
               <span className={`${switchTheme?"text-gray-300":"text-gray-600"} flex items-center py-2 font-[200]  justify-start px-4 `}>
                You have {user?.followers?.length} followers
            </span>
             }

            {
             type === 'following' &&  user?.following?.map((item=>{
              return <PeopleCardFF type={type} key={item?._id} PF={PF} user={item} />
              
            }))
           }
            {
             type === 'followers' &&  user?.followers?.map((item=>{
              return <PeopleCardFF type={type} key={item?._id} PF={PF} user={item} />
              
            }))
           }
               
          </div>


          <div className='h-full hidden md:block flex flex-col sticky top-[5rem] h-[45rem]'>

                <div className={`${switchTheme?"bg-gray-800":"bg-white border border-gray-300"} h-[max-content] py-2 mt-3 rounded-lg overflow-hidden   flex flex-col  w-full`}>
                        <span className={`h-[3rem] ${switchTheme?"text-gray-300":""}  flex justify-end px-2 items-center `}>
                            Ad <BsThreeDots className={`${switchTheme?"text-gray-300 hover:bg-gray-700 p-2 text-[2rem] cursor-pointer rounded-full overflow-hidden":""} ml-2` }/>
                        </span>
                        <span className={`${switchTheme?"text-gray-300":"text-gray-400"} text-center px-3 text-sm `}>
                            {`${user?.firstname} unlock your potential with linkedn Premium`}
                        </span>
                        <span className="flex-auto px-3 flex flex-col items-center justify-center">
                            <span className='flex  items-center justify-center'>
                                <div ref={profilePicRef} className="h-[5rem] rounded-full mr-3 overflow-hidden w-[5rem] bg-yellow-600">
                                <LazyLoadImage
                    width={profilePicRef?.current?.clientWidth}
                    height={profilePicRef?.current?.clientHeight}
                    effect='blur'
                    src={user?.photo}
                    placeholderSrc={PLACEHOLDERIMAGE}
                  />
                                </div>
                                <GrKey className={`${switchTheme?'text-gray-300':"text-blue-200"} text-[3.5rem]  `} />
                            </span>
                            <p className={`${switchTheme?"text-gray-300":"text-gray-400"} text-center px-3 text-sm `} >See who's viewed your profile in the past 90 days</p>
                            <span className='h-[2.3rem] text-blue-700 rounded-full cursor-pointer overflow-hidden px-4 mt-3 bg-white border border-blue-400 flex items-center justify-center'>
                                Try for free
                            </span>
                        </span>

                </div>



            <div className=" hidden md:flex flex-col ">

                <span className='w-full flex flex-wrap h-full py-2 items-center justify-center' >
                  <p className='flex break-all items-center justify-center  text-[.8rem] mb-2 text-gray-500 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>About</span> <span className='mr-2 cursor-pointer hover:underline hover:text-blue-700'>Accessibility</span> <span className='hover:underline cursor-pointer hover:text-blue-700'>Help Center</span></p>
                  <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500 '><span className='mr-2 flex items-center justify-center hover:underline cursor-pointer hover:text-blue-700'>Privacy & Terms<BsChevronCompactDown /></span>  <span className='cursor-pointer hover:underline hover:text-blue-700'>Ad Choices</span></p>
                  <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Advertising</span> <span className='flex items-center justify-center hover:underline hover:text-blue-700 cursor-pointer'>Business services<BsChevronCompactDown /></span></p>
                  <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Get the linkdn app   </span> <span className='hover:underline hover:text-blue-700 cursor-pointer'>More</span></p>
                  <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500'> <span className='text-blue-700 text-[1.1rem] font-[700]'>Linkdn</span>  <AiFillLinkedin className={`text-blue-700   text-[1.3rem]` }/> <span className={`${switchTheme?"text-gray-300":"text-gray-700 "} `}>linkdedin corporation @ 2022</span> </p>
                </span>

              </div>
            </div>




          </div>
        </div>

      <FootBar  />

      </div>
     
    

  )
}


export default People