import React from 'react'
import { BsThreeDots} from 'react-icons/bs'
import { useState , useEffect, useRef} from 'react'
import { timeFormatting } from '../utils/timeFormatting'
import {useThemeContext} from '../hooks/useThemeContext'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'

export const CommentCard = ({comment,feed, handleCommentDelete, commentDeleteLoading}) => {
  const [commentTime, setCommentTime] = useState('')
  const [deleting,setDeleting] = useState(false)
  const {switchTheme} = useThemeContext()
  const profilePicRef = useRef('')
  
  
  useEffect(()=>{
   setCommentTime(timeFormatting(comment?.createdAt))
  },[comment])

  
  return (
    <div className="w-full flex mb-2 ">
            <div ref={profilePicRef} className='w-[2.2rem] min-w-[2.2rem]  mr-3 rounded-full  h-[2.2rem] overflow-hidden'>
                   {
                     comment?.user?.photo &&
                                <LazyLoadImage
                                width={35.2}
                                height={35.2}
                                effect='blur'
                                src={comment?.user?.photo}
                                placeholderSrc={PLACEHOLDERIMAGE}
                                />
                   }
        
            </div>
            <span className={` w-full`}>
              <div className={`w-full flex ${switchTheme?"bg-gray-600":""} flex-col p-2 rounded-b-lg rounded-r-lg rounded-rb-lg bak`}>
                <div className={`w-full flex items-center justify-between`}>
               
                   <span className='text-[.95rem] flex items-start leading-[.9rem]' >
                      
                    <span>
                    <div className={`${switchTheme?"text-gray-300":""} font-[600]`}>{comment?.user?.firstname + " " + comment?.user?.lastname}</div>
                    <span className={`${switchTheme?"text-gray-400":""} font-mono`}>{comment?.user?.title}</span>
                    </span>
                    {
                        comment?.user?._id === feed?.user?._id? <span className='text-white  px-1 ml-2 rounded-md bg-blue-900  '>Author</span>:
                        ''
                      }
                     
                  </span>
              
                   
                  <span className='flex items-center text-[.9rem] text-gray-500  '>
                    <div className={`${switchTheme?"text-gray-300":""} mr-1 text-[.6rem]`}>{commentTime}</div>
                    <span className='relative'>
                    <BsThreeDots onClick={()=>setDeleting(!deleting)} className={`cursor-pointer ${switchTheme?"text-gray-300 hover:bg-gray-700":"hover:bg-gray-200"} rounded-md overflow-hidden p-1 text-[1.5rem]  rounded-full`}/>
                    {
                      deleting === true ?<button loading={commentDeleteLoading} onClick={handleCommentDelete} className="w-[4rem] hover:bg-blue-100 hover:text-gray-500 shadow-lg cursor-pointer absolute top-[2rem] border border-gray-300 right-[1rem] rounded-md flex items-center justify-center h-[max-content] bg-white text-gray-400">
                      Delete
                   </button>:""
                    }
                    </span>
                    
                  </span>
                </div>
                <div className={`w-full ${switchTheme?"text-gray-300":"text-gray-600"} mt-[.5rem] text-[.9rem]`}>{comment?.comment}</div>
              </div>
              


            </span>

          </div>
  )
}
