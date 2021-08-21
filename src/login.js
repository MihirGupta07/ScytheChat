import React from 'react'
import { auth, provider } from './firebase'
import "./login.css"
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
function Login() {
    const [{},dispatch] = useStateValue();

    const signIn = ()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user, 
            })
        })
        .catch((e)=>alert(e.message));
    };

    return (

        <div className = "login">
            <div className="login__image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"  alt="img" />
            </div>
            <div className="login__text">
            Welcome to ScytheChat
            </div>
            <div className="login__google">
                <button onClick={signIn}>
                    Login with Google
                </button>
            </div>
            
        </div>
    )
}

export default Login;
