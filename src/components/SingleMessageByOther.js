import React ,{useState, useEffect} from 'react'
import { useThemeContext } from '../hooks/useThemeContext'

function SingleMessageByOther({lastListRef,message}) {
  const [messageTime, setMessageTime] = useState('')
  const {switchTheme} = useThemeContext()
  
  useEffect(()=>{
    const currentDate =  new Date(message?.updatedAt)
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    setMessageTime(`${currentHour}:${currentMinute}`)
  },[message])
  
  return (
    <div ref={lastListRef} key={message?._id} className=" flex  px-2 py-1  ">
                                        <div className="w-full flex-none w-[1.5rem] mr-1  rounded-full overflow-hidden h-[1.5rem]">
                                        </div>
                                        <div className={ `flex-auto flex flex-col items-end `}>
                                            <p className={`${message?.message?`break-all  relative ${switchTheme?'  text-gray-300 bg-gray-800':'bg-white border msg-box border-[#e0e0e0]'}  rounded-r-md px-1 py-1 rounded-bl-md`:'' } `}>
                                                {message?.message}
                                            </p>
                                            {message?.createdAt &&<p className={` mt-[.5rem] text-[.6em] ${switchTheme?" text-green-300 text-[.6em]":""}`}>{messageTime}</p>}
                                        </div>
    </div>
  )
}

export default SingleMessageByOther