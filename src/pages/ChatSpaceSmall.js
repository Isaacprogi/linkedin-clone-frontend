import React from 'react'
import { flushSync } from 'react-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { BsPencilSquare } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { MessageDisplayBox } from '../components/MessageDisplayBox'
import { MdOutlineAttachFile } from 'react-icons/md'
import { ImCamera } from 'react-icons/im'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { useMessageContext } from '../hooks/useMessageContext'
import { axiosFetch } from '../utils/axiosFetch'
import { useMemo } from 'react'
import { useChatContext } from '../hooks/useChatContext'
import { useThemeContext } from '../hooks/useThemeContext'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/back.jpeg'


export const ChatSpaceSmall = ({socket}) => {
  const navigate = useNavigate()
  const {user} = useUserContext()
  const {username } = useParams()
  const messageRef = useRef('')
  const [messageActive, setMessageActive] = useState(false)
  const {dispatch: messageDispatch } = useMessageContext()
  const {chats, dispatch:chatDispatch} = useChatContext()
  const {switchTheme} = useThemeContext()

  const lastListRef = useRef()
  const profilePicRef = useRef('')


  let currentChat = useMemo(()=>{
    return username && chats?.filter((chat, index) => chat.users[0].username === username).length === 0 ? chats?.filter((chat, index) => chat.users[1].username === username) : chats?.filter((chat, index) => chat.users[0].username === username) || []
  },[username, chats])
  

  useEffect(() => {
    const textarea = document.getElementById('message-text-input-small')

    if (textarea) {
      textarea.addEventListener('keydown', autoresize);
    }

    function autoresize(e) {
      textarea.style.height = 'auto';
      let scHeight = e.target.scrollHeight;
      textarea.style.height = scHeight + 'px' 
    }

  }, [])



  useEffect(()=>{
    const textarea = document.getElementById('message-text-input-small')
     if(messageRef.current.value === ''){
      textarea.style.height = 'auto';
     }
  },[messageRef?.current?.value])






  



  
  const handleMessageSend = async () => {
    if (currentChat && user?.access && chats?.length > 0) {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.access}`
        }
      }
      
      try {
        const { data } = await axiosFetch.post('message', {message:messageRef.current?.value, chatId:currentChat[0]._id}, config)
         socket.emit("new message", [data])
        
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

        const textarea = document.getElementById('chat-box-small')

        if (textarea) {
          textarea.style.height = 'auto';
        }
        
      } catch (error) {
        console.log(error)
      }

    }



  }



  
  useEffect(()=>{
    socket.off("message recieved").on("message recieved", (data)=>{
       const newMessageReceived = data[0]
    
       if(newMessageReceived && chats?.length > 0){
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

         return 
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
 },[socket,messageDispatch, navigate,chatDispatch,chats])


  return (
    <div className={`h-full w-full  md-hidden flex flex-col  ${switchTheme?'bg-gray-800':'bg-white'} `}>

      <div className={`flex-none sticky ${switchTheme?"border-gray-900 text-gray-300 border-b":"border-b border-b-gray-300"} z-[10] top-0  py-4  text-gray-500 flex items-center justify-between px-2`}>
        <span className='flex items-center justify-between'>
           <span  className={` ${switchTheme?' text-gray-300 hover:bg-gray-700':'text-gray-600'} rounded-full p-2 text-[1.4rem]  cursor-pointer ` }>
           <FaArrowLeft onClick={() => navigate(-1)}/>
           </span>
          <p>Messages</p>
        </span>
        <span className={` ${switchTheme?' text-gray-300 hover:bg-gray-700':'text-gray-600'} rounded-full p-2 text-[1.4rem]  cursor-pointer ` }>
        <BsPencilSquare  />
        </span>
      </div>

      <div className="flex-auto overflow-y-auto">
          {
          currentChat[0]?.users?.map((element) => {
            return element.username === username ?
              <div key={element?._id} className='w-full h-full  flex flex-col'>
                <div className={` flex-none h-[max-content] py-1 ${switchTheme?"bg-gray-900":""} text-gray-500 flex flex-col items-start justify-center px-2`}>
                  <div className="w-[4rem] mb-[.6rem] rounded-full mt-[1rem] bg-red-700 overflow-hidden h-[4rem]">
                  <div ref={profilePicRef} className='w-full h-full'>
                      <LazyLoadImage
                        width={profilePicRef?.current?.clientWidth}
                        height={profilePicRef?.current?.clientHeight}
                        effect='blur'
                        src={element?.photo}
                        placeholderSrc={PLACEHOLDERIMAGE}
                      />
                    </div>
                  </div>
                  <p className={`text-sm font-[900] ${switchTheme?'text-gray-300':'text-gray-500'} `}>{element?.firstname + " " + element?.lastname} .<span className='text-[.65rem]'>1st</span></p>
                  <p className='text-sm text-gray-400'>{element?.title}</p>
                </div>

                <MessageDisplayBox user={element?.username} lastListRef={lastListRef} photo={element?.photo}    />

              </div> : ''

          })
          }
      </div>
      <div className={` sticky flex-none    bottom-0  ${switchTheme?'bg-gray-900  border-gray-600':'border-gray-100 border-t'}  flex justify-between items-center  `}>
      <textarea onChange={(e) => {
          if (messageRef.current?.value !== '') {
            setMessageActive(true)
          }
          else {
            setMessageActive(false)
          }
        }} ref={messageRef} placeholder='write a message...' id="message-text-input-small" type="text" rows='1' className={`w-full py-[1rem] rchat-box-small-input ${switchTheme?'bg-gray-700 text-gray-400':''} resize-none outline-none  pl-3 `}></textarea>

        {
          !messageActive ? <span className='flex items-center px-2 flex-none w-[6rem]   justify-center'>
            <MdOutlineAttachFile className={`text-3xl ${switchTheme?' text-gray-300 hover:bg-gray-700':'text-gray-600'} rounded-full p-1 text-[2rem] rotate-[45deg]  cursor-pointer ` } />
            <ImCamera className={`text-3xl ${switchTheme?' text-gray-300 mr-2 hover:bg-gray-700':'text-gray-600'} rounded-full p-1 text-[2rem]  cursor-pointer ` }/>
          </span> : <span className='flex items-center justify-center pr-3'>
            <IoMdSend onClick={handleMessageSend} className={`text-[2.3rem] ${switchTheme?"hover:bg-gray-700":"hover:bg-gray-100"} rounded-full overflow-hidden ml-2  p-1 text-blue-600 cursor-pointer`} />
          </span>
        }
      </div>
    </div>
  )
}
