// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {useHistory} from "react-router-dom"
import {Link} from "react-router-dom"

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


    // const toCreateSpot = (e) => {
    //     e.preventDefault()
    //     history.push("spots/new")
    // }

    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                {/* <li>
                    <button onClick={toCreateSpot}>Create New Spot</button>
                </li> */}

                <li>
                    <Link to="/spots/new">Create New Spot</Link>
                </li>

                <li>
                    <Link to="/spots/current">Manage Spots</Link>
                </li>

                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </>
    );
}

export default ProfileButton;
