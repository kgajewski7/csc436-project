import { useState, useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook';
import { StateContext } from "../contexts/StateContext";

export default 
function Register({close}) {
    const { dispatch } = useContext(StateContext);

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordRepeat, setPasswordRepeat ] = useState('')
    const [ status, setStatus] = useState("")

    function handleUsername (evt) { setUsername(evt.target.value) }
    function handlePassword (evt) { setPassword(evt.target.value) }
    function handlePasswordRepeat (evt) { setPasswordRepeat(evt.target.value) }

    const [user, register] = useResource((username, password) => ({
        url: "auth/register",
        method: "post",
        data: { username, password, passwordConfirmation: password },
    }));

    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setStatus("Registration failed, please try again later.");
            } else {
                setStatus("Registration successful. You may now login.");
            }
        }
    }, [user]);
        
    // useEffect(() => {
    //     if (user && user.data) {
    //         setRegisterFailed(false);
    //         dispatch({ type: 'REGISTER', username: user.data.user.email });
    //         close();
    //     }
    //     if (user?.error) {
    //         console.log(user?.error);
    //         setRegisterFailed(true);
    //     }
    // }, [user])

    return (
        <div>
            <form onSubmit={e => {e.preventDefault(); register(username, password); }}>
                <label htmlFor="register-username">Username:</label>
                <input type="text" value={username} onChange={handleUsername} name="register-username" id="register-username" />
                <br />
                <label htmlFor="register-password">Password:</label>
                <input type="password" name="register-password" id="register-password" value={password} onChange={handlePassword} />
                <br />
                <label htmlFor="register-password-repeat">Repeat password:</label>
                <input type="password" name="register-password-repeat" id="register-password-repeat" value={passwordRepeat} onChange={handlePasswordRepeat} />
                <br />
                <input type="submit" value="Register" disabled={username.length === 0 || password.length === 0 || password !== passwordRepeat} />
                <p>{status}</p>
            </form>
        </div>
    )
}