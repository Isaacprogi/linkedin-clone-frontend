import {useEffect, useState} from 'react'
import axios from 'axios'
import {useUserContext} from '../hooks/useUserContext'

axios.defaults.withCredentials = true

export const useMessageQuery = (pageNumber, id, messageDispatch, fetching) => {
    const [loading,setLoading] = useState(true)
    const[error,setError] = useState(false)
    const [hasMore,setHasMore] = useState(false)
    const {user} = useUserContext()


    

    useEffect(()=>{
        setLoading(true)
        setError(false)
        
        let cancel;
        if(user?.access && id && pageNumber > 0 ){
                axios({
                    method:'GET',
<<<<<<< HEAD
                    url:`https://linkedin-clone-api.onrender.com/api/message/${id}`,
=======
                    url:`http://localhost:4000/api/message/${id}`,
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856
                    params: {page:pageNumber, id:id},
                    cancelToken: new axios.CancelToken(c =>cancel = c),
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${user?.access}`
                      }
                    
                }).then(res =>{
                    console.log(res?.data)
                    messageDispatch({
                        type:'GET_MESSAGE_ON_SCROLL',
                        payload:res?.data
                    })
                    setHasMore(res?.data?.length > 0)
                    setLoading(false)

                }).catch(e => {
                    if(axios.isCancel(e)) return
                    setError(true)
                    setLoading(false)
                    console.log(error)
                })
               }

    },[pageNumber,id])

  return {loading, error, hasMore}
}


