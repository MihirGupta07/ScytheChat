import React, { useEffect, useState } from 'react'
import ChatBubble from '@material-ui/icons/Chat'
import SearchOutLined from '@material-ui/icons/AddRounded'
import ContentCopyIcon from '@material-ui/icons/FileCopyOutlined'
import MoreVert from '@material-ui/icons/MoreVert'
import { Avatar, IconButton } from '@material-ui/core'
import './Sidebar.css'
import SidebarChats from './SidebarChats'
import firebase from 'firebase';
import db from "./firebase.js";
import { useStateValue } from './StateProvider'


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [input, setInput] = useState("");
    const [{ user }, dispatch] = useStateValue();
    console.log(user);
    useEffect(() => {
        const unsubscribe = db.collection('Rooms').onSnapshot(snapshot => (

            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),


            })))
        ))
        return () => {
            unsubscribe();
        };
    }, [])
    const addMember = (e) => {
        e.preventDefault();
        console.log(input);
       
        try {
            const dd = db.collection('Rooms').doc(input);
            const dd2 = dd.get()
            .then((something)=>
            {
                if(something.exists)
                {
                       
            dd.update({
                members: firebase.firestore.FieldValue.arrayUnion(user.uid)
            }).then(() => alert("Room joined successfully"))
                }
                else
                {
                    alert("Invalid Room Code");
                }
                

        })
         }
        catch (ss) {
            alert("Invalid Room Code");

        }
    }
        return (
            <div className="sidebar">
                <div className="sidebar__header">
                    <IconButton><Avatar src={user.photoURL} /></IconButton>
                    <div className="sidebar__headerRight">
                        <IconButton><ChatBubble style={{ color: 'rgb(67, 255, 224)' }} /></IconButton>
                        <IconButton><MoreVert style={{ color: 'rgb(67, 255, 224)' }} /></IconButton>
                    </div>
                </div>
                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        {/* <SearchOutLined /> */}
                        <form>
                            <input placeholder="Enter chat code to enter an existing room" type="Text" value={input} onChange={(e) => setInput(e.target.value)} />
                            <button onClick={addMember} type="submit"><SearchOutLined /></button>
                        </form>
                    </div>
                </div>
                <div className="sidebar__chats">
                    <SidebarChats addNewChat />
                    {rooms.map(room => (
                        <SidebarChats key={room.id} id={room.id} name={room.data.name} members={room.data.members} />
                    ))}

                </div>
            </div>
        )
    }

    export default Sidebar
