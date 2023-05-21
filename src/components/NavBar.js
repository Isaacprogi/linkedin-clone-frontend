import { AiFillLinkedin } from 'react-icons/ai'
import { MdHome } from 'react-icons/md'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { BsFillPeopleFill, BsFillBagFill } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { AiFillCaretDown } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useState, useMemo, useRef } from 'react'
import { FaSquare } from 'react-icons/fa'
import { useUserContext } from '../hooks/useUserContext'
import { useFeedUploadContext } from '../hooks/useFeedUploadContext'
import { axiosFetch } from '../utils/axiosFetch'
import { useChatContext } from '../hooks/useChatContext'
import { FaArrowLeft } from 'react-icons/fa'
import { useConnectionContext } from '../hooks/useConnectionContext'
import { PeopleCardF } from './PeopleCardF'
import axios from 'axios'
import { PeopleCardG } from '../components/PeopleCardG'
import { TbGridDots } from 'react-icons/tb'
import { useThemeContext } from '../hooks/useThemeContext'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'

const NavBar = ({ messaging, displayNav, connections, searchActiveSmall, setSearchActiveSmall }) => {
  const navigate = useNavigate()
  const [profileShow, setProfileShow] = useState(false)
  const { user, PF, dispatch } = useUserContext()
  const { postActiveSmall } = useFeedUploadContext()
  const { chats } = useChatContext()
  const { pendingConnections } = useConnectionContext()
  const [searchActive, setSearchActive] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchResults2, setSearchResults2] = useState([])
  const searchRef = useRef('')
  const searchRef2 = useRef('')
  const searchRefSmall = useRef('')
  const { switchTheme, setSwitchTheme } = useThemeContext()
  const [searchInputVisible, setSearchInputVisible] = useState(false)
  const profilePicRef = useRef('')
  const profileRef = useRef('')






  const config2 = useMemo(() => ({
    Accept: 'application/json',
    Authorization: `Bearer ${user?.access}`
  }), [user?.access])


  const searchUsers = async () => {
    if (user?.access) {
      try {
        const { data } = await axiosFetch.get('user', { headers: config2, params: { random: 5, search: searchRef?.current?.value } })
        setSearchResults(data?.users)
      } catch (error) {
        if (axios.isCancel(error)) return
        console.log(error)
      }
    }
  }

  const searchUser2 = async () => {
    if (user?.access) {
      try {
        const { data } = await axiosFetch.get('user', { headers: config2, params: { random: 5, search: searchRef2?.current?.value } })
        setSearchResults(data?.users)
      } catch (error) {
        if (axios.isCancel(error)) return
        console.log(error)
      }
    }
  }



  const handleLogout = async () => {
    try {
      await axiosFetch.post('auth/logout', { username: user?.username })
      dispatch({
        type: "LOG_OUT",
        payload: { access: "" }
      })
      sessionStorage.setItem('ongoing-registration-user', '')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }





  const handleProfileShow = () => setProfileShow(!profileShow)

  const handleClickedAndActiveChatUser = () => {
    if (user && chats?.length > 0) {
      const chatUser = chats[0]?.users.filter(element => element.username !== user?.username)
      return navigate(`/messaging/${chatUser[0]?.username}`)
    }

    if (user && chats.length < 1) {
      return navigate(`/messaging`)
    }

  }

  const searchUsersSmall = async () => {
    if (user?.access) {
      try {
        const { data } = await axiosFetch.get('user', { headers: config2, params: { random: 8, search: searchRefSmall?.current?.value } })
        setSearchResults2(data?.users)
      } catch (error) {
        console.log(error)
      }
    }
  }


  const handleSearchActive = () => {
    setSearchActive(true)
    setSearchInputVisible(true)
  }

  const handleSwitch = () => {
    setSwitchTheme(!switchTheme)
    localStorage.setItem('switchTheme', JSON.stringify({ switchTheme: !switchTheme }))
  }




  return <div className={(messaging || postActiveSmall) ? `hidden  md:flex flex-none z-[600] ${switchTheme ? "bg-gray-800 " : "bg-white"} md:sticky shadow-sm md:top-0 md:h-[3.6rem] h-[3.3rem] w-full ${displayNav ? 'sticky top-0' : ''}` : ` flex flex-none z-[600] md:sticky shadow-sm  ${switchTheme ? "bg-gray-800 " : "bg-white"}  md:top-0 bg-white md:h-[3.6rem] h-[3.3rem] w-full ${displayNav ? 'sticky top-0' : ''}`}>




    <div className={`w-full z-[700]  ${searchActive ? 'hidden md:block' : 'hidden'} z-[1000] fixed h-screen`}>
      <FaTimes onClick={() => {
        setSearchActive(false)
        setSearchInputVisible(false)
      }} className='absolute font-[700] text-lg text-white z-[10] cursor-pointer right-[3rem] top-[1rem]' />

      <div onClick={() => {
        setSearchActive(false)
        setSearchInputVisible(false)
      }} className="w-full h-full opacity-[.9] fixed  bg-black">
      </div>
    </div>




    <div className={`w-full h-full px-4  md:px-[2rem] mx-auto max-w-[1176px]`}>



      {/* mobile */}
      <div className={`  w-full h-full flex items-center justify-between md:hidden`}>

        <div className={`w-full ${searchActiveSmall ? 'block' : 'hidden '} ${switchTheme ? 'bg-gray-800' : 'bg-white'} h-[calc(100%-3.5rem)] md:hidden  fixed top-[3.8rem] right-0 left-0 overflow-y-auto `}>
          {
            searchResults2 && searchResults2?.map((item) => {
              return <PeopleCardG key={item?._id} user={item} setSearchActiveSmall={setSearchActiveSmall} />
            })
          }
        </div>
        {
          connections && <>
            <div className="items-center  flex flex-1">
              <FaArrowLeft onClick={() => navigate(-1)} />
              <span className='ml-10 text-2xl font-[600]'>Connections</span>
            </div>
            <div className=" flex flex-1"></div>
          </>
        }

        {!connections && <>
          <div  ref={profileRef} className={`profile ${searchActiveSmall ? 'flex border border-gray-300 items-center justify-center' : ''} flex-none w-[2rem] h-[2rem] min-w-[2rem] rounded-full overflow-hidden `}>
            {user && !searchActiveSmall && 
            
                 <div onClick={() => navigate(`/linkedin/${user?.username}`)} className={` ${switchTheme ? "active:bg-gray-700" : "active:bg-gray-100"}  overflow-x-hidden `} >
                    {/* <LazyLoadImage
                  width={profileRef?.current.clientWidth}
                  height={profileRef?.current.clientHeight}
                  src={user?.photo}
                  effect='blur'
                  placeholderSrc={PLACEHOLDERIMAGE}
                /> */}
                <img src={user?.photo} className='w-full h-full'  alt="" />
                 </div>
            
                
                }
            
            {user && searchActiveSmall && <FaArrowLeft className={`cursor-pointer ${switchTheme?"text-gray-300":""}`} onClick={() => setSearchActiveSmall(false)} />}
          </div>

          <span className={`flex-auto rounded-md flex items-center ${switchTheme ? 'bg-gray-700' : 'bg-gray-100'} px-1 justify-center  mx-2`} >
            <FaSearch className={` text-[#808080] top-[50%] mt-[.2rem]  `} />
            <input ref={searchRefSmall} onChange={
              () => searchUsersSmall()
            }
              onClick={() => {
                setSearchActiveSmall(true)
              }} placeholder='search' className={`w-full ${switchTheme ? 'bg-gray-700 text-gray-200' : 'bg-gray-100'} outline-none  p-2 h-full`} type="text " />
          </span>

          <span className={`${searchActiveSmall ? 'hidden border border-gray-500' : 'block'} ${switchTheme ? "active:bg-gray-700" : "active:bg-gray-100"}`}>
            <Link to={`/messaging`} >
            <span className='relative'>
                <BsFillChatDotsFill className={`text-[1.52rem] ${switchTheme ? "text-gray-300" : "text-gray-500"} `} />
                {
                  (chats?.length > 0 && chats?.filter(chat => chat?.currentSender === chat?.users?.filter(item => item?._id !== user?._id)[0]?._id)?.length > 0
                  )
                    ? <div className="absolute top-[1.2rem] left-[.8rem] rounded-full overflow-hidden  h-[.4rem] w-[.5rem] flex items-center justify-center bg-red-500">
                    <span className='w-full h-full relative flex items-center justify-center '>
                      
                    </span>
                  </div> : ''

                }


              </span>
            </Link>
          </span>
        </>}
      </div>


      {/* dextop and above */}
      <div className='w-full h-full text-gray-500 relative items-center hidden md:flex'>

        <button onClick={() => {
          handleSwitch()
        }} className='absolute top-4 md:right-[-1rem] lg:right-[-2rem] outline-none hidden md:block z-[800] '>
          {
            switchTheme ? <BsFillSunFill className='text-[1.6rem] hover:scale-75 duration-300 text-gray-300' /> : <BsFillMoonFill className='text-[1.6rem] hover:scale-75 duration-300   text-gray-500' />
          }

        </button>

        <div className='w-[80%] h-full flex items-center lg:justify-between'>


          <span className=" h-full  hidden mr-[2.5rem] lg:flex relative items-center">
            <AiFillLinkedin className='text-[2.7rem] text-blue-500' />
            <div className={`py-2 z-[1200] `}>
              <span className={`w-[15rem] ${searchActive ? 'border border-gray-600' : ''} ${switchTheme ? 'bg-gray-700' : 'bg-gray-200 '} rounded-sm overflow-hidden ml-1 flex items-center justify-start h-ful px-2 flex items-center`}>
                <FaSearch className={`text-[1rem]  ${switchTheme ? 'text-gray-300' : 'text-gray-700 '}   mr-2`} />
                <input onClick={handleSearchActive} placeholder='search' ref={searchRef} onChange={searchUsers} type="text" className={`w-full outline-none ${switchTheme ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-600 '} text-[1rem] py-1 `} />
              </span>
              {
                searchResults?.length > 0 &&
                <div className={`absolute ${searchActive ? 'block' : 'hidden'} p-[1rem] ${switchTheme ? 'bg-gray-800' : 'bg-gray-100'}  left-0 w-[30rem] h-[max-content] bg-white top-[3.8rem] rounded-lg`}>

                  {
                    searchResults?.map((item) => {
                      return <PeopleCardF key={item?._id} searchActive={searchActive} user={item} PF={PF} setSearchActive={setSearchActive} />
                    })
                  }

                </div>
              }
            </div>

          </span>




          <div className=' w-full flex text-[1.6rem] h-full   items-center justify-around  '>
            <AiFillLinkedin className='text-[2.7rem] lg:hidden text-blue-500' />
            {
              !searchInputVisible && <FaSearch onClick={handleSearchActive} className='text-[1.3rem] lg:hidden' />
            }

            {
              searchInputVisible && <div className={`py-2 z-[1200] lg:hidden `}>
                <span className={`w-[15rem] ${searchActive ? 'border border-gray-600' : ''} ${switchTheme ? 'bg-gray-700' : 'bg-gray-200 '} rounded-sm overflow-hidden ml-1 flex items-center justify-start h-ful px-2 flex items-center`}>
                  <FaSearch className={`text-[1rem]  ${switchTheme ? 'text-gray-300' : 'text-gray-700 '}   mr-2`} />
                  <input onClick={handleSearchActive} ref={searchRef2} onChange={searchUser2} type="text" className={`w-full outline-none ${switchTheme ? 'bg-gray-700 text-gray-200' : 'text-gray-600 bg-gray-200 '}  text-[1rem] py-1`} />
                </span>
                {
                  searchResults?.length > 0 &&
                  <div className={`absolute ${searchActive ? 'block' : 'hidden'} p-[1rem] ${switchTheme ? 'bg-gray-800' : 'bg-gray-100'}  left-[4rem] w-[30rem] h-[max-content] bg-white top-[3.8rem] rounded-lg`}>

                    {
                      searchResults?.map((item) => {
                        return <PeopleCardF key={item?._id} searchActive={searchActive} user={item} PF={PF} setSearchActive={setSearchActive} />
                      })
                    }

                  </div>
                }
              </div>
            }

            {/* link to home */}

            <Link to='/'>
              <span className={`relative cursor-pointer duration-100 h-[3.1rem] hover:text-gray-700 hover:border-b-[.3rem] ${switchTheme ? "border-b-gray-300 text-gray-300" : "border-b-gray-700"} flex flex-col items-center justidy-center`}><MdHome className={`text-[1.52rem] ${switchTheme ? "text-gray-200" : ""} `} />
                <div className="absolute top-[.1rem] right-[-.2rem] rounded-full overflow-hidden w-[1rem] h-[1rem] bg-red-500">
                  <span className='w-full h-full relative flex items-center justify-center '>
                    <span className="w-[.4rem] rounded-full overflow-hidden bg-white h-[.4rem]"></span>
                  </span>
                </div>
                <p className='text-sm'>Home</p>
              </span>
            </Link>



            {/* link to my network? */}
            <Link to='/my-network'>
              <span className={`cursor-pointer ${switchTheme ? "border-b-gray-300 text-gray-300" : "border-b-gray-700"} duration-100 h-[3.1rem] hover:text-gray-700 hover:border-b-[.3rem]  flex flex-col items-center justidy-center`}>
                <span className='relative'>
                  <BsFillPeopleFill className={`text-[1.52rem] ${switchTheme ? "text-gray-300" : ""} `} />
                  {
                    (pendingConnections?.length < 1) ? '' :

                      <div className="absolute top-[.1rem] right-[-.8rem] rounded-full overflow-hidden  h-[1.3rem] w-[1.4rem] flex items-center justify-center bg-red-500">
                        <span className='w-full h-full relative flex items-center justify-center '>
                          <span className='text-white text-[.7rem]'>
                          {  
                              pendingConnections.filter(connection => connection?.pending === true).length > 50 ?
                              '50+':
                              pendingConnections.filter(connection => connection?.pending === true).length
                            }
                          </span>
                        </span>
                      </div>
                  }
                </span>
                <p className='text-sm'>My Network</p>
              </span>
            </Link>



            {/* link to Jobs */}
            <Link to='/jobs'>
              <span className={`relative h-[3.1rem] hover:text-gray-700 ${switchTheme ? "border-b-gray-300 text-gray-300" : "border-b-gray-700"} border-b-gray-700  flex flex-col items-center justidy-center`}><BsFillBagFill className={`text-[1.5rem] ${switchTheme ? "text-gray-300" : ""} `} />
                <p className='text-sm'>Jobs</p>
              </span>
            </Link>


            {/* link to Messaging */}
            <span onClick={handleClickedAndActiveChatUser} className={`${switchTheme ? "border-b-gray-300 text-gray-300" : "border-b-gray-700"} cursor-pointer duration-100 h-[3.1rem] hover:text-gray-700 hover:border-b-[.3rem]  flex flex-col items-center justidy-center`}>
              <span className='relative'>
                <BsFillChatDotsFill className={`text-[1.5rem] ${switchTheme ? "text-gray-300" : ""} `} />
                {
                  (chats?.length > 0 && chats?.filter(chat => chat?.currentSender === chat?.users?.filter(item => item?._id !== user?._id)[0]?._id)?.length > 0
                  )
                    ? <div className="absolute top-[.1rem] right-[-.8rem] rounded-full overflow-hidden  h-[1.3rem] w-[1.4rem] flex items-center justify-center bg-red-500">
                    <span className='w-full h-full relative flex items-center justify-center '>
                      <span className='text-white text-[.7rem]'>
                          {
                            chats?.filter(chat => chat?.currentSender === chat?.users?.filter(item => item?._id !== user?._id)[0]?._id)?.length > 50?
                            '50+':
                            chats?.filter(chat => chat?.currentSender === chat?.users?.filter(item => item?._id !== user?._id)[0]?._id)?.length
                          }
                      </span>
                    </span>
                  </div> : ''

                }


              </span>
              <p className='text-sm'>Messaging</p>
            </span>



            {/* Linl to Notifications */}
            <Link className={`${searchInputVisible ? "md:hidden lg:block" : ""}`} to='/notifications'>
              <span className={`relative h-[3.1rem] hover:text-gray-700 hover:border-b-[.3rem] ${switchTheme ? "border-b-gray-300 text-gray-300" : "border-b-gray-700"}  flex flex-col items-center justidy-center`}><IoMdNotifications className={`text-[1.52rem] ${switchTheme ? "text-gray-300" : ""} `} />
                <p className='text-sm'>Notifications</p>

              </span>
            </Link>

            {/* Linl to profile */}
            <span onClick={() => handleProfileShow()} className={`relative h-[3.1rem] cursor-pointer   group hover:border-b-[.3rem] border-b-gray-700  flex flex-col items-center justify-center`}>
              <span ref={profilePicRef} className='w-[1.52rem] flex h-[1.52rem]  group-hover:text-gray-700 rounded-full overflow-hidden' >
                {
                //   <LazyLoadImage
                //   width={profilePicRef?.current.clientWidth}
                //   height={profilePicRef?.current.clientHeight}
                //   src={user?.photo}
                //   placeholderSrc={PLACEHOLDERIMAGE}
                // />
                }
                 <img src={user?.photo}  alt="" />
              </span>
              <p className={`${switchTheme ? "text-gray-300" : ""} text-sm flex items-center hidden md:flex`}>Me <AiFillCaretDown /></p>

              {/* profile card */}

              <div className={`w-[19rem] h-[25rem]    overflow-hidden right-[-1.3rem] ${switchTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border shadow-lg border-gray-300'} absolute top-[3.9rem] ${!profileShow ? 'hidden' : 'hidden md:block'}  rounded-l-lg rounded-br-lg`}>
                <div className="w-full h-[9rem] flex-none   flex flex-col">
                  <span className="flex-auto flex px-2 pt-2 ">
                    <div className="w-[4rem] flex-none h-[4rem]  rounded-full mr-1 overflow-hidden">
                      {user &&
                        <LazyLoadImage
                          width={64}
                          height={64}
                          effect='blur'
                          src={user?.photo}
                          placeholderSrc={PLACEHOLDERIMAGE}
                        />
                      }
                    </div>
                    <div className="flex-auto overflow-hidden ">


                      <p className='font-[700] text-[1.2rem]'>  <span className={`font-[600] break-all ${switchTheme ? "text-gray-300" : ""}`}>{user?.firstname + ' ' + user?.lastname}</span></p>
                      <p className={`${switchTheme ? "text-gray-400" : ""} text-[1rem] w-full flex `}>
                        {user?.title ? user?.title : '...'}
                      </p>
                      <p className={`${switchTheme ? "text-gray-400" : ""} text-[1rem] w-full flex `}>
                        {user?.country ? user?.country : '...'}
                      </p>
                    </div>
                  </span>
                  <span className="flex-none h-[2rem] px-2   items-center justify-center w-full">
                    <span onClick={() => navigate(`/linkedin/${user?.username}`)} className={`${switchTheme ? "hover:bg-gray-700" : "hover:bg-blue-100"} border-blue-500  text-blue-600 hover:border-blue-700  w-full flex items-center justify-center border text-[.9rem] rounded-lg px-1 overflow-hidden`}>
                      View profile
                    </span>
                  </span>
                </div>

                <div className={`w-full h-[9rem] flex-none text-[.9rem] flex flex-col justify-between ${switchTheme ? "border-b border-gray-500 pb-2" : ""}   px-2 `}>
                  <p className={`${switchTheme ? "text-gray-300" : ""} font-[600] text-[1.3rem]`}>Account</p>
                  <span className='flex items-center justify-start'>
                    <FaSquare className='text-[.9rem] text-[gold] mr-2' />
                    <p className='text-[1.1rem] text-gray-500 hover:text-blue-500'>Try Premium for free</p>
                  </span>
                  <p className='text-gray-400 hover:underline'>Settings & privacy</p>
                  <p className='text-gray-400 hover:underline'>Help</p>
                  <p className='text-gray-400 hover:underline'>Language</p>
                </div>

                <div className={`w-full h-[5rem] flex-none px-2 ${switchTheme ? "border-b border-gray-500 pb-2" : ""}  flex flex-col justify-between  border-b text-[.9rem]`}>
                  <p className={`${switchTheme ? "text-gray-300" : ""} font-[600] text-[1.3rem]`}>Account</p>
                  <span className='text-gray-400 hover:underline'>Help</span>
                  <span className='text-gray-400 hover:underline'>Language</span>
                </div>
                <div className="w-full px-2   flex h-[2rem] items-center  text-[.9rem]">
                  <button onClick={handleLogout} className={`${switchTheme ? "text-gray-300" : ""} font-[600] hover:underline`}>Sign Out</button>
                </div>
              </div>



            </span>


          </div>
        </div>
        <div className={`${switchTheme ? "text-gray-300 border-gray-900" : "border-gray-300"} w-[15%] cursor-pointer border-l  h-full pl-3 flex items-center justify-between`}><TbGridDots className='text-[1.6rem]' /><span className='text-sm'><p className='underline'>Get Hired Faster</p> <p className='underline'>Try Premium</p></span></div>
      </div>
    </div>
  </div>

}

export default NavBar;