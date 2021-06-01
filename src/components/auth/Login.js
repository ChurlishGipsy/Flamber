import user from '../../assets/user.png'
import { Button, TextField } from '@material-ui/core';
import {useRef, useContext, useState} from 'react';
import {AuthCancelButton} from '../reusable/AuthCancelButton';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';



const Login = ({setLogin}) => {

    const { login, persistence } = useContext(AuthContext);
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
            await persistence();
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
                <TextField type="email" inputRef={emailRef} required label="Email" color="secondary" variant="outlined"></TextField>
                <TextField style={{margin: 5}} type="password" inputRef={passwordRef} required label="Password" color="secondary" variant="outlined"></TextField>
                <Link style={{textDecoration: 'none'}} to="/forgot-password"><Button style={{margin: 10}} color="secondary" variant="text" size="small">Forgot password?</Button></Link>
                <Button style={{margin: 10}} disabled={loading} color="secondary" variant="contained" size="large" onClick={handleSubmit}>Login</Button>
                {error && <Alert variant="filled" severity="error">{error}</Alert>}
                <AuthCancelButton  onClick={() => setLogin(false)}>Cancel</AuthCancelButton>
            </form>
        </div>
     );
}
 
export default Login;