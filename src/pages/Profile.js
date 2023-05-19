import React from 'react'
import Me from '../images/a.jpeg'
import { AiFillEye } from 'react-icons/ai'
import { BsPencilFill, BsEnvelope, BsThreeDots, BsLinkedin, BsFillInfoCircleFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { GrKey } from 'react-icons/gr'
import {Link,useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {axiosFetch} from '../utils/axiosFetch'
import {useUserContext} from '../hooks/useUserContext'
import {useUsersContext} from '../hooks/useUsersContext'
import NavBar from '../components/NavBar'
import {AiFillLock} from 'react-icons/ai'
import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import BACKGROUND from '../images/bak.png'
import {SyncLoader} from 'react-spinners'
import FootBar from '../components/FootBar'
import {RiUserUnfollowFill, RiUserFollowFill} from 'react-icons/ri'
import {MdCancel} from 'react-icons/md'
import {AiOutlineStop} from 'react-icons/ai'
import {useConnectionContext} from '../hooks/useConnectionContext'
import {useChatContext} from '../hooks/useChatContext'
import {useThemeContext} from '../hooks/useThemeContext'
import {BsFillMoonFill,BsFillSunFill} from 'react-icons/bs'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import {useRef} from 'react'




function Profile() {
     const {username} = useParams()
     const [profile,setProfile] = useState('')
     const {user,dispatch:userDispatch} = useUserContext()
     const { dispatch:usersDispatch}  = useUsersContext()
     const navigate = useNavigate('/')
     const [searchActiveSmall, setSearchActiveSmall] = useState(false)
     const [options,setOptions] = useState(false)
     const [loading,setLoading] = useState(false)
     const [seeComplete, setSeeComplete] = useState(false)
     const {connections, pendingConnections, setConnections, setPendingConnections,pendingSentConnections,setPendingSentConnections} = useConnectionContext()
     const [loading1,setLoading1] = useState(false)
     const [loading2,setLoading2] = useState(false)
     const [loading3,setLoading3] = useState(false)
     const [loading4,setLoading4] = useState(false)
     const {chats,dispatch:chatDispatch} = useChatContext() 
     const {switchTheme,setSwitchTheme} = useThemeContext()
     const [connectionCount,setConnectionCount] = useState('')
     const profilePicRef1 = useRef('')
     const profilePicRef2 = useRef('')


     const [buttonConnectDisable, setButtonConnectDisable] = useState(false)
     
     const config = useMemo(() => ({
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.access}`
        }
      }), [user?.access])

      useEffect(()=>{
          if(profile?.connections && (profile?.connections?.length > 1)){
              return setConnectionCount(`${profile?.connections?.length} connections`)
          }
          else{
            return setConnectionCount(`${profile?.connections?.length} connection`)
          }

      },[profile])

      
      const handleEnterChat = async(id) => {
        if(user?.access && profile?._id && chats){
         try{
           const {data} = await axiosFetch.post('chat', {userId:profile?._id}, config)
           const check = await chats?.filter(item=> {
               return item?._id === data[0]?._id
           })
           if(check?.length > 0){
              return navigate(`/messaging/${profile?.username}`)        
           }
           chatDispatch({
               type:'ADD_CHAT',
               payload:data[0]
           })
           return navigate(`/messaging/${profile?.username}`)           
           
         }catch(error){
           console.log(error)
         }
        }
        
     
     }


     useEffect(()=>{
        const getUserInfo = async() =>{
            if(username && user?.access){
                try{
                const {data} = await axiosFetch.get(`user/profile/${username}`,config) 
                setProfile(data.user)
                }catch(error){
                   console.log(error)
                }
            }
        }
        getUserInfo()
     },[username,user,config,profile?._id,user?.access])

    
     const handleFollowAndUnFollowUser = async () => {
        setLoading(true)
        try {
          if (user?.access && profile?._id) {
            const { data } = await axiosFetch.post(`connection/followAndUnfollowUser/${profile?._id}`, {}, config)
            const {following, ...others} = user
            const newData = {following:data?.follower?.following, ...others}
                userDispatch({
                    type:'GET_USER',
                    payload: newData
                })
            setLoading(false)
            setOptions(false)
          }
        } catch (error) {
          setLoading(false)
          setOptions(false)
          console.log(error)
        }
      }

     

     const handleConnect = async() => {
        if(user?.access && profile){
            try{
            const {data} = await axiosFetch.post(`connection/createConnection/${profile._id}`, {}, config)
            usersDispatch({
                type:'UPDATE_USERS',
                payload:data[1],
            })
            const {connections,pendingIncommingConnections,pendingSentConnections} = data[0]
            userDispatch({
                type:'UPDATE_USER',
                payload:{connections,pendingIncommingConnections,pendingSentConnections}
            })
            setPendingSentConnections(prev=>[data[2],...prev])
            console.log()
            setButtonConnectDisable(true)
            setOptions(false)
            }catch(error){
               console.log(error)
               setOptions(false)
            }
        }

       
      

     }
     const handleAcceptConnection = async () => {
        if (user?.access && connections && pendingConnections?.length > 0) {
            try {
                setLoading1(true)
                const { data } = await axiosFetch.post(`connection/acceptConnection/${profile?._id}`, {}, config)
                const { connections:conn, pendingIncommingConnections, pendingSentConnections } = data[1]

                userDispatch({
                    type: 'UPDATE_USER',
                    payload: { connections:conn, pendingIncommingConnections, pendingSentConnections }
                })
                
                setConnections(prev=>[data[2],...prev])

                const newPendingConnections = pendingConnections?.filter(connection => connection?.sender?._id !==
                    data[2]?.sender
                )
                console.log(newPendingConnections)
                console.log(data[2])

                setPendingConnections(newPendingConnections)
                setLoading1(false)
                setOptions(false)
            } catch (error) {
                setLoading1(false)
                setOptions(false)
                console.log(error)
            }
        }

    }

    const handleRejectConnection = async () => {
        if (user?.access && connections && pendingConnections) {

            try {
                setLoading2(true)
                const { data } = await axiosFetch.post(`connection/rejectConnection/${profile?._id}`, {}, config)
                const { connections, pendingIncommingConnections, pendingSentConnections } = data[1]


                userDispatch({
                    type: 'UPDATE_USER',
                    payload: { connections, pendingIncommingConnections, pendingSentConnections }
                })
                
                const newPendingConnections = pendingConnections?.filter(connection => connection?.sender?._id !==
                    data[2]?.sender
                )

                setPendingConnections(newPendingConnections)

                setLoading2(false)
                setOptions(false)
            } catch (error) {
                setLoading2(false)
                console.log(error)
                setOptions(false)
            }
        }




    }

    const cancelSentConnection = async() => {
        if (user?.access && connections && pendingConnections && profile?._id) {
            console.log('alpha')
 
             try {
                 setLoading3(true)
                 const { data } = await axiosFetch.post(`connection/cancelSentConnection/${profile?._id}`, {}, config)
                 const { connections, pendingIncommingConnections, pendingSentConnections:pendingSent } = data[0]
 
 
                 userDispatch({
                     type: 'UPDATE_USER',
                     payload: { connections, pendingIncommingConnections, pendingSentConnections:pendingSent }
                 })
                 const newPendingSentConnections = pendingSentConnections?.filter(connection=>{
                    return connection?._id !== data[2]?._id
                 })
                  setPendingSentConnections(newPendingSentConnections)
                 setLoading3(false)
                 setOptions(false)
             } catch (error) {
                 setLoading3(false)
                 console.log(error)
                 setOptions(false)
             }
         }
     }

     const handleRemoveConnection = async() => {
        if (user?.access && connections && profile?._id) {
             try {
                 setLoading4(true)
                 const { data } = await axiosFetch.post(`connection/removeConnection/${profile?._id}`, {}, config)
                 const { connections, pendingIncommingConnections, pendingSentConnections } = data[0]

                 userDispatch({
                     type: 'UPDATE_USER',
                     payload: { connections, pendingIncommingConnections, pendingSentConnections }
                 })

                 const connect = connections?.filter(connection=> (connection?.users?.filter(item=>item?._id === data[1]?._id)?.length < 0))
                 setConnections(connect)
                 setLoading4(false)
                 setOptions(false)
             } catch (error) {
                 setLoading4(false)
                 console.log(error)
                 setOptions(false)
             }
         }

     }


     
const handleLogout = async() => {
    try{
       await axiosFetch.post('auth/logout', {username:user?.username})
       userDispatch({
         type:"LOG_OUT",
         payload:{access:""}
       })
       sessionStorage.setItem('ongoing-registration-user', '')
       navigate('/login')     
    }catch(error){
      console.log(error)
    }
}

const handleSwitch = () => {
    setSwitchTheme(!switchTheme)
    localStorage.setItem('switchTheme', JSON.stringify({ switchTheme: !switchTheme }))
  }
 

     
    return profile ? (
        <div className="w-full h-full relative overflow-auto">
            <button onClick={handleSwitch} className='absolute top-[8.9rem] right-[1rem] outline-none  md:hidden z-[1000] '>
                {
                  switchTheme ? <BsFillSunFill className={`${searchActiveSmall?"hidden":""} text-[1.5rem] hover:scale-75 duration-300 text-gray-300` }/> : <BsFillMoonFill className={`${searchActiveSmall?"hidden":""}  text-[1.5rem] hover:scale-75 duration-300   text-gray-700`} />
                }
            </button>
            <NavBar searchActiveSmall={searchActiveSmall} setSearchActiveSmall={setSearchActiveSmall}/>
            <div className={`container ${searchActiveSmall?'hidden':''}   mx-auto`}>         
            <div className='w-full h-[max-content] md:pt-7  md:px-[4.5rem] flex  flex-col md:flex-row ' >
                <div className="flex flex-col sm:mr-5  md:w-[calc(100%-20rem)]">
                    <div className={`sm:rounded-lg  mb-2 ${switchTheme?'bg-gray-800':'bg-white border-gray-300 border'}   `}>
                        <div style={{
                             backgroundImage:`url(${BACKGROUND})`,
                            
                            }} className=" relative bg-blue-900   h-[5rem] md:h-[12rem]">
                            <div ref={profilePicRef1} className="absolute  top-[2.2rem] left-[3.5rem] md:top-[5rem] md:left-[6rem] translate-x-[-50%] md:h-[10rem] md:w-[10rem] w-[6rem] border-2 h-[6rem] overflow-hidden rounded-full">
                           { <LazyLoadImage
                        width={profilePicRef1?.current?.clientWidth}
                        height={profilePicRef1?.current?.clientHeight}
                        src={profile?.photo}
                        effect='blur'
                        placeholderSrc={PLACEHOLDERIMAGE}/>
                        
                           }
                            </div>
                        </div>

                        <div className="px-3 w-full ">
                            <span className='leading-5 mt-[3rem] block'>
                                <h1 className={`text-2xl ${switchTheme?'text-gray-300':''} font-[600]` }>{profile?.firstname + " " + profile?.lastname}</h1>
                                <span className={` ${switchTheme?'text-gray-400':''}`}>{profile?.title}</span>
                            </span>
                            <span className='leading-6 text-gray-500 mt-1 block'>
                                <h1>{`${profile?.education?profile?.education:''}`}</h1>
                                <span>{`${profile?.country?profile?.country:''}`}</span>
                            </span>

                            <span className='mt-1 block mb-2 font-[600] text-blue-500'>{connectionCount}</span>
                        </div>

                        <div className="w-full px-3 mt-2 flex justify-between items-center md:justify-start pb-2 ">

                            {
                                user && <>
                                  {
                                      profile?._id === user?._id ? <>
                                      <span className="rounded-full cursor-not-allowed w-[50%] md:w-[max-content]  flex items-center justify-center mr-2 overflow-hidden bg-blue-700 text-white px-2 py-1">
                                  open to
                                 </span>
                                <span className={`rounded-full cursor-not-allowed flex w-[50%] md:w-[max-content]  flex items-center justify-center  overflow-hidden border border-blue-500 flex items-center ${switchTheme?"text-gray-300":"text-gray-500"} px-2 py-1`}>
                                 Add to Section
                                </span>
                                      </>: <>
                                
                                {
                                    user?.connections?.includes(profile?._id) ? '':
                                 <div className='w-full md:w-[max-content] mr-2 md:mr-0 '>

                                      {user?.pendingSentConnections?.includes(profile?._id) ?
                                       <span disabled={buttonConnectDisable} onClick={handleConnect} className={`rounded-full ${switchTheme?"bg-gray-700 text-gray-400":"bg-gray-200 text-gray-500"} py-2 font-[600] cursor-pointer w-full md:w-[max-content]  flex items-center justify-center mr-2 overflow-hidden  px-2 py-1`}>
                                           pending
                                       </span>:
                                        user?.pendingIncommingConnections?.includes(profile?._id)?
                                         <span disabled={buttonConnectDisable} onClick={()=>navigate('/my-network')} className={`rounded-full py-2  font-[600] cursor-pointer w-full md:w-[max-content]  flex items-center justify-center mr-2 overflow-hidden bg-blue-700 text-white px-2 py-1`}>
                                           pending
                                        </span>:
                                      <span disabled={buttonConnectDisable} onClick={handleConnect} className="rounded-full font-[600] cursor-pointer  py-2  md:w-[max-content] w-full  flex items-center justify-center mr-2 overflow-hidden bg-blue-700 text-white px-2 py-1">
                                           connect
                                      </span>}
                                 
                                 </div> 

                                }

                                <button disabled={!profile?.connections?.includes(user?._id)} className={`rounded-full  w-full  cursor-pointer font-[600] py-2 hover:border flex  md:w-[max-content]  flex items-center justify-center  overflow-hidden border border-blue-500 flex items-center text-gray-500 px-2 py-1
                                 ${profile?.connections?.includes(user?._id)?"":'cursor-not-allowed'}
                                
                                `}>
                               {(!profile?.connections?.includes(user?._id)) ? <> Message <AiFillLock className='text-blue-500'/></> :<span className='w-full h-full' onClick={()=>handleEnterChat(profile?._id)}>Message</span>}
                                </button>
                                      </>
                                  }
                                </>
                            }
                            <span  className='cursor-pointer relative   '>
                               {
                                   options? 
                                   <span className={` w-[18rem] flex flex-col right-[2rem]  py-4 justify-center  absolute top-[2.8rem] md:right-[-14rem] font-[600]  rounded-md ${switchTheme?"text-gray-300 shadow-md bg-gray-700":"text-gray-500   shadow-md bg-gray-100"} `}>
     
                                   {
                                       user?.pendingSentConnections?.includes(profile?._id) &&
                                       <button disabled={loading3} onClick={cancelSentConnection}  className={` ${switchTheme?"hover:bg-gray-600 text-gray-300":""} block flex py-2 px-3 hover:bg-gray-200 w-full items-center justify-start`} >
                                   <p>Cancel sent connection</p>
                                   <AiOutlineStop className='ml-1'/>
                                  </button>
                                   }

{
                                       user?.pendingIncommingConnections?.includes(profile?._id) &&
                                       <>
                                       <button disabled={loading1} onClick={()=>handleRejectConnection()}  className={`block ${switchTheme?"hover:bg-gray-600 text-gray-300":""} flex py-2 px-3 hover:bg-gray-200 w-full items-center justify-start`} >
                                   Reject incomming Connection
                                   <AiOutlineStop className='ml-1'/>
                                  </button>
                                       

                                  <button disbled={loading2} onClick={()=>handleAcceptConnection()}  className={`${switchTheme?"hover:bg-gray-600 text-gray-300":""} block flex py-2 px-3 hover:bg-gray-200 w-full items-center justify-start`} >
                                   Accept incomming Connection
                                   <AiOutlineStop className='ml-1'/>
                                  </button>
                                       </>
                                   }

                                {
                                    user?.connections?.includes(profile?._id) &&
                                    <button disabled={loading4} onClick={handleRemoveConnection} className={` ${switchTheme?"hover:bg-gray-600 text-gray-300":""}block flex  py-2 px-3 hover:bg-gray-200 w-full items-center justify-start`}>
                                    Remove connection
                                    <MdCancel className='ml-1'/>
                                </button>
                                }
                                   
                                   <button  disabled={loading} onClick={handleFollowAndUnFollowUser} className="">
                                   {
                                       user?.following?.filter(item=>item?._id === profile?._id)?.length > 0?
                                   <span className={`${switchTheme?"hover:bg-gray-600 text-gray-300":""} flex items-center px-3 block py-2 hover:bg-gray-200 w-full justify-star`} >
                                       Unfollow
                                       <RiUserUnfollowFill className='ml-1'/>
                                   </span>: <span className={`${switchTheme?"hover:bg-gray-600 text-gray-300":""} flex px-3  py-2 hover:bg-gray-200 w-full items-center justify-start`} >
                                       Follow 
                                      <RiUserFollowFill className='ml-1'/>
                                   </span>
                                   }
                                   
                              </button>
                                   </span>
                                  :''                  
                              
                               }
                              {
                                  user?._id !== profile?._id &&
                                   <> 
                                    <BsThreeDots onClick={()=>setOptions(!options)} className={`${switchTheme?"text-gray-300 hover:bg-gray-700":" hover:bg-gray-200"} rounded-full md:hidden ml-2  overflow-hidden p-2 text-4xl`}/>
                            <div onClick={()=>setOptions(!options)} className={`${switchTheme?"text-gray-300":"hover:bg-gray-100"} hidden md:block px-2 py-1  rounded-full border border-gray-500 ml-2 cursor-pointer`}>More</div>
                                   
                                   </>
                              }
                            </span>
                            <span>

                            </span>
                        </div>

                        <div className={"w-full px-3    pb-2 mb-2"}>
                            <div className={`w-full  px-3 rounded-md  ${switchTheme?'bg-gray-700 text-black ':'bg-gray-300 border text-gray-500 rounded-md border-gray-300'}  mt-3`}>
                                <span className=''>
                                    <p className={`font-[500]  ${switchTheme?'text-gray-300':'text-gray-600'}`}>Open to Job opportunities</p>
                                    <p className={`${switchTheme?"text-gray-400":""} break-all`}>React Develper, Front End Developer and Full stack Developer roles</p>

                                </span>
                                <span className={`${switchTheme?"text-gray-400":""} flex items-center`}>
                                    <AiFillEye className='mr-2 etext-gray-400' />
                                    All Linkedin members
                                </span>
                            </div>
                        </div>

                    </div>

                    <div  className={`w-full px-3  py-3  sm:rounded-lg mb-2 overflow-hidden ${switchTheme?'bg-gray-800 text-gray-300 ':'text-gray-600 bg-white'}  mb-2 `}>
                        <div className='flex justify-between cursor-not-allowed '>
                            <span className=' font-[700] text-lg'>About </span>
                            <BsPencilFill className={`${switchTheme?'text-gray-300':'text-gray-500'}`} />
                        </div>
                        <span onClick={()=>setSeeComplete(!seeComplete)}  className={`break-all ${switchTheme?'text-gray-400':'text-gray-600'} font-[400]  ${seeComplete?'':'elip2'} `}>
                           {
                               `My name is ${profile?.firstname + " " + profile?.lastname}. I am a ${profile?.title}`
                           } 
                        </span>

                    </div>

                    <div className={`w-full  mb-2 ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 bg-white border-gray-300 border'}  py-3 sm:rounded-lg  mb-2 overflow-hidden  px-3`}>
                        <h1 className={`font-[600] ${switchTheme?'text-gray-300':'text-gray-600'} text-lg`}>Feautured</h1>
                        <span className={` ${switchTheme?"text-gray-400":"text-gray-500"} `}>Add external documents, photos and links</span>
                        <span className='flex cursor-not-allowed items-center text-blue-500'><FaPlus className='mr-2' />  Add feautred</span>
                    </div>

                    <div className={`w-full ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 border-gray-300 border'} mb-2 px-3  py-3 sm:rounded-lg bg-white mb-2 overflow-hidden  `}>
                        <span className='italic txt-gray-400'>Private to you</span>
                        <div className="w-full flex items-center justify-between">
                            <div>
                                <h1 className='text-blue-600 font-[600] text-lg'>98 </h1>
                                <span className={` ${switchTheme?"text-gray-400":"text-gray-500"} `}>who's viewed your profile</span>
                            </div>
                            <div>
                                <h1 className='text-blue-600 font-[600] text-lg'>8</h1>
                                <span className='text-sm text-gray-400' >Search appearances</span>
                            </div>
                        </div>


                    </div>


                    <div className={`${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 bg-white border-gray-300 border'} mb-2 w-full px-2 sm:rounded-lg  mb-2 overflow-hidden `}>
                        <h1 className='text-blue-600 font-[600] text-lg'>Activity</h1>
                        <span className='text-sm text-gray-400'>541 followers</span>

                        <div className="flex">
                            <div className="flex-none w-[4rem] h-[4rem]  ">
                                <img src={Me} alt="" className="w-full h-full" />
                            </div>
                            <div className="flex-auto py-2 pl-2 ">
                                <h1 className={`elip2 ${switchTheme?"text-gray-400":""} text-gray-500 font-[500]`}>Could anything be more convenient than cash?
                                    What an awkward moment y'all.Such a great time it was making good drinks
                                </h1>
                                <span className='text-sm text-gray-400'>You liked this</span>
                            </div>


                        </div>

                        <div className="justify-center cursor-pointer flex font-[400] text-blue w-full justify-center">
                            see all
                        </div>
                    </div>

                    <div className={`w-full ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 bg-white border-gray-300 border'} mb-2 px-2  py-3 sm:rounded-lg  mb-2 overflow-hidden`}>
                        <h1 className={`font-[600] ${switchTheme?'text-gray-300':'text-gray-600'}  text-lg mb-2`}>Experience</h1>
                        <span className='flex items-center cursor-not-allowed  text-blue-500'><FaPlus className='mr-2' />  Add feautred</span>
                    </div>


                    <div className={`w-full px-2 pt-1 ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 bg-white border-gray-300 border'} mb-2 sm:rounded-lg  mb-2 overflow-hidden `}>
                        <span className="flex justify-between">
                            <h1 className={`font-[600]  ${switchTheme?'text-gray-300':'text-gray-600'} text-lg`}>Education</h1>
                            <BsPencilFill className={`${switchTheme?'text-gray-300':'text-gray-500'}`} />
                        </span>
                        <div className="flex">
                            <div className="flex-none w-[4rem] h-[4rem]  ">
                                <img src={Me} alt="" className="w-full h-full" />
                            </div>
                            <div className={`flex-auto  ${switchTheme?'text-gray-400':'text-gray-600'}   flex jusify-start flex-col pl-2 `}>
                                <h1>University of Nigeria, Nsukka</h1>
                                <span>Bachelor of Applied Science - BASC</span>
                                <span>Computer Science</span>
                                <span>April 2018 - Nov 2022</span>
                            </div>


                        </div>

                    </div>

                    <div className={`w-full flex pt-2 ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 bg-white border-gray-300 border'} flex-col text-gray-500  mb-2 items-center justify-center px-2 sm:rounded-lg  mb-2 overflow-hidden `}>
                        <div className="w-[3rem] h-[3rem] ">
                            <img src={Me} className='w-full h-full' alt="" />
                        </div>
                        <h1>Have more Education?</h1>
                        <p>Add yout degree and college, get 11x more profile views.</p>
                        <p>Connect with your college mates</p>
                        <span className='rounded-full w-full text-center mb-2 p-2 border border-blue-400 cursor-pointer font-[500] text-blue-500'>Add Education</span>
                    </div>

                    <div className={`w-full  ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 bg-white border-gray-300 border'}  py-3 px-2 sm:rounded-lg  mb-2 overflow-hidden `}>
                        <h1 className={`font-[600] ${switchTheme?'text-gray-300':'text-gray-600'} text-lg mb-2`}>Volunteer Experience</h1>
                        <span className='flex items-center cursor-not-allowed  text-blue-500'><FaPlus className='mr-2' />Add volunteering</span>
                    </div>

                    <div className={`w-full break-all mb-2 flex ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 bg-white border-gray-300 border'} text-gray-500 py-3 flex-wrap leading-6 px-2 font-[500] sm:rounded-lg  mb-2 overflow-hidden `}>
                        <div className='mr-2'>Cascading Style Sheets(CSS)</div>
                        <div className='mr-2'> Project Management</div>
                        <div className='mr-2'>Front End Development</div>
                        <div className='mr-2'>Communication</div>
                        <div className='mr-2'>Analytic Skills</div>
                        <div className='mr-2'>Design</div>
                        <div className='mr-2'>Problem solving</div>
                        <div className="">See more </div>
                    </div>



                    <div className={`w-full  ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 border-gray-300 border'} bg-white mb-2  py-3 px-2 sm:rounded-lg mb-2 overflow-hidden `}>
                        <h1 className={`font-[600] ${switchTheme?'text-gray-300':'text-gray-600'} text-lg mb-2`}>Recommendations</h1>
                        <span className='flex items-center cursor-not-allowed text-blue-500'><FaPlus className='mr-2' />Ask to be Recommended</span>
                    </div>

                    <div className={`w-full ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 bg-white border-gray-300 border'} mb-2  py-3 px-2 sm:rounded-lg  mb-2 overflow-hidden `}>
                    <h1 className={`font-[600] ${switchTheme?'text-gray-300':'text-gray-600'} text-lg mb-2`}>Accomplishments</h1>
                        <span className='flex items-center cursor-not-allowed text-blue-500'><FaPlus className='mr-2' />Add Accomplishments</span>
                    </div>

                    <div className={`w-full flex mb-[3.5rem] md:mb-2  ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 bg-white border-gray-300 border'}  flex-col  py-3 sm:rounded-lg mb-2 overflow-hidden `}>
                        <span className="w-full font-[600] text-gray-600 text-lg flex items-center justify-between px-2 mb-2">
                            <span className={` ${switchTheme?'text-gray-300':'text-gray-600'}`}>Context</span>
                            <BsPencilFill className={`${switchTheme?'text-gray-300':'text-gray-500'} cursor-pointer`} />
                        </span>
                        <div className="w-full flex ">
                            <div className="flex-none h-[3rem] w-[3rem] flex items-start justify-center">
                            <BsEnvelope className={`${switchTheme?'text-gray-300':'text-gray-500'}`} />
                            </div>
                            <div className="flex-auto">
                                <h1>Email</h1>
                                <span className=' text-blue-500 break-all'>{profile?.email}</span>
                            </div>
                        </div>
                        <div className="w-full flex ">
                            <div className="flex-none h-[3rem] w-[3rem] flex items-start justify-center">
                            <BsLinkedin className={`${switchTheme?'text-gray-300':'text-gray-500'}`} />
                            </div>
                            <div className="flex-auto">
                                <h1>Linkedn</h1>
                                <span className=' text-blue-500 break-all'>{`https://wwww.Linkedin.com/in/${profile?.username}`}</span>
                            </div>
                        </div>
                        
                    <div className='w-full md:hidden flex items-end justify-end h-[4rem] px-3 '>
                             <span className={`bg-blue-500 text-white hover:bg-gray-400 rounded-md cursor-pointer p-2`} onClick={handleLogout}>Logout</span>
                    </div>

                        
                    </div>



                    




                </div>

                <div className='sm:w-[20rem]     w-full hidden md:block'>
                    <div className={`md:rounded-lg  ${switchTheme?'bg-gray-800 text-gray-400 ':'text-gray-600 border-gray-300 bg-white border'}  overflow-hidden `}>
                        <div className='flex items-center justify-between p-3 '>
                            <Link to='#'>
                            <span className={`font-[500] text-gray-500  ${switchTheme?'text-gray-300':'text-gray-600'} hover:underline cursor-pointer`}>Edit  public profile & url</span>
                            </Link>
                            <BsFillInfoCircleFill className='text-gray-400' />
                        </div>
                       <hr className='mb-2' />
                        <div className='flex items-center  justify-between p-3'>
                            <Link to='#'>
                            <span className='font-[500] text-gray-500 hover:underline'>Add profile in another language</span>
                            </Link>
                            <BsFillInfoCircleFill className='text-gray-400' />
                        </div>
                    </div>

                    <div className={`h-[max-content] ${user?._id !== profile?._id?"hidden":""} py-2 mt-3 rounded-lg overflow-hidden ${switchTheme?'bg-gray-800 text-gray-500 ':'text-gray-600 bg-white border-gray-300 border'}  flex flex-col  w-full`}>
                        <span className="  flex justify-end  px-2 items-center ">
                            Ad <BsThreeDots className='ml-2 hover:bg-gray-200 rounded-full p-2 text-3xl cursor-pointer' />
                        </span>
                        <span className='text-center px-3 text-sm text-gray-400'>
                            {profile?.username}, unlock your potential with linkedn Premium
                        </span>
                        <span className="flex-auto px-3 flex flex-col items-center justify-center">
                            <span className='flex  items-center justify-center'>
                                <div ref={profilePicRef2} className="h-[5rem] rounded-full mr-3 overflow-hidden w-[5rem] ">
                                {<LazyLoadImage
                        width={profilePicRef2?.current.clientWidth}
                        height={profilePicRef2?.current.clientHeight}
                        src={profile?.photo}
                        placeholderSrc={PLACEHOLDERIMAGE}/>}
                                </div>
                                <GrKey className='text-[3.5rem] text-blue-200' />
                            </span>
                            <p>See who's viewed your profile in the past 90 days</p>
                            <span className='h-[2.3rem] text-blue-700 rounded-full hover:bg-gray-100 cursor-pointer overflow-hidden px-4 mt-3 bg-white border border-blue-400 flex items-center justify-center'>
                                Try for free
                            </span>
                        </span>

                    </div>


                    

                </div>




            </div >

           


            </div>
            {
        !searchActiveSmall && <FootBar  />
      }
            
        </div>
    ):<div className='w-full h-full flex items-center justify-center'>
        <SyncLoader size={70} color={'gray'}/>
    </div>
}

export default Profile