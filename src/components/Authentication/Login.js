import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeView } from '@/redux/slices/authModalSlice';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebaseClient';
import { FIREBASE_ERRORS } from '@/firebase/errors';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eror, setEror] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const [signInWithGoogle, userCred] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleSignupClick = () => {
        dispatch(changeView('signup'));
    };

    const handleEmailLoginClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleSubmit = () => {
        if (eror) setEror('');
        if (password === '' || email === '') {
            setEror("Enter the email and password");
            return;
        }
        signInWithEmailAndPassword(email, password);
    };

    return (
        <div className='auth-box'>
            <div className='auth-title'>Login</div>
            <div className='auth-title-desc'>Choose a Login method</div>
            <div className='auth-buttons'>
                <div className='auth-button' onClick={() => signInWithGoogle()}>
                    <img src='/Assets/google.png' alt='auth-google-icon' className='auth-button-icons' />
                    <div className='auth-button-name'>Log In with Google</div>
                </div>
                <div className='auth-button' onClick={handleEmailLoginClick}>
                    <img src='/Assets/mail.png' alt='auth-mail-icon' className='auth-button-icons' />
                    <div className='auth-button-name'>Log In with Email</div>
                </div>
            </div>
            <div className="link-container">
                <span className="link-text">New Here?  </span>
                <span
                    className="link-texts"
                    onClick={handleSignupClick}
                >
                    Sign Up
                </span>
            </div>

            {dialogOpen && (
                <div className="dialog-overlay" onClick={handleCloseDialog}>
                    <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                        <div className='auth-title1' style={{ paddingBottom: "30px" }}>Login</div>
                        <input
                            className='auth-input'
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className='auth-input'
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="auth-error-message">{eror || (error && FIREBASE_ERRORS[error.message])}</div>
                        <button onClick={handleSubmit} className='auth-submit'>Login</button>
                        <div className="link-container">
                            <span className="link-text">New user?  </span>
                            <span
                                className="link-texts"
                                onClick={handleSignupClick}
                            >
                                Sign Up
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;