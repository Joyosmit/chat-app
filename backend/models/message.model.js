import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId, // id of the user who sent the message
        ref: "User", // reference to the User model
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId, // id of the user who received the message
        ref: "User", // reference to the User model
        required: true
    },
    message:{
        type: String,
        required: true
    }
    // timestamps: true will automatically add the createdAt and updatedAt fields
    // we can access them as message.createdAt and message.updatedAt
},{timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;
