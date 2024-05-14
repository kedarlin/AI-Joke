import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthModal } from '@/redux/slices/authModalSlice';
import Login from './Login';
import Signup from './Signup';

const Authentication = () => {
    const dispatch = useDispatch();
    const { view } = useSelector(selectAuthModal);

    return (
        <div className='auth-main'>
            <div className='auth-left'>
                <img src='/Assets/ippo_auth_img.png' alt='auth-page-img' />
            </div>
            <div className='auth-right'>
                <div className='auth-top'>
                    <div className='auth-logo'>Lo  <span>GO</span></div>
                    <div className='auth-desc'>Journey to a trillion miles starts from here!!</div>
                </div>
                {
                    view === 'login' && <Login /> ||
                    view === 'signup' && <Signup />
                }
            </div>
        </div>
    );
};

export default Authentication;