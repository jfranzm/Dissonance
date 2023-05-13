import './MainHubPage.css'
import { Link } from 'react-router-dom';
import FriendList from '../../components/FriendList/FriendList'
import FavouritesList from '../../components/FavouritesList/FavouritesList';
export default function MainHubPage({user}) {
    console.log(user);
    return (
        <main className="MainHubPage">
            <FriendList user={user}/>
            <div className="content-container">
                <div className="fav-list">
                    <h3 className='sect-name'>Favourites</h3>
                    <FavouritesList user={user} />
                </div>
                <div className="games-list">
                    <h3 className='sect-name'>Games</h3>
                        <div className='games'>
                            <Link to={'/tictactoe'}>
                                <div className="tictactoe game-box"></div>
                                <span className='game-title'>TicTacToe</span>
                            </Link>
                        </div>
                </div>
            </div>
        </main>
    )
}