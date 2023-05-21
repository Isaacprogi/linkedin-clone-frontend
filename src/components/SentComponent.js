import {useConnectionContext} from '../hooks/useConnectionContext'
import {useUserContext} from '../hooks/useUserContext'
import { PeopleCardEE } from '../components/PeopleCardEE'
import {useThemeContext} from '../hooks/useThemeContext'

function SentComponent() {
   const {user} = useUserContext()
   const {switchTheme} = useThemeContext()
   const {pendingSentConnections} = useConnectionContext()
    
   
  
  return (
    <div className='flex flex-col w-full h-[max-content] '>
         <div className={`w-full flex-none border-b  flex  ${switchTheme?"border-gray-700":"border-gray-100"}  px-3 items-center justify-between sm:justify-start h-[4rem]`}>
           <span  className={`flex items-center mr-2 
                rounded-lg border bg-red-700 text-white border-gray-300 hover:border-w-8 overflow-hidden  cursor-pointer justify-start px-3`}>
                 all{`(${pendingSentConnections?.length})`}
           </span>         
         </div>
         
         {
           pendingSentConnections?.length < 1 && <div className='flex-auto py-3   flex items-center justify-center '>
                    No connections yet
           </div>
         }
         {
           pendingSentConnections?.length > 0 && <div className='flex-auto  flex flex-col items-start '>
                 {
             (pendingSentConnections && user) && pendingSentConnections?.map((connection=>{
               return connection?.users?.map((item=>{
                 return item?._id === user?._id?'':
                 <PeopleCardEE key={item?._id} time={connection?.createdAt} user={item} />
               }))
             }))
           }
            
           </div>
         }

         


   </div>
  )
}

export default SentComponent