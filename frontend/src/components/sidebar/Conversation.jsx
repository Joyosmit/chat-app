import { set } from "mongoose";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { useNotification } from "../../zustand/useNotification";

const Conversation = ({conversation, lastIdx}) => {
	const {selectedConversation, setSelectedConversation} = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const {onlineUsers} = useSocketContext();
	const {notificationArr, setNotificationArr} = useNotification();

	// const isOnline = onlineUsers.some((user) => user.userId === conversation._id);
	const isOnline = onlineUsers.includes(conversation._id);
	const clearNotifArr = (id) => {
		console.log("ID: ",id)
		setNotificationArr(notificationArr => notificationArr.filter(x => x !== `${id}`))
		console.log("GCGCGCGCC",notificationArr)
	}
	const handleClick = (conversation) => {
		setSelectedConversation(conversation);
		clearNotifArr(conversation._id);
	}
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
			${isSelected ? 'bg-sky-500': ''}`}
			onClick={()=>handleClick(conversation)}>
				<div className={`avatar ${isOnline ? 'online': ''}`}>
					<div className='w-12 rounded-full'>
						<img
							
							src={conversation.profilePic}
							alt='user avatar'
							loading="lazy"
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;