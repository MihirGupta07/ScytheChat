import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutLined from '@material-ui/icons/SearchOutlined'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import MoreVert from '@material-ui/icons/MoreVert'
import ContentCopyIcon from '@material-ui/icons/FileCopyOutlined'
import "./Chat.css"
import { useParams } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import db from './firebase'
import firebase from 'firebase';
import InputEmoji from 'react-input-emoji'
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('ScytheChat');
var CryptoJS = require("crypto-js");

function Chat() {
    
    //use states
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("Roommm");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    //Retrieve Messages
    useEffect(() => {
        if (roomId) {
            db.collection('Rooms').doc(roomId).onSnapshot(snap => (
                setRoomName(snap.data().name)
            ));
            db.collection('Rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snap => (
                    setMessages(snap.docs.map(doc => doc.data())))
                );
        }

    }, [roomId])
    //Copy Code Button
    async function copyCode() {
        await navigator.clipboard.writeText(roomId);
        alert("Team Code Copied")
      }

    //Encrypting messages and adding them to the database
    //console.log(messages);
    const sendMessage = (e) => {
        // e.preventDefault();
        //console.log(input);
        const encryptedMessage =   CryptoJS.AES.encrypt(input,"ScytheChat").toString();
        db.collection('Rooms').doc(roomId).collection('messages').add({
            message: encryptedMessage,
            name: user.displayName,
            timestamp:  firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    }
    
  

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>
                        {roomName}
                    </h3>
                    <p>
                        last active{" "}{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <button onClick={copyCode}>
                Copy Code
                <IconButton><ContentCopyIcon style={{ color: 'rgb(67, 255, 224)' }} /></IconButton>
                </button>
                <IconButton><MoreVert style={{ color: 'rgb(67, 255, 224)' }} /></IconButton>

            </div>
    {/* 
    Decrypting and displaying messages 
    */}
            <div className="chat__body">
                {messages.map(message=>(
                <p className={`chat__message ${message.name===user.displayName && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span>
                    {CryptoJS.AES.decrypt(message?.message,"ScytheChat")?.toString(CryptoJS.enc.Utf8)}
                    <span className="chat__timestamp">  
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span> 
                </p>
                ))}
            </div>
            <div className="chat__footer">
                {/* <InsertEmoticonIcon /> */}
                <form>
                    <InputEmoji type="text" placeholder="Type a message" id="MyInput" value={input} onChange={setInput} onEnter={sendMessage} />
                    <button onClick={sendMessage} type="submit">send a message</button>
                </form>
                <MicIcon></MicIcon>
            </div>


        </div>
    )
}

export default Chat;
