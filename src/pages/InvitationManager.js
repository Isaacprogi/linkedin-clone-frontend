import React from 'react'
import { GrKey } from 'react-icons/gr'
import NavBar from '../components/NavBar'
import FootBar from '../components/FootBar'
import { useScroller } from '../hooks/useScroller'
import { IoMdSettings } from 'react-icons/io'
import { Link } from 'react-router-dom'
import SentComponent from '../components/SentComponent'
import RecievedComponent from '../components/RecievedComponent'
import { useThemeContext } from '../hooks/useThemeContext'
import { BsThreeDots } from 'react-icons/bs'
import { useUserContext } from '../hooks/useUserContext'
import { useConnectionContext } from '../hooks/useConnectionContext'
import { axiosFetch } from '../utils/axiosFetch'
import { useMemo, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'


const InvitationManager = ({ type, linkType, setLinkType }) => {
    const displayNav = useScroller('scroll-network')
    const { switchTheme } = useThemeContext()
    const { user } = useUserContext()
    const { setPendingSentConnections } = useConnectionContext()

    const config = useMemo(() => ({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user?.access}`
        }
    }), [user?.access])


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
    }, [setPendingSentConnections, user?.access, config])

    return (
        <div id='scroll-network' className={`w-full h-full overflow-auto`}>
            <NavBar displayNav={displayNav} />
            <div className="container w-full flex-auto container mx-auto h-full">
                <div className='w-full h-[max-content] md:pt-6 md:px-[4.5rem]  md:grid md:grid-cols-medium-connections md:gap-4 '>
                    <div className={` ${switchTheme ? "bg-gray-800 text-gray-300  border-gray-700" : "bg-gray-100 border-gray-300 border  "} sm:rounded-lg sm:mt-[1.5rem]  bg-white h-[max-content] overflow-hidden  `}>
                        <span className='flex px-3 py-2  sm:rounded-lg overflow-hidden items-center justify-between'>
                            <div>Manage invitations</div>
                            <IoMdSettings className={`font-[600] ${switchTheme ? "text-gray-300" : ""} cursor-pointer text-gray-500 text-[1.5rem]`} />
                        </span>

                        <div className={`flex px-3   overflow-hidden items-center mt-2 ${switchTheme ? " border-b border-gray-900" : " border-b "}  jstify-between md:justify-start`}>
                            <Link onClick={() => setLinkType('recieved')} className={`${linkType === 'recieved' ? 'border-b border-gray-600' : ''} cursor-pointer pb-2 mr-5`} to='/my-network/invitation-manager/recieved'>
                                <span >Recieved</span>
                            </Link>
                            <Link onClick={() => setLinkType('sent')} className={`${linkType === 'sent' ? 'border-b border-gray-600' : ''} cursor-pointer pb-2`} to='/my-network/invitation-manager/sent'>
                                <span>Sent</span>
                            </Link>
                        </div>

                        {
                            type && type === undefined ? "" : type === 'sent' ? <SentComponent /> : type === 'recieved'
                                ? <RecievedComponent /> : <RecievedComponent />
                        }
                    </div>

                    <div className={`h-[max-content] py-2 mt-3 sm:rounded-lg overflow-hidden ${switchTheme ? 'bg-gray-800 text-gray-500 ' : 'text-gray-600 bg-white border-gray-300 border'}  flex flex-col  w-full`}>
                        <span className="  flex justify-end  px-2 items-center ">
<<<<<<< HEAD
                        <span className='mr-[.3rem]'>Ad</span> <BsThreeDots className={`text-4xl ${switchTheme ? "text-gray-300 hover:bg-gray-700" : "hover:bg-gray-200"} cursor-pointer p-2 rounded-full `} />
=======
                            Ad <BsThreeDots className='ml-2 hover:bg-gray-200 rounded-full p-2 text-3xl cursor-pointer' />
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856
                        </span>
                        <span className='text-center px-3 text-sm text-gray-400'>
                            {user?.firstname}, unlock your potential with linkedn Premium
                        </span>
                        <span className="flex-auto px-3 flex flex-col items-center justify-center">
                            <span className='flex  items-center justify-center'>
                                <div className="h-[5rem] rounded-full mr-3 overflow-hidden w-[5rem]">
                                    <LazyLoadImage
                                        width={80}
                                        height={80}
                                        effect='blur'
                                        src={user?.photo}
                                        placeholderSrc={PLACEHOLDERIMAGE}
                                    />
                                </div>
                                <GrKey className='text-[3.5rem] text-blue-200' />
                            </span>
                            <p>See who's viewed your profile in the past 90 days</p>
<<<<<<< HEAD
                            <span className={`${switchTheme?"hover:bg-gray-700 bg-gray-600":"hover:bg-gray-100 bg-white"} h-[2.3rem] text-blue-700 rounded-full  cursor-pointer overflow-hidden px-4 mt-3  border border-blue-400 flex items-center justify-center`}>
=======
                            <span className='h-[2.3rem] text-blue-700 rounded-full hover:bg-gray-100 cursor-pointer overflow-hidden px-4 mt-3 bg-white border border-blue-400 flex items-center justify-center'>
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856
                                Try for free
                            </span>
                        </span>

                    </div>

                </div>

            </div>
            <FootBar />
        </div>

    )
}


export default InvitationManager