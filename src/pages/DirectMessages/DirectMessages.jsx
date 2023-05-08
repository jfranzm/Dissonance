import './DirectMessages.css';
import FriendList from '../../components/FriendList/FriendList';
import Message from '../../components/message/message';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';

export default function DirectMessages({user}) {
    
    return (
        <div className='DirectMessage'>
            <FriendList />
            <div className='chat-container'>
                <div className='user-info-bar'>
                    <h2>User1</h2>
                </div>
                <div className='chat-box'>
                    <div className="chat-box-wrapper">
                        <div className='user-info'>
                            <div className='pfp'></div>
                            <h4>User1</h4>
                        </div>
                        <div className="chat-box-top">
                            <Message />
                            <Message own={true}/>
                            <Message />
                            <Message own={true}/>
                            

                        </div>
                    </div>
                        <div className="chat-box-bottom">
                            <input type="text" className='chat-input' placeholder='Message User1'/>
                            <button className='chat-submit'>Send</button>
                        </div>
                    
                </div>
            </div>
        </div>
    )
}