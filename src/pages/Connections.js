import React from 'react'
import { useState } from 'react'
import NavBar from '../components/NavBar'
import FootBar from '../components/FootBar'
import { useScroller } from '../hooks/useScroller'
import { PeopleCardD } from '../components/PeopleCardD'
import { BiBookOpen } from 'react-icons/bi'
import { BsChevronCompactDown } from 'react-icons/bs'
import { AiFillCaretDown, AiFillLinkedin } from 'react-icons/ai'
import Hiring from '../images/hiring.png'
import { FaSearch } from 'react-icons/fa'
import {useUsersContext} from '../hooks/useUsersContext'
import {MessagePopChatSpace} from '../components/MessagePopChatSpace'
import { axiosFetch } from '../utils/axiosFetch'
import { useUserContext } from '../hooks/useUserContext'
import {useConnectionContext} from '../hooks/useConnectionContext'
import axios from 'axios'
import { useMemo, useRef, useEffect } from 'react'
import { useThemeContext } from '../hooks/useThemeContext'
import {useChatContext} from '../hooks/useChatContext'


const Connections = ({socket}) => {
  const displayNav = useScroller('scroll-network')
  const connections = true
  const [sort,setSort] = useState(false)
  const {PF} = useUsersContext()
  const [chatData,setChatData] = useState(null)
  const [pop,setPop] = useState(false)
  const {user} = useUserContext()
  const {connections:allConnections, setConnections} = useConnectionContext()
  const {switchTheme} = useThemeContext()
  const {chats,dispatch:chatDispatch} = useChatContext()

  const searchRef = useRef('')

  const config2 = useMemo(() => ({
        Accept: 'application/json',
        Authorization: `Bearer ${user?.access}`
    }
), [user?.access])

  const handleEnterChat = async(newChatUser) => {
     if(user?.access && chats && newChatUser){
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.access}`
        }
      }
      try{
        const {data} = await axiosFetch.post('chat', {userId:newChatUser?._id}, config)
         const findChat = chats?.find(chat=>chat?._id === data[0]?._id)
         if(!findChat){
          chatDispatch({
            type:'ADD_CHAT',
            payload:data[0]
        })
      }    
        setChatData(data)
        setPop(true) 
      }catch(error){
        console.log(error)
        setPop(false)
      }
     }
  
  }

  console.log(socket)


  const cardProps = {
    setChatData,setPop,pop,PF,handleEnterChat
  }

  useEffect(()=>{
     const getConnections = async() => {
      if(user?.access){
        try{
          const {data}  = await axiosFetch.get('connection',  {headers:config2})
          setConnections(data)
        }catch(error){
          if(axios.isCancel(error)) return
          console.log(error)
        }
      }
     }
     getConnections()
  },[config2,setConnections,user?.access])


  const searchConnections = async() => {
    if(user?.access){
      try{
        const {data}  = await axiosFetch.get('connection',  {headers:config2, params:{search:searchRef?.current?.value}})
        setConnections(data)
      }catch(error){
        if(axios.isCancel(error)) return
        console.log(error)
      }
    }
  }

  


  return (
    <div id='scroll-network' className="w-full h-full relative overflow-auto">
      <NavBar connections={connections} displayNav={displayNav} />
      <div className="container  mt-1 w-full flex-auto container mx-auto h-full">
        <div className={` w-full h-full md:pt-6  md:grid md:grid-cols-medium-connections md:gap-4 `}>
          <div className={`${switchTheme?"bg-gray-800":"sm:border-gray-200 sm:border bg-white "} sm:rounded-lg  h-full `}>
            <div className={`${switchTheme?"border-gray-900":""} w-full h border-b p-3 flex flex-col `}>
              <span className={`text-2xl mb-2 ${switchTheme?"text-gray-300":""} `}>522 connections</span>
              <span className={`${switchTheme?'text-gray-400':""}  flex items-center justify-between`}>
                <div className=' items-center hidden md:flex ml-2 mt-2'>Sort by: 
                  <div onClick={()=>setSort(!sort)}  className='flex items-center relative cursor-pointer'>
                  <span className={`mr-2 ml-2`}>Recently Added </span> 
                  <AiFillCaretDown />
                    {
                      sort && <span className="absolute bg-white w-[10rem] rounded-lg border border-gray-200  font-[500] text-gray-500 py-2 top-7">
                      <button  className='px-2 py-1 hover:bg-gray-200 cursor-pointer '>Recently Added</button>
                  </span>
                    }
                  </div>
                </div>

                <div className='flex items-center'>
                  <div className={`${switchTheme?"bg-gray-700 text-gray-300":"border"}  p-2 flex items-center hover:border-gray-700  border-gray-200 rounded-md bg-gray-100`}>
                    <FaSearch className='mr-1' />
                    <input ref={searchRef} onChange={searchConnections} type="text" className={`${switchTheme?"bg-gray-700":""} bg-gray-100 outline-none` }/>
                  </div>
                  <span className='text-blue-500 hidden md:block ml-2 cursor-pointer'>search with filters</span>

                </div>

              </span>

            </div>

            {
             (allConnections && user) && allConnections?.map((connection=>{
               return connection?.users?.map(item=>{
                 return item?._id === user?._id?'':  <PeopleCardD time={connection?.createdAt} key={item._id} {...cardProps} user={item} />
               })
             }))
           }
               
          </div>


          <div className='h-full hidden md:block flex flex-col sticky top-[5rem] h-[45rem]'>

            <span className={`${switchTheme?"text-gray-300":""} flex mb-2 items-center `}>
              <BiBookOpen />
              <p>Manage Synced and imported contacts</p>
            </span>

            <div className={`${switchTheme?"bg-gray-800":"bg-white border border-gray-200"} h-[15rem] flex px-2 flex-col rounded-lg  mb-2 items-center justify-center  w-full`}>
              <p className={`${switchTheme?"text-gray-300":""} break-al mb-2`}>Add to personal contact</p>
              <p className="break-all mb-2 text-[.8rem] text-gray-500">We periodically import and store Contacts
                to help you annd others connect.You choose who to connect to and
                who to invite. <span className='text-blue-600 mb-2 text-md font-[500]'>Learn more</span>
              </p>
              <input type="text" className={`${switchTheme?"bg-gray-700 rounded-md text-gray-300":"border border-gray-400"} w-full mb-2 p-2 `} placeholder={`${user?.email}`} />
              <span className="px-4 py-1 bg-white border cursor-pointer rounded-full overflow-hidden border-blue-500 font-[600] text-blue-600">Continue</span>
              <p className={`${switchTheme?"text-gray-300":"text-gray-500"} cursor-pointer`}>More options</p>

            </div>


            <div className=" hidden md:flex flex-col ">

              <div className={`${switchTheme?"bg-gray-900":"bg-gray-100"} md:rounded-lg overflow-hidden w-full flex flex-col h-[max-content]`}>
                <span className='w-full h-[14rem] bg-white overflow-hidden'>
                  <div className='w-full h-full max-w-[23rem] mx-auto'><img src={Hiring} className='w-full h-full' alt="" /></div>
                </span>

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

      </div>
      {(pop && chatData)? <MessagePopChatSpace socet={socket}  chatData={chatData} PF={PF} setPop={setPop}/>:''}
      <FootBar A />
    </div>

  )
}


export default Connections