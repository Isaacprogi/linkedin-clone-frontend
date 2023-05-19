import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { axiosFetch } from '../utils/axiosFetch'
import { useConnectionContext } from '../hooks/useConnectionContext'
import { useState } from 'react'
import { useEffect,useRef } from 'react'
import { useThemeContext } from '../hooks/useThemeContext'
import {timeFormatting} from '../utils/timeFormatting'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'

export const PeopleCardE = ({ user, PF,time }) => {
    const navigate = useNavigate()
    const { connections, setConnections, pendingConnections, setPendingConnections } = useConnectionContext()
    const { user: loggedInUser, dispatch: userDispatch } = useUserContext()
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const {switchTheme} = useThemeContext() 
    const [connectedTime,setConnectedTime] = useState("")
    const profilePicRef = useRef('')


    const config = useMemo(() => ({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${loggedInUser?.access}`
        }
    }), [loggedInUser?.access])

    useEffect(()=>{
        setConnectedTime(timeFormatting(time))   
     },[time])
 



    const handleAcceptConnection = async () => {
        if (loggedInUser?.access && connections && pendingConnections?.length > 0) {
            try {
                setLoading1(true)
                const { data } = await axiosFetch.post(`connection/acceptConnection/${user._id}`, {}, config)
                const { connections:conn, pendingIncommingConnections, pendingSentConnections } = data[1]

                userDispatch({
                    type: 'UPDATE_USER',
                    payload: { connections:conn, pendingIncommingConnections, pendingSentConnections }
                })
                
                setConnections(prev=>[data[2],...prev])

                const newPendingConnections = pendingConnections?.filter(connection => connection?.sender?._id !==
                    data[2]?.sender
                )

                setPendingConnections(newPendingConnections)
                setLoading1(false)

            } catch (error) {
                setLoading1(false)
                console.log(error)
            }
        }

    }

    const handleRejectConnection = async () => {
        if (loggedInUser?.access && connections && pendingConnections) {

            try {
                setLoading2(true)
                const { data } = await axiosFetch.post(`connection/rejectConnection/${user._id}`, {}, config)
                const { connections, pendingIncommingConnections, pendingSentConnections } = data[1]


                userDispatch({
                    type: 'UPDATE_USER',
                    payload: { connections, pendingIncommingConnections, pendingSentConnections }
                })
                
                const newPendingConnections = pendingConnections?.filter(connection => connection?.sender?._id !==
                    data[2]?.sender
                )

                setPendingConnections(newPendingConnections)

                setLoading2(false)
            } catch (error) {
                setLoading2(false)
                console.log(error)
            }
        }




    }





    return user && (
    <div className={`${switchTheme?"bg-gray-800":""} w-full flex items-center cursor-pointer  mb-2`}>

         <span className='flex-auto flex items-center' onClick={() => navigate(`/linkedin/${user?.username}`)}>
             <span className='flex items-center justify-center p-1'>
             <div ref={profilePicRef} className="flex-none  mr-2 w-[3rem] h-[3rem] rounded-full overflow-hidden  sm:w-[5rem] sm:h-[5rem] ">
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
             </span>
            <div className="flex-auto text-lg  br-red-600">
                <span className='font-[500]'>{user?.firstname + " " + user?.lastname}</span>
                <p className='text-gray-500 w-full text-sm elipSingle '>{user?.title}</p>
                <p className={`${switchTheme?"border-gray-700":""} text-gray-500 text-sm elipSingle border-b pb-3`}>{`${connectedTime} 'ago`}</p>
            </div>
          </span>

                <span className="flex-none flex items-center pr-2 pl-2">
                    <button disabled={loading1} onClick={() =>
                        handleAcceptConnection()
                    } className={`${loading1 ? 'bg-gray-200' : ''} rounded-full mr-2 cursor-pointer ${switchTheme?"hover:bg-gray-600":"hover:bg-blue-100"}  hover:border-blue-600 hover:border-3 overflow-hidden px-2 py-1 border border-blue-400`}>Accept</button>
                    <button disabled={loading2} onClick={() => handleRejectConnection()
                    } className={`${loading2 ? 'bg-gray-200' : ''}  rounded-full mr-2 cursor-pointer ${switchTheme?"hover:bg-gray-600":"hover:bg-blue-100"}  hover:bg-blue-100 hover:border-blue-600 hover:border-3 overflow-hidden px-2 py-1 border border-blue-400`}>Reject</button>
                </span>
    

    </div>)



}
