import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeView } from '@/redux/slices/authModalSlice';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebaseClient';
import { FIREBASE_ERRORS } from '@/firebase/errors';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();

    const [
        createUserWithEmailAndPassword,
        userCred,
        loading,
        userError,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const handleLoginClick = () => {
        dispatch(changeView('login'));
    };

    const handleEmailSignupClick = () => {
        setDialogOpen(true);
    };
    const handleGoogleSignup = () => {
        signInWithGoogle();
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleSubmit = async () => {
        if (error) setError('');
        if (email === '' || password === '' || confirmPassword === '') {
            setError("Enter all Fields");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!emailRegex.test(email)) {
            setError('Invalid email address');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!passwordRegex.test(password)) {
            setError('Password must contain at least 8 characters, including at least one digit, one special character, one uppercase letter, and one lowercase letter.');
            return;
        }
        createUserWithEmailAndPassword(email, password);
    };


    return (
        <div className='auth-box'>
            <div className='auth-title'>Sign Up</div>
            <div className='auth-title-desc'>Choose a sign up method</div>
            <div className='auth-buttons'>
                <div className='auth-button' onClick={handleGoogleSignup}>
                    <img src='/Assets/google.png' alt='auth-google-icon' className='auth-button-icons' />
                    <div className='auth-button-name'>Sign Up with Google</div>
                </div>
                <div className='auth-button' onClick={handleEmailSignupClick}>
                    <img src='/Assets/mail.png' alt='auth-mail-icon' className='auth-button-icons' />
                    <div className='auth-button-name'>Sign Up with Email</div>
                </div>
            </div>
            <div className="link-container">
                <span className="link-text">Existing user?  </span>
                <span
                    className="link-texts"
                    onClick={handleLoginClick}
                >
                    Log In
                </span>
            </div>

            {dialogOpen && (
                <div className="dialog-overlay" onClick={handleCloseDialog}>
                    <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                        <div className='auth-title' style={{ paddingBottom: "30px" }}>Sign Up</div>
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
                        <input
                            className='auth-input'
                            type="text"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="auth-error-message">{error || (userError && FIREBASE_ERRORS[userError.message])}</div>
                        <button onClick={handleSubmit} className='auth-submit' disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;