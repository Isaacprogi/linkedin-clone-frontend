import React from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { useEffect, useMemo,useState } from 'react'
import { axiosFetch } from '../utils/axiosFetch'
import PeopleCard from './PeopleCard'
import { useThemeContext } from '../hooks/useThemeContext'


const PeopleYouKnow = () => {
  const {user} = useUserContext()
  const [countryData,setCountryData] = useState([])
  const {switchTheme} = useThemeContext()

  
const config = useMemo(() => ({
    Accept: 'application/json',
    Authorization: `Bearer ${user?.access}`
}), [user?.access])


const n=6


  useEffect(()=>{
    const getPeopleFromYourCountry = async() =>{
        if(user?.access){
            try{
            const {data} = await axiosFetch.get(`user/category/details`,{params:{country:user?.country},headers: config}) 
            setCountryData([...data]?.sort(()=> Math.random() > 0.5 ? 1 : -1)?.slice(0,n))
            }catch(error){
               console.log(error)
            }
        }
    }

    getPeopleFromYourCountry()
 },[config,user?.access,user?.country])

  return (
      <div>
          <div className={"h-[3rem] w-full  overflow-hidden flex items-center justify-between px-2"}>
          <span className={`${switchTheme?"text-gray-300":"text-gray-400"}`}> People in {user?.country}  </span>
            {/* <p className='text-gray-400 hidden md:block font-[700]'>see all</p> */}
          </div>
          
         <div className="follow-box grid grid-cols-mk xl:grid-cols-mk2 gap-3 px-2 ">

       {countryData?.map((person)=>{
        return <PeopleCard key={person?._id} person={person}/>
        })}     

     </div>


      </div>
    
  
  )
}

export default PeopleYouKnow