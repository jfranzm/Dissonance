import { useState, useEffect } from 'react'
import './FriendList.css'
import axios from 'axios';
import Chat from '../Chat/Chat';
export default function FriendList({user}) {
    const [chats, setChats] = useState([]);
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
    return (
    <div className="friend-bar">
        <h3 className='friend-title'>Friends</h3>
            {chats.map(chat => (
                <Chat chat={chat} currentUser={user}/>
            ))}
    </div>
    )
}