import React from 'react';
import { auth } from '@/firebase/firebaseClient';

const Navbar = () => {
    const handleSignout = () => {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
            })
            .catch((error) => {
                console.error('Sign-out error:', error.message);
            });
    };

    return (
        <div className='navbar-main'>
            <div className='auth-logo' style={{fontSize: "15px"}}>LO  <span style={{ padding: "5px", borderRadius: "5px"}}>GO</span></div>
            <div className='navbar-signout' onClick={handleSignout}>
                Sign Out
            </div>
        </div>
    );
};

export default Navbar;