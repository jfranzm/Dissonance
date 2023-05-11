import "./message.css";
import {format} from "timeago.js"

export default function Message({message, own}) {
    return (
        <div className={own ? "message own": "message"}>
            <div className="message-top">
                <div className="message-img"></div>
                <p className="message-text">
                    {message.text}
                </p>
                <p className="message-time">{format(message.createdAt)}</p>
            </div>
            
        </div>
    )
}