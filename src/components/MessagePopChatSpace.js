import React from 'react'
import { flushSync } from 'react-dom'
import {CgArrowsExpandLeft} from 'react-icons/cg'
import {FaTimes} from 'react-icons/fa'
import { axiosFetch } from '../utils/axiosFetch'
import { useUserContext } from '../hooks/useUserContext'
import { BsThreeDots,} from 'react-icons/bs'
import { BsChevronCompactUp } from 'react-icons/bs'
import { useRef, useState } from 'react'
import { useMessageContext } from '../hooks/useMessageContext'
import {useChatContext} from '../hooks/useChatContext'
import { useEffect } from 'react'
import { socket } from '../service/socket'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import {useThemeContext} from '../hooks/useThemeContext'



export const MessagePopChatSpace = ({ chatData,PF,setPop,}) => {
  const { user } = useUserContext()
  const [canBeSent, setCanBeSent] = useState(false)
  const messageRef = useRef()
  const { dispatch: messageDispatch } = useMessageContext()
  const [scale,setScale] = useState(false)
  const [down,setDown] = useState(false)
  const {chats,dispatch:chatDispatch} = useChatContext()
  const profilePicRef = useRef('')
  const {switchTheme} = useThemeContext()



  const handlePushDown = () =>{
      if(scale === true){
        setScale(false)
      }
     setDown(!down)
  }


  const handleMessageSend = async () => {
    if (chatData && user?.access && chats?.length > 0 && socket) {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.access}`
        }
      }
      
      try {
        const { data } = await axiosFetch.post('message', {message:messageRef.current?.value, chatId:chatData[0]?._id}, config) 
               
        socket.emit("new message", [data])
        setCanBeSent(false)
        
        const newChat = chats?.map(chat=>{
            if(chat._id === data?.chat?._id){
              return data?.chat
            }
            else{
              return chat
            }
        })

        const fromIndex = newChat?.findIndex(item=>item?._id === data?.chat?._id)
        const toIndex = 0;

        if(fromIndex === 0){
          flushSync(() => {
            messageDispatch({
              type: 'SET_MESSAGE',
              payload: data
            })
  
            chatDispatch({
              type:'LATEST_MESSAGE',
              payload:newChat,
            })
          })
          
          messageRef.current.value = ''
          return 

        }

        const arrayCopy = [...newChat]
        arrayCopy.splice(toIndex, 0, arrayCopy.splice(fromIndex, 1)[0])
        console.log(arrayCopy[0])
        
        flushSync(() => {
          messageDispatch({
            type: 'SET_MESSAGE',
            payload: data
          })

          chatDispatch({
            type:'LATEST_MESSAGE',
            payload:arrayCopy
          })
        })
        
        messageRef.current.value = ''
       
      } catch (error) {
        console.log(error)
      }
    }
  }


  useEffect(()=>{
    socket?.off("message recieved")?.on("message recieved", (data)=>{
       const newMessageReceived = data[0]
    
       if(newMessageReceived && chats && chats?.length > 0){
         messageDispatch({
           type: 'SET_MESSAGE',   
           payload: newMessageReceived
         })
         
         const newChat = chats?.map(chat=>{
           if(chat._id === newMessageReceived?.chat?._id){
             return newMessageReceived?.chat
           }
           else{
             return chat
           }
          })
   
          chatDispatch({
           type:'LATEST_MESSAGE',
           payload:newChat,
         })

         return;
       }


       chatDispatch({
         type:'ADD_CHAT',
         payload:newMessageReceived?.chat
       })
       
       messageDispatch({
         type: 'SET_MESSAGE',   
         payload: newMessageReceived
       })

    })
 },[chatData,messageDispatch,chatDispatch,chats])






  return (user) && (
    <div className={`fixed w-[20rem] ${down?'-bottom-[21rem]':''} z-[999] hidden md:block ${scale?'scale-150':''} ${switchTheme ? 'bg-gray-800 border border-gray-300' : 'bg-white md:border border-gray-300'}  overflow-hidden   md:rounded-x-lg md:rounded-t-lg overflow-hidden duration-300 ${scale?'bottom-[6.05rem]':'bottom-0'} right-[15rem]`}>
      <div className="h-full w-full  relative  flex flex-col   border-gray-300">
        <div  className={`${switchTheme?"text-gray-300":"text-gray-500"} flex-none sticky z-[10] top-0  h-[3rem]  flex items-center justify-between px-2`}>
           <span className='w-full justify-start items-center' onClick={handlePushDown}>New Message</span>
          <span className='flex items-center justify-cenetr'>
            {!down && <>
              <CgArrowsExpandLeft onClick={()=>setScale(!scale)} className={`mr-2 p-2 text-[2.25rem] ${switchTheme?"hover:bg-gray-700":"hover:bg-gray-100"}  cursor-pointer rounded-full oveflow-hidden`} />
            <FaTimes onClick={()=>setPop(false)} className={`${switchTheme?"hover:bg-gray-700":"hover:bg-gray-100"} p-2  text-[2.25rem] cursor-pointer rounded-full overfow-hidden`} />
            </>}
          </span>
        </div>
        <hr className={`${switchTheme?"border-gray-800":""}`} />
         {
           chatData !== null ? <span className="w-full flex   h-[4rem]">
           <span className="flex-none flex items-center justify-center  w-[5rem]">
           <span className="w-[3rem] rounded-full overflow-hidden bg-gray-100 h-[3rem]">
            {chatData[0]?.users.map((element)=>{
              return element.username !== user.username? 
             <div ref={profilePicRef} className='w-full h-full'>
                <LazyLoadImage
              width={profilePicRef?.current?.clientWidth}
              height={profilePicRef?.current?.clientHeight}
              effect='blur'
              src={element?.photo}
              placeholderSrc={PLACEHOLDERIMAGE}
            />
             </div>
              :''
            })}
           </span>
           </span>
         <span className="flex-auto flex items-center">
              <span>
              {chatData[0]?.users.map((element)=>{
              return element.username !== user.username? <div key={Element._id}>
                 <p className='font-[600]'>{element?.firstname + " " + element?.lastname}</p>
                 <p className='text-sm'>{element?.title}</p>
              </div>:''
            })}
              
              </span>
         </span>
      </span>:''
         }
        

        <div className={`flex-none  h-[17rem]  bottom-0   flex flex-col `}>
          <span className='h-[1rem]'>
            <hr className={` ${canBeSent ? `border-t-2 h-[1rem] ${switchTheme?"border-gray-900":"border-gray-600"}  duration-300` : ` ${switchTheme?"border-gray-900":""} border-t`}`} />
          </span>
          <span className={` h-[17rem] w-full flex   justify-between px-3 py-3`}>
            <textarea ref={messageRef} onChange={() => {
              messageRef.current?.value === '' ? setCanBeSent(false) : setCanBeSent(true)
            }} type="text" placeholder='write a message...' className={`${switchTheme?"bg-gray-700 text-gray-300":"bg-blue-100"} flex-auto rounded-md   py-2 h-full   resize-none outline-none  px-2 `} />
            <BsChevronCompactUp  className={`ml-3 mt-1  rotate-[180deg]  text-gray-800 text-[2.3rem] rounded-full p-2 hover:bg-gray-200 cursor-pointer`} />
          </span>

          <span className={`flex h-[6rem]  items-start ${switchTheme?"border-gray-900":"border-t-gray-500"} border-t pt-3  h-[6rem]      px-2  w-full pr-5  justify-between`}>
            <div className=' flex items-center'>
              <button onClick={() => handleMessageSend()} disabled={!canBeSent} className={`text-[1rem] p-2 ${canBeSent ? `bg-blue-600 text-white` : `${switchTheme?"bg-gray-700 text-gray-300":"bg-blue-100 text-gray-400"} `} rounded-full cursor-pointer   `}>send</button>
              <BsThreeDots className={`${switchTheme?"text-gray-300 hover:bg-gray-700":"hover:bg-gray-100 text-gray-600"} text-[2.6rem] p-2  rounded-full cursor-pointer    ml-4` }/>

            </div>
          </span>

        </div>

      </div>

    </div>
  )
}