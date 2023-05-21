import React from 'react'
import { useState } from 'react'
import NavBar from '../components/NavBar'
import FootBar from '../components/FootBar'
import { useScroller } from '../hooks/useScroller'
import { PeopleCardD } from '../components/PeopleCardD'
import { BiBookOpen } from 'react-icons/bi'
import { BsChevronCompactDown } from 'react-icons/bs'
import { AiFillCaretDown, AiFillLinkedin } from 'react-icons/ai'
import Hiring from '../images/hiring.png'
import { FaSearch } from 'react-icons/fa'
import {useUsersContext} from '../hooks/useUsersContext'
import {MessagePopChatSpace} from '../components/MessagePopChatSpace'
import { axiosFetch } from '../utils/axiosFetch'
import { useUserContext } from '../hooks/useUserContext'
import {useConnectionContext} from '../hooks/useConnectionContext'

const People = ({ postActiveSmall, setPostActiveSmall }) => {
  const displayNav = useScroller('scroll-network')
  const connections = true
  const [sort,setSort] = useState(false)
  const {PF} = useUsersContext()
  const [chatData,setChatData] = useState(null)
  const [pop,setPop] = useState(false)
  const {user} = useUserContext()
  const {connections:allConnections} = useConnectionContext()


  const handleEnterChat = async(newChatUser) => {
     if(user && newChatUser){
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.access}`
        }
      }
      try{
        const {data} = await axiosFetch.post('chat', {userId:newChatUser._id}, config)
        setChatData(data)
        setPop(true)  
      }catch(error){
        console.log(error)
        setPop(false)
      }
     }
  
  }

  const cardProps = {
    setChatData,setPop,pop,PF,handleEnterChat
  }



  return (
    <div id='scroll-network' className="w-full h-full relative overflow-auto">
      <NavBar connections={connections} displayNav={displayNav} />
      <div className="container mt-1 w-full flex-auto container mx-auto h-full">
        <div className='w-full h-[max-content] md:pt-6  md:grid md:grid-cols-medium-connections md:gap-4 '>
          <div className="bg-white sm:rounded-lg sm:border-gray-200 sm:border  h-full ">
            <div className="w-full border-b p-3 flex flex-col ">
              <span className='text-2xl mb-2 '>522 connections</span>
              <span className='flex items-center justify-between'>
                <div className=' items-center hidden md:flex ml-2 mt-2'>Sort by: 
                  <div  onClick={()=>setSort(!sort)} className='flex items-center relative cursor-pointer'>
                  <span className='mr-2 ml-2'>Recently Added </span> 
                  <AiFillCaretDown />
                    {
                      sort && <span className="absolute bg-white w-[10rem] rounded-lg border border-gray-200  font-[500] text-gray-500 py-2 top-7">
                      <div className='px-2 py-1 hover:bg-gray-200 cursor-pointer '>Recently Added</div>
                      <div className='px-2 py-1 hover:bg-gray-200 cursor-pointer '>First Name</div>
                      <div className='px-2 py-1 hover:bg-gray-200 cursor-pointer '>Last Name</div>
                  </span>
                    }
                  </div>
                </div>

                <div className='flex items-center'>
                  <div className=' border p-2 flex items-center hover:border-gray-700  border-gray-200 rounded-md bg-gray-100'>
                    <FaSearch className='mr-1' />
                    <input type="text" className='bg-gray-100 outline-none' />
                  </div>
                  <span className='text-blue-500 hidden md:block ml-2 cursor-pointer'>search with filters</span>

                </div>

              </span>

            </div>

            {
             (allConnections && user) && allConnections?.map((connection=>{
               return connection?.users?.map(item=>{
                 return item._id === user?._id?'':  <PeopleCardD key={item._id} {...cardProps} user={item} />
               })
             }))
           }
               
          </div>


          <div className='h-full hidden md:block flex flex-col sticky top-[5rem] h-[45rem]'>

            <span className='flex items-center '>
              <BiBookOpen />
              <p>Manage Synced and imported contacts</p>
            </span>

            <div className="h-[15rem] flex px-2 flex-col rounded-lg border border-gray-200 mb-2 items-center justify-center bg-white w-full">
              <p className="break-al mb-2">Add to personal contact</p>
              <p className="break-all mb-2 text-[.8rem] text-gray-500">We periodically import and store Contacts
                to help you annd others connect.You choose who to connect to and
                who to invite. <span className='text-blue-600 mb-2 text-md font-[500]'>Learn more</span>
              </p>
              <input type="text" className='w-full mb-2 p-2 border border-gray-400' placeholder='isaaconyes80@gmail.com' />
              <span className="px-4 py-1 bg-white border cursor-pointer rounded-full overflow-hidden border-blue-500 font-[600] text-blue-600">Continue</span>
              <p className='text-gray-500 cursor-pointer'>More options</p>

            </div>


            <div className=" hidden md:flex flex-col ">

              <div className="bg-gray-100 md:rounded-lg overflow-hidden w-full flex flex-col h-[max-content]">
                <span className='w-full h-[14rem] bg-white overflow-hidden'>
                  <div className='w-full h-full max-w-[23rem] mx-auto'><img src={Hiring} className='w-full h-full' alt="" /></div>
                </span>

                <span className='w-full flex flex-wrap h-full py-2 items-center justify-center' >
                  <p className='flex break-all items-center justify-center  text-[.8rem] mb-2 text-gray-500 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>About</span> <span className='mr-2 cursor-pointer hover:underline hover:text-blue-700'>Accessibility</span> <span className='hover:underline cursor-pointer hover:text-blue-700'>Help Center</span></p>
                  <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500 '><span className='mr-2 flex items-center justify-center hover:underline cursor-pointer hover:text-blue-700'>Privacy & Terms<BsChevronCompactDown /></span>  <span className='cursor-pointer hover:underline hover:text-blue-700'>Ad Choices</span></p>
                  <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500 mr-1'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Advertising</span> <span className='flex items-center justify-center hover:underline hover:text-blue-700 cursor-pointer'>Business services<BsChevronCompactDown /></span></p>
                  <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500'><span className='mr-2 hover:underline hover:text-blue-700 cursor-pointer'>Get the linkdn app   </span> <span className='hover:underline hover:text-blue-700 cursor-pointer'>More</span></p>
                  <p className=' flex break-all items-center justify-center text-[.8rem] mb-2 text-gray-500'> <span className='text-blue-700 text-[1.1rem] font-[700]'>Linkdn</span>  <AiFillLinkedin className='text-blue-700 text-[1.3rem]' /> <span className='text-gray-700'>linkdedin corporation @ 2022</span> </p>
                </span>

              </div>
            </div>




          </div>
        </div>

      </div>
      {(pop && chatData)? <MessagePopChatSpace  chatData={chatData} PF={PF} setPop={setPop}/>:''}
      <FootBar postActiveSmall={postActiveSmall} setPostActiveSmall={setPostActiveSmall} />
    </div>

  )
}


export default People