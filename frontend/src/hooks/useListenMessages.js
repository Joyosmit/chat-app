import  { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import { useNotification } from '../zustand/useNotification';
import { useAuthContext } from '../context/AuthContext';



const useListenMessages = () => {
    const { socket } = useSocketContext();
    const {authUser} = useAuthContext();
    const { messages, setMessages, selectedConversation } = useConversation();
    const {notificationArr, setNotificationArr} = useNotification();

    // const {conversations} = useGetConversations()
    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            
            newMessage.shouldShake = true;
            
            setMessages([...messages, newMessage])
        })

        // cleanup function to remove the event listener when the component unmounts
        return ()=>socket?.off("newMessage")
    }, [socket, setMessages, messages])
}

export default useListenMessages
