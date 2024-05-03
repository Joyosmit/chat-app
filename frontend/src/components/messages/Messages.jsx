import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	useListenMessages();
	const { loading, messages } = useGetMessages();
	// console.log("Messages la la: ", messages);
	const lastMessageRef = useRef();
	const loadingArr = [1,2,3,4,5,6,7];
	useEffect(()=>{
		setTimeout(()=>{
			lastMessageRef.current?.scrollIntoView({behavior:'smooth'})
		},100)
	},[ messages])
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length>0 && messages.map((message) => (
					<div key={message._id} ref={(el) => (lastMessageRef.current = el)}>
						<Message  message={message} />
					</div>
			))}
			{loading && loadingArr.map((_,i)=><MessageSkeleton key={i} loading={true}/>)}
			{!loading && messages.length === 0 && <p className='text-center text-lg'>Send a Message</p>}
			{/* <Message/>
			<Message/>
			<Message/>
			<Message/>
			<Message/>
			<Message/> */}
		</div>
	);
};
export default Messages;