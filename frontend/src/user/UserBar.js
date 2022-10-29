import { useContext, useState } from 'react'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import { StateContext } from "../contexts/StateContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default 
function UserBar() {
    const { state } = useContext(StateContext);

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    if (state.user) { 
        return (
            <>
                <Logout />
            </>
        )
    }
    else {
        return (
            <>
                <Button variant="primary" onClick={handleShowLogin}>
                    Login
                </Button>
                <Modal show={showLogin} onHide={handleCloseLogin}>
                    <Login close={handleCloseLogin}/>
                </Modal>
                <Button variant="secondary" onClick={handleShowRegister}>
                    Register
                </Button>
                <Modal show={showRegister} onHide={handleCloseRegister}>
                    <Register close={handleCloseRegister}/>
                </Modal>
            </>
        )
    }
}