import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	// console.log("CONVERSATIONs", conversations)
	// useListenMessages();

	

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					
					lastIdx = {idx === conversations.length - 1}
				/>
			))}
			{loading && <div className='loading loading-spinner'></div>}

		</div>
	);
};
export default Conversations;