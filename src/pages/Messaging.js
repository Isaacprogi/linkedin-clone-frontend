import { FaArrowLeft } from 'react-icons/fa'
import { BsPencilSquare } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'
import NavBar from '../components/NavBar'
import { MessageBoxMedium } from '../components/MessageBox'
import { MessageBoxSmall } from '../components/MessageBox'
import { ChatSpaceMedium } from './ChatSpaceMedium'
import Future from '../images/future.png'
import { BsChevronCompactDown } from 'react-icons/bs'
import { AiFillLinkedin } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import {useChatContext} from '../hooks/useChatContext'
import { useState , useRef, useMemo} from 'react'
import {useUserContext} from '../hooks/useUserContext'
import {axiosFetch} from '../utils/axiosFetch'
import axios from 'axios'
import { useThemeContext } from '../hooks/useThemeContext'


const Messaging = ({socket}) => {
   const {chats, PF, dispatch:chatDispatch} = useChatContext() 
   const navigate = useNavigate()
   const [fetching,setFetching] = useState(false)
   const searchRef = useRef('')
   const {user} = useUserContext()
   const {switchTheme} = useThemeContext()

   const config2 = useMemo(() => ({
    Accept: 'application/json',
    Authorization: `Bearer ${user?.access}`
}), [user?.access])


   const handleSearch = async() => {
    if(user?.access){
      try{
        const {data}  = await axiosFetch.get('chat',  {headers:config2, params:{search:searchRef?.current?.value}})
        chatDispatch({
          type:'GET_CHATS',
          payload:data
        })
      }catch(error){
        if(axios.isCancel(error)) return
        console.log(error)
      }
    }
  }


  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <NavBar messaging={true} />
      <div className="md:container w-full flex-auto  mx-auto h-full">
        <div className='w-full h-full md:pt-7 grid md:px-[4.5rem]  md:grid-cols-medium-messaging lg:grid-cols-large-messaging'>
          <div className={` md:h-[calc(100vh-5.4rem)] md:min-h-[25rem]   flex flex-col ${switchTheme?'bg-gray-800':'bg-white border-gray-300 md:border  '}  md:rounded-tl-lg `}>
            <div className=" h-[4.2rem] md:h-[3rem] flex-none text-gray-500 flex items-center justify-between px-3 md:px-2">
              <span className='flex  items-center justify-between'>
                <FaArrowLeft onClick={() => navigate(-1)} className={`${switchTheme?"text-gray-300":""} mr-3 cursor-pointer md:hidden` }/> 
              <p className={`${switchTheme?"text-gray-300 font-[600]":""}`}>
                Messages</p>
                </span>
              <BsPencilSquare  className={`${switchTheme?"text-gray-300":""} cursor-pointer`} />
            </div>
            {switchTheme?<hr className='border-gray-900'/>:<hr />}
            <div className=" px-2  h-[4rem] flex-none flex items-center ">
              <span className={`w-full  rounded-md overflow-hidden hover:border border-black  ${switchTheme?'bg-gray-700 text-gray-300':'bg-blue-100 text-gray-500'} py-[.3rem] px-2 flex items-center justify-between `}>
                <span className='flex items-center w-full   justify-between'>
                  <FaSearch className='mr-2' />
                 <input ref={searchRef} onChange={handleSearch} className={`w-full py-1 ${switchTheme?'bg-gray-700':'bg-blue-100'}  outline-none text-sm`} placeholder='Search messages' type="text" /></span>
                  <BsPencilSquare className={`${switchTheme?"text-gray-300":""} cursor-pointer`} />
                 </span>
            </div>
            {switchTheme?"":<hr />}
            <MessageBoxMedium fetching={fetching} setFetching={setFetching}  socket={socket} chats={chats} PF={PF} />
            <MessageBoxSmall fetching={fetching} setFetching={setFetching} socket={socket} chats={chats} PF={PF}/>
          </div>
          <div className="md:h-[calc(100vh-5.4rem)] md:min-h-[25rem] hidden md:block">
            
            {chats && <ChatSpaceMedium fetching={fetching} setFetching={setFetching} socket={socket} chats={chats} PF={PF} />}
          </div>
          <div className=" hidden  lg:flex md:col-span-2 lg:col-span-1 flex-col lg:ml-6  justify-start items-center">
            <div className=" rounded-md flex items-center justify-center overflow-hidden w-full max-w-[18rem] h-[15rem]">
              <img src={Future} className='w-[110%] h-[110%]' alt="" />
            </div>
            <span className='w-full flex flex-wrap h-[max-content] py-2 items-center justify-center' >
              <p className='flex break-all items-center justify-center  text-[.8rem] mb-2 text-gray-500 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>About</span> <span className='mr-2 cursor-pointer hover:underline hover:text-blue-700'>Accessibility</span> <span className='hover:underline cursor-pointer hover:text-blue-700'>Help Center</span></p>
              <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500 '><span className='mr-2 flex items-center justify-center hover:underline cursor-pointer hover:text-blue-700'>Privacy & Terms<BsChevronCompactDown /></span>  <span className='cursor-pointer hover:underline hover:text-blue-700'>Ad Choices</span></p>
              <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Advertising</span> <span className='flex items-center justify-center hover:underline hover:text-blue-700 cursor-pointer'>Business services<BsChevronCompactDown /></span></p>
              <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Get the linkdn app   </span> <span className='hover:underline hover:text-blue-700 cursor-pointer'>More</span></p>
              <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500'> <span className='text-blue-700 text-[1.1rem] font-[700]'>Linkdn</span>  <AiFillLinkedin className={`text-blue-700   text-[1.3rem]`} /> <span className={`${switchTheme ? "text-gray-300" : "text-gray-700 "} `}>linkdedin corporation @ 2022</span> </p>
            </span>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Messaging