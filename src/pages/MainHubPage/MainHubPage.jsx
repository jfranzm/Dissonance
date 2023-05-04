import './MainHubPage.css'

export default function MainHubPage() {
    return (
        <main className="MainHubPage">
            <div className="friend-bar">
                <h3 className='friend-title'>Friends</h3>

            </div>
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