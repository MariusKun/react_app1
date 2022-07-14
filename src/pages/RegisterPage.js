import React from 'react';
import {useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {addUser} from "../features/user";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const emailRef = useRef()
    const passOneRef = useRef()
    const passTwoRef = useRef()

    const nav = useNavigate()
    const dis = useDispatch()

    const [error, setError] = useState(null)

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function registerUser() {
        let invalid = false

        const user = {
            email: emailRef.current.value,
            passOne: passOneRef.current.value,
            passTwo: passTwoRef.current.value
        }

        if(!validateEmail(user.email)) invalid = "bad email provided"
        if(user.passOne.length < 4 || user.passOne.length > 20) invalid = "pass is too short or too long"
        if(user.passOne !== user.passTwo) invalid = "passwords should match"

        if(invalid) return setError(invalid)

        dis(addUser(user))
        nav('/')
    }

    return (
        <div className="d-flex flex-column">
            <input ref={emailRef} type="text" placeholder="email"/>
            <input ref={passOneRef} type="text" placeholder="pass 1"/>
            <input ref={passTwoRef} type="text" placeholder="pass 2"/>
            {error && <h3>{error}</h3>}
            <button onClick={registerUser}>Register</button>
        </div>
    );
};

export default RegisterPage;