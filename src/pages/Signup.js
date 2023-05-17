import React from 'react'
import { useState } from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { axiosFetch } from '../utils/axiosFetch'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye} from 'react-icons/ai'
import PROFILE from '../images/profile.jpeg'
import { useThemeContext } from '../hooks/useThemeContext'
import {v4 as uuid } from 'uuid'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer, toast} from 'react-toastify'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState({ password: false, confirmPassword: false })
  const [error,setError] = useState(false)
  const [image, setImage] = useState(PROFILE)
  const [file, setFile] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [formActive, setFormActive] = useState({ username: false, password: false, confirmPassword: false, email: false })
  const {switchTheme} = useThemeContext()



  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const newUser = {
      username,
      email,
      password,
      confirmPassword
    }

    if (!email || !password || !username || !confirmPassword || !file) {
      setLoading(false)
      return setError( `All fields are required 
       (${!file? 'photo':''}${!email?', email':""}${!username?', username':""}${!confirmPassword?', confirmPassword':""}${!password?', password':""})`)
     }

     if(password !== confirmPassword){
      setLoading(false)
       return setError('password do not match')
     }

    if (file) {
      try {
        if(file){
          const form = new FormData()
          form.append("file", file)

           const {data} = await axiosFetch.post('user/profile-pic', form)
           if(data){
            newUser.photo = data?.url
           }
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        return setError("server or network error")
      }
    }

    try {
      await axiosFetch.post('auth/register', newUser)
      setLoading(false)
      navigate(`/complete-profile/${uuid()}`)
      sessionStorage.setItem('ongoing-registration-user', email)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error?.response?.data?.error)
    }
  }





  const handleImageChange = (e) => {
     setError('')
    if (e.target.files && e.target.files[0]) {
      if(e.target.files[0]?.size > (10000000) ){
        toast('Not larger than 10mb')
        e.target.value = ''
        return;
      }
      setFile(e.target.files[0])
      setImage(URL.createObjectURL(e.target.files[0]))
    }
  }



  return PROFILE && <div className='w-full relative h-screen  '>
    <div className={`  flex flex-col items-center  w-full max-w-[25rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  px-2   `}>
      <span className="flex w-full flex-col items-center justify-center">
        <label htmlFor='image-file' >
          <div className={`min-w-[4rem] ${switchTheme?"":"border-blue-400"} border-4 w-[4.5rem] h-[4.5rem] cursor-pointer group  bg-blue-100 rounded-full overflow-hidden`}>
          <img className='w-full group-hover:opacity-[.4] h-full' src={image} alt="" />
          <input className='hidden' type="file" id='image-file' onChange={handleImageChange} accept='image/*' />
          </div>      
        </label>
        <div className=' flex mb-2 items-center justify-start '>

          <span className={`text-blue-600  text-2xl`}>
            Linkedn
          </span>
          <BsLinkedin className='text-gray-600 ml-1  text-2xl' />
        </div>
      </span>



      <form className='mb-4 w-full ' >
        <div className={` ${!formActive?.username ? 'shadow-lg' : 'border'} mb-4 flex h-[3rem] flex-col border-gray-500  rounded-md overflow-hidden`}>
          <input type="text" onClick={() => {
            setError('')
            setFormActive({ username: true, password: false, confirmPassword: false, email: false })
          }} value={username} onChange={(e) => {
            setUsername(e.target.value)
            setError('')
          } } className={`h-full  px-1 outline-none`} required placeholder='Username' />
        </div>

        <div className={` ${!formActive?.email ? 'shadow-lg' : 'border-2'} mb-4 flex h-[3rem] flex-col border-gray-500  rounded-md overflow-hidden`}>
          <input type="email" onClick={() => {
            setError('')
            setFormActive({ username: false, password: false, confirmPassword: false, email: true })
          }} value={email} onChange={(e) => setEmail(e.target.value)} className={`h-full  px-1 outline-none`} placeholder='Email' />
        </div>

        <div className={` mb-4 relative w-full ${!formActive?.password ? 'shadow-lg' : 'border-2'} overflow-hidden bg-white border-gray-500 flex items-center justify-between h-[3rem] rounded-md `}>
          <input onClick={() => {
            setError('')
            setFormActive({ username: false, password: true, confirmPassword: false, email: false })
          }} className={`w-full  cursor-pointer  h-full px-1 outline-none`} value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisible?.password === false ? "password" : "text"} placeholder='Password' />
          <div className='absolute right-0'>
            {passwordVisible.password === false ? <AiFillEyeInvisible onClick={() => setPasswordVisible({ password: true, confirmPassword: false })} className='mr-2 cursor-pointer text-lg text-gray-600' /> : <AiFillEye onClick={() => setPasswordVisible({ password: false, confirmPassword: false })} className='mr-2 text-lg cursor-pointer text-gray-600' />
            }
          </div>
        </div>

        <div className={` mb-4 relative w-full ${!formActive?.confirmPassword ? 'shadow-lg' : 'border-2'} overflow-hidden bg-white border-gray-500 flex items-center justify-between h-[3rem] rounded-md `}>
          <input onClick={() => {
            setError('')
            setFormActive({ username: false, password: false, confirmPassword: true, email: false })
          }} className={`w-full  cursor-pointer  h-full px-1 outline-none`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={passwordVisible?.confirmPassword === false ? "password" : "text"} placeholder='confirm password' />
          <div className='absolute right-0'>
            {passwordVisible.confirmPassword === false ? <AiFillEyeInvisible onClick={() => setPasswordVisible({ password: false, confirmPassword: true })} className='mr-2 cursor-pointer text-lg text-gray-600' /> : <AiFillEye onClick={() => setPasswordVisible({ password: false, confirmPassword: false })} className='mr-2 text-lg cursor-pointer text-gray-600' />
            }
          </div>
        </div>

        <button type='submit' disabled={loading} onClick={handleSubmit} className={`rounded-full font-[600] text-sm  cursor-pointer ${switchTheme?"hover:bg-gray-500  bg-gray-700":"hover:bg-blue-500  bg-blue-600"}  p-2 text-white  w-full py-3 mb-3`}>
          Sign up
        </button>

        <span className="w-full">
          <span className='text-gray-400'>
            Already have an account?
          </span>

          <button disabled={loading} onClick={()=>navigate('/login')} className={`text-blue-500 ml-[1rem] cursor-pointer font-[600]`} >
            Sign In
          </button>
        </span>
        
        <div className={`${switchTheme?"text-red-500 mt-[0.5rem]":"text-red-500"} h-[3rem] italic w-full items-center justify-start`}>
          {
            error && error 
          }
        </div>
      </form>
    </div>


    
<ToastContainer
    position={"top-right"}
    cloaseOnClick={true}
    pauseOnHover={false}
    pauseOnFocusLoss={false}
    autoClose={2000}
    dragable={true}
    claseButton={<p>Close</p>}
    />


  </div>
}

export default Signup