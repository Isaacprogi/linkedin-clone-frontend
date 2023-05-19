const n =3
export const getRandomElements = (users,user)=>{
    const newUsers = users?.filter(item=>!item?.following?.includes(user?._id))
      if(newUsers){
            return [...newUsers]?.sort(()=> Math.random() > 0.5 ? 1 : -1)?.slice(0,n)
      }
}