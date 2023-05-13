import { useEffect, useState } from 'react';
import axios from 'axios';
import './ChatOnline.css';

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const recallFriends = async () => {
            const res = await axios.get("/api/users/friends/" + currentId);
            setFriends(res.data);
            };

            recallFriends();
        }, [currentId]);
        console.log(friends);

    useEffect(() => {
        setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)));
    }, [friends, onlineUsers]);

    console.log(onlineUsers);
        return (
            <div className='chat-online'>
                <h4>Online</h4>
                {onlineFriends.map((online) => {
                    <div className="online-friend">
                        <div className="online-img-container">
                            <div className="online-img"></div>
                            <div className="online-badge"></div>
                        </div>
                        <span className='online-name'>{online.username}</span>
                    </div>
                })}

                
            </div>
        )
    }

    
