import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import {useRef} from 'react'


const PeopleCardB = ({person}) => {
  const profilePicRef = useRef('')
  
  return (
    <span className="min-h-[15rem] rounded-lg overflow-hidden flex flex-col hover:shadow-md border bg-white w-full">
              <div style={{
                backgroundImage:`url(${person.image})`
              }} className=" relative bg-blue-900 flex-none    h-[3.7rem]">
                <div ref={profilePicRef} className="absolute  top-[20%] left-[50%] translate-x-[-50%] w-[7rem] h-[7rem] overflow-hidden rounded-full">
                  {
                    <LazyLoadImage
                    width={profilePicRef?.current.clientWidth}
                    height={profilePicRef?.current.clientHeight}
                    effect='blur'
                    src={user?.photo}
                    placeholderSrc={PLACEHOLDERIMAGE}
                  />
                   }
                  
                </div>
              </div>
              <div className="flex-auto w-full flex flex-col">
                <span className='min-h-[4rem] px-2 w-full flex items-center flex-col justify-center '>
                  <p className='mt-[4rem] break-all text-lg font-[700] text-gray-500'>{person?.name}</p>
                  <p className='break-all text-center text-gray-400'>Attended {person?.school}</p>
                </span>
                <p className='min-h-[4rem] flex  text-sm items-center justify-center break-all px-2 text-gray-500'>
                 <FaSearch className='mr-1'/> {person.connection} mutual connections
                </p>
                 <span className='h-[4rem] px-2 py-3 flex-none flex items-center w-full'>
                     <span className="w-full cursor-pointer duration-200 border border-blue-700 hover:bg-blue-100 hover:border-2 text-blue-600 border-blue-600 text-lg rounded-full overflow-hidden flex items-center justify-center bg-white border border-blue-100 h-full">
                       Connect
                     </span>
                 </span>
              </div>
              <span></span>



            </span>
  )
}


export default PeopleCardB