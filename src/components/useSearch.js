import {useEffect, useState} from 'react'
import axios from 'axios'
import {useUserContext} from '../hooks/useUserContext'

axios.defaults.withCredentials = true

function useSearch(query, pageNumber, url) {
    const [loading,setLoading] = useState(true)
    const[error,setError] = useState(false)
    const [books, setBooks] =  useState([])
    const [hasMore,setHasMore] = useState(false)
    const {user} = useUserContext()
    
    
    
    useEffect(()=>{
      setBooks([])
    },[query])


    useEffect(()=>{
        setLoading(true)
        setError(false)

        let cancel;
               if(user?.access){
                axios({
                    method:'GET',
                    url,
                    params: {q:query, page:pageNumber},
                    cancelToken: new axios.CancelToken(c =>cancel = c),
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${user?.access}`
                      }
                    
                }).then(res =>{
                    setBooks(prevBooks => {
                        return [...prevBooks, ...res.data]
                    })
                    setHasMore(res.data.length > 0)
                    setLoading(false)

                }).catch(e => {
                    if(axios.isCancel(e)) return
                    setError(true)
                    setLoading(false)
                })
               }



         return () => cancel()
    },[query, pageNumber])

  return {loading, error, books, hasMore}
}



export default useSearch