import React from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { useEffect, useMemo,useState } from 'react'
import { axiosFetch } from '../utils/axiosFetch'
import PeopleCard from './PeopleCard'
import { useThemeContext } from '../hooks/useThemeContext'



const BecauseYouFollowed = () => {
  const {user,PF} = useUserContext()
  const [profile,setProfile] = useState('')
  const [profileFollowings,setProfileFollowings] = useState([])
  const { switchTheme} = useThemeContext()



  
const config = useMemo(() => ({
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${user?.access}`
  }
}), [user?.access])



const n = 6



  useEffect(()=>{
    const getUserInfo = async() =>{
      const random = Math.round(Math.random()*(user?.following?.length-1))

      const id = () => {
         return user?.following[random]?._id
      }
     

      if(user?.access && id && user?.following?.length > 0 ){
            try{
            const {data} = await axiosFetch.get(`user/info/${id()}`,config) 
            setProfile(data?.user)
            const newData = data?.user?.following?.filter(item=>item?._id !== user?._id)
            setProfileFollowings([...newData]?.sort(()=> Math.random() > 0.5 ? 1 : -1)?.slice(0,n))
            }catch(error){
               console.log(error)
            }
        }
    }  
    getUserInfo()
 },[config,user?._id,user?.access,user?.following])



  
  return (
    <div>
      <div className={`h-[3rem] text-gray-500 px-2 flex items-center justify-between ${switchTheme?"text-gray-300":"text-gray-400"}`}>
            <span> Because you follow
            {
              profile?.username && 
              <span className={`${switchTheme?"text-gray-300":"text-gray-400"}`}>{` ${profile?.username}`}  </span>
            }
            </span>
            {/* <p className='text-gray-400 hidden md:block font-[700]'>see all</p> */}
     </div>
    <div className="follow-box grid grid-cols-followed gap-3 px-2 ">
     {profileFollowings?.map((person)=>{
         return  <PeopleCard key={person?._id} person={person} PF={PF}/>
     })}     
   
    </div>
    </div>
  )
}

export default BecauseYouFollowed