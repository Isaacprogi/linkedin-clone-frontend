import React from 'react'
import BecauseYouFollowed from '../components/BecauseYouFollowed'
import PeopleYouKnow from '../components/PeopleYouKnow'
import { BsFillPeopleFill } from 'react-icons/bs'
import { useState } from 'react'
import { FaCaretSquareUp } from 'react-icons/fa'
import { AiFillLinkedin } from 'react-icons/ai'
import { TiContacts } from 'react-icons/ti'
import { BsHash } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { RiPagesLine } from 'react-icons/ri'
import { BiNews } from 'react-icons/bi'
import { MdGroups } from 'react-icons/md'
import { TbCalendarEvent } from 'react-icons/tb'
import { BsChevronCompactDown } from 'react-icons/bs'
import { GrKey } from 'react-icons/gr'
import NavBar from '../components/NavBar'
import FootBar from '../components/FootBar'
import { HiOutlineChevronRight } from 'react-icons/hi'
import { useScroller } from '../hooks/useScroller'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { useConnectionContext } from '../hooks/useConnectionContext'
import { useThemeContext } from '../hooks/useThemeContext'
import { BsThreeDots } from 'react-icons/bs'
import { useMemo, useEffect } from 'react'
import { axiosFetch } from '../utils/axiosFetch'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'



const Network = ({ setLinkType }) => {
  const [more, setMore] = useState(false)
  const ShowMore = () => setMore(!more)
  const displayNav = useScroller('scroll-network')
  const navigate = useNavigate()
  const { user } = useUserContext()
  const { pendingConnections, connections, setConnections } = useConnectionContext()
  const [searchActiveSmall, setSearchActiveSmall] = useState(false)
  const { switchTheme } = useThemeContext()


  const config2 = useMemo(() => ({
    Accept: 'application/json',
    Authorization: `Bearer ${user?.access}`
  }
  ), [user?.access])



  useEffect(() => {
    const getConnections = async () => {
      if (user?.access) {
    
        try {
          const { data } = await axiosFetch.get('connection', { headers: config2 })
          setConnections(data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getConnections()
  }, [config2,user?.access, setConnections])







  return (
    <div id='scroll-network' className="w-full h-full  overflow-auto">
      <NavBar searchActiveSmall={searchActiveSmall} setSearchActiveSmall={setSearchActiveSmall} displayNav={displayNav} />
      <div className="container w-full flex-auto container mx-auto h-full">
        <div className='w-full h-[max-content] md:pt-6  md:px-[4.5rem] md:grid md:grid-cols-medium-network md:gap-4 '>
          <div className={`${switchTheme ? "bg-gray-800" : "bg-white"} h-[max-content] hidden md:block rounded-lg overflow-hidden md:mb-[3rem] `}>
            <p className={`px-4 pt-3 font-[700] ${switchTheme ? "text-gray-300" : " text-gray-500"}`}>Manage my network</p>
            <span onClick={() => navigate('/connections')} className={`px-5 cursor-pointer h-[3rem] text-gray-400 w-full ${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  flex items-center justify-between`}><p className='flex items-center'><BsFillPeopleFill className='mr-1  text-gray-500' />connections</p> <p>{connections?.length}</p></span>
            {
              more ? <ul className='w-full text-gray-400 '>
                <li> <span className={`px-5 cursor-pointer h-[3rem] w-full ${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  flex items-center justify-between`}><p className='flex items-center'><TiContacts className='mr-1 text-gray-500' />Contacts</p> <p>0</p></span></li>
                <li onClick={() => {
                  navigate('/people/following')
                }}> <span className={`px-5 cursor-pointer h-[3rem] w-full ${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  flex items-center justify-between`}><p className='flex items-center'><CgProfile className='mr-1 text-gray-500' />following | followers</p>{user?.following?.length} | {user?.followers?.length} </span></li>
                <li> <span className={`px-5 cursor-pointer h-[3rem] w-full ${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  flex items-center justify-between`}><p className='flex items-center'><MdGroups className='mr-1 text-gray-500' />Groups</p> <p>0</p></span></li>
                <li> <span className={`px-5 cursor-pointer h-[3rem] w-full ${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  flex items-center justify-between`}><p className='flex items-center'><TbCalendarEvent className='mr-1 text-gray-500' />Events</p> <p>0</p></span></li>
                <li><span className={`px-5 cursor-pointer h-[3rem] w-full ${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  flex items-center justify-between`}><p className='flex items-center'><RiPagesLine className='mr-1 text-gray-500' />Pages</p> <p>0</p></span></li>
                <li> <span className={`px-5 cursor-pointer h-[3rem] w-full ${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  flex items-center justify-between`}><p className='flex items-center'><BiNews className='mr-1 text-gray-500' />Newsletter</p> <p>0</p></span></li>
                <li> <span className={`px-5 cursor-pointer h-[3rem] w-full ${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  flex items-center justify-between`}><p className='flex items-center'><BsHash className='mr-1 text-gray-500' />Hashtags</p> <p>0</p></span></li>
              </ul> : ''
            }
            <span onClick={ShowMore} className={`px-4 mt-2 flex items-center ml-2 cursor-pointer ${switchTheme ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-500"} py-1 rounded-md  w-[9rem]`}><p className='  font-[700] mr-1 '>{more ? 'Show less' : 'Show more'}</p> <FaCaretSquareUp className={more ? '' : 'rotate-[180deg]'} /></span>

            {
              switchTheme ? <hr className='mt-2 border-gray-900 ' /> : <hr className='mt-2' />
            }

            {/* key section */}


            <div className="h-[15rem] flex flex-col w-full">
              <span className={`h-[3rem] ${switchTheme ? "text-gray-400" : ""} flex justify-end px-2 items-center `}>
                <span className='mr-[.3rem]'>Ad</span> <BsThreeDots className={`text-4xl ${switchTheme ? "text-gray-300 hover:bg-gray-700" : "hover:bg-gray-200"} cursor-pointer p-2 rounded-full `} />
              </span>
              <span className="flex-auto  flex flex-col items-center justify-center">
                <span className='flex  items-center justify-center'>
                  <div className="h-[5rem] rounded-full mr-3 overflow-hidden w-[5rem] ">
                    <LazyLoadImage
                      width={80}
                      height={80}
                      src={user?.photo}
                      placeholderSrc={PLACEHOLDERIMAGE}
                    />
                  </div>
                  <GrKey className='text-[3.5rem] text-blue-200' />
                </span>
                <p className={`${switchTheme ? "text-gray-300" : ""}`}>{user?.username}, unclock access to linkedn learning</p>
                <span className={`h-[2.3rem] text-blue-700 rounded-full ${switchTheme ? "bg-gray-700" : ""} cursor-pointer overflow-hidden px-4 mt-3 bg-white border border-blue-400 flex items-center justify-center`}>
                  Unlock for free
                </span>
              </span>

            </div>


            {
              switchTheme ? <hr className='mt-2 border-gray-900 ' /> : <hr className='mt-2' />
            }

            {/* add Contacts section */}

            <div className="h-[15rem] flex px-2 flex-col items-center justify-center  w-full">
              <p className={`${switchTheme ? "text-gray-400" : ""} break-al mb-2`}>Add to personal contact</p>
              <p className={`break-all ${switchTheme ? "text-gray-400" : " text-gray-500"} mb-2 italic text-[.7rem]`}>We periodically import and store Contacts
                to help you annd others connect.You choose who to connect to and
                who to invite. <span className='text-blue-600 mb-2 text-md font-[500]'>Learn more</span>
              </p>
              <input type="text" className={`w-full outline-none rounded-md ${switchTheme ? "bg-gray-700 text-gray-200" : "bg-white"}  mb-2 p-2 border border-gray-400`} placeholder={`${user?.email}`} />
              <span className="px-4 py-1  border cursor-pointer rounded-full overflow-hidden border-blue-500 font-[600] text-blue-600">Continue</span>
              <p className={`${switchTheme ? "text-gray-300" : "text-gray-500"} cursor-pointer mt-1`}>More options</p>

            </div>

            {/* footer section */}

            {
              switchTheme ? <hr className='mt-2 border-gray-900 ' /> : <hr className='mt-2' />
            }
            <div className={` md:rounded-lg ${switchTheme ? "text-gray-500" : "text-gray-500"}   overflow-hidden w-full  h-[max-content]`}>
              <span className='w-full flex flex-wrap h-full py-2 items-center justify-center' >
                <p className='flex break-all items-center justify-center  text-[.8rem] mb-2 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>About</span> <span className='mr-2 cursor-pointer hover:underline hover:text-blue-700'>Accessibility</span> <span className='hover:underline cursor-pointer hover:text-blue-700'>Help Center</span></p>
                <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 '><span className='mr-2 flex items-center justify-center hover:underline cursor-pointer hover:text-blue-700'>Privacy & Terms<BsChevronCompactDown /></span>  <span className='cursor-pointer hover:underline hover:text-blue-700'>Ad Choices</span></p>
                <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Advertising</span> <span className='flex items-center justify-center hover:underline hover:text-blue-700 cursor-pointer'>Business services<BsChevronCompactDown /></span></p>
                <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 '><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Get the linkdn app   </span> <span className='hover:underline hover:text-blue-700 cursor-pointer'>More</span></p>
                <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500'> <span className='text-blue-700 text-[1.1rem] font-[700]'>Linkdn</span>  <AiFillLinkedin className={`text-blue-700   text-[1.3rem]`} /> <span className={`${switchTheme ? "text-gray-300" : "text-gray-700 "} `}>linkdedin corporation @ 2022</span> </p>
              </span>
            </div>



          </div>


          <div>
            <div className={`h-[3rem] mt-[.5rem]  md:rounded-lg ${switchTheme ? "bg-gray-800" : "bg-white md:border-gray-300 md:border"} overflow-hidden flex items-center justify-between md:px-2`}>
              <p className={`text-gray-500 ${switchTheme ? "text-gray-300" : ""} font-[500] hidden md:block `}>{pendingConnections?.length < 1 ? 'No pending connections' : <span className='flex items-center'><span className='w-[0.5rem] h-[0.5rem] mr-2 flex rounded-full overflow-hidden bg-red-600'></span> You have pending connections</span>}</p>
              <p className='text-gray-400 font-[700] hidden md:block cursor-pointer' onClick={() => {
                navigate('/my-network/invitation-manager/recieved')
                setLinkType('recieved')
              }}>Manage</p>
              <p onClick={() => {
                navigate('/my-network/invitation-manager/recieved')
                setLinkType('recieved')
              }} className='md:hidden flex px-2 items-center justify-between w-full h-full cursor-pointer text-blue-600'>
                Invitations
                <HiOutlineChevronRight className='md:hidden' />
              </p>

            </div>
            <div onClick={()=>navigate('/connections')} className={`w-full py-[1rem] md:hidden  mt-2 flex items-center justify-center text-blue-600  ${switchTheme ? `bg-gray-800` : 'bg-white sm:rounded-sm sm:border sm:border-gray-300 '}  `}>
               My Network
            </div>

            <div className={` mt-2 ${switchTheme ? `bg-gray-800` : 'bg-white border border-gray-300'}  md:mt-5 pb-20  sm:rounded-lg overflow-hidden`}>
              <BecauseYouFollowed />
              <PeopleYouKnow />

            </div>

          </div>
        </div>

      </div>

      {
        !searchActiveSmall &&
        <FootBar />
      }
    </div>

  )
}


export default Network