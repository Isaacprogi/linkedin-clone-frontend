import FeedCard from './FeedCard'
import { SyncLoader } from 'react-spinners'
import FeedSkeleton from './FeedSkeleton'




const Feed = ({ postFetchLoading, feeds, setFeeds, hasMore, postActive, setPostActive,
   setFeedToUpdateId, setButtonActive, feedInput, setComponent, setPostEditing }) => {



<<<<<<< HEAD
  return <div className='w-full h-full  overflow-hidden'>
    <div className='w-full pb-[3.4rem]'>
=======







  return <div className='w-full h-full  overflow-hidden'>
    <div className='w-full pb-[4rem]'>
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856
      {feeds?.length > 0 && feeds?.map((feed, index) => {
        return <FeedCard setButtonActive={setButtonActive} feedInput={feedInput} setFeedToUpdateId={setFeedToUpdateId} postActive={postActive} setComponent={setComponent} setPostActive={setPostActive} setPostEditing={setPostEditing} setFeeds={setFeeds} feeds={feeds} key={feed?._id} feed={feed} />
      })}
      {(postFetchLoading && hasMore) && [1, 2, 3, 4, 5, 6]?.map(n => <FeedSkeleton key={n} />)}
      {
        (postFetchLoading && !hasMore) && <div className='w-full mt-[4rem] flex items-center justify-center'>
          <SyncLoader width={200} color={'gray'} />
        </div>
      }

    </div>




  </div>


}

export default Feed