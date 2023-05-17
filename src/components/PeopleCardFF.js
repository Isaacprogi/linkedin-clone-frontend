import {BsThreeDots} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import {useMemo, useState,useRef} from 'react'
import {axiosFetch} from '../utils/axiosFetch'
import { useThemeContext } from '../hooks/useThemeContext'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'


export const PeopleCardFF = ({user,PF,type}) => {
 const navigate = useNavigate()
 const {user:currentLogginUser,dispatch} = useUserContext()
 const [edit,setEdit] = useState(false)
 const [loading, setLoading] = useState(false)
const {switchTheme} = useThemeContext()
const profilePicRef = useRef('')


 const config = useMemo(() => ({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${currentLogginUser?.access}`
    }
  }), [currentLogginUser?.access])


 const handleFollowAndUnFollowUser = async () => {
    setLoading(true)
    try {
      if (currentLogginUser?.access && user?._id) {
        const { data } = await axiosFetch.post(`connection/followAndUnfollowUser/${user?._id}`, {}, config)
        const {following, ...others} = currentLogginUser
        const newData = {following:data?.follower?.following, ...others}
            dispatch({
                type:'GET_USER',
                payload: newData
            })
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }


  const handleEdit = () => setEdit(!edit)



    return user &&( <div   className="w-full flex items-center cursor-pointer px-3  mb-2">
        <span className='flex-auto flex items-center' onClick={()=>navigate(`/linkedin/${user.username}`)}>
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
           <div className='leading-[1rem]'>
           <span className={`${switchTheme?'text-gray-300':""} font-[500]`}>{user.firstname + " " + user.lastname}</span>
            <p className='text-gray-500 w-full text-sm elipSingle italic '>{user.title}</p>
           </div>
            <hr className={`${switchTheme?"border-gray-700 mt-2":""}`} />
        </div>
        </span>
         {
             type === 'following'? 
         <span className="flex-none relative flex items-center pr-2 pl-2">
               {
                 edit? <button disabled={loading} onClick={handleFollowAndUnFollowUser} className={`${switchTheme?"bg-gray-700 text-white hover:bg-gray-600":""} absolute rounded-lg font-[600] py-2 flex w-[max-content] shadow-md bg-gray-100 right-[3rem] top-[1.5rem] px-2`}>
                 Unfollow user
                </button>:''
               }
            <BsThreeDots onClick={handleEdit}  className={`text-4xl ${switchTheme?"text-gray-300 hover:bg-gray-700":"hover:bg-gray-200"} cursor-pointer p-2 rounded-full `}/>
        </span> :''
         }
       
    </div>)



}
