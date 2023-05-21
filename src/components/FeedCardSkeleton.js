import Skeleton from 'react-loading-skeleton'

const FeedCardSkeleton= () => {


  return <div  className='w-full px-3 py-2 bg-white flex flex-col md:border mb-2 sm:rounded-lg overflow-hidden  border-gray-300'>
        <Skeleton/>

    </div>
  
}

export default FeedCardSkeleton