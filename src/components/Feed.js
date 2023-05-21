import FeedCard from './FeedCard'
// import { SyncLoader } from 'react-spinners'

import FeedSkeleton from './FeedSkeleton'

// import { useState, useEffect } from 'react'




const Feed = ({ postFetchLoading, feeds, pageNumber,setFeeds, hasMore, postActive, setPostActive,
   setFeedToUpdateId, setButtonActive, feedInput, setComponent, setPostEditing }) => {

    // const [timerOn,setTimerOn] = useState(true)

    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     setTimerOn(false)
    //   }, 3000);
    //   return () => clearTimeout(timer);
    // }, [postFetchLoading,hasMore,feeds]);


  return <div className='w-full h-full  overflow-hidden'>
    <div className='w-full pb-[3.4rem]'>
      {feeds?.length > 0 && feeds?.map((feed, index) => {
        return <FeedCard setButtonActive={setButtonActive} feedInput={feedInput} setFeedToUpdateId={setFeedToUpdateId} postActive={postActive} setComponent={setComponent} setPostActive={setPostActive} setPostEditing={setPostEditing} setFeeds={setFeeds} feeds={feeds} key={feed?._id} feed={feed} />
      })}
      {(postFetchLoading && hasMore) && [1, 2, 3, 4, 5, 6,7,8,9,10]?.map(n => <FeedSkeleton key={n} />)}
      {/* {
        (!postFetchLoading && !hasMore && !timerOn) && <div className='w-full mt-[4rem] flex items-center justify-center'>
          <SyncLoader width={30} color={'gray'} />
        </div>
      } */}

    </div>




  </div>


}

export default Feed