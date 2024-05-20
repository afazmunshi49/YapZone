import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import SideBar from './SideBar/SideBar';
import FriendsSideBar from './FriendsSideBar/FriendsSideBar';
import Messenger from './Messenger/Messenger';
import AppBar from './AppBar/AppBar';
import { logout } from '../shared/utils/auth';
import { useDispatch } from 'react-redux';
import { getActions } from '../store/actions/authActions';
import { connectWithSocketServer } from '../realtimeCommunication/socketConnection';

const Wrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
});

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const actions = getActions(dispatch);

    useEffect(() => {
        const userDetails = localStorage.getItem('user');
        if (!userDetails) {
            logout();
        } else {
            actions.setUserDetails(JSON.parse(userDetails));
            connectWithSocketServer(JSON.parse(userDetails));
            setIsLoading(false);
        }
    }, []);

    if(isLoading) {
        // This is to avoid premature rendering the dashboard when the user is not logged in
        return <Wrapper />;
    }

    return (
        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />
        </Wrapper>
    );
};

export default Dashboard;