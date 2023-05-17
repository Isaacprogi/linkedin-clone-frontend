import React from 'react'
import { useMemo,useState } from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { axiosFetch } from '../utils/axiosFetch'
import PROFILE from '../images/profile.jpeg'
import { useThemeContext } from '../hooks/useThemeContext'

import countryList from 'react-select-country-list'



const CompleteProfile = ({error,setError,setInfo}) => {
  const [firstName,setFirstname] = useState('')
  const [lastName,setLastName] = useState('')
  const [title,setTitle] = useState('')
  
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [formActive, setFormActive] = useState({ username: false, password: false, confirmPassword: false, email: false })
  const {switchTheme} = useThemeContext()
  const [user] = useState(sessionStorage.getItem('ongoing-registration-user'))
  
  const [country,setCountry] = useState('')
  const options = useMemo(()=>countryList()?.getData(),[])


  const handleSubmit = async (e) => {
    setError('')
    setLoading(true)
    e.preventDefault()
    const newUser = {
      firstname:firstName,
      lastname:lastName,
      title:title,
      country:country,
    }

    try {
      if(user){
      newUser.email = user
      await axiosFetch.put('auth/register-complete', newUser)
      setLoading(false)
      setInfo('profile set up complete, log in')
      return navigate('/login')
      }
      if(!user){
        setLoading(false)
        setError('please log in to complete profile set up')
        return navigate('/login')
      }
    } catch (error) {
       if(error?.response?.data?.noData === true){
         setLoading(false)
         return navigate('/login')
       }
      setLoading(false)
      setError(error?.response?.data?.error)
      console.log(error)
    }
  }






  return PROFILE && <div className='w-full relative h-screen  '>
    <div className={`  flex flex-col items-center  w-full max-w-[25rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  px-2   `}>
      <span className="flex w-full flex-col items-center justify-center">
          
        <div className=' flex mb-1 items-center justify-start '>

          <span className={`${switchTheme?"text-gray-200":"text-blue-600"}  text-2xl`}>
            Linkedn
          </span>
          <BsLinkedin className='text-gray-600 ml-1  text-2xl' />
        </div>

        <span className='mb-2 text-gray-400'>
            Complete Profile
          </span>
      </span>



      <form className='mb-4 w-full ' >
        <div className={` ${!formActive?.firstname ? 'shadow-lg' : 'border-2'} mb-4 flex h-[3rem] flex-col border-gray-500  rounded-md overflow-hidden`}>
          <input type="text" onClick={() => {
            setError('')
            setFormActive({ firstname: true, lastname: false, title: false, country: false })
          }} value={firstName} onChange={(e) => {
            setFirstname(e.target.value)
            setError('')
          } } className={`h-full  px-1 outline-none`} required placeholder='Fisrtname' />
        </div>

        <div className={` ${!formActive?.lastname ? 'shadow-lg' : 'border-2'} mb-4 flex h-[3rem] flex-col border-gray-500  rounded-md overflow-hidden`}>
          <input type="text" onClick={() => {
            setError('')
            setFormActive({ firstname: false, lastname: true, title: false, country: false })
          }} value={lastName} onChange={(e) => setLastName(e.target.value)} className={`h-full  px-1 outline-none`} placeholder='Lastname' />
        </div>

        <div className={` ${!formActive?.title ? 'shadow-lg' : 'border-2'} mb-4 flex h-[3rem] flex-col border-gray-500  rounded-md overflow-hidden`}>
          <input type="text" onClick={() => {
            setError('')
            setFormActive({ firstname: false, lastname: false, title: true, country: false })
          }} value={title} onChange={(e) => setTitle(e.target.value)} className={`h-full  px-1 outline-none`} placeholder='title(e.g...Programmer)' />
        </div>


        <div className={` ${!formActive?.country ? 'shadow-lg' : 'border-2'} mb-4 flex h-[3rem] flex-col border-gray-500  rounded-md `}>
         <select className='outline-none w-full h-full rounded-md' name='country'
         onClick={(e) => {
          setError('')
          setFormActive({ firstname: false, lastname: false, title: false, country: true })
          setCountry(e.target.value)
        }}
         >
              {
                options?.map(option=>{
                  return <option>
                    {option?.label}
                  </option>
                })
              }
         </select>
          
        </div>


        

        <button type='submit' disbled={loading}  onClick={handleSubmit} className={`rounded-full font-[600] text-sm  cursor-pointer ${switchTheme?"hover:bg-gray-500  bg-gray-700":"hover:bg-blue-500  bg-blue-600"}  p-2 text-white  w-full mb-3`}>
          Submit
        </button>
        
        <div className={`${switchTheme?"text-red-500 mt-[0.5rem]":"text-red-500"} h-[3rem] w-full items-center justify-start`}>
          {
            error && error 
          }
        </div>
      </form>
    </div>


  </div>
}

export default CompleteProfile