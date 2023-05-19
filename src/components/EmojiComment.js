import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

export const EmojiComment = ({setCommentInput,isPickerVisible,setPickerVisible}) => {
    
    return (
            <div  className={isPickerVisible ? 'absolute z-[900] top-[0] hidden md:block ' : 'hidden'}>
                <Picker
                    data={data}
                    style= {
                       {width:'300px'}
                    }
                    onEmojiSelect={(e) => {
                       setCommentInput(prevComment =>prevComment + e.native)
                        setPickerVisible(!isPickerVisible)
                    }}
                />
            </div>
    )
}
