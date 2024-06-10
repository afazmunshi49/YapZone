import React, { useState, useEffect } from 'react';
import AuthBox from '../../shared/components/AuthBox'
import { Typography } from '@mui/material';
import RegisterPageInputs from './RegisterPageInputs';
import { validateRegisterForm } from '../../shared/utils/validators';
import RegisterPageFooter from './RegisterPageFooter';
import { getActions } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const RegisterPage = ({ register }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const actions = getActions(dispatch);

    const [mail, setMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);

    const handleRegister = () => {
        const userDetails = {
            mail, 
            password,
            username,
        };

        actions.register(userDetails, navigate)
    };

    useEffect(()=> {
        setIsFormValid(validateRegisterForm({
            mail,
            username,
            password
        }));
    }, [mail, username, password, setIsFormValid]);

    return (
        <div>
            <AuthBox>
                <Typography variant='h5' sx={{color: 'white '}}>
                    Create and account
                </Typography>
                <RegisterPageInputs 
                mail={mail}
                setMail={setMail}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                />
                <RegisterPageFooter 
                handleRegister={handleRegister}
                isFormValid={isFormValid}
                />
            </AuthBox>
        </div>
    );
};

export default RegisterPage;