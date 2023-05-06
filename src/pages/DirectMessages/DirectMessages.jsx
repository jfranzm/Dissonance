import './DirectMessages.css';
import FriendList from '../../components/FriendList/FriendList';
export default function DirectMessages() {
    return (
        <div className='DirectMessage'>
            <FriendList />
            <div className='chat-container'>
                <div className='user-info-bar'>
                    <h2>User1</h2>
                </div>
                <div className='user-info'>
                    <div className='pfp'></div>
                    <h4>User1</h4>
                </div>
            </div>
        </div>
    )
}