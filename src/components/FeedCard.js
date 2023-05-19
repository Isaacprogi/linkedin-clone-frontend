import React, { useState, useEffect,useMemo } from 'react'
import { BiWorld } from 'react-icons/bi'
import { BsThreeDots, BsDot } from 'react-icons/bs'
import { AiFillLike,AiFillCaretDown } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'

import { VscSmiley } from 'react-icons/vsc'
import { useUserContext } from '../hooks/useUserContext'
import {axiosFetch} from '../utils/axiosFetch'
import {CommentCard} from './CommentCard'
import {SyncLoader} from 'react-spinners'
import { useFeedUploadContext } from '../hooks/useFeedUploadContext'
import { useThemeContext } from '../hooks/useThemeContext'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/back.jpeg'
import { timeFormatting } from '../utils/timeFormatting'
import { useRef } from 'react'
import PROFILE from '../images/profile.jpeg'
import POSTER from '../images/jy.png'
import { useNavigate } from 'react-router-dom'


const FeedCard = ({ feed, id: addID, feeds, feedInput,  setFeeds, setFeedToUpdateId, setComponent, lastPostRef, setButtonActive, postActive, setPostActive, setPostEditing }) => {
  const { user } = useUserContext()
  const [commenting, setCommenting] = useState(false)
  const [replyDisplay, setReplyDisplay] = useState(false)
  const [feedTime, setFeedTime] = useState('')
  const [likeLoading,setLikeLoading] = useState(true)
  const [commentPostLoading,setCommentPostLoading] = useState(false)
  const [commentDeleteLoading,seCommentDeleteLoading] = useState(false)
  const [feedOptions, setFeedOptions] = useState(false)
  const [feedDeleteLoading,setFeedDeleteLoading] = useState(false)
  const{switchTheme} = useThemeContext()
  const {feedInputSmall, setPostActiveSmall, setButtonActiveSmall, setFeedToUpdateIdSmall, setPostEditingSmall, setComponentSmall} = useFeedUploadContext()
  const navigate = useNavigate()


  const [commentInput,setCommentInput] = useState('')
  const feedPostImageRef = useRef('')
  const [height,setHeight] = useState('')
  const feedPostCommentPicRef = useRef('')
  const [imageLoaded,setImageLoaded] = useState(false)
  const [videoLoaded,setVideoLoaded] = useState(false)


  useEffect(()=>{ 
      setHeight(feed?.fileHeight)
  },[feed?.fileHeight])



  const config = useMemo(() => ({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${user?.access}`
    }
  }), [user?.access])



  
  const imageExt = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF']
  const videoExt = ['mp4', 'mva'] 

  

  useEffect(() => {
     setFeedTime(timeFormatting(feed?.createdAt))
  }, [feed])


  useEffect(() => {

   if(feed?.length > 0){
    const textarea = document.getElementById(`comment-input${addID}`)
    if (textarea) {
      textarea.addEventListener('keydown', autoresize);
    }

    function autoresize(e) {
      textarea.style.height = 'auto';
      let scHeight = e.target.scrollHeight;
      textarea.style.height = scHeight + 'px'
    }
   }
   
    
  }, [addID,feed?.length])


  useEffect(()=>{
    const textarea = document.getElementById(`comment-input${addID}`)
     if(commentInput === ''){
      textarea.style.height = 'auto';
     }
  },[commentInput,addID])

 

  const handleLike = async() => {
    setLikeLoading(true)
     try{
       if(user?.access && feeds && feed){
         const newFeeds = feeds.map((item)=>{
           if(item?._id === feed?._id){
             return item?.likes.filter(value=>value?._id === user?._id)?.length > 0 ?
                 {...item, likes:item?.likes?.filter(value=>value?._id !== user?._id)}
              : {...item,likes:[...feed?.likes,{
                firstname:user?.firstname,
                lastname:user?.lastname,
                photo:user?.photo,
                title:user?.title,
                _id:user?._id
               }]}
            }
            else{
              return item
            }
          })
          setFeeds(newFeeds)
          await axiosFetch.put(`post/like/${feed?._id}`,{userId:user?._id},config)
          setLikeLoading(false)
       }      
     }catch(error){
       setLikeLoading(false)
       console.log(error)
     }
    
  }

  const handleCommentOnPost = async() => {
    setCommentPostLoading(true)
    try{
      if(user?.access && feed){
        const {data} = await axiosFetch.post(`comment/${feed?._id}`,{comment:commentInput},config)
        const {comments, ...others} = feed
        const v = [...comments, data]
        const newFeeds = feeds.map((item)=>{
          if(item?._id === data?.post){
            return {
              ...others,
              comments:v
            }
          }
          else{
            return item
          }
        })
        setFeeds(newFeeds)
        setCommentInput('')
        setCommentPostLoading(false)
      }     
    }catch(error){
      console.log(error)
      setCommentPostLoading(false)
    }

  }


  const handleCommentDelete = async(commentId) => {
    seCommentDeleteLoading(true)
    try{
      if(user?.access && feed){
        await axiosFetch.put(`comment/${commentId}`,{postId:feed?._id},config)
        const {comments, ...others} = feed
        const v = [...comments]?.filter(item=>item?._id !== commentId)
        const newFeeds = feeds.map((item)=>{
          if(item?._id === feed?._id){
            return {
              ...others,
              comments:v
            }
          }
          else{
            return item
          }
        })
        setFeeds(newFeeds)
        seCommentDeleteLoading(false)
      }
    }catch(error){
      console.log(error)
      seCommentDeleteLoading(false)
    }

  }

  
  
  useEffect(() => {
    window.setTimeout(() => {
      if (commenting === false) {
        setReplyDisplay(false)
      }
      else {
        setReplyDisplay(true)
      }
    }, 1000)
  }, [commenting])
  

  const handlePostEdit = (id) =>{
    setPostEditing(true)
    setPostActive(true)
    setFeedOptions(false)
    setButtonActive(true)
    feedInput.current.value = feed?.post
    if(id){
      setComponent(
        <div className="rounded-sm opacity-[0.5] overflow-hidden mb-1">
        {(feed?.file && imageExt.includes(feed?.file.slice((feed?.file.lastIndexOf(".") -1 >>> 0) + 2)))
            &&
         <img className='w-full' src={feed?.file} alt="" />} 
         <div>
           {(feed?.file && videoExt.includes(feed?.file.slice((feed?.file.lastIndexOf(".") -1 >>> 0) + 2)))
             &&
         <video controls className='video-js'>
         <source src={feed?.file} type='video/mp4'/>
         </video>
           }  
          </div>    
      </div>)
    }
      setFeedToUpdateId(id)
   }


   
  const handlePostEditSmall = (id) =>{
    setPostEditingSmall(true)
    setPostActiveSmall(true)
    setFeedOptions(false)
    feedInputSmall.current.value = feed?.post
    setButtonActiveSmall(true)
     if(id){
      setComponentSmall(
        <div className=" w-full opacity-[0.5] overflow-hidden mb-1">
        {(feed?.file && imageExt.includes(feed?.file.slice((feed?.file.lastIndexOf(".") -1 >>> 0) + 2)))
            &&
         <img className='w-full ' src={feed?.file} alt="" />} 
         <div>
           {(feed?.file && videoExt.includes(feed?.file.slice((feed?.file.lastIndexOf(".") -1 >>> 0) + 2)))
             &&
         <video controls className='video-js'>
         <source src={feed?.file} type='video/mp4'/>
         </video>
           }  
          </div>    
      </div>)
     }
      setFeedToUpdateIdSmall(id)
   }




 
   const handlePostDelete = async(e) => {
     setFeedDeleteLoading(true)
       try{
         if(user?.access && feeds && feed?._id){
           await axiosFetch.delete(`post/${feed?._id}`,config)
           const newFeeds = feeds?.filter((item=>item?._id !== feed?._id))
           setFeeds(newFeeds)
           setFeedDeleteLoading(false)
         }

       }catch(error){
         console.log(error)
         setFeedDeleteLoading(false)
       }
   }

   




  return  (
    <div ref={lastPostRef} className={`w-full  sm:px-3 py-2 ${switchTheme ? "bg-gray-800 border border-gray-700 " : "bg-white border-gray-300 md:border"}   flex flex-col  mb-2 sm:rounded-lg overflow-hidden  `}>
      <div className="w-full flex items-start  md:px-0 justify-between">

        <div key={feed?.user?.id} className="flex mb-2 px-2 sm:px-0  ">         
          <div onClick={()=>navigate('/linkedin')} className="img w-[3rem] h-[3rem] rounded-full overflow-hidden mr-2">
          <LazyLoadImage
          width={48}
          height={48}
          src={feed?.user?.photo}
          placeholderSrc={PROFILE}
          />
          </div>
          <div className=' flex flex-col leading-4 justify-start '>
            <span className={`font-[700] text-[.9rem] ${switchTheme?'text-gray-300':'text-gray-600 '}`}>
              {
                feed?.user?.firstname + ' ' + feed?.user?.lastname
        
              }
              </span>
            <span className={` text-[.75rem] ${switchTheme?'text-gray-400':'text-gray-500'}  `}>{feed?.user?.title}</span>
            <span className='flex items-center text-[.67rem]  text-gray-500 justify-start'> <span>{feedTime}</span> <BsDot className='mt-1' /> <span><BiWorld className='text-[1rem] text-gray-600' /></span></span>
          </div>
        </div>

       <span className='relative z-[100] pr-2 sm:pr-0'>
         
         <span className={feed?.user?._id === user?._id?'':'hidden'}>
         <BsThreeDots onClick={()=>{
           setFeedOptions(!feedOptions)
           }} className={`text-[1.5rem] ${switchTheme?"text-gray-300  overflow-hidden hover:bg-gray-600":"text-gray-[500] hover:bg-gray-200"}  rounded-full  p-1 cursor-pointer  `} />
           {
            feedOptions && <div className={`absolute overflow-hidden right-[.8rem] sm:right-[0] shadow-md rounded-md flex flex-col   w-[6rem]  ${switchTheme?'bg-gray-700 text-gray-300':'bg-white  border border-gray-100'}`}>
          <button onClick={()=>{
              return handlePostEdit(feed?._id)
          } } className={` hidden md:block  ${switchTheme?"hover:bg-gray-600":"hover:bg-gray-200"} cursor-pointer text-sm p-1 flex items-center justify-center w-full`}>Edit</button>
            <button onClick={()=>{
              return handlePostEditSmall(feed?._id)          
          } } className={`hover:bg-gray-200  md:hidden  ${switchTheme?"hover:bg-gray-600":"hover:bg-gray-200"}  cursor-pointer text-sm p-1 flex items-center justify-center w-full`}>Edit</button>

            <button disabled={feedDeleteLoading} onClick={handlePostDelete} className={`${switchTheme?"hover:bg-gray-600":"hover:bg-gray-200"}  outline-none cursor-pointer text-sm   p-1 flex items-center justify-center w-full'`}>
            {
              !feedDeleteLoading && 'Delete'
            }
            {
              feedDeleteLoading &&  <div className='w-full h-full'>
               <SyncLoader size={5} color={`${switchTheme ? "white" : "gray"}`} />
              </div>
            }
            
            </button>
         </div>
          }
         </span>
       </span>
        
      </div>
      <div className={`break-all text-[.8rem] mb-1 px-3 md:px-0  ${switchTheme ? "text-gray-300" : "text-gray-600"}`}>
        <p>{feed?.post}</p>
      </div>
      <div ref={feedPostImageRef} className="rounded-sm w-full h-[max-content] overflow-hidden mb-1">
                
        {(feed?.file && feed?.type ==='image' && height !== '') &&
              <div className='w-full'>
                  
                    <div style={{height:`${height}px`}} className={`w-full opacity-[.5] bg-[#ddd] ${imageLoaded?'hidden':'block'}   `}>
                      
                    </div>
                  
                 <img src={feed?.file} alt='feed'  onLoad={()=>setImageLoaded(true)} className={`w-full ${imageLoaded?'block':'hidden'} `} />            
              </div>
        } 
          <div>
          {(feed?.file && feed?.type === 'video')  &&
            <div className={`${videoLoaded?"":""} w-full`}>
              <video poster={POSTER} preload='metadata' controls className='video-js'>
            <source onLoad={()=>setVideoLoaded(true)} src={feed?.file} type='video/mp4'/>
           </video>
            </div>
           }          
          </div>
        
      </div>

      <div className={`flex items-center relative mt-2 px-2 sm:px-0 justify-between`}>
        <span>
          {
            feed?.likes?.length !== 0 &&
            <div className='flex    items-center justify-start'>
              <span className='flex items-center text-[.8rem] justify-between'>
                <AiFillLike className=' bg-blue-400 rounded-full p-[1.5px] like text-white overflow-hidden ' />
              </span>
              <span className='ml-2  text-gray-500 text-[.8rem] '>
                {feed && feed?.likes?.length.toString()}
              </span>

            </div>
          }
        </span>
        <span className='flex items-center justify-between'>
          {(feed?.comments && feed?.comments?.length !== 0) &&
            <span className='  text-gray-500 text-[.8rem]'>
             
             {
                feed?.comments?.length === 1 ? 
                <span>{feed?.comments?.length} comment</span>
                : <span>{feed?.comments?.length} comments</span>
              }

            
        </span>
          }

          {(feed?.reposts && feed?.reposts?.length !== 0) &&
            <span className='ml-1  text-gray-500 text-[.8rem]'>
              {
                feed?.roposts?.length === 1 ? 
                <span>{feed?.reposts?.length} repost</span>
                : <span>{feed?.reposts?.length} reposts</span>
              }
            </span>
          }

        </span>
      </div>
      <div className={`mt-3 w-full  ${switchTheme?'bg-gray-800':'bg-gray-300'} h-[1px] `}>
        </div>

      <span className={`w-full grid grid-cols-2 ${switchTheme?'text-gray-300':'text-gray-600'} gap-3 px-2 py-2`}>
        <button onClick={handleLike} className='rounded-md overflow-hidden'>
          <div className={` ${switchTheme?'hover:bg-gray-700':'hover:bg-gray-100'} duration-200 text-[.8rem] md:text-[.9rem]  cursor-pointer w-full h-full py-2 flex flex-col md:flex-row  items-center justify-center `}>
            <AiFillLike className={`${(feed?.likes?.filter(item=>item?._id === user?._id)?.length) > 0 ? 'text-blue-600 like' : '  like'}`} />
            <span disabled={likeLoading} className='font-[600]  '>
              Like
            </span>
          </div>
        </button>

        <button className='rounded-md overflow-hidden' onClick={() => setCommenting(!commenting)}>
          <div className={`${switchTheme?'hover:bg-gray-700':'hover:bg-gray-100'}  w-full duration-200 text-[.8rem] md:text-[.9rem] cursor-pointer h-full py-2 flex flex-col md:flex-row items-center justify-center `}>
            <FaRegCommentDots />
            <span className='font-[600] '>Comment</span>
          </div>
        </button>
      </span>

      <div className={`flex ${!commenting ? 'hidden' : ''}  items-start px-1 justify-between`}>
        <span ref={feedPostCommentPicRef} className='h-[2.2rem]  min-w-[2.2rem]  w-[2.2rem] rounded-full overflow-hidden mr-1'>
        <LazyLoadImage
        width={35.2}
        height={35.2}
        effect='blur'
        src={user?.photo}
        placeholderSrc={PLACEHOLDERIMAGE}
        />
        </span>
        <span type="text" className={` w-full h-[max-content] border-2   flex items-center justify-between   rounded-lg overflow-hidden py-2 px-2 border-gray-400`} >
          <textarea  id={`comment-input${addID}`} value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} type="text" rows='1' className={`w-full ${switchTheme?"bg-gray-800 text-gray-300":""}  resize-none outline-none comment-input '`}></textarea>
          <span  className=' items-center relavtive  hidden  justify-between'>
            <VscSmiley className={` cursor-pointer ${switchTheme?"text-gray-300 hover:bg-gray-700":" hover:bg-gray-100"}  text-gray-500 overflow-hidden p-2 text-[2.1rem] rounded-full`} />
          </span>
        </span>
      </div>

      <div className='flex flex-col px-1 w-full h-[max-content]'>
        <span className='w-full flex items-center justify-start'>
          <button disabled={commentPostLoading} className={`px-2 ${!replyDisplay ? 'hidden' : ''} mb-1 bg-blue-500 mt-1 rounded-full overfloe-hidden cursor-pointer text-gray-100 `} onClick={handleCommentOnPost}> post</button>
        </span>
        <div className={`flex ${!replyDisplay ? 'hidden' : ''} items-center mb-3`}>
          <span className={`text-gray-500 ${switchTheme?"text-gray-300":""} font-[600] text-[.9rem]`}>Most Relevant</span>
          <AiFillCaretDown className={`${switchTheme?"text-blue-600":""}`} />
        </div>

        <div className={`w-full ${!replyDisplay ? 'hidden' : ''} flex  flex-col`}>
          {
            feed && [...feed?.comments]?.reverse()?.map((comment) => {
              return <CommentCard feed={feed} commentDeleteLoading={commentDeleteLoading} key={comment?._id} handleCommentDelete={()=>handleCommentDelete(comment?._id)} comment={comment} />

            })
          }

        </div>
      </div>
          

    </div>
  )
}

export default FeedCard