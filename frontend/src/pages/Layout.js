import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserBar from '../user/UserBar'
import { StateContext } from "../contexts/StateContext";
import { Link } from 'react-router-dom'

export default function Layout () {

    const { state } = useContext(StateContext)
    const { user } = state

    return (
        <>
            <Link to="/"><h1 style={{color: ' red '}}>{document.title}</h1></Link>
            <React.Suspense fallback={"Loading..."}>
                <UserBar />
            </React.Suspense> 
            <br />
            {user && <Link to="/todo/create">Create New Todo</Link> }
            <hr />
            <Outlet />
        </>
    )
}