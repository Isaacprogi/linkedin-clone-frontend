import { BsLinkedin } from 'react-icons/bs'
import { useUserContext } from '../hooks/useUserContext'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import { axiosFetch } from '../utils/axiosFetch'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext'
import { v4 as uuid } from 'uuid'
import { PulseLoader } from 'react-spinners'



const Login = ({ error, setError, info, setInfo }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formActive, setFormActive] = useState({ password: false, email: false })
  const { switchTheme } = useThemeContext()






  const { user, dispatch } = useUserContext('')
  const navigate = useNavigate()


  const handleLogin = async () => {
    setInfo('')
    setError('')
    const currentUser = { email, password }

    try {
      setLoading(true)
      const response = await axiosFetch.post('auth/login', currentUser)
      const { accesstoken, ...others } = response?.data
      dispatch({
        type: 'GET_USER',
        payload: { access: accesstoken, ...others }
      })
      setLoading(false)
      navigate('/', { replace: true })
    } catch (error) {
      const complete = error?.response?.data?.complete
      if (complete === false) {
        setLoading(false)
        sessionStorage.setItem('ongoing-registration-user', email)
        return navigate(`/complete-profile/${uuid()}`, { replace: true })
      }
      setLoading(false)
      setError(error?.response?.data?.error)
      console.log(error)
    }

  }



  const handleGuestAccount = () => {
    setEmail('guest@gmail.com')
    setPassword('12345678')
  }




  return user ? <div className='w-full h-screen'>
    <div className={`  flex flex-col items-center  w-full max-w-[25rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  px-2   `}>
      <div className='w-full flex mb-2 items-center justify-center '>
        <span className='text-blue-600 text-2xl'>
          Linkedn
        </span>
        <BsLinkedin className='text-gray-600 ml-1  text-2xl' />
      </div>

      <span className='w-full text-center text-gray-400  mb-4'>Stay updated on your professional world</span>

      <div className='mb-4 w-full z-[500] ' >
        <div className={` ${!formActive?.email ? 'shadow-lg' : 'border-2'} mb-4 flex h-[3rem] flex-col border-gray-500  rounded-md overflow-hidden`}>
          <input type="email" onClick={() => {
            setError('')
            setInfo('')
            setFormActive({ password: false, email: true })
          }} value={email} onChange={(e) => setEmail(e.target.value)} className={`h-full  px-1 outline-none`} placeholder='Email or Phone' />
        </div>

        <div className={` mb-4 relative w-full ${!formActive?.password ? 'shadow-lg' : 'border-2'} overflow-hidden bg-white border-gray-500 flex items-center justify-between h-[3rem] rounded-md `}>
          <input onClick={() => {
            setError('')
            setInfo('')
            setFormActive({ password: true, email: false })
          }} className={`w-full  cursor-pointer  h-full px-1 outline-none`} value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisible === false ? "password" : "text"} placeholder='Password' />
          <div className='absolute right-0'>
            {passwordVisible === false ? <AiFillEyeInvisible onClick={() => setPasswordVisible(true)} className='mr-2 cursor-pointer text-lg text-gray-600' /> : <AiFillEye onClick={() => setPasswordVisible(false)} className='mr-2 text-lg cursor-pointer text-gray-600' />
            }
          </div>
        </div>

        <span className='text-blue-500 cursor-pointer font-[600]' >Forgot Password?</span>
      </div>

      <div className='w-full w-full max-w-[25rem] flex text-center'>
        <button type='submit' disabled={loading} onClick={handleLogin} className={`rounded-full font-[600] flex items-center justify-center  text-sm  cursor-pointer ${switchTheme ? "hover:bg-gray-500  bg-gray-700" : "hover:bg-blue-500  bg-blue-600"} h-[2.7rem]  p-2 text-white  w-full mb-3`}>
          {
            !loading?'loading':<PulseLoader color='#333' size={20}/>
          }
        </button>
      </div>

      <span className='w-full mt-4  text-center'>
        <span className='text-gray-500'>
          New to linkedn?
        </span>
        <button onClick={() => {
          navigate('/signup')
          setError('')
          setInfo('')
        }} className='text-blue-500 ml-3 font-[600] cursor-pointer'>
          Join now
        </button>

        <span className="w-full flex items-center justify-center h-[max-content]">
        <span onClick={handleGuestAccount} className='text-gray-300 bg-blue-500 px-2 flex items-center justify-center py-2 max-w-[20rem] mt-2 cursor-pointer hover:bg-blue-700 rounded-md'>Get guest Account</span>
      </span>
        </span>

      <span className='mt-[0.5rem] flex items-center justify-center w-full italic text-red-500 h-[3rem]'>
        {error && <p>{error}</p>}
        {info && <p className='text-blue-500'>{info}</p>}
      </span>
    </div>

  </div> : ''
}

export default Login