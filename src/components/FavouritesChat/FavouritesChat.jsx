import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FavouritesChat.css';

export default function FavouritesChat({chat, currentUser}) {
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
    
        <div className='favourites-chat'>
            <Link to={`/directmessage`} >
                <div className='favourites-chat-img'></div>
            </Link>
                <span className='favourites-chat-name'>{user?.username}</span>
        </div>
   
    )
}