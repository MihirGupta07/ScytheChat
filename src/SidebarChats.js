import React, { useEffect, useState } from 'react'
import { Avatar } from "@material-ui/core"
import './SidebarChats.css'
import db from './firebase'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
const Cryptr = require('cryptr');
const cryptr = new Cryptr('ScytheChat');
var CryptoJS = require("crypto-js");
function SidebarChats({ id, name, addNewChat, members }) {
    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState('')
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        if (id) {
            db.collection('Rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snap => setMessages(snap.docs.map(doc => doc.data())))
        }
    }, [id]);
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])
    
    const createChat = () => {

        const roomName = prompt("Please Enter Room Name");
        if (roomName) {
            db.collection("Rooms").add(
                {
                    name: roomName,
                    members: [user.uid],
                }
            );
        }
    }

    return !addNewChat ? (
        members.includes(user.uid) ? (
            <Link to={`/rooms/${id}`}>

                <div className='sidebarChats'>
                    <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
                    <div className="sidebarChats__info">
                        <h2>{name}</h2>
                        <p>{(messages[0]?.message)?(CryptoJS.AES.decrypt(messages[0].message,"ScytheChat").toString(CryptoJS.enc.Utf8)):" "}</p>
                        {/* <p>{messages[0]?.message}</p> */}
                    </div>

                </div>
            </Link>):
            <></>             
    )
        :
        (
            <div onClick={createChat} className="sidebarChats">
                <h2>Add New Chat</h2>
            </div>
        );

}

export default SidebarChats
