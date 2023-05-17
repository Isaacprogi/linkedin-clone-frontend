import { Outlet ,Navigate, useLocation  } from "react-router-dom"
import {SyncLoader} from 'react-spinners'



const PublicRoutes = ({auth,authLoading}) => {
   const location = useLocation()
   
   const check = location.pathname.includes('/login') ||
    location.pathname.includes('/signup') || 
    location.pathname.includes('/complete-profile')

   if(authLoading){
      return <div className="w-full h-screen relative">
             <span className="absolute h-[max-content] w-[max-content]  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
             <SyncLoader size={100} color={'gray'}/>
             </span>
            </div>
   }

   return auth? <Navigate to={`${check?"/":location.pathname}`}/> : <Outlet/> 
     
}

export default PublicRoutes