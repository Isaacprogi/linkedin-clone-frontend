import React from 'react'
import { BsThreeDots} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useMessageContext } from '../hooks/useMessageContext'
import { useUserContext } from '../hooks/useUserContext'
import {axiosFetch} from '../utils/axiosFetch'
import {useChatContext} from '../hooks/useChatContext'
import {useState,useEffect} from 'react'
import { useThemeContext } from '../hooks/useThemeContext'
import { timeFormatting } from '../utils/timeFormatting'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import {useRef} from 'react'



export const MessageCardSmall =  ({ chat, PF, socket, fetching, setFetching}) => {
  const navigate = useNavigate()
  const { user} = useUserContext()
  const [deleteActive, setDeleteActive] = useState(false)
  const {chats:allChats, dispatch:chatDispatch} = useChatContext()
  const [latestChatTime,setLatestChatTime] = useState('')
  const {dispatch:messageDispatch} = useMessageContext()
  const {switchTheme} = useThemeContext()
  const profilePicRef = useRef('')

  useEffect(()=>{
    setLatestChatTime(timeFormatting(JSON.parse(chat)?.latestMessage?.createdAt))
   },[chat])


  

  const handleClicked = async () => {
    if (user && chat) {
      const chatUser = JSON.parse(chat).users.filter(element => element.username !== user?.username)
      fetchMessages()
      HandleRead()
      socket.emit('join chat', JSON.parse(chat)?._id)
      navigate(`/messaging/d-section/${chatUser[0]?.username}`)
    }
  }


      const fetchMessages = async () => {

          if (chat && user ) {
            
            messageDispatch({
              type:'GET_MESSAGE',
              payload:[],
            })
            const config = {
              headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${user?.access}`
              }
          }
              try {
                  const { data } = await axiosFetch.get(`message/${(JSON.parse(chat)?._id)}`, config)
                  console.log(data)
                  messageDispatch({
                    type:'GET_MESSAGE',
                    payload:data,

                  })
              } catch (error) {
                  console.log(error)
              }
          }
      }

      const HandleRead = async () => {
        if (chat && user && allChats ) {
          const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${user?.access}`
            }
        }

            try {
                const { data } = await axiosFetch.post(`chat/${(JSON.parse(chat)?._id)}`, {}, config)
                const newchatData = allChats?.map((item)=>{
                      if(item?._id === data?._id){
                        return data
                      }else{
                        return item
                      }
                })               
                chatDispatch({
                  type:'UPDATE_CHAT',
                  payload:newchatData,
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

      const handleDelete = async () => {
          if (chat && user && allChats) {
            const config = {
              headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${user?.access}`
              }
          }
              try {
                  const userId = user._id
                  await axiosFetch.delete(`chat/${(JSON.parse(chat)._id)}`, config)
                  socket.emit("chat_delete_request", (JSON.parse(chat)),userId)
                  const newChatData = allChats.filter((element)=>element._id !== JSON.parse(chat)._id)
                  chatDispatch({
                    type:'DELETE_CHAT',
                    payload:newChatData,
                  })
                  setDeleteActive(false)
              } catch (error) {
                  console.log(error)
              }
          }
      }


      useEffect(()=>{
        socket.off("chat_delete_request_recieved").on("chat_delete_request_recieved", (id)=>{
           console.log('hello')
           if(allChats?.length > 0) {
            const newChatData = allChats?.filter((element)=>element?._id !== id)
            chatDispatch({
              type:'DELETE_CHAT',
              payload:newChatData,
            })
             
           }
   
        })
     },[socket,messageDispatch, allChats, navigate,chatDispatch])




      




  return (user && chat)? JSON.parse(chat).users.map(element => element?._id !== user?._id &&
          
    <div key={element?._id}  className={` ${switchTheme?' hover:bg-gray-700 ':' border-b hover:bg-gray-100'}  flex  ${(JSON.parse(chat)?.currentSender === JSON.parse(chat)?.users.filter(item=>item?._id !== user?._id)[0]?._id ?`${switchTheme?"bg-gray-600":"bg-gray-300"} `:'')}  group  cursor-pointer duration-200 items-center justify-between px-2   `}>

      <span onClick={()=>handleClicked(JSON.parse(chat)?._id)} className=' flex-auto overflow-hidden group h-full flex items-center'>
      <span ref={profilePicRef} className='mr-2 w-[3rem] h-[3rem] flex-none overflow-hidden rounded-full'>
      <LazyLoadImage
                    width={profilePicRef?.current?.clientWidth}
                    height={profilePicRef?.current?.clientHeight}
                    effect='blur'
                    src={element?.photo}
                    placeholderSrc={PLACEHOLDERIMAGE}
                  />
        </span>
      <span className='flex-auto  flex flex-col '>
       <p className={`text-sm  max-w-[6rem] ${switchTheme?"text-gray-300 font-[700]":"text-gray-500 font-[700]"}  group-hover:w-[5rem] flex-none flex-1   truncate `}>
          {element?.firstname + ' ' + element?.lastname}
        </p> 

        <p className={`text-sm max-w-[6rem] flex-none flex-1 ${switchTheme?"text-gray-400 ":""}  group-hover:w-[5rem]   truncate `}>
          {JSON.parse(chat)?.latestMessage?.message}    
        </p>
      </span>
      </span>
        <span className=' flex-none relative   flex items-start justify-end   text-[.67rem] h-full  w-[3.7rem]'>
      <p className={`group-hover:hidden ${switchTheme?"text-gray-300 ":""}  absolute mt-5 font-[500] left-5`}>{latestChatTime}</p>
      <span className='hidden group-hover:flex items-start text-[2.2rem] mt-3 text-gray-500'> 
        <BsThreeDots onClick={()=>{
        setDeleteActive(!deleteActive)
        }} className={`mr-2 p-2 text-[2.25rem] ${switchTheme?"text-gray-300 hover:bg-gray-600":"hover:bg-gray-200"}  cursor-pointer rounded-full oveflow-hidden`} />
      </span>
       {
         deleteActive && <button onClick={handleDelete} className={`absolute w-[4rem] ${switchTheme?"bg-gray-600 text-gray-300 hover:bg-gray-500":"bg-white hover:bg-gray-300 hover:text-white"}  top-[2.5rem] right-[3rem] flex items-center justify-center rounded-md font-[600] border-gray-300 border   shadow-lg h-[2rem]`}>
         Delete
    </button>
       }
      </span>

  </div>
     
    
  ):''
}
