import { useState } from 'react'

export default function JoinGame() {
    const [gamePassword, setGamePassword] = useState("");

    const createChannel = async () => {
        }
    return (
        <div className="join-game">
            <h4>Create Game</h4>
            <input placeholder="enter password" onChange={(event) => {
                setGamePassword(event.target.value);
            }}
            />
            <button onClick={createChannel}>Join/Start Game</button>
        </div>
    )
}