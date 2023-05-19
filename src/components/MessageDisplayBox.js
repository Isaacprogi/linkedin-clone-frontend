import React from 'react'
import useGroup from '../hooks/useGroup'
import { useEffect,useState} from 'react'
import { useMessageContext } from '../hooks/useMessageContext'
import SingleMessageByUser from './SingleMessageByUser'
import SingleMessageByOther from './SingleMessageByOther'
import {SyncLoader} from 'react-spinners'
import { useThemeContext } from '../hooks/useThemeContext'



export const MessageDisplayBox = ({ user, photo , fetching, lastListRef}) => {
    const { messages} = useMessageContext()
    const { data } = useGroup(messages, 'createdAt')
    const [color] = useState('gray')
    const [loading, setLoading] = useState(false)
    const {switchTheme} = useThemeContext()


    useEffect(() => {
            if(data && !fetching){
                    setLoading(true)
                    lastListRef?.current?.lastElementChild?.scrollIntoView({
                        behavior:'smooth'
                    })
                    setLoading(false)
            }
<<<<<<< HEAD
    }, [data,fetching,lastListRef])
=======
    }, [data,fetching])
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856
    
   




    return (
        <div id='chat-Box' className={`flex-auto ${loading?'opacity-[0]':''} flex ${switchTheme?"bg-gray-900":""} relative   flex-col `}>
            {
               (data?.length) > 0  && data?.map((item, index) => {
                    return <div  key={item?.groupBy} className=' w-full flex flex-col '>
                              <div className="items-center justify-center mb-3 flex w-full">
                              <div className=" w-[max-centent] text-sm text-gray-400 ">
                                {item?.groupBy}
                                </div>                          

                           </div>

                        {
                            
                            item?.record?.map((message,index) => {
                                return message?.sender?.username === user ?
                                   <SingleMessageByUser key={message?._id} message={message} lastListRef={lastListRef}  photo={photo}/>
                                   :
                                   <SingleMessageByOther key={message?._id} message={message} lastListRef={lastListRef} photo={photo}/>                          

                            })
                        }

                    </div>
                })
            }

            {
                (!data || data?.length < 1) && <div className='w-full h-full flex items-center justify-center'>
                      <SyncLoader
                         color={color}
                         size={10}
                         aria-label='Loading Spinner'
                      />
                </div>
            }
        </div>
    )
}
