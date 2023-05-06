import './MainHubPage.css'
import FriendList from '../../components/FriendList/FriendList'
export default function MainHubPage() {
    return (
        <main className="MainHubPage">
            <FriendList />
            <div className="content-container">
                <div className="fav-list">
                    <h3 className='sect-name'>Favourites</h3>
                </div>
                <div className="games-list">
                    <h3 className='sect-name'>Games</h3>

                </div>
            </div>
        </main>
    )
}