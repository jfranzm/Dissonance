import { useState, useEffect } from 'react'
import './FavouritesList.css'
import axios from 'axios';
import FavouritesChat from '../FavouritesChat/FavouritesChat';
export default function FavouritesList({user}) {
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
    <div className="favourites-list">
            {chats.map(chat => (
                <div>
                    <FavouritesChat chat={chat} currentUser={user}/>
                </div>
            ))}
    </div>
    )
}