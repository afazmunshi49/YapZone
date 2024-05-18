import React, { useState, useEffect } from 'react';
import AuthBox from '../../shared/components/AuthBox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { validateLoginForm } from '../../shared/utils/validators';
import { getActions } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const actions = getActions(dispatch);

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(validateLoginForm({mail, password}));
    }, [mail, password, setIsFormValid]);
    
    const handleLogin = () => {
        const userDetails = {
            mail,
            password,
        };
        actions.login(userDetails, navigate);
    }

    return (
        <AuthBox>
            <LoginPageHeader />
            <LoginPageInputs
                mail={mail}
                setMail={setMail}
                password={password}
                setPassword={setPassword}
            />
            <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin}/>
        </AuthBox>
    );
};

export default LoginPage;