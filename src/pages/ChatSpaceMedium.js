import React from 'react'
import { flushSync } from 'react-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { MessageDisplayBox } from '../components/MessageDisplayBox'
import { useEffect } from 'react'
import { BsThreeDots, BsFillCameraVideoFill } from 'react-icons/bs'
import { BsChevronCompactUp } from 'react-icons/bs'
import { VscSmiley } from 'react-icons/vsc'
import { useRef, useState } from 'react'
import { useMessageContext } from '../hooks/useMessageContext'
import { Emoji } from '../components/Emoji'
import { axiosFetch } from '../utils/axiosFetch'
import { useMemo } from 'react'
import { useChatContext } from '../hooks/useChatContext'
import { useThemeContext } from '../hooks/useThemeContext'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/back.jpeg'



export const ChatSpaceMedium = ({ chats, PF, socket, fetching, setFetching }) => {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const { username } = useParams()
  const [canBeSent, setCanBeSent] = useState(false)
  const messageRef = useRef()
  const [area, setArea] = useState(false)
  const handleArea = () => setArea(!area)
  const [isPickerVisible, setPickerVisible] = useState(false)
  const { dispatch: messageDispatch } = useMessageContext()
  const { dispatch: chatDispatch } = useChatContext()
  const { switchTheme } = useThemeContext('')
  const profilePicRef = useRef('')

  const lastListRef = useRef()



  let currentChat = useMemo(() => {
    return (username && chats?.length > 0) && chats?.filter((chat, index) => chat?.users[0]?.username === username)?.length === 0 ? chats?.filter((chat, index) => chat?.users[1]?.username === username) : chats?.filter((chat, index) => chat?.users[0]?.username === username) || []
  }, [username, chats])




  const handleMessageSend = async () => {
    if (currentChat && user?.access && chats?.length > 0) {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.access}`
        }
      }

      try {
        const { data } = await axiosFetch.post('message', { message: messageRef.current?.value, chatId: currentChat[0]?._id }, config)

        socket.emit("new message", [data])
        setCanBeSent(false)

        const newChat = chats?.map(chat => {
          if (chat._id === data?.chat?._id) {
            return data?.chat
          }
          else {
            return chat
          }
        })

        const fromIndex = newChat?.findIndex(item => item?._id === data?.chat?._id)
        const toIndex = 0;

        if (fromIndex === 0) {
          flushSync(() => {
            messageDispatch({
              type: 'SET_MESSAGE',
              payload: data
            })

            chatDispatch({
              type: 'LATEST_MESSAGE',
              payload: newChat,
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
            type: 'LATEST_MESSAGE',
            payload: arrayCopy
          })
        })

        messageRef.current.value = ''

      } catch (error) {
        console.log(error)
      }
    }
  }


  useEffect(() => {
    const fetchMessages = async () => {

      if (currentChat && user?.access) {
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user?.access}`
          }
        }
        try {
          const { data } = await axiosFetch.get(`message/${currentChat[0]?._id}`, config)
          messageDispatch({
            type: 'GET_MESSAGE',
            payload: data,
          })
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchMessages()
  }, [messageDispatch, user?.access, currentChat])


  useEffect(() => {
    socket.off("message recieved").on("message recieved", (data) => {
      const newMessageReceived = data[0]

      if (newMessageReceived && chats && chats?.length > 0) {
        messageDispatch({
          type: 'SET_MESSAGE',
          payload: newMessageReceived
        })

        const newChat = chats?.map(chat => {
          if (chat._id === newMessageReceived?.chat?._id) {
            return newMessageReceived?.chat
          }
          else {
            return chat
          }
        })

        chatDispatch({
          type: 'LATEST_MESSAGE',
          payload: newChat,
        })

        return;
      }


      chatDispatch({
        type: 'ADD_CHAT',
        payload: newMessageReceived?.chat
      })

      messageDispatch({
        type: 'SET_MESSAGE',
        payload: newMessageReceived
      })

    })
  }, [socket, currentChat, messageDispatch, navigate, chatDispatch, chats])

  


  return (user) && (
    <div className={`h-full w-full relative  flex flex-col  ${switchTheme ? 'bg-gray-800 border-l border-l-gray-900' : 'bg-white md:border border-gray-300'}  md:rounded-tr-lg overflow-hidden `}>
      <div className={`flex-none sticky z-[10] top-0  h-[3.35rem] ${switchTheme ? ' border-b border-gray-900 h-[3.35rem] ' : 'border-b border-gray-300'}  text-gray-500 flex items-center justify-between px-2`}>
        <span className='flex items-center justify-between'><FaArrowLeft onClick={() => navigate('/messaging')} className='mr-3 md:hidden' /> <p className={`${switchTheme ? "text-gray-300 font-[600]" : ""}`}>{currentChat[0]?.users.map((element) => {
          return element.username === username ? (element.firstname + " " + element.lastname) : ''
        })}</p></span>
        <span className={`flex   items-center justify-cenetr`}>
          <BsThreeDots className={`mr-2 p-2 text-[2.25rem] ${switchTheme ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-100"}   cursor-pointer rounded-full oveflow-hidden`} />
          <BsFillCameraVideoFill className={`p-2  ${switchTheme ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-100"} text-[2.25rem] cursor-pointer rounded-full overfow-hidden`} />
        </span>
      </div>

      <div className={`flex-auto overflow-y-auto chat-space   duration-300 ${area ? 'hidden ' : 'block'}`}>
        {
          currentChat[0]?.users?.map((element) => {
            return element.username === username ?
              <div key={element?._id} className='w-full h-full  flex flex-col'>
                <div className={` flex-none h-[max-content] py-1 ${switchTheme ? "bg-gray-900" : ""} text-gray-500 flex flex-col items-start justify-center px-2`}>
                  <div className="w-[4rem] min-h-[4rem]  rounded-full overflow-hidden h-[4rem] min-h-[4rem]]">
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
                  <p className={`${switchTheme ? "text-gray-300" : "text-gray-500"} text-sm `}>{element?.firstname + " " + element?.lastname} .<span className='text-[.8rem]'>1st</span></p>
                  <p className='text-sm text-gray-400'>{element?.title}</p>
                </div>

                <MessageDisplayBox fetching={fetching} lastListRef={lastListRef} user={element?.username} photo={element?.photo} />

              </div> : ''

          })
        }
      </div>
      <div className={` sticky  ${area ? 'flex-auto  ' : 'flex-none  h-[14rem]'}  bottom-0   flex flex-col `}>
        <span className={`${area ? 'flex-none h-[3rem]' : 'h-[1rem]'}`}>
          <hr className={`  ${canBeSent ? `border-t-2 h-[1rem]  border-gray-600 duration-300` : ` ${switchTheme ? "border-gray-900" : ""} border-t `} `} />
        </span>
        <span className={` ${area ? `flex-auto min-h-[16rem]  ` : `h-[8rem]`} w-full flex  ${switchTheme ? 'bg-gray-800 ' : ''} justify-between px-3 py-3`}>
          <textarea ref={messageRef} onChange={() => {
            messageRef.current?.value === '' ? setCanBeSent(false) : setCanBeSent(true)
          }} type="text" placeholder='write a message...' className={`flex-auto rounded-md overflow-hidden py-2 h-full ${switchTheme ? 'bg-gray-700 text-gray-300' : 'bg-blue-100'}  resize-none flex items-center justify-start outline-none bg-white pl-3 `} />
          <BsChevronCompactUp onClick={() => handleArea()} className={`ml-3 mt-1 ${area ? 'rotate-[180deg]' : 'rotate-0'} text-gray-800 text-[2.3rem] rounded-full p-2 hover:bg-gray-200 cursor-pointer`} />
        </span>

        <span className={`flex h-[6rem] items-start  pt-3 ${area ? 'flex-none  h-[6rem]' : ' h-[6rem]'}    ${switchTheme ? '' : 'border-t-gray-500 border-t'} px-2  w-full pr-5  justify-between`}>
          <div className=' relaitve flex items-center'>

            <VscSmiley onClick={() => setPickerVisible(!isPickerVisible)} className={`text-[2.6rem] p-2 ${switchTheme ? ' hover:bg-gray-700 text-gray-400' : ' hover:bg-gray-100 text-gray-600 '} rounded-full cursor-pointer   mr-1`} />

            <Emoji isPickerVisible={isPickerVisible} setPickerVisible={setPickerVisible} setCanBeSent={setCanBeSent} messageRef={messageRef} />
          </div>
          <div className=' flex items-center'>
            <button onClick={() => handleMessageSend()} disabled={!canBeSent} className={`text-[1rem] p-2 ${canBeSent ? 'bg-blue-600 text-white' : `${switchTheme?"bg-gray-700 text-gray-300":"bg-blue-100 text-gray-400"} `} rounded-full cursor-pointer   `}>send</button>
            <BsThreeDots className={`text-[2.6rem] p-2 ${switchTheme ? 'text-gray-400 hover:bg-gray-700' : ' hover:bg-gray-100 text-gray-600'} rounded-full cursor-pointer    ml-4`} />

          </div>
        </span>

      </div>

    </div>
  )
}