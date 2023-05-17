import React from 'react'
import { useState, useRef, useCallback, useMemo } from 'react'
import { AiFillPlaySquare, AiFillPicture, AiOutlinePicture, AiFillFileText } from 'react-icons/ai'
import { MdOutlineAttachFile, } from 'react-icons/md'
import { FaCaretDown, FaSquare } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import Feed from '../components/Feed'
import { BsBarChartFill, BsChatText, BsChevronCompactDown, BsFillBagFill, BsThreeDots, BsFillBookmarkFill } from 'react-icons/bs'
import { FaArrowRight, FaTimes } from 'react-icons/fa'
import { AiFillLinkedin } from 'react-icons/ai'
import { FaInfo } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect } from 'react'
import { TiStarburst } from 'react-icons/ti'
import FootBar from '../components/FootBar'
import { useScroller } from '../hooks/useScroller'
import { AiFillCaretDown } from 'react-icons/ai'
import { BiWorld } from 'react-icons/bi'
import { useUserContext } from '../hooks/useUserContext'
import { axiosFetch } from '../utils/axiosFetch'
import { useNavigate } from 'react-router-dom'
import RandomFollowCard from '../components/RandomFollowCard'
import { SyncLoader } from 'react-spinners'
import BACKGROUND from '../images/bak.png'
import axios from 'axios'
import { useThemeContext } from '../hooks/useThemeContext'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'






const Home = ({ feeds, setFeeds }) => {
  const [postActive, setPostActive] = useState(false)
  const displayNav = useScroller('scroll-home')
  const [file, setFile] = useState('')
  const [currentFileDisplay, setCurrentFileDisplay] = useState('')
  const [inputDisabled, setInputDisabled] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)
  const [videoActive, setVideoActive] = useState(false)
  const [pictureActive, setPictureActive] = useState(false)
  const uploadImageRef = useRef('')
  const profileImageRef = useRef('')

  const { user, PF } = useUserContext()
  const navigate = useNavigate()
  const fileRefAll = useRef(null)
  const fileRefVideo = useRef(null)
  const fileRefImage = useRef(null)
  const [feedPostLoading, setFeedPostLoading] = useState(false)
  const [feedUpdateLoading, setFeedUpdateLoading] = useState(false)
  const [postEditing, setPostEditing] = useState(false)
  const [component, setComponent] = useState('')
  const [feedToUpdateId, setFeedToUpdateId] = useState('')
  const [searchActiveSmall, setSearchActiveSmall] = useState(false)
  const { switchTheme } = useThemeContext()
  const postPicStartRef = useRef('')


  const feedInput = useRef(null)



  const controller = useMemo(()=>new AbortController(),[])
  const config = useMemo(() => ({
    Accept: 'application/json',
    Authorization: `Bearer ${user?.access}`,
    signal: controller.signal
  }), [user?.access,controller.signal])



  const [storedRandomUsers, setStoredRandomUsers] = useState([])


  useEffect(() => {
    const getRandomUsers = async () => {
      if (user?.access) {
        try {
          const { data } = await axiosFetch.get('user/random/users', { headers: config, params: { random: 3 } })
          setStoredRandomUsers(data?.users)
          controller.abort()
        } catch (error) {
          console.log(error)
        }
      }
    }
    getRandomUsers()
  }, [config,controller,user?.access])



  useEffect(() => {
    const textarea = document.getElementById('text-area')
    if (textarea) {
      textarea.addEventListener('keydown', autoresize);
    }
    function autoresize(e) {
      textarea.style.height = 'auto';
      let scHeight = e.target.scrollHeight;
      textarea.style.height = scHeight + 'px'
    }
  }, [])


  useEffect(() => {
    const textarea = document.getElementById('text-area-small')
    if (textarea) {
      textarea.addEventListener('keydown', autoresize);
    }
    function autoresize(e) {
      textarea.style.height = 'auto';
      let scHeight = e.target.scrollHeight;
      textarea.style.height = scHeight + 'px'
    }
  }, [])


  const uploadFileAndPost = async (file, newPost, config) => {
    try {
      if (file) {
        const item = new FormData()
        item.append("file", file)

        const { data } = await axiosFetch.post('/post/file', item, config)
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

      const { data } = await axiosFetch.post('post', newPost, config)
      setFeeds(prevFeeds => [data, ...prevFeeds])
      setButtonActive(false)
      setFeedPostLoading(false)
      feedInput.current.value = ''
      setPostActive(false)
      setCurrentFileDisplay('')
      controller.abort()
      uploadImageRef.current.value = ''
    } catch (error) {
      if (!file && !feedInput?.current.value) {
        setButtonActive(false)
      }
      setFeedPostLoading(false)
      console.error(error)
    }
  }




  const handleFeedSubmit = (e) => {
    e.preventDefault()
    if (user?.access) {
      setFeedPostLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user?.access}`,
          'Content-Type': 'application/json'
        }
      }
      const newPost = {
        post: feedInput?.current.value,
        
      }
      uploadFileAndPost(file, newPost, config)

    }

  }


  const previewFile = (data) => {
    setCurrentFileDisplay(URL.createObjectURL(data))
  }



  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file?.size > (10000000)) {
        toast('Not larger than 10mb')
        e.target.value = ''
        return;
      }
      setFile(file)
      previewFile(file)
      setButtonActive(true)
      fileRefAll.current.value = ''
    }
  }



  const handleVideoChange = (e) => {
    setVideoActive(true)
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
      if (e.target.files[0]?.size > (10000000)) {
        toast('Not larger than 10mb')
        e.target.value = ''
        return;
      }
      setButtonActive(true)
      setFile(e.target.files[0])
      setCurrentFileDisplay(URL.createObjectURL(e.target.files[0]))
      fileRefVideo.current.value = ''
    }
  }


  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    setPictureActive(true)
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0]?.size > (10000000)) {
        toast('Not larger than 10mb')
        e.target.value = ''
        return;
      }
      setButtonActive(true)
      setFile(e.target.files[0])
      setCurrentFileDisplay(URL.createObjectURL(e.target.files[0]))
      fileRefImage.current.value = ''
    }
  }




  const handleCancel = () => {
    setFile('')
    setVideoActive(false)
    setPictureActive(false)
    setInputDisabled(false)
    setPostActive(false)
    setPostEditing(false)
    setCurrentFileDisplay('')
    setFeedPostLoading(false)
    setFeedUpdateLoading(false)
    setComponent('')
    setFeedToUpdateId('')
    setButtonActive(false)
    feedInput.current.value = ''
    if (fileRefAll?.current?.value) {
      fileRefAll.current.value = ''
    }
  }



  const handleFeedUpdate = async (e) => {
    e.preventDefault()
    if (user?.access && feeds && feedToUpdateId) {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.access}`
        }
      }
      try {
        const { data } = await axiosFetch.put(`post/${feedToUpdateId}`, { post: feedInput?.current?.value }, config)
        const newFeeds = feeds?.map((feed) => {
          if (feed?._id === data?._id) {
            return data
          } else {
            return feed
          }
        })
        setFeeds(newFeeds)
        setButtonActive(false)
        setFeedUpdateLoading(false)
        feedInput.current.value = ''
        setPostActive(false)
        setPostEditing(false)
        setComponent('')
        setCurrentFileDisplay('')
        setFeedToUpdateId('')
        controller.abort()
      } catch (error) {
        if (!file && !feedInput?.current.value) {
          setButtonActive(false)
        }
        setFeedUpdateLoading(false)
        console.log(error)
      }
    }

  }






  const [pageNumber, setPageNumber] = useState(1)
  const url = 'http://localhost:4000/api/post'
  const [hasMore, setHasMore] = useState(true)
  const [scrolling, setScrolling] = useState(false)
  const [postFetchLoading, setPostFetchLoading] = useState(false)


  const FEED = useCallback(() => {
    return <Feed postFetchLoading={postFetchLoading} feeds={feeds} hasMore={hasMore} feedInput={feedInput} setFeedToUpdateId={setFeedToUpdateId} setButtonActive={setButtonActive} setComponent={setComponent} setPostEditing={setPostEditing} setPostActive={setPostActive} postActive={postActive} setFeeds={setFeeds} />
  }, [feeds, postFetchLoading,postActive,setFeeds])



  useEffect(() => {
    let cancel;
    setPostFetchLoading(true)
    if (user?.access) {
      axios({
        method: 'GET',
        url,
        params: { page: pageNumber },
        cancelToken: new axios.CancelToken(c => cancel = c),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.access}`
        }

      }).then(res => {
        if (scrolling) {
          setFeeds(prevFeeds =>
            [...prevFeeds, ...res?.data]
          )
          setPostFetchLoading(false)
          
          return setHasMore(res?.data.length > 0)
        }
        setFeeds([...res?.data])
        setPostFetchLoading(false)
        setHasMore(res?.data?.length > 0)
        return;

      }).catch(e => {
        if (axios.isCancel(e)) return
        setPostFetchLoading(false)
        setHasMore(false)
      })
    }
    return () => cancel()
  }, [pageNumber,setFeeds,user?.access])




  const scrollToEnd = (e) => {
    setScrolling(true)
    if ((e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight && hasMore) {
      console.log('what tha fuck bruh')
      setPageNumber(pageNumber + 1)
    }

  }















  return user?.access && (
    <div onScroll={scrollToEnd} id='scroll-home' className="w-full flex flex-col  overflow-auto h-full">
      <ToastContainer />
      <NavBar setSearchActiveSmall={setSearchActiveSmall} searchActiveSmall={searchActiveSmall} displayNav={displayNav} />
      <div className={`  w-full flex-auto container mx-auto h-full`}>

        <div className={`w-full ${searchActiveSmall ? 'hidden md:grid  ' : 'block md:grid'} h-[max-content] md:pt-7 md:px-[4.5rem] md:gap-[1rem] md:grid-cols-medium lg:grid-cols-large`}>
          <div className={` sticky top-[-16.75rem] md:row-span-2  h-[max-content] rounded-b-lg sm:rounded-t-lg hidden md:block overflow-hidden`}>
            <div  style={{
              backgroundImage: `url(${BACKGROUND})`,
            }} className=" relative    h-[3.7rem]">
              <div ref={profileImageRef} onClick={() => navigate(`/linkedin/${user?.username}`)} className="absolute  top-[20%] left-[50%] translate-x-[-50%] w-[4.5rem]  h-[4.5rem] overflow-hidden rounded-full">
                {user ?
                  <LazyLoadImage
                    width={profileImageRef?.current.clientWidth}
                    height={profileImageRef?.current.clientHeight}
                    src={user?.photo}
                    placeholderSrc={PLACEHOLDERIMAGE}
                    effect='blur'
                  /> :
                  <div className='bg-gray-100 w-full h-full'></div>
                }
              </div>
            </div>
            <div className={`min-h-[8rem]  ${switchTheme ? " bg-gray-800 " : " bg-white border-gray-300 md:border-l md:border-r md:border-t"}  shadow-md  flex flex-col items-center justify-center `}>
              {user ? <p className={`font-[600]  ${switchTheme ? 'text-gray-300' : 'text-gray-600'}  break-all`}>{user.firstname + ' ' + user.lastname}</p> : ''}
              <span className={`break-all text-[.8rem]  ${switchTheme ? 'text-gray-400 ' : 'text-gray-400'} font-[500] `}>{user?.title ? user?.title : '...'}</span>
            </div>
            <div className={`h-[18rem] cursor-pointer   grid grid-rows-profile`}>
              <div className={` ${switchTheme ? "bg-gray-800 border-t-gray-700 md:border-t" : "bg-white md:border-r  md:border-t md:border-l"}      flex flex-col items-start px-2 justify-center text-[.7rem] `}>
                <span className=' flex w-full  items-center justify-start text-gray-500'><p className={`mr-1  ${switchTheme ? 'text-gray-300' : 'text-gray-600'}  font-[600] `}>Who's viewed your profile</p> <p className='text-blue-600 text-[.8rem]'>49</p></span>
                <span className=' flex w-full items-center justify-start text-gray-500'><p className={`mr-1   ${switchTheme ? 'text-gray-300' : 'text-gray-600'}  font-[600]`}>Impressions of your post</p><p className='text-blue-600 text-[.8rem]'>348</p></span>
              </div>
              <div className={` rounded-b-lg ${switchTheme ? "bg-gray-800  hover:bg-gray-600" : "bg-white hover:bg-gray-100"}    rounded-x-lg overflow-hidden flex flex-col   h-[max-content]`}>
                <div className={`flex-1 py-2   px-2     ${switchTheme ? "border-gray-700 text-gray-400 md:border-t " : "border-gray-300 md:border-r md:border-t md:border-l"}   flex flex-col items-start justify-center`}>
                  <p className='text-[.68rem] break-all'>Access exclusive tools and insights</p>
                  <span className="flex items-center">
                    <FaSquare className='text-[.9rem] text-[gold] mr-2' />
                    <p className='underline text-[.7rem] break-all'>Get hired faster.Try Prepium for free</p>
                  </span>
                </div>
                <div className={`flex-1 py-[.25rem]  flex items-center justify-start  md:border-r md:border-t text-gray-600 md:border-l md:border-b ${switchTheme ? "border-gray-700 " : " border-gray-300 "}   overflow-hidden md:rounded-b-lg px-2 `}>
                  <BsFillBookmarkFill className='text-[.6rem] mr-2' /><span className={`text-sm  ${switchTheme ? 'text-gray-300' : 'text-gray-600'} font-[600]`}>My Items</span>
                </div>
              </div>
              <div className={` ${switchTheme ? "bg-gray-800 " : "bg-white md:border border-gray-300"}   text-blue-600 text-sm   flex flex-col md:rounded-lg overflow-hidden`}>
                <span className='flex-none h-3/4 px-2 flex flex-col justify-center'>
                  <p className='hover:underline cursor-pointer '>Groups</p>
                  <span className='hover:underline cursor-pointer flex items-center jstify-center'>Event <p className='text-blue-500'><FaPlus /></p></span>
                  <p className='hover:underline cursor-pointer mt-4'>Followed HashTags</p>
                </span>

                <Link className={`flex-auto`} to='/'>
                  <span className={` ${switchTheme?"hover:bg-gray-700":"hover:bg-gray-100"} flex w-full h-full items-center justify-center  cursor-pointer`}>Discover more</span>
                </Link>
              </div>
            </div>



          </div>
          <div className=" mt-2 md:mt-0   lg:row-span-2">
            <div className={`w-full hidden md:rounded-lg overflow-hidden   ${switchTheme ? "bg-gray-800 border-gray-700 border " : "bg-white border"} px-4 py-2  min-h-[7.5rem]  md:flex flex-col `}>
              <div className=" flex items-center  justify-between flex-1">
                <div ref={postPicStartRef} className="img w-[3rem] min-w-[3rem] h-[3rem] rounded-full overflow-hidden">
                  {user?.photo &&  <LazyLoadImage
                    width={postPicStartRef?.current?.clientWidth}
                    height={postPicStartRef?.current?.clientHeight}
                    src={user?.photo}
                    placeholderSrc={PLACEHOLDERIMAGE}
                  />}
                </div>
                <div className='w-full' >
                  <div onClick={() => setPostActive(true)} className={`w-full cursor-pointer bg-gray-100 hover:bg-gray-200  ${switchTheme ? "bg-gray-600  border-gray-900  hover:bg-gray-400" : " border-gray-600 border"}  outline-none p-3 ml-2 rounded-[6rem] overflow-hidden`}>
                    start a post
                  </div>
                </div>


                <div className={` z-[1000] hidden fixed ${postActive ? 'md:flex' : 'md:hidden'} top-0 left-0 right-0 bottom-0 pt-8 flex justify-center overflow-auto `}>
                  <div onClick={() => setPostActive(false)} className="top-0 left-0 right-0 bottom-0 absolute bg-black opacity-[.6] ">

                  </div>
                  <form className={`${switchTheme ? 'bg-gray-800' : 'bg-white'} absolute w-full max-w-[34rem] flex flex-col rounded-lg overflow-hidden h-[29rem]`}>
                    <div className={`flex-none ${switchTheme ? 'border-b border-gray-700 text-gray-300' : 'border-b  text-gray-600'} h-[4rem]  flex items-center justify-between px-3`}>
                      <p>Create Post</p>
                      <FaTimes className='cursor-pointer' onClick={handleCancel} />

                    </div>



                    <div className="flex-auto overflow-hidden ">
                      <div className={`w-full h-full flex flex-col  overflow-auto`}>
                        <div className={`flex-none sticky top-0 ${switchTheme ? "bg-gray-800" : "bg-white"} z-[10]   px-3 flex items-center justify-start  h-[5rem]`}>
                          <span className={`flex`}>
                            <div className='w-[3rem] rounded-full overflow-hidden mr-3 h-[3rem] '>
                              {user?.photo && <LazyLoadImage
                                width={profileImageRef?.current.clientWidth}
                                height={profileImageRef?.current.clientHeight}
                                effect='blur'
                                src={user?.photo}
                                placeholderSrc={PLACEHOLDERIMAGE}
                              />}
                            </div>
                            <div >
                              <p className={`${switchTheme ? "text-gray-300" : "text-gray-500"} font-[600] `}>Isaac Anasonye</p>
                              <span className=' border text-gray-500 border-gray-500 rounded-full px-2 flex items-center justify-between'>
                                <BiWorld />
                                <span>Anyone</span>
                                <AiFillCaretDown className='text-[.8rem]' />
                              </span>
                            </div>

                          </span>
                        </div>
                        <textarea onChange={() => {
                          if (feedInput?.current.value !== '') {
                            setButtonActive(true)
                          }
                          else {
                            if (file) {
                              setButtonActive(true)
                            } else {
                              setButtonActive(false)
                            }
                          }
                        }} ref={feedInput} id='text-area' placeholder='what do you want to talk about?' className={`w-full ${switchTheme ? 'bg-gray-800 text-gray-300' : 'bg-white'} flex-none resize-none  overflow-hidden px-3  text-sm outline-none`}></textarea>

                        <div className="flex-auto flex px-3">



                          {
                            component && component
                          }

                          {(currentFileDisplay && file) && <div className='w-full rounded-md overflow-hidden h-[max-content]'>
                            {
                              file?.type.split('/')[0] === 'image' ? <img ref={uploadImageRef} className='w-full h-full' src={currentFileDisplay} alt="" />
                                : file?.type.split('/')[0] === 'video' ? <video  controls className='video-js'>
                                  <source src={currentFileDisplay} type='video/mp4' />
                                </video> : ''
                            }
                          </div>
                          }



                        </div>
                      </div>
                    </div>
                    <div className="flex-none flex flex-col h-[4rem] ">
                      <span className=" flex-1"></span>
                      <span className=" flex-1 flex">
                        {
                          !postEditing &&
                          <span className='w-[55%]   flex items-center justify-between px-2'>
                            {
                              (videoActive === false && pictureActive === false) &&
                              <span>
                                <label htmlFor="file-files">
                                  <AiOutlinePicture className={`text-[2.4rem] p-2 cursor-pointer  ${switchTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}   rounded-full   mr-1`} />
                                </label>
                                <input ref={fileRefAll} onClick={() => {
                                   !feedPostLoading && setCurrentFileDisplay('')
                                }
                                } onChange={handleFileChange
                                } type="file" id='file-files' name='file' disabled={inputDisabled || feedPostLoading} className='hidden' accept='video/*, image/*' />
                              </span>
                            }
                            {
                              pictureActive === true &&
                              <span>
                                <label onClick={() => {
                                  ! feedPostLoading && setCurrentFileDisplay('')
                                }} htmlFor="file-picture">
                                  <AiOutlinePicture className={`text-[2.4rem] cursor-pointer p-2 ${switchTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} rounded-full   mr-1`} />
                                </label>
                                <input ref={fileRefImage} onClick={() => {
                                  setCurrentFileDisplay('')
                                }} onChange={handleImageChange
                                } type="file" id='file-picture' name='file'disabled={inputDisabled || feedPostLoading} accept='image/*' className='hidden' />
                              </span>
                            }

                            {
                              videoActive === true && <span>
                                <label onClick={() =>  !feedPostLoading && setCurrentFileDisplay('')} htmlFor="file-video">
                                  <AiFillPlaySquare className={`text-[2.4rem] p-2 cursor-pointer  ${switchTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} rounded-full    mr-1`} />
                                </label>
                                <input ref={fileRefVideo} onChange={handleVideoChange
                                } type="file" id='file-video' name='file' disabled={inputDisabled || feedPostLoading} accept='video/*' className='hidden' />
                              </span>
                            }

                            <span>
                              <MdOutlineAttachFile className={`text-[2.4rem] cursor-pointer p-2 ${switchTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} rounded-full   rotate-[45deg] mr-1`} />

                            </span>
                            <AiFillFileText className={`text-[2.4rem] cursor-pointer p-2 ${switchTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} rounded-full     mr-1`} />
                            <BsFillBagFill className={`text-[2.4rem] cursor-pointer p-2 ${switchTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} rounded-full  mr-1`} />
                            <TiStarburst className={`text-[2.4rem] cursor-pointer p-2 ${switchTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} rounded-full    mr-1`} />
                            <BsBarChartFill className={`text-[2.4rem] cursor-pointer p-2 ${switchTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} rounded-full    mr-1`} />
                            <BsThreeDots className={`text-[2.4rem] cursor-pointer p-2 ${switchTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} rounded-full    mr-1`} />
                          </span>
                        }
                        <span className='w-[45%] py-2'>
                          <span className='w-full border-l flex items-center text-sm justify-between px-3'>
                            {
                              !postEditing && <div className={`flex items-center ${switchTheme ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100'} rounded-full p-1 px-2 cursor-pointer overflow-hidden`}><BsChatText className='mr-2' /><p>Anyone</p> </div>
                            }
                            {
                              !postEditing && <button disabled={(feedPostLoading || !buttonActive)} onClick={handleFeedSubmit} className={`${(buttonActive && !feedPostLoading) ? 'bg-blue-600 text-white' : `${switchTheme ? "bg-gray-700 text-white " : "bg-gray-100"} bg-gray-100 cursor-not-allowed`} rounded-full p-1 px-4 overflow-hidden`}>
                                {
                                  feedPostLoading && <SyncLoader
                                    color={`${switchTheme ? "white" : "gray"}`}
                                    size={5}
                                    aria-label='Loading Spinner'
                                  />
                                }
                                {
                                  !feedPostLoading && 'post'
                                }

                              </button>
                            }
                            {
                              postEditing && <button disabled={(feedUpdateLoading || !buttonActive)} onClick={handleFeedUpdate} className={`${(buttonActive && !feedUpdateLoading) ? 'bg-blue-600 text-white' : `${switchTheme ? "bg-gray-700 text-white " : "bg-gray-100"} bg-gray-100 cursor-not-allowed`} rounded-full p-1 px-4 overflow-hidden`}>
                                {
                                  feedUpdateLoading && <SyncLoader
                                    color={`${switchTheme ? "white" : "gray"}`}
                                    size={5}
                                    aria-label='Loading Spinner'
                                  />
                                }
                                {
                                  !feedUpdateLoading && 'update'
                                }

                              </button>
                            }
                          </span>
                        </span>
                      </span>
                    </div>
                  </form>

                </div>
              </div>


              <div className="flex flex-wrap items-center justify-around flex-1">

                <label onClick={() => {
                  setPictureActive(true)
                  setPostActive(true)
                  setCurrentFileDisplay('')
                }} htmlFor='file-picture' className={`flex  mt-1 duration-300 font-[500]  ${switchTheme ? 'hover:bg-gray-700 text-gray-300 ' : 'hover:bg-gray-100 text-gray-500'} cursor-pointer p-2 py-3  rounded-md text-sm items-center justify-center`}>
                  <AiFillPicture className='text-blue-500 mr-2  rounded-md text-2xl ' />Picture
                  <input ref={fileRefImage} onClick={(e) => e.target.value = ''} onChange={handleImageChange
                  } type="file" id='file-image' name='file' disabled={inputDisabled} accept='image/*' className='hidden' />
                </label>

                <label onClick={() => {
                  setVideoActive(true)
                  setPostActive(true)
                  setCurrentFileDisplay('')
                }} htmlFor='file-video' className={`flex   mt-1 duration-300 font-[500]  ${switchTheme ? 'hover:bg-gray-700 text-gray-300 ' : 'hover:bg-gray-100  text-gray-500'} cursor-pointer p-2 py-3  rounded-md text-sm items-center justify-center`}>
                  <AiFillPlaySquare className='text-blue-500 mr-2 text-red-500  rounded-md text-2xl ' />Video
                  <input ref={fileRefVideo} onClick={(e) => e.target.value = ''} onChange={handleVideoChange
                  } type="file" id='file-video' name='file' disabled={inputDisabled} accept='video/*' className='hidden' />
                </label>


              </div>
            </div>
            <div className="h-[2.5rem] hidden md:flex cursor-pointer items-center justify-between ">
              <div className="h-[.1rem] bg-gray-400 bg-black w-[70%]"></div>
              <span className='text-sm flex items-center justify-between'><p className='text-gray-400'>Sort by: </p> <p className='text-gray-600'> Top</p> <FaCaretDown /> </span>
            </div>

            {/* feed section */}

            {
              feeds && FEED()

            }
          </div>
          <div className=" hidden md:flex sticky top-[4rem] flex-col">
            <div className={`h-[max-content]   ${switchTheme ? "bg-gray-800  " : "bg-white border border-gray-300"}  md:rounded-lg overflow-hidden  mb-[1rem] flex flex-col`}>
              <div className=" flex py-3 ">
                <span className={`flex-auto  ${switchTheme ? 'text-gray-300' : 'text-gray-600'} flex text-gray-500 font-[600] items-center justify-start pl-4`}>
                  Add to your feed
                </span>
                <span className="flex-none w-[2rem]  flex items-center  justify-center ">
                  <FaInfo className='bg-gray-600 text-white p-[.1rem] rounded-[.1rem] overflow-hidden   text-[.85rem]' />
                </span>
              </div>
              <div className=" flex  flex-col">
                {
                  storedRandomUsers?.map(item => {
                    return <RandomFollowCard storedRandomUsers={storedRandomUsers} setStoredRandomUsers={setStoredRandomUsers} PF={PF} key={item?._id} user={item} />
                  })
                }
              </div>

              <div className={`  ${switchTheme ? "hover:bg-gray-500 " : "hover:bg-gray-200"}  mb-1 w-[max-content] flex text-gray-400 ml-3 items-center h-[2.3rem] px-1 rounded-md overflow-hidden cursor-pointer justify-start  `}>
                <Link to='/my-network'>
                  <p className={` ${switchTheme ? 'text-gray-300 ' : 'text-gray-600'}`}>View all recommendations</p>
                </Link>
                <FaArrowRight className='ml-2' />

              </div>
            </div>
            <div className={`md:rounded-lg ${switchTheme ? "bg-gray-900" : "bg-gray-100"} overflow-hidden w-full flex flex-col h-[max-content]`}>
              <span className='w-full flex flex-wrap h-full py-2 items-center justify-center' >
                <p className='flex break-all items-center justify-center  text-[.8rem] mb-2 text-gray-500 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>About</span> <span className='mr-2 cursor-pointer hover:underline hover:text-blue-700'>Accessibility</span> <span className='hover:underline cursor-pointer hover:text-blue-700'>Help Center</span></p>
                <p className=' flex break-all  cursor-pointeritems-center justify-center text-[.8rem] mb-2 text-gray-500 '><span className='mr-2 flex items-center justify-center hover:underline cursor-pointer hover:text-blue-700'>Privacy & Terms<BsChevronCompactDown /></span>  <span className='cursor-pointer hover:underline hover:text-blue-700'>Ad Choices</span></p>
                <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Advertising</span> <span className='flex items-center justify-center hover:underline hover:text-blue-700 cursor-pointer'>Business services<BsChevronCompactDown /></span></p>
                <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Get the linkdn app   </span> <span className='hover:underline hover:text-blue-700 cursor-pointer'>More</span></p>
                <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500'> <span className='text-blue-700 text-[1.1rem] font-[700]'>Linkdn</span>  <AiFillLinkedin className={`text-blue-700   text-[1.3rem]`} /> <span className={`${switchTheme ? "text-gray-300" : "text-gray-700 "} `}>linkdedin corporation @ 2022</span> </p>
              </span>

            </div>
          </div>
        </div>




        <ToastContainer
          position={"top-right"}
          cloaseOnClick={true}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          autoClose={2000}
          dragable={true}
          claseButton={<p>Close</p>}
        />

      </div>

      {
        !searchActiveSmall && <FootBar />
      }



    </div>
  )
  // : <div className='w-full h-full flex items-center justify-center'>
  //         <ClipLoader color={'#D0021B'} loading={pageLoading} size={150}/>
  // </div>
}
export default Home

