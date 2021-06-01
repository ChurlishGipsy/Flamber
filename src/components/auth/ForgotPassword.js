import resetPasswordIcon from '../../assets/reset-password.png'
import { Button, TextField } from '@material-ui/core';
import {useRef, useContext, useState} from 'react';
import {AuthCancelButton} from '../reusable/AuthCancelButton';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { Alert } from '@material-ui/lab';


const ForgotPassword = () => {

    const { resetPassword } = useContext(AuthContext);
    const emailRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit  (e)  {
        e.preventDefault();
        try {
            setError('');
            setLoading(true)
            await resetPassword(emailRef.current.value);
        } catch  {
            setError('Failed to reset password');
        }
            setLoading(false);
    }

    const handleCancel = () => {
        history.push('/');
    }

    return ( 
        <div className="centered home-background">
            <div className="auth-container">
            <div className="auth-title">Password Reset</div>
            <img className="auth-icon" src={resetPasswordIcon} alt="Add User Logo" />
            <form onSubmit={handleSubmit} className="auth-form-container">
                <TextField style={{marginTop: 20}} type="email" inputRef={emailRef} required label="Email" color="secondary" variant="outlined"></TextField>
                <Button style={{margin: 20}} disabled={loading} color="secondary" variant="contained" size="large" onClick={handleSubmit}>Reset Password</Button>
                {error && <Alert variant="filled" severity="error">{error}</Alert>}
                <AuthCancelButton onClick={handleCancel}>Cancel</AuthCancelButton>
            </form>
        </div>
        </div>
     );
}
 
export default ForgotPassword;