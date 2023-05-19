import React, { useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useUserContext } from '../hooks/useUserContext'
import { axiosFetch } from '../utils/axiosFetch'
import { DotLoader } from 'react-spinners'
import { useThemeContext } from '../hooks/useThemeContext'
import {TiTick} from 'react-icons/ti'
import {useNavigate} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import {useRef} from 'react'




function RandomFollowCard({ user, PF, storedRandomUsers, setStoredRandomUsers }) {
  const { user: currentLogginUser,dispatch:userDispatch } = useUserContext()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const imageRefContainer = useRef('')

  const { switchTheme} = useThemeContext()


  const config = useMemo(() => ({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${currentLogginUser?.access}`
    }
  }), [currentLogginUser?.access])




 




  const handleFollowAndUnFollowUser = async () => {
    setLoading(true)
      if (currentLogginUser?.access && user?._id && storedRandomUsers?.length > 0) {
        try{
          const { data } = await axiosFetch.post(`connection/followAndUnfollowUser/${user?._id}`, {}, config)
          if(data?.following){
            const newUsers = storedRandomUsers?.map((item) => {
              if (item?._id === data?.following?._id) {
                return data?.following
              } else {
                return item
              }
            })
            setStoredRandomUsers(newUsers)
            const {following, ...others} = currentLogginUser
            const newData = {following:data?.follower?.following, ...others}
                userDispatch({
                    type:'GET_USER',
                    payload: newData
                })
          }
          setLoading(false)
        }catch(error){
          console.log(error)
        }
      }
  }
  




  return user && (
    <div key={user?._id} className={`flex-1  py-1 px-2 flex `}>
      <span  onClick={()=>{navigate(`/linkedin/${user?.username}`)}} 
       className='w-[3.4rem] h-[3.4rem] mr-2 rounded-full flex items-center justify-center  
       cursor-pointer overflow-hidden  flex-none '>
         <div ref={imageRefContainer} className='w-full h-full'>
         <LazyLoadImage
            effect='blur'
            src={user?.photo}
            placeholderSrc={PLACEHOLDERIMAGE}
            height={imageRefContainer?.current?.clientHeight}
            width={imageRefContainer?.current?.clientWidth}
          /> 
        </div> 
      </span>
      <span className='flex-auto flex flex-col'>
        <p className={`font-[500] text-[.8rem] ${switchTheme ? "text-gray-300 " : "text-gray-600"} `}>{user?.firstname + " " + user?.lastname}</p>
        <p className={` ${switchTheme ? "text-gray-500 font-[500] " : "text-gray-400 font-[500]"} mb-3 text-sm`}>{user?.title}</p>
        <span onClick={() => handleFollowAndUnFollowUser()} className={`flex px-2 max-w-[8rem] cursor-pointer ${switchTheme?"bg-gray-700 hover:bg-gray-600 shadow-md":"border shadow-sm"}  rounded-full h-[2.3rem]   items-center justify-center`}>
           {
             !loading && 
             <span className={`${switchTheme?"text-gray-300 bg-gray-600":"text-gray-700 bg-gray-400"} flex items-center justify-center rounded-full mr-2`}>
               {
             !storedRandomUsers?.filter((item)=>{
              return item?._id === user?._id
            })[0]?.followers?.filter(val=>val._id ===currentLogginUser?._id).length >0? <TiTick className={`${switchTheme?"":"text-white"}`} />:<FaPlus className={`${switchTheme?"":"text-white"}`} />
          }
             </span>
           }
          <button className={`${switchTheme?"text-gray-300 ":""}`} disabled={loading}>
            {!loading && <span>{currentLogginUser?.following?.filter(item=>item?._id === user?._id)?.length > 0?'following':'follow'}</span>}
            {loading && <DotLoader color={'gray'} loading={loading} size={15} />}
          </button>
        </span>
      </span>
    </div>
  )
}

export default RandomFollowCard