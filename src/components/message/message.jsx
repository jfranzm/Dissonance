import "./message.css"

export default function Message({own}) {
    return (
        <div className={own ? "message own": "message"}>
            <div className="message-top">
                <div className="message-img"></div>
                <p className="message-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid officia voluptas maxime nihil nobis distinctio quaerat eveniet autem quibusdam harum, laboriosam soluta nostrum, est accusantium perferendis! Id laudantium nemo dolorem.</p>
                <p className="message-time">1 hour ago</p>
            </div>
            
        </div>
    )
}