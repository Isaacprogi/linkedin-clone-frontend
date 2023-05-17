import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import {FaInfo, } from 'react-icons/fa'
import Hiring from '../images/hiring.png'
import { BsChevronCompactDown } from 'react-icons/bs'
import { AiFillLinkedin } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { useThemeContext } from '../hooks/useThemeContext'
import Ibm from '../images/ibm.png'
import Tesla from '../images/tesla.png'
import Shipper from '../images/shipper.png'


import Turing from '../images/turing.png'
import Brad from '../images/brad.png'
import Amazon from '../images/amazon.png'
import Google from '../images/google.png'
import View from '../images/vie.png'
import {useScroller}  from '../hooks/useScroller'
import FootBar from '../components/FootBar'


const Notifications = ({postActiveSmall,setPostActiveSmall}) => {
  const [searchActiveSmall, setSearchActiveSmall] = useState(false)
  const {switchTheme} = useThemeContext()
  
  const displayNav = useScroller('scroll-notifications')

  return <div id='scroll-notifications' className="w-full flex flex-col overflow-auto h-full">
            <NavBar  searchActiveSmall={searchActiveSmall} setSearchActiveSmall={setSearchActiveSmall} displayNav={displayNav}/>
  <div className="container w-full flex-auto container mx-auto h-full">
    <div className='w-full h-[max-content] md:px-[4.5rem] mt-[.5rem] md:mt-[1.8rem]   grid md:gap-[1rem] md:grid-cols-medium lg:grid-cols-large2'>
      <div className={`md:sticky   md:top-[4rem] md:h-[20rem] min-h-[5rem] px-4  md:row-span-2 hidden md:flex sm:rounded-t-lg  overflow-hidden`}>
        <span className={`bg-white  ${switchTheme ? "bg-gray-800 " : "bg-white border border-gray-300 "}   w-full rounded-lg overflow-hidden  md:flex md:items-start px-2 py-4  md:flex-col h-[max-content] flex items-center justify-between   md:justify-center  md:h-[7rem]`}>
          <span className={`flex ${switchTheme?"text-gray-300":"text-gray-500 "} md:flex-col `}>
            <p className={`font-[700]  `}>Manage your <span className='md:hidden text-gray-500'>Notifications</span></p>
            <p className='font-[700]  hidden md:block'>Notifications</p>

          </span>
          <p className='text-blue-700 font-[400] hover:underline cursor-pointer text-[.8rem]'>View Settings</p>

        </span>
      </div>

      <div className={`  ${switchTheme ? "bg-gray-800 border-gray-800" : "bg-white border border-gray-300 "} md:rounded-lg mb-[3.5rem]  md:mb-2 pb-10    overflow-hidden  lg:row-span-2 grid grid-flow-row auto-rows-[max-content]`}>
        <div className={`w-full h-[5rem] ${switchTheme ? "hover:bg-gray-700" : "hover:bg-gray-200"}  cursor-pointer flex `}>
          <span className="w-[6rem] flex items-center justify-center  flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={Google} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-center justify-start text-gray-600   ">
            <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              Google is shutting down one of its most popular chat apps. See more news on company decision
            </p>
          </span>
          <span className="w-[4rem] text-gray-500 flex-none h-full flex items-center justify-center flex-col text-[.7rem] ">
            <p>1min</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>
        <div className={`w-full h-[5rem]  ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "}  cursor-pointer flex `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={View} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-start flex-col justify-center  ">
            <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              1 person viewed your profile
            </p>
            <span className='border-blue-600 border px-3 py-2  text-[.7rem] rounded-full font-[600] text-blue-600'>Try Premium Free for 1 Month</span>
          </span>
          <span className="w-[4rem] text-gray-500 flex-none h-full flex items-center text-[.7rem] justify-center flex-col ">
            <p>3min</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>
        <div className={`w-full h-[5rem] ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "} cursor-pointer flex `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={Google} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-start flex-col justify-center  ">
          <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              New Job ALerts
            </p>
            <span className='border-blue-600 border text-[.7rem] px-3 py-1 overflow-hidden whitespace-nowrap rounded-full font-[600] text-blue-600'>View 1 Job</span>
          </span>
          <span className="w-[4rem] text-gray-500 flex-none h-full flex items-center text-[.7rem] justify-center flex-col ">
            <p>4min</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>

        {/* next */}
        <div className={`w-full h-[5rem]  ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "} cursor-pointer flex `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={Amazon} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-center justify-start text-gray-600   ">
          <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              Amazon's stock fell sharply after projecting soft end-year sales. See more news on the company's latest numbers
            </p>
          </span>
          <span className="w-[4rem] flex-none text-gray-500 h-full flex text-[.7rem] items-center justify-center flex-col ">
            <p>6min</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>

        {/* next */}
        <div className={`w-full h-[5rem]  ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "} cursor-pointer flex `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={Turing} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-center justify-start text-gray-600   ">
          <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              Turing is offering job opportunities
            </p>
          </span>
          <span className="w-[4rem] flex-none text-gray-500 h-full flex items-center text-[.7rem] justify-center flex-col ">
            <p>7min</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>

        {/* next */}
        <div className={`w-full h-[5rem]  ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "} cursor-pointer flex `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={View} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-center justify-start text-gray-600   ">
          <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              You appeared in 12 searches this week
            </p>
          </span>
          <span className="w-[4rem] flex-none h-full text-gray-500 flex text-[.7rem] items-center justify-center flex-col ">
            <p>10min</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>
        {/* next */}
        <div className={`w-full h-[5rem]  ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "} cursor-pointer flex `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={Brad} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-center justify-start text-gray-600   ">
          <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              Google is paying tribut to a video game pioneer. See more news on this 
              groundbreaking inventor
            </p>
          </span>
          <span className="w-[4rem] flex-none text-[.7rem] h-full text-gray-500 flex items-center justify-center flex-col ">
            <p>5hr</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>


        {/* next */}
        <div className={`w-full h-[5rem] hover:bg-gray-200 cursor-pointer flex mb-1  ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "}  `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={Amazon} alt="" className="w-full h-full" />
              
            </div>
          </span>
          <span className="flex-auto h-full flex items-center justify-start text-gray-600   ">
          <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              Amazon Web Services(AWS) was live.AWS on Air Live at re-invent 2022
            </p>
          </span>
          <span className="w-[4rem] flex-none h-full text-[.7rem] text-gray-500 flex items-center justify-center flex-col ">
            <p>4hr</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>
         {/* {next} */}

        <div className={`w-full h-[5rem]  hover:bg-gray-200 cursor-pointer flex mb-1  ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "} `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={Ibm} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-center justify-start text-gray-600   ">
          <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              Tesla grid n the EV market mzy be slipping. See the latest industry-wide saes numbers
            </p>
          </span>
          <span className="w-[4rem] flex-none h-full flex text-[.7rem] text-gray-500 items-center justify-center flex-col ">
            <p>1hr</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>
        {/* {next} */}
        <div className={`w-full h-[5rem] hover:bg-gray-200  ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "} cursor-pointer flex mb-1 `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={Tesla} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-center justify-start text-gray-600   ">
          <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              IBM is ending a major global partnership. See more news in the company's announcement
            </p>
          </span>
          <span className="w-[4rem] flex-none h-full text-[.7rem] flex text-gray-500 items-center justify-center flex-col ">
            <p>2hr</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>

          {/* next */}
          <div className={`w-full  ${switchTheme ? "hover:bg-gray-700 " : "hover:bg-gray-200 "} h-[5rem] hover:bg-gray-200  cursor-pointer flex `}>
          <span className="w-[6rem] flex items-center justify-center flex-none  h-full">
            <div className="w-[3rem] h-[3rem] overflow-hidden">
              <img src={Shipper} alt="" className="w-full h-full" />
            </div>
          </span>
          <span className="flex-auto h-full flex items-center justify-start text-gray-600   ">
          <p className={`elip ${switchTheme?"text-gray-300":"text-gray-600"}`}>
              Shipper didn't have their way on this big deal this time
            </p>
          </span>
          <span className="w-[4rem] flex-none h-full text-[.7rem] text-gray-500 flex items-center justify-center flex-col ">
            <p>10hr</p>
            <BsThreeDots className='text-2xl hover:bg-gray-300 cursor-pointer rounded-full overflow-hidden p-1' />
          </span>

        </div>

      </div>


      <div className=" hidden md:flex  flex-col">
        <div className={`h-[max-content]    ${switchTheme ? "bg-gray-800" : "bg-white border-gray-300 border"}  md:rounded-lg overflow-hidden  mb-[1rem] flex flex-col`}>
          <div className=" flex py-3 ">
            <span className={`flex-auto  ${switchTheme ? "text-gray-100" : "text-gray-500 "} flex font-[600] items-center justify-start pl-4`}>
              Add to your feed
            </span>
            <span className="flex-none w-[2rem]  flex items-center  justify-center ">
              <FaInfo className='bg-gray-600 text-white p-[.1rem] rounded-[.1rem] overflow-hidden   text-[.85rem]' />
            </span>
          </div>
        </div>
        <div className={`  ${switchTheme ? "bg-gray-800 " : "bg-gray-100"} md:rounded-lg overflow-hidden w-full flex flex-col h-[max-content]`}>
          <span className='w-full h-[14rem] bg-white overflow-hidden'>
            <div className='w-full h-full max-w-[23rem] mx-auto'><img src={Hiring} className='w-full h-full' alt="" /></div>
          </span>

          <span className='w-full flex flex-wrap h-full py-2 items-center justify-center' >
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
  {
    !searchActiveSmall &&<FootBar postActiveSmall={postActiveSmall} setPostActiveSmall={setPostActiveSmall} />
  }
    

</div>
}

export default Notifications