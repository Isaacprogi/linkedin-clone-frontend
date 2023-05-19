import React from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { useMemo, useState } from 'react'
import { axiosFetch } from '../utils/axiosFetch'
import { useThemeContext } from '../hooks/useThemeContext'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PLACEHOLDERIMAGE from '../images/profile.jpeg'
import { useNavigate } from 'react-router-dom'



const PeopleCard = ({ person }) => {
  const { user,dispatch: userDispatch } = useUserContext()
  const [loading, setLoading] = useState(false)
  const { switchTheme } = useThemeContext()
  const [backgroundColor, setBackgroundColor] = useState('')
  const [imageDetails, setImageDetails] = useState({ width: '', height: '' })
  const navigate = useNavigate()


  const getRandomColors = () => {
    let letters = '0123456789ABCDEF'.split('')
    let color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)]
    }
    return color;

  }

  useEffect(()=>{
  setBackgroundColor(getRandomColors())
  },[])

  const config = useMemo(() => ({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${user?.access}`
    }
  }), [user?.access])


  useEffect(() => {
    const image = document.getElementById('image-container')
    if (image) {
      const position = image.getBoundingClientRect()
      setImageDetails({ width: position?.width, height: position?.height })
    }
  }, [])





  const handleFollowAndUnFollowUser = async () => {

    setLoading(true)
    try {
      if (user?.access && person?._id) {
        const { data } = await axiosFetch.post(`connection/followAndUnfollowUser/${person?._id}`, {}, config)
        const { following, ...others } = user
        const newData = { following: data?.follower?.following, ...others }
        userDispatch({
          type: 'GET_USER',
          payload: newData
        })
      }
      setLoading(false)
      setBackgroundColor(getRandomColors())
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <span className={`min-h-[15rem] ${switchTheme ? "bg-gray-700" : "border "}   rounded-lg overflow-hidden flex flex-col hover:shadow-md bg-white w-full`}>
      <div style={{
        backgroundColor: `${backgroundColor}`
      }} className=" relative  flex-none  h-[3.7rem]">
        <div onClick={()=>navigate(`/linkedin/${person?.username}`)} id='image-container' className="absolute cursor-pointer top-[20%] left-[5%] translate-x-[-5%] w-[4.5rem] h-[4.5rem] overflow-hidden rounded-full">
          <LazyLoadImage
            width={imageDetails?.width}
            height={imageDetails?.height}
            effect='blur'
            src={person?.photo}
            placeholderSrc={PLACEHOLDERIMAGE}
          />
        </div>
      </div>
      <div className="flex-auto w-full flex justify-between flex-col">
        <span className='min-h-[4rem] px-2 '>
          <p className={`mt-5 ${switchTheme ? "text-gray-300" : "text-gray-500"} break-all text-lg font-[700] `}>{person?.firstname + " " + person?.lastname}</p>
          <p className={`break-all ${switchTheme ? "text-gray-400" : "text-gray-500"} italic`}>{person?.title}</p>
        </span>
        <span className='h-[4rem] px-2 py-3 flex-none flex items-center w-full'>
          <button disabled={loading} onClick={handleFollowAndUnFollowUser} className={`w-full cursor-pointer ${switchTheme ? "bg-gray-600 hover:bg-gray-900 border-gray-800" : "bg-white hover:border-2 hover:bg-blue-100"} duration-200 border border-blue-700   text-blue-600 border-blue-600 text-lg rounded-full overflow-hidden flex items-center justify-center  border border-blue-100 h-full`}>
            {
              user?.following?.filter(item => item?._id === person?._id)?.length > 0 ?
                'following' : 'follow'
            }
          </button>
        </span>
      </div>
      <span></span>
    </span>
  )
}


export default PeopleCard