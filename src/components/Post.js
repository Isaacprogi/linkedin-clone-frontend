import React from 'react'
import { useFeedUploadContext } from '../hooks/useFeedUploadContext'
import { FaTimes } from 'react-icons/fa'
import { BiWorld, BiHash } from 'react-icons/bi'
import { MdOutlineAttachFile } from 'react-icons/md'
import { AiOutlinePicture, AiFillCaretDown } from 'react-icons/ai'
import { SyncLoader } from 'react-spinners'
import { useUserContext } from '../hooks/useUserContext'
import { useThemeContext } from '../hooks/useThemeContext'
import { ToastContainer } from 'react-toastify'

const Post = ({ feeds, setFeeds }) => {

    const { user} = useUserContext()
    const { switchTheme } = useThemeContext()

    const { postActiveSmall,
        file,
        setFile,
        controller,
        setPostActiveSmall,
        currentFileDisplay, setCurrentFileDisplay, inputDisabledSmall,
        buttonActiveSmall,
        setButtonActiveSmall,
        postEditingSmall,
        setPostEditingSmall,
        componentSmall,
        setComponentSmall,
        uploadImageRef,
        handleFileChange, feedUpdateLoadingSmall, feedPostLoadingSmall, handleFeedSubmitSmall, feedInputSmall, handleFeedUpdateSmall, fileRefInputSmall } = useFeedUploadContext()


    return (
        <div className={`w-full ${!postActiveSmall ? 'hidden' : 'flex fixed'} h-screen md:hidden md:hidden  z-[600] `}>

            <form className={`${switchTheme ? "bg-gray-800 text-gray-300" : "bg-white "}  w-full h-full  flex flex-col  overflow-hidden `}>
                <div className={`flex-none ${switchTheme ? "border-gray-900 text-gray-300" : ""} border-b h-[4rem]  flex items-center justify-between px-3 text-gray-600`}>
                    <span className={` ${switchTheme ? "text-gray-300" : ""} flex items-center justify-between`}>
                        <FaTimes className='text-xl mr-2 cursor-pointer' onClick={() => {
                            setCurrentFileDisplay('')
                            feedInputSmall.current.value = ''
                            if (fileRefInputSmall?.current?.value) {
                                fileRefInputSmall.current.value = ''
                            }
                            setComponentSmall('')
                            setPostActiveSmall(false)
                            setButtonActiveSmall(false)
                            setPostEditingSmall(false)
                            controller.abort()
                            setFile("")
                        }} />
                        <p >Share Post</p>
                    </span>
                    {
                        !postEditingSmall && <button disabled={(feedPostLoadingSmall || !buttonActiveSmall)} onClick={(e) => {
                            handleFeedSubmitSmall(e, setFeeds)
                        }} className={`px-2 ${(buttonActiveSmall && !feedPostLoadingSmall) ? 'bg-blue-600 cursor-pointer text-white' : `${switchTheme ? "bg-gray-700 text-gray-300" : "bg-gray-100"}  cursor-not-allowed`} h-[1.5rem] flex items-center w-[4rem] justify-center   rounded-full overflow-hidden `}>
 
                            {
                                feedPostLoadingSmall ? <SyncLoader size={5} color={`${switchTheme ? "white" : "gray"}`} /> : 'post'
                            }

                        </button>
                    }



                    {
                        postEditingSmall && <button disabled={(feedUpdateLoadingSmall || !buttonActiveSmall)} onClick={(e) => {
                            handleFeedUpdateSmall(e, feeds, setFeeds)
                        }} className={`px-2 ${(buttonActiveSmall && !feedUpdateLoadingSmall) ? 'bg-blue-600 text-white cursor-pointer' : ' bg-gray-100 cursor-not-allowed'} max-h-[2rem] flex items-center  justify-center rounded-full overflow-hidden `}>
                            {
                                feedUpdateLoadingSmall ? <SyncLoader size={5} color={`${switchTheme ? "white" : "gray"}`} /> : 'update'
                            }

                        </button>
                    }

                </div>



                <div className="w-full h-full  flex flex-col items-start justify-start  overflow-auto">
                    <div className="flex-none  px-3 flex items-center justify-start  h-[5rem]">
                        <span className='flex '>
                            <div className='w-[3rem] rounded-full overflow-hidden mr-3 h-[3rem] '>
                                <img src={user?.photo} className='w-full h-full' alt="" />
                            </div>
                            <div >
                                <p className={`${switchTheme ? 'text-gray-300' : "text-gray-500"} font-[600] `}>Isaac Anasonye</p>
                                <span className={`${switchTheme ? "text-gray-400" : ""} border text-gray-500 border-gray-500 rounded-full px-2 flex items-center justify-between`}>
                                    <BiWorld />
                                    <span>Anyone</span>
                                    <AiFillCaretDown className='text-[.8rem] cursor-pointer' />
                                </span>
                            </div>

                        </span>
                    </div>
                    <textarea onChange={() => {
                        if (file === '') {
                            if (feedInputSmall.current.value === '') {
                                return setButtonActiveSmall(false)
                            }
                            else {
                                return setButtonActiveSmall(true)
                            }
                        }
                        else {
                            return setButtonActiveSmall(true)
                        }


                    }}
                     ref={feedInputSmall} id='text-area-small' 
                     placeholder='what do you want to talk about?'
                      className={`w-full ${switchTheme ? "bg-gray-700" : "bg-white"}  
                      flex-none overflow-hidden  resize-none   px-3  text-sm outline-none`}>

                      </textarea>



                    <div className={`flex-none p-2 w-full flex`}>


                        {
                            postEditingSmall &&
                            componentSmall
                        }



                        {!postEditingSmall && (currentFileDisplay && file) && <div className='w-full rounded-md overflow-hidden h-[max-content]'>
                            {
                                file?.type.split('/')[0] === 'image' ? <img ref={uploadImageRef} className='w-full h-full' src={currentFileDisplay} alt="" />
                                    : file?.type.split('/')[0] === 'video' ? <video controls className='video-js'>
                                        <source src={currentFileDisplay} type='video/mp4' />
                                    </video> : ''
                            }
                        </div>
                        }

                    </div>

                    <div className=" flex flex-col  h-[max-content] ">
                        <span className=" flex-1  flex ">
                            {
                                !postEditingSmall &&
                                <span className='w-full  flex items-center justify-start px-2'>
                                    <span className={`${switchTheme ? "text-gray-300" : "text-gray-600"} flex items-center justify-start `}>
                                        <label htmlFor="file2">
                                            <AiOutlinePicture className={`text-[2.4rem] p-2  ${!inputDisabledSmall ? `${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  cursor-pointer` : `cursor-not-allowed`} rounded-full    mr-1`} />
                                        </label>
                                        <input onClick={() => {
                                            setCurrentFileDisplay('')
                                        }} onChange={handleFileChange
                                        } type="file" id='file2' ref={fileRefInputSmall} name='file2' disabled={inputDisabledSmall || feedPostLoadingSmall} className='hidden' />
                                    </span>
                                    <span className='flex  items-center justify-start'>
                                        <label htmlFor="file">
                                            <MdOutlineAttachFile className={`text-[2.4rem] p-2 ${!inputDisabledSmall ? `${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  cursor-pointer` : 'cursor-not-allowed'}  rounded-full  rotate-[45deg] mr-1`} />
                                        </label>

                                        <input disabled={!inputDisabledSmall} type="file" id='file' name='file' className='hidden' />
                                    </span>
                                    <span className='flex items-center justify-start '>
                                        <BiHash className={`text-[2.4rem] p-2 ${!inputDisabledSmall ? `${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}  cursor-pointer` : 'cursor-not-allowed'} rounded-full     mr-1`} />

                                    </span>

                                </span>
                            }
                        </span>

                        <span className='flex items-center justify-between'>
                        </span>
                    </div>

                </div>
            </form>

            <ToastContainer
                position={"top-right"}
                cloaseOnClick={true}
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                autoClose={2000}
                dragable={true}
                closeButton={<p>Close</p>}
            />

        </div>
    )
}

export default Post