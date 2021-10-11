import React, { useEffect, useState } from 'react'
import ChatBubble from '@material-ui/icons/Chat'
import SearchOutLined from '@material-ui/icons/SearchOutlined'
import MoreVert from '@material-ui/icons/MoreVert'
import { Avatar, IconButton } from '@material-ui/core'
import './Sidebar.css'
import SidebarChats from './SidebarChats'
import db from "./firebase.js";
import { useStateValue } from './StateProvider'


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
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
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <IconButton><Avatar src ={user.photoURL}/></IconButton>
                <div className="sidebar__headerRight">
                    <IconButton><ChatBubble style={{ color: 'rgb(67, 255, 224)' }} /></IconButton>
                    <IconButton><MoreVert style={{ color: 'rgb(67, 255, 224)' }} /></IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutLined />
                    <input placeholder="Search or Start a new Chat" type="Text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChats addNewChat />
                {rooms.map(room => (
                    <SidebarChats key={room.id} id={room.id} name={room.data.name} />
                ))}

            </div>
        </div>
    )
}

export default Sidebar
