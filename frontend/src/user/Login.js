import React, {useState, useContext} from 'react'
import { StateContext } from "../contexts/StateContext";

export default 
function Login({close}) {
    const { dispatch } = useContext(StateContext);
    const [username, setUsername] = useState('')

    function handleUsername (evt) {setUsername(evt.target.value)}

    return (
        <form onSubmit={e => {e.preventDefault(); dispatch({ type: 'LOGIN', username }); close();}}>
            <label htmlFor="login-username">Username:</label>
            <input type="text" value={username} onChange={handleUsername} name="login-username" id="login-username" />
            <br />
            <label htmlFor="login-password">Password:</label>
            <input type="password" name="login-password" id="login-password" />
            <br />
            <input type="submit" value="Login" disabled={username.length === 0}/>
        </form>
    )
}