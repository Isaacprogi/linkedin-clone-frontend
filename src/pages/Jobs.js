import React from 'react'
import { BsFillBellFill } from 'react-icons/bs'
import { RiBarChartBoxLine } from 'react-icons/ri'
import { BsClipboardCheck } from 'react-icons/bs'
import { AiFillFileText } from 'react-icons/ai'
import { AiOutlineFile } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiTwotoneSetting } from 'react-icons/ai'
import { BsFillPlayBtnFill, BsFillBookmarkFill, BsBookmark } from 'react-icons/bs'



import { BsChevronCompactDown } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa'
import JAV from '../images/jav.png'
import ENG from '../images/eng.png'
import TUR from '../images/turing.png'
import REQ from '../images/recrui.png'
import { BsPencilSquare } from 'react-icons/bs'
import LOOK from '../images/look.png'
import NavBar from '../components/NavBar'
import { useScroller } from '../hooks/useScroller'
import {useState} from 'react'
import {useThemeContext} from '../hooks/useThemeContext'


import { AiFillLinkedin } from 'react-icons/ai'


import FootBar from '../components/FootBar'


const Jobs = () => {
    const [searchActiveSmall, setSearchActiveSmall] = useState(false)
    const displayNav = useScroller('scroll-jobs')
    const {switchTheme} = useThemeContext()

    return (
        <div id='scroll-jobs' className="w-full h-full overflow-auto">
            <NavBar setSearchActiveSmall={setSearchActiveSmall} searchActiveSmall={searchActiveSmall} displayNav={displayNav} />
        
                 <div className={`container ${searchActiveSmall?'hidden':''}  w-full mt-[.5rem] flex-auto container mx-auto h-full`}>
                     <div className={`w-full h-[max-content] md:pt-7 md:gap-[1rem] md:px-[4.5rem] grid md:grid-cols-medium lg:grid-cols-large   `}>
                    <div className={` md:row-span-2 h-[26rem]  hidden md:block  md:sticky  md:top-[5rem] lg:row-span-1`}>
                        <div className={`w-full ${switchTheme ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600 md:border-gray-300 md:border"} h-[max-content]   px-3 text-[1rem]   font-[500] py-4 rounded-lg overflow-hidden  flex  flex-col`}>
                            <span className=' py-3 flex items-center justify-start cursor-pointer'><BsFillBookmarkFill className='mr-2 text-lg' />My Jobs</span>
                            <span className=' py-3 flex items-center justify-start cursor-pointer'><BsFillBellFill className='mr-2 text-lg' />Job Alerts</span>
                            <span className=' py-3 flex items-center justify-start cursor-pointer'><RiBarChartBoxLine className='mr-2 text-lg' />Salary</span>
                            <span className=' py-3 flex items-center justify-start cursor-pointer'><BsClipboardCheck className='mr-2 text-lg' />Skill Assessment</span>
                            <span className=' py-3 flex items-center justify-start cursor-pointer'><AiFillFileText className='mr-2 text-lg' />Interview Prep</span>
                            <span className=' py-3 flex items-center justify-start cursor-pointer'><AiOutlineFile className='mr-2 text-lg' />Resume Builder</span>
                            <span className=' py-3 flex items-center justify-start cursor-pointer'><BsFillPlayBtnFill className='mr-2 text-lg' />Job seeker guidance</span>
                            <span className=' py-3 flex items-center justify-start cursor-pointer'><AiTwotoneSetting className='mr-2 text-lg' />Application setting</span>
                        </div>

                        <span className={`w-full  flex items-center ${switchTheme ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-blue-200"} justify-center py-2  text-blue-700  cursor-pointer border border-blue-600 rounded-full overflow-hidden mt-2 bg-white `}>
                            <BsPencilSquare /> <span className='ml-2'>post a free job</span>
                        </span>

                    </div>
                    <div className="mb-[.3rem]  md:mt-0">
                        <div className={`w-full px-4 pt-3  h-[max-content] sm:rounded-lg ${switchTheme ? "bg-gray-800 b" : "bg-white border border-gray-300 "} overflow-hidden `}>
                            <span className={`flex items-center  font-[600] ${switchTheme?"text-gray-300":"text-gray-500"}  justify-between mt-2`}><p className='text-lg'>Recent job searches</p><p className='text-gray-400 hover:bg-gray-100 p-1 rounded-md overflow-hidden cursor-pointer'>Clear</p></span>
                            <span className='flex flex-col mt-3 '>
                                <p className={`font-[500] ${switchTheme?"text-gray-300":"text-gray-600"}  `}>frontend developer . <span className='text-gray-500 text-[.8rem]'>2 new</span></p>
                                <p className='text-gray-500 text-sm'>Alert On . Nigeria</p>
                            </span>
                            <hr className={`${switchTheme?"border-gray-500":"border-gray-300"}  mt-2`}/>
                            <span className='flex flex-col mt-3 '>
                            <p className={`font-[500] ${switchTheme?"text-gray-300":"text-gray-600"}  `}>Backend Engineer . <span className='text-gray-500 text-[.8rem]'>2 new</span></p>
                                <p className='text-gray-500 text-sm'>Alert On . Nigeria</p>
                            </span>
                            <hr className={`${switchTheme?"border-gray-500":"border-gray-300"}  mt-2`}/>
                            <span className='flex flex-col mt-3 mb-2 '>
                            <p className={`font-[500] ${switchTheme?"text-gray-300":"text-gray-600"}  `}>Sofware Engineer . <span className='text-gray-500 text-[.8rem]'>2 new</span></p>
                                <p className='text-gray-500 text-sm'>Alert On . Nigeria</p>
                            </span>
                            <hr className={`${switchTheme?"border-gray-500":"border-gray-300"}  mt-2`}/>
                            <span className="w-full text-blue-600 font-[600] py-2 flex items-center justify-center">
                                <span className="px-2 py-1 rounded-md overflow-hidden duration-200 flex items-center justify-center cursor-pointer hover:bg-blue-100 h-full">
                                    Show more <BsChevronCompactDown />
                                </span>
                            </span>
                        </div>

                        <div className={` ${switchTheme ? "bg-gray-800 " : "bg-white border border-gray-300 "} px-4  relative mt-2 md:mt-5 mb-1 pt-6 sm:rounded-lg overflow-hidden   w-full h-[max-content]`}>
                            <span className=' py-3 w-full'>
                                <p className={`text-lg ${switchTheme?"text-gray-300":"text-gray-600"}  font-[500]`}>Recommended for you</p>
                                <p className='text-sm text-gray-500'>Based on your profile and search history</p>
                            </span>

                            <div className="flex h-[max-content] cursor-pointer py-4 w-full  ">
                                <div className="w-[4rem] mr-2 flex items-center justify-start flex-none h-full ">
                                    <span className="w-full overflow-hidden rounded-sm h-[4rem]">
                                        <img src={TUR} className='wfull h-full' alt="" />
                                    </span>
                                </div>
                                <div className=" flex-auto flex justify-between h-full group">
                                    <span className='flex flex-col'>
                                        <p className='text-blue-700 font-[600] text-sm break-all group-hover:underline max-w-[20rem]'>Front End Developer(1) </p>
                                        <p className='hover:text-blue-500 b hover:underline break-all'>Turing.com</p>
                                        <p className='text-gray-400 break-all'>Lagos,Lagos,Nigeria</p>
                                        <span className='flex items-center mr-2 text-gray-500'>
                                            <span className="w-[2rem] overflow-hidden rounded-sm h-[2rem]">
                                                <img src={REQ} className='wfull h-full' alt="" />
                                            </span>
                                            Actively recruiting
                                        </span>
                                        <p className='mt-7 text-[.8rem] text-gray-500'> 1 week ago</p>
                                    </span>
                                    <span className='flex h-[1rem]  items-center justify-between'><AiFillEyeInvisible className='text-[2rem] sm:text-[2.3rem] hidden group-hover:block  rounded-full overflow-hidden p-1 hover:bg-gray-100 cursor-pointer text-gray-500 ' /><span className=' text-[2rem] sm:text-[2rem] p-2 rounded-full overflow-hiden hover:bg-gray-100  text-gray-500'><BsBookmark className=' text-[1.3rem]    text-gray-500' /></span></span>
                                </div>

                            </div>

                            <div className="flex h-[max-content] cursor-pointer group py-4 w-full  ">
                                <div className="w-[4rem] flex items-center justify-start flex-none h-full ">
                                    <span className="w-full mr-2 overflow-hidden rounded-sm h-[4rem]">
                                        <img src={ENG} className='wfull h-full' alt="" />
                                    </span>
                                </div>
                                <div className=" flex-auto flex justify-between h-full ">
                                    <span className='flex flex-col'>
                                        <p className='text-blue-700 font-[600] text-sm break-all group-hover:underline max-w-[20rem]'>UI/UX Designer</p>
                                        <p className='hover:text-blue-500 break-all hover:underline'>Trip Value</p>
                                        <p className='text-gray-400 break-all'>Lagos,lagos,Nigeria(Hybrid)</p>
                                        <span className='flex items-center text-gray-500'>
                                            < AiFillFileText />
                                            You have a preferred skill badge
                                        </span>
                                        <p className='mt-7 text-[.8rem] text-gray-500'> 1 hour ago</p>
                                    </span>
                                    <span className='flex h-[1rem]  items-center justify-between'><AiFillEyeInvisible className='text-[2rem] sm:text-[2.3rem] hidden group-hover:block  rounded-full overflow-hidden p-1 hover:bg-gray-100 cursor-pointer text-gray-500 ' /><span className=' text-[2rem] sm:text-[2rem] p-2 rounded-full overflow-hiden hover:bg-gray-100  text-gray-500'><BsBookmark className=' text-[1.3rem]    text-gray-500' /></span></span>
                                </div>
                            </div>

                            <div className="flex h-[max-content] cursor-pointer py-4 w-full group  mb-10 ">
                                <div className="w-[4rem] flex items-center justify-start flex-none h-full ">
                                    <span className="w-full bg-white  overflow-hidden rounded-sm h-[4rem]">
                                        <img src={JAV} className='wfull h-full' alt="" />
                                    </span>
                                </div>
                                <div className=" flex-auto flex justify-between h-full px-2">
                                    <span className='flex flex-col'>
                                        <p className='text-blue-700 font-[600] text-sm break-all max-w-[20rem] group-hover:underline'>FreeLance Full Stack Developer</p>
                                        <p className='hover:text-blue-500 break-all hover:underline'>Toptal</p>
                                        <p className='text-gray-400 break-all'>Nigeria(Remote)</p>
                                        <span className='flex items-center mr-2 text-gray-500'>
                                            <span className="w-[2rem] overflow-hidden rounded-sm h-[2rem]">
                                                <img src={REQ} className='wfull h-full' alt="" />
                                            </span>
                                            Actively recruiting
                                        </span>
                                        <p className='mt-7 text-[.8rem] text-gray-500'> 1 day ago</p>
                                    </span>
                                    <span className='flex h-[1rem]  items-center justify-between'><AiFillEyeInvisible className='text-[2rem] sm:text-[2.3rem] hidden group-hover:block  rounded-full overflow-hidden p-1 hover:bg-gray-100 cursor-pointer text-gray-500 ' /><span className=' text-[2rem] sm:text-[2rem] p-2 rounded-full overflow-hiden hover:bg-gray-100  text-gray-500'><BsBookmark className=' text-[1.3rem]    text-gray-500' /></span></span>
                                </div>


                            </div>










                            <span className="w-full flex items-center bottom-0 cursor-pointer text-gray-400  left-0 absolute justify-center hover:bg-gray-100 py-3">
                                Show all <FaArrowRight className='ml-2' />
                            </span>

                        </div>

                        {/* html css */}








                    </div>
                    <div className='mb-[3.7rem]  md:mb-2' >
                        <div className={`h-[max-content] ${switchTheme ? "bg-gray-800 " : "bg-white border border-gray-300 "}  pb-10   pt-3 md:rounded-lg overflow-hidden w-full bg-white`}>
                            <div className="w-full py-4 px-3 ">
                                <p className={`font-[600] ${switchTheme?"text-gray-300":"text-gray-600"}  text-md`}>Job seeker guidance</p>
                                <p className=' text-[.8rem] text-gray-500'>Recommended based on your activity</p>
                            </div>
                            <div className="w-full px-3 hover:bg-blue-100 cursor-pointer flex items-center justify-between">
                                <p className={`font-[600] ${switchTheme?"text-gray-300":"text-gray-500"}  text-sm `}>I want to improve my resume</p>
                                <img src={LOOK} className='w-[4rem] h-[4rem]' alt="" />
                            </div>
                            <p className='text-sm text-gray-500 px-3'>Explore our curated guide guide of expert-led
                                courses, such as how to improve your resume and grow
                                your network, to hel you land your next opportunity
                            </p>
                            <span className="w-full group px-3 flex hover:text-blue-600 items-center bottom-0 cursor-pointer text-gray-400   justify-start mb-3">
                                <p className='group-hover:underline'>Show more</p> <FaArrowRight className='ml-2 group-hover:text-blue-600 text-gray-600' />
                            </span>
                        </div>

                        <div className={`  ${switchTheme ? "bg-gray-900 " : "bg-gray-100"}  md:rounded-lg hidden md:block  overflow-hidden w-full  h-[max-content]`}>
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
                !searchActiveSmall && <FootBar   /> 
            }
        </div>
    )
}


export default Jobs