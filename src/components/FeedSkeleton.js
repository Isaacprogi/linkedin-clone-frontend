import SkeletonElement from './SkeletonElement'
import { useThemeContext } from '../hooks/useThemeContext'
const FeedSkeleton = ({ feed }) => {
    const { switchTheme } = useThemeContext()


    return <div className={`w-full ${switchTheme?'border-gray-700 border':'border border-gray-300'} px-3 py-2 opacity-[.5] border-gray-300  flex flex-col  mb-2 sm:rounded-lg overflow-hidden  `}>
        <div className="w-full flex items-start  md:px-0 justify-between">
            <div key={feed?.user?.id} className="flex w-full mb-2 ">
                <div className="w-[3rem]  h-[3rem] rounded-full overflow-hidden mr-2">
                    <SkeletonElement type="avatar" />
                </div>
                <div className=' flex flex-1 flex-col leading-4 justify-start '>
                    <div className={` w-full font-[700] ${switchTheme ? 'text-gray-300' : 'text-gray-600 '}`}>
                        <SkeletonElement type="name" />
                    </div>
                    <div className={`w-full text-[.67rem] ${switchTheme ? 'text-gray-400' : 'text-gray-500'}  `}>
                        <SkeletonElement type="title" />
                    </div>
                    <span className='flex items-center text-[.67rem]  text-gray-500 justify-start'>
                    <SkeletonElement type="day" />
                    </span>
                </div>
            </div>
            <div className=' flex items-end justify-start '>
                <div className='w-[1.5rem] rounded-full overflow-hidden h-[1.5rem] bg-gray-300'>          
                </div>
            </div>
        </div>
        <div className={`break-all text-[.8rem] mb-1 px-3 md:px-0  ${switchTheme ? "text-gray-300" : "text-gray-600"}`}>
            {/* <SkeletonElement type="post" /> */}
        </div>

    </div>
}

export default FeedSkeleton