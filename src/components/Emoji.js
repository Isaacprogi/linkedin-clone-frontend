import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

export const Emoji = ({messageRef,isPickerVisible,setPickerVisible,setCanBeSent}) => {
    
    return (
            <div  className={isPickerVisible ? 'block absolute -top-[18.5rem] ' : 'hidden'}>
                <Picker
                    data={data}
                    onEmojiSelect={(e) => {
                        setCanBeSent(true)
                        messageRef.current.value += e.native
                        setPickerVisible(!isPickerVisible)
                    }}
                />
            </div>
    )
}
