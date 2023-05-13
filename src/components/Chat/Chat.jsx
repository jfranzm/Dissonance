import { useEffect, useState } from 'react';
import axios from 'axios';
import './Chat.css';

export default function Chat({chat, currentUser}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = chat.members.find(member => member !== currentUser._id);
        const findUser = async () => {
            try {
                const res = await axios("/api/users?userId=" + friendId);
                setUser(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        findUser();
    }, [currentUser, chat])
    return (
        <div className='chat'>
            <img className='chat-img' 
            src={user?.profilePicture ? user.profilePicture : "https://imgur.com/t/profile_picture/e5sCZrq"} 
            alt="pfp" />
            <span className='chat-name'>{user?.username}</span>
        </div>
    )
}