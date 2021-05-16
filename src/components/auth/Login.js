import user from '../../assets/user.png'
import { TextField } from '@material-ui/core';
import {useRef, useContext, useState} from 'react';
import {MainButton} from '../reusable/MainButton';
import {CancelButton} from '../reusable/CancelButton';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { Alert } from '@material-ui/lab';


const Login = ({setLogin}) => {

    const { login } = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit  (e)  {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/model-assets');
        } catch  {
            setError('Failed to sign in');
        }
            setLoading(false);
    }

    return ( 
        <div className="auth-container">
            <div className="auth-title">Login</div>
            <img className="auth-icon" src={user} alt="Add User Logo" />
            <form onSubmit={handleSubmit} className="auth-form-container">
                <TextField type="email" inputRef={emailRef} required label="Email" color="secondary" variant="filled"></TextField>
                <TextField type="password" inputRef={passwordRef} required label="Password" color="secondary" variant="filled"></TextField>
                <MainButton disabled={loading} color="secondary" variant="contained" size="small" onClick={handleSubmit}>Login</MainButton>
                <MainButton color="secondary" variant="text" size="small">Forgot password?</MainButton>
                <CancelButton size="small" onClick={() => setLogin(false)}>Cancel</CancelButton>
            </form>
            {error && <Alert variant="filled" severity="error">{error}</Alert>}
        </div>
     );
}
 
export default Login;