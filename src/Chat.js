import React,{useState,useEffect} from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutLined from '@material-ui/icons/SearchOutlined'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import MoreVert from '@material-ui/icons/MoreVert'
import "./Chat.css"
import {useParams} from 'react-router-dom'
import db from './firebase'
function Chat() {
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("Roommm");
    useEffect(() => {
        if(roomId)
        {
            db.collection('Rooms').doc(roomId).onSnapshot(snap=>(
                setRoomName(snap.data().name)
            ));
        }        
        
    }, [roomId])


    const sendMessage=(e)=>{
        e.preventDefault();
        console.log(input);
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
                        last seen at...
                    </p>
                </div>
                <IconButton><SearchOutLined style={{ color: 'rgb(67, 255, 224)' }} /></IconButton>
                <IconButton><MoreVert style={{ color: 'rgb(67, 255, 224)' }} /></IconButton>

            </div>

            <div className="chat__body">
                <p className={`chat__message ${true && "chat__reciever"}`}>
                    <span className="chat__name">Name of Sender</span>
                    Hey Guys
                    <span className="chat__timestamp">
                        time
                    </span>
                </p>


                <p className="chat__message">
                    <span className="chat__name">Name of Sender</span>
                    Hey Guys
                    <span className="chat__timestamp">
                        time
                    </span>
                </p>
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                       <input type="text" placeholder =  "Type a message" value={input} onChange = {(e)=>setInput(e.target.value)}/>
                       <button onClick={sendMessage} type = "submit">send a message</button>
                </form>
                <MicIcon></MicIcon>
            </div>


        </div>
    )
}

export default Chat;
