import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper">
            <a href="/" className="brand-logo">ToDoList</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/" onClick={logoutHandler}>Logout</NavLink></li>
            </ul>
            </div>
        </nav>
    )
}