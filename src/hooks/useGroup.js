import {useState,useEffect} from 'react'
import _ from 'lodash'

 const useGroup = (item,type) => {
     const [data,setData] = useState(null)
     
     useEffect(()=>{
         const group = () => {
            const value = _(item).groupBy(type)
            .map((records,groupBy)=>{
                return {
                    groupBy,
                    record:records.map(record=>record)
                }
            }).value()
            setData(value)
         }
         group();
     },[item,type])

     return {data}
 }

 export default useGroup