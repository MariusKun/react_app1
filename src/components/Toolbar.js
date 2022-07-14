
import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setCurrentUser} from "../features/user";

const Toolbar = () => {
    const dis = useDispatch()
    const nav = useNavigate()
    const currentUser = useSelector(state => state.user.value.currentUser)

    function logout() {
        dis(setCurrentUser(null))
        nav('/')
    }

    return (
        <div className="toolbar d-flex space-btw">

            <div></div>


            {!currentUser ?
                <div>
                    <Link to="/">Login</Link>
                    <Link to="/register">Register</Link>
                </div> :

                <div>
                    <Link to="/profile">Profile</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            }

        </div>
    );
};

export default Toolbar;