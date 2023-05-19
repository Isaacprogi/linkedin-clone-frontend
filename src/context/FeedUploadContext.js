import { useState, useRef } from "react";
import { createContext } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { axiosFetch } from "../utils/axiosFetch";
import {toast} from 'react-toastify'


export const FeedUploadContext = createContext()

const FeedUploadProvider = ({ children }) => {
    const [postActiveSmall, setPostActiveSmall] = useState(false)
    const feedInputSmall = useRef('')
    const [file, setFile] = useState('')
    const [currentFileDisplay, setCurrentFileDisplay] = useState(false)
    const [inputDisabledSmall, setInputDisabledSmall] = useState(false)
    const [buttonActiveSmall, setButtonActiveSmall] = useState(false)
    const [feedPostLoadingSmall, setFeedPostLoadingSmall] = useState(false)
    const [componentSmall, setComponentSmall] = useState('')
    const [postEditingSmall,setPostEditingSmall] = useState(false)
    const [feedToUpdateIdSmall, setFeedToUpdateIdSmall] = useState(false)
    const [feedUpdateLoadingSmall, setFeedUpdateLoadingSmall] = useState(false)

    const {user} = useUserContext()

    const fileRefInputSmall = useRef('')
    const uploadImageRef = useRef('')

    const controller = new AbortController();
  

      const handleFeedUpdateSmall = async (e,feeds, setFeeds) => {
        e.preventDefault()
        if (user?.access && feeds && feedToUpdateIdSmall) {
          setFeedUpdateLoadingSmall(true)
          const config = {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${user?.access}`,
              signal: controller.signal
            }
          }
          try {
            const { data } = await axiosFetch.put(`post/${feedToUpdateIdSmall}`, {post:feedInputSmall?.current?.value}, config)
             const newFeeds = feeds?.map((feed)=>{
               if(feed?._id === data?._id){
                 return data
               }else{
                 return feed
               }
             })
            setFeeds(newFeeds)
            setButtonActiveSmall(false)
            feedInputSmall.current.value = ''
            setPostActiveSmall(false)
            setPostEditingSmall(false) 
            setComponentSmall('')
            setCurrentFileDisplay('')
            setFeedToUpdateIdSmall('')   
            setFeedUpdateLoadingSmall(false)
          } catch (error) { 
            if(!file && !feedInputSmall?.current.value){
              setButtonActiveSmall(false)
            }
            setFeedUpdateLoadingSmall(false)
            console.log(error) }
        }
    
      }

      const uploadFileAndPost = async(file,newPost,config,setFeeds) => {
        try{
          if(file){
            const item = new FormData()
            item.append("file", file)
             const {data} = await axiosFetch.post('/post/file', item, config)
             if (data) {
              if(data?.resource_type === 'video'){
                newPost.file = data?.url
                newPost.type = data?.resource_type
              }
              if(data?.resource_type === 'image'){
                newPost.file = data?.url
                newPost.type = data?.resource_type
                newPost.fileHeight = uploadImageRef?.current?.clientHeight
                newPost.fileWidth = uploadImageRef?.current?.clientWidth
              }
              
    
            }
          }
  
          const {data} = await axiosFetch.post('post',newPost,config)
            setFeeds(prevFeeds=>[data,...prevFeeds])
            setFile('')
            setInputDisabledSmall(false)
            setButtonActiveSmall(false)
            feedInputSmall.current.value = ''
            setCurrentFileDisplay('')
            setComponentSmall('')
            setFeedPostLoadingSmall(false)
            setPostActiveSmall(false)    
        }catch(error){
          if (!file && !feedInputSmall?.current.value) {
            setButtonActiveSmall(false)
          }
          setFeedPostLoadingSmall(false)
          console.error(error)
        }
      }



      const handleFeedSubmitSmall = (e, setFeeds) => {
        e.preventDefault()
        if (user?.access) {
          setFeedPostLoadingSmall(true)
          const config = {
            headers: {
              Authorization: `Bearer ${user?.access}`,
              'Content-Type':'application/json',
               signal: controller.signal
            }
          }
          const newPost = {
            post: feedInputSmall?.current.value,
          }
            uploadFileAndPost(file,newPost,config,setFeeds)
           
        }
    
      }


    const handleFileChange = (e) => { 
        if (e.target.files && e.target.files[0]) {
          if(e.target.files[0]?.size > (10000000) ){
            toast('Not larger than 10mb')
            e.target.value = ''
            return;
          }
          setButtonActiveSmall(false)
          setFile(e.target.files[0])
          setCurrentFileDisplay(URL.createObjectURL(e.target.files[0]))
          setButtonActiveSmall(true)
          fileRefInputSmall.current.value = ''
        }
      }

    return <FeedUploadContext.Provider value={{
        postActiveSmall,
        setPostActiveSmall,
        inputDisabledSmall,
        setInputDisabledSmall,
        buttonActiveSmall,
        setPostEditingSmall,
        postEditingSmall,
        componentSmall, setComponentSmall,
        feedUpdateLoadingSmall, setFeedUpdateLoadingSmall,
        feedToUpdateIdSmall,
        setFeedToUpdateIdSmall,
        fileRefInputSmall,
        handleFeedUpdateSmall,
        file,
        setFile,
        setButtonActiveSmall,
        setCurrentFileDisplay,
        currentFileDisplay,
        feedPostLoadingSmall,
        setFeedPostLoadingSmall,
        handleFileChange,handleFeedSubmitSmall,
        feedInputSmall,
        uploadImageRef,
        controller
    }}>
        {children}
    </FeedUploadContext.Provider>
}

export default FeedUploadProvider
