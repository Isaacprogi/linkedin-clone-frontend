import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Messaging from './pages/Messaging'
import Network from './pages/Network'
import Notifications from './pages/Notifications'
import Jobs from './pages/Jobs'
import { ChatSpaceSmall } from './pages/ChatSpaceSmall'
import Post from './components/Post'
import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './routing/PrivateRoutes'
import PublicRoutes from './routing/PublicRoutes'
import { useUserContext } from './hooks/useUserContext'
import { useEffect, useMemo } from 'react'
import { axiosFetch } from './utils/axiosFetch'
import { useChatContext } from './hooks/useChatContext'
import Connections from './pages/Connections'
import Profile from './pages/Profile'
import axios from 'axios'
import { useConnectionContext } from './hooks/useConnectionContext'
import InvitationManager from './pages/InvitationManager'
import { useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { socket } from './service/socket'
import { getRandomElements } from './utils/getRandomElements'
import People from './pages/People'
import { useThemeContext } from './hooks/useThemeContext'
import CompleteProfile from './pages/CompleteProfile'
import {useNavigate} from 'react-router-dom'


axios.defaults.withCredentials = true



function App() {
  const { user, dispatch } = useUserContext()
  const { dispatch: chatDispatch } = useChatContext()
  const { setPendingConnections, setPendingSentConnections } = useConnectionContext()
  const [linkType, setLinkType] = useState('recieved')
  const [feeds, setFeeds] = useState([])
  const [authLoading,setAuthLoading] = useState(false)
  const [error,setError] = useState(false)
  const [info,setInfo] = useState('')
  const navigate = useNavigate()
  const { switchTheme } = useThemeContext()


  // const [socketConnected, setSocketConnected] = useState(false)






  const config = useMemo(() => ({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${user?.access}`
    }
  }), [user?.access])



  useEffect(() => {
    if (user?._id) {
      socket.emit("setup", user)

      // const eventHandler = () => setSocketConnected(true)
      socket.on("connection", /*eventHandler*/)
      // unsubscribe from event for preventing memory leaks
      return () => {
        socket.off('connection', /*eventHandler*/)
      }
    }
  }, [user?._id,user])









  useEffect(() => {
    const getRefreshToken = async () => {
      setAuthLoading(true)
      try {
        const response = await axiosFetch.post('auth/refresh_token')
        const { accesstoken, ...others } = response?.data
        dispatch({
          type: 'GET_USER',
          payload: { access: accesstoken, ...others }
        })
        setAuthLoading(false)
      }
      catch (error) {
        console.log(error)
        setAuthLoading(false)
      }
    }
    getRefreshToken()

  }, [dispatch])







  useEffect(() => {
    const getPendingSentConnections = async () => {
      if (user?.access) {
        try {
          const { data } = await axiosFetch.get('connection/pendingSentConnections', config)
          setPendingSentConnections(data)
        } catch (error) {
          console.log(error)
        }
      }

    }
    getPendingSentConnections()
  }, [setPendingSentConnections, user?.access, config,navigate])




  useEffect(() => {
    const getPendingConnections = async () => {
      if (user?.access) {
        try {
          const { data } = await axiosFetch.get('connection/pendingConnections', config)
          setPendingConnections(data)
        } catch (error) {
          console.log(error)
        }
      }

    }
    getPendingConnections()
  }, [setPendingConnections, user?.access, config, navigate])





  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        try {
          const { data } = await axiosFetch.get('chat', config)
          chatDispatch({
            type: 'GET_CHATS',
            payload: data
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchChats()
  }, [chatDispatch, config, user,navigate])






  return (user) && (<div className={` App h-full  relative ${switchTheme ? 'bg-gray-900' : 'bg-gray-100'}  w-full overflow-hidden`}>

    <SkeletonTheme baseColor='#312121' highlightColor='525252'>
      <Post feeds={feeds} setFeeds={setFeeds} />

      <Routes>
        
          <Route element={<PrivateRoutes auth={user?.access} authLoading={authLoading} />}>
            <Route exact path='/' element={<Home feeds={feeds} setFeeds={setFeeds} getRandomElements={getRandomElements} />} />
            <Route path='/linkedin/:username' element={<Profile />} />

            <Route path='/my-network' element={<Network linkType={linkType} setLinkType={setLinkType} />} />
            <Route path='/my-network/invitation-manager/recieved' element={<InvitationManager type={'recieved'} linkType={linkType} setLinkType={setLinkType} />} />
            <Route path='/my-network/invitation-manager/sent' element={<InvitationManager type={'sent'} linkType={linkType} setLinkType={setLinkType} />} />

            
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/messaging' element={<Messaging socket={socket} />} />
            <Route path='/messaging/:username' element={<Messaging socket={socket} />} />
            <Route path='/messaging/d-section/:username' element={<ChatSpaceSmall socket={socket} />} />


            <Route path='/notifications' element={<Notifications />} />

            <Route path='/connections' element={<Connections socket={socket} />} />

            <Route path='/people/following' element={<People type={'following'} />} />
            <Route path='/people/followers' element={<People type={'followers'} />} />

          </Route>
      

        <Route  element={<PublicRoutes auth={user?.access} authLoading={authLoading}/>}>
        <Route path='/login' element={<Login info={info} setInfo={setInfo} error={error} setError={setError}  />} />
        <Route path='/signup'  element={<Signup />} />
        <Route path='/complete-profile/:id' element={<CompleteProfile info={info} setInfo={setInfo} error={error} setError={setError} />} />
        </Route>

      </Routes>
    </SkeletonTheme>

  </div>)
}

export default App
