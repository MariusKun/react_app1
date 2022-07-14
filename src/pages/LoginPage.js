import React from 'react';
import {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../features/user";

const LoginPage = () => {
    const emailRef = useRef()
    const passRef = useRef()

    const nav = useNavigate()
    const dis = useDispatch()

    const allUsers = useSelector(state => state.user.value.allUsers)
    const [error, setError] = useState(null)

    function loginUser() {
        const user = {
            email: emailRef.current.value,
            password: passRef.current.value,
        }

        const userLoggedIn = allUsers.find(x => x.email === user.email && x.password === user.password)
        if(!userLoggedIn) return setError("bad credentials provided")

        dis(setCurrentUser(userLoggedIn))

        nav('/profile')
    }

    return (
        <div className="d-flex flex-column">
            <input ref={emailRef} type="text" placeholder="email"/>
            <input ref={passRef} type="text" placeholder="password"/>
            {error && <h3>{error}</h3>}
            <button onClick={loginUser}>Login</button>
        </div>
    );
};

export default LoginPage;