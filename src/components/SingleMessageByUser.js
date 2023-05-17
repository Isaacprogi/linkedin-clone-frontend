import React, {useState, useEffect} from 'react'
import { useThemeContext } from '../hooks/useThemeContext'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import {useRef} from 'react'


function SingleMessageByUser({lastListRef,message,photo}) {
  const [messageTime, setMessageTime] = useState('')
  const {switchTheme} = useThemeContext()
  const profilePicRef = useRef('')

  useEffect(()=>{
    setMessageTime(new Date(message?.updatedAt).toLocaleTimeString())
  },[message])

  
  return (
    <div ref={lastListRef} key={message?._id} className=" flex  px-2 py-1  ">
                                        <div className="w-full flex-none w-[1.5rem] mr-1  rounded-full overflow-hidden h-[1.5rem]">
                                        {
                    <LazyLoadImage
                    width={profilePicRef?.current.clientWidth}
                    height={profilePicRef?.current.clientHeight}
                    effect='blur'
                    src={photo}
                    placeholderSrc={PLACEHOLDERIMAGE}
                  />
                   }
                                        </div>
                                        <div className={ `flex-auto flex flex-col items-start `}>
                                            <p className={`${message?.message?`break-all  relative ${switchTheme?'bg-gray-600   text-gray-200 ':'bg-white border msg-box border-[#e0e0e0]'}  rounded-r-md px-1 py-1 rounded-bl-md`:'' } `}>
                                                {message?.message}
                                            </p>
                                            {message?.createdAt &&<p className={` mt-[.5rem] text-[.6em] ${switchTheme?" text-pink-500 text-[.6em]":""}`}>{messageTime}</p>}
                                        </div>
    </div>
  )
}

export default SingleMessageByUser