import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading, setLoading] = useState(true)
    const { messages, setMessages, selectedConversation } = useConversation()
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error)
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (selectedConversation?._id) getMessages()
        // we only want to fetch messages when selectedConversation._id changes
        // we also added setMessages to the dependencies array to avoid the eslint warning 
    }, [selectedConversation?._id])

    return { loading, messages }
}

export default useGetMessages
