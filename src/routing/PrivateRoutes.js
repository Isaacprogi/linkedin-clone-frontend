import { Outlet , Navigate} from "react-router-dom"




const PrivateRoutes = ({auth,authLoading}) => {

   return (auth)? <Outlet/> : <Navigate to='/login' />
   
}

export default PrivateRoutes