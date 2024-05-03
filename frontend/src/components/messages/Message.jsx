import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    // here selectedConversation is the user we are chatting with
    const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const bubbleBgColour = fromMe ? 'bg-blue-500' : '';
    const formattedTime = extractTime(message.createdAt);
    const shakeClass = message.shouldShake ? "shake" : ''

    return (
        <div>
            {
                (message.senderId === selectedConversation._id || message.senderId === authUser._id) &&
                <div className={`chat ${chatClassName}`}>
                    <div className='chat-image avatar'>
                        <div className='w-10 rounded-full'>
                            <img
                                src={profilePic}
                                alt='Avatar image'
                            />
                        </div>
                    </div>
                    <div className={`chat-bubble text-white ${bubbleBgColour} ${shakeClass}`}>{message.message}</div>
                    <div className='chat-footer opacity-50 text-xs flex gap-1 mb-2 items-center'>{formattedTime}</div>

                </div>
            }
        </div>
    )
}

export default Message
