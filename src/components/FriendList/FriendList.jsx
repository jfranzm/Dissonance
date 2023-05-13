import { useState, useEffect } from 'react'
import './FriendList.css'
import axios from 'axios';
import ToChat from '../ToChat/ToChat';
export default function FriendList({user}) {
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

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
    console.log(currentChat);

    
    return (
    <div className="friend-bar">
        <h3 className='friend-title'>Friends</h3>
            {chats.map(chat => (
                <div>
                    <ToChat chat={chat} currentUser={user}/>
                </div>
            ))}
    </div>
    )
}