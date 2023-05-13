import './DirectMessages.css';
import Message from '../../components/message/message';
import Chat from '../../components/Chat/Chat';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import {io} from "socket.io-client";

export default function DirectMessages({user}) {
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [chatUser, setChatUser] = useState(null)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef()
    const scrollRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            chatId: currentChat._id
        };

        const receiverId = currentChat.members.find(member => member !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });
        
        try {
            const res = await axios.post("api/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch(err) {
            console.log(err);
        }
    }
    // friends list
    useEffect(() => {
        const getChats = async() => {
            try {
                const res = await axios.get("/api/chats/"+user._id)
                setChats(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        getChats();
    }, [user._id])

    // return messages
    useEffect(() => {
        const getMessages = async () => {
            try {
            const res = await axios.get("/api/messages/" + currentChat?._id);
            setMessages(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);


    // scroll ref to bottom of messages
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    },[messages])

    // return sender's username 
    useEffect(async () => {
        const friendId = currentChat?.members.find(member => member !== user._id);
        const findUser = async () => {
            try {
                const res = await axios("/api/users?userId=" + friendId);
                setChatUser(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        findUser();
    }, [currentChat])

    // sockets
    useEffect(() => {
        socket.current = io("https://dissonancechat.herokuapp.com/directmessage");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, []);
    // live appending of chat
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(users.followings.filter(following => users.some(user => user.userId === following)));
    })
   }, [user])
    
   
  
    return (
        <>
            <div className='DirectMessage'>
                <div className="friend-bar">
                    <h3 className='friend-title'>Friends</h3>
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                        {chats.map(chat => (
                            <div onClick={()=> setCurrentChat(chat)}>
                                <Chat chat={chat} currentUser={user}/>
                            </div>
                        ))}
                    </div>
                    <div className='chat-box'>
                        <div className="chat-box-wrapper">
                            {
                                currentChat ?
                                <>
                                <div className='user-info-bar'>
                                    <h2 className='username'>{chatUser?.username}</h2>
                                </div>
                                <div className='user-info'>
                                    <div className='pfp'></div>
                                    <h4 className='username'>{chatUser?.username}</h4>
                                </div>
                                <div className="chat-box-top">
                                    {messages.map((message) => (
                                        <div ref={scrollRef}>
                                            <Message message={message} own={message.sender === user._id}/>
                                        </div>
                                    ))}
                                </div>
                                <div className="chat-box-bottom">
                                    <input 
                                        type="text" 
                                        className='chat-input' 
                                        placeholder='write something...' 
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    />
                                    <button className='chat-submit' onClick={handleSubmit}>Send</button>
                                </div>
                            </>:
                            <span className='no-convo-text'>Open a conversation!</span>
                            }
                        </div>
                    </div>
                    
                </div>
        </>
    )
}