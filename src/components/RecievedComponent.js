import {useConnectionContext} from '../hooks/useConnectionContext'
import {useUserContext} from '../hooks/useUserContext'
import { PeopleCardE } from '../components/PeopleCardE'
import {useThemeContext} from '../hooks/useThemeContext'

function RecievedComponent() {
   const {pendingConnections} = useConnectionContext()
   const {switchTheme} = useThemeContext()
   const {user,PF} = useUserContext()


  return (
    <div className={`${switchTheme?"bg-gray-800":""} flex flex-col w-full h-[max-content] `}>
         <div className={`w-full flex-none border-b  ${switchTheme?" border-gray-700 ":" border-gray-100"}  flex px-3 items-center justify-between sm:justify-start h-[4rem]`}>
           <span  className={`flex items-center mr-2 
                rounded-lg border bg-red-700 text-white border-gray-300 hover:border-w-8 overflow-hidden  cursor-pointer justify-start px-3`}>
                 all{`(${pendingConnections?.length})`}
           </span>         
         </div>
         
         {
           pendingConnections?.length < 1 && <div className='flex-auto py-3  flex items-center justify-center '>
                    No connections yet
           </div>
         }
         {
           pendingConnections?.length > 0 && <div className='flex-auto  flex flex-col  items-start '>
                 {
             (pendingConnections && user) && pendingConnections?.map((connection=>{
               return <PeopleCardE key={connection?.sender?._id} time={connection?.createdAt} PF={PF}  user={connection?.sender} />
             }))
           }
            
           </div>
         }

         


   </div>
  )
}

export default RecievedComponent