import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        // id has been renamed to receiverId in the route
        const { id: receiverId } = req.params;

        // req.user is available because of the protectRoute middleware
        const senderId = req.user._id;

        // Find the conversation between the sender and receiver
        // $all is used to find a conversation where both senderId and receiverId are present
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        // If conversation being started for the first time
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            }) // message will be empty array by default thanks to our schema of messages
        }

        // used Message instead of Message.create as i did not want empty messages in DB
        // therefore i can filter them out before saving them in DB
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })


        if (newMessage.message.trim() === "") {
            return res.status(400).json({ message: "Message cannot be empty" })
        }

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // This approach is not recommended as it will save the conversation first and then the message
        // Hence taking up more time
        //      |
        //      V
        // await conversation.save()
        // await newMessage.save()

        // This allows us to save both the conversation and the message in parallel
        await Promise.all([conversation.save(), newMessage.save()])


        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in message controller", error.message)
        res.status(500).json({ message: "Something went wrong...Chud gya guru" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")  // we get entire message object instead of just the id

        if(!conversation){
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessage controller", error.message)
        res.status(500).json({ message: "Something went wrong...Chud gya guru" });
    }
};