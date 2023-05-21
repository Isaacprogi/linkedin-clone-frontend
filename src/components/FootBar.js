import React from 'react'
import { MdHome } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'
import { BsFillBagFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { MdAddBox } from 'react-icons/md'
import { useFeedUploadContext } from '../hooks/useFeedUploadContext'
import { useThemeContext } from '../hooks/useThemeContext'
import { useConnectionContext } from '../hooks/useConnectionContext'




const FootBar = () => {
  const {postActiveSmall,setPostActiveSmall} = useFeedUploadContext()
  const {switchTheme} = useThemeContext()
  const { pendingConnections } = useConnectionContext()



  return <div className={`w-full h-[3.3rem] ${postActiveSmall?'hidden':''} z-[900] md:hidden grid grid-cols-5 justify-between ${switchTheme?'bg-gray-800 text-gray-300':'bg-white text-[#808080]'}  fixed bottom-0 left-0`}>
    <div className={` ${switchTheme ? "active:bg-gray-700" : "active:bg-gray-100"}  overflow-x-hidden `}>
      <Link to='/'>
        <span className='relative cursor-pointer  w-full h-full flex flex-col items-center justify-center'><MdHome className='text-[1.52rem]' />
          <p className='text-[.6rem]'>Home</p>
        </span>
      </Link>
    </div>

    <div className={` ${switchTheme ? "active:bg-gray-700" : "active:bg-gray-100"}  overflow-x-hidden `}>
      <Link to='/my-network' className='bg-red-700 active:bg-gray-100'>
        <span className='relative w-full h-full   flex flex-col items-center justify-center'>
        <span className='relative'>
                  <BsFillPeopleFill className={`text-[1.52rem] ${switchTheme ? "text-gray-300" : ""} `} />
                  {
                    (pendingConnections?.length < 1) ? '' :
                      <div className="absolute top-[.1rem] right-[-.65rem] rounded-full overflow-hidden w-[1.3rem] h-[1.3rem] bg-red-500">
                        <span className='w-full h-full relative flex items-center justify-center '>
                          <span className='text-white text-[.7rem]'>
                          {  
                              pendingConnections.filter(connection => connection?.pending === true).length > 50 ?
                              '50+':
                              pendingConnections.filter(connection => connection?.pending === true).length
                            }
                          </span>
                        </span>
                      </div>
                  }
                </span>
          <p className='text-[.6rem] whitespace-nowrap'>My Network</p>
        </span>
      </Link>
    </div>

    <div onClick={() => setPostActiveSmall(!postActiveSmall)} className={` ${switchTheme ? "active:bg-gray-700" : "active:bg-gray-100"}  overflow-x-hidden `}>

      <span className='relative w-full h-full    flex flex-col items-center justify-center'><MdAddBox className='text-[1.52rem]' />
        <p className='text-[.6rem]'>Post</p>
      </span>

    </div>
    
    <div className={` ${switchTheme ? "active:bg-gray-700" : "active:bg-gray-100"}  overflow-x-hidden `}>
      <Link to='/notifications'>
        <span className='relative w-full h-full   flex flex-col items-center justify-center'><IoMdNotifications className='text-[1.52rem]' />
          <p className='text-[.6rem]'>Notifications</p>
        </span>
      </Link>
      </div>

      <div className={` ${switchTheme ? "active:bg-gray-700" : "active:bg-gray-100"}  overflow-x-hidden `}>
      <Link to='/jobs'>
        <span className='relative w-full h-full   flex flex-col items-center justify-center'><BsFillBagFill className='text-[1.52rem]' />
          <p className='text-[.6rem]'>Jobs</p>
        </span>
      </Link></div>

  </div>
}

export default FootBar