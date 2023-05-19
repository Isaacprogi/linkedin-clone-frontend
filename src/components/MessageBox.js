import React from 'react'
import {MessageCardSmall} from './MessageCardSmall'
import {MessageCardMedium} from './MessageCardMedium'

export const MessageBoxMedium = ({chats,PF, socket, fetching, setFetching}) => {

  
  return (
    <div  className="flex-auto hidden md:grid grid-flow-row auto-rows-[5rem] message-box overflow-y-auto overflow-x-hidden">
              {chats?.length > 0 && chats?.map((chat)=>{
                return <MessageCardMedium fetching={fetching} setFetching={setFetching}  key={chat?._id}    socket={socket} PF={PF} chat={JSON.stringify(chat)}/>
              })}
           </div> 
  )
}


export const MessageBoxSmall = ({chats,PF, socket,setFetching,fetching}) => {
  return (
    <div  className="flex-auto grid grid-flow-row md:hidden auto-rows-[5rem] overflow-y-auto overflow-x-hidden">
              {chats?.length > 0 && chats?.map((chat)=>{
                return <MessageCardSmall fetching={fetching} setFetching={setFetching}  key={chat?._id}    socket={socket} PF={PF} chat={JSON.stringify(chat)}/>
              })}
           </div> 
  )
}









