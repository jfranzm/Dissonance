import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ToChat.css';

export default function ToChat({chat, currentUser}) {
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
    <Link to={`/directmessage`} >
        <div className='to-chat'>
                <div className='to-chat-img'></div>
                <span className='to-chat-name'>{user?.username}</span>
        </div>
    </Link>
    )
}