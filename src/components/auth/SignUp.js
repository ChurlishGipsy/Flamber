import {useRef, useContext, useState} from 'react';
import addUser from '../../assets/add-friend.png';
import { Button, TextField } from '@material-ui/core';
import {AuthCancelButton} from '../reusable/AuthCancelButton';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { Alert } from '@material-ui/lab';


const SignUp = ({setSignUp}) => {

    const { signUp } = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    async function handleSubmit  (e)  {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match. Please try again. ')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value);
            history.push('/model-assets')

        } catch  {
            setError('Failed to create an account');
        }
            setLoading(false);
    }

    return ( 
        <div className="auth-container">
            <div className="auth-title">Sign Up</div>
            <img className="auth-icon" src={addUser} alt="Add User Logo" />
            <form onSubmit={handleSubmit} className="auth-form-container">
                <TextField type="email" inputRef={emailRef} required label="Email" color="secondary" variant="outlined"></TextField>
                <TextField style={{margin: 5}} type="password" inputRef={passwordRef} required label="Password" color="secondary" variant="outlined"></TextField>
                <TextField style={{margin: 5}} type="password" inputRef={passwordConfirmRef} required label="Confirm password" color="secondary" variant="outlined"></TextField>
                <Button style={{margin: 15}} disabled={loading} color="secondary" variant="contained" size="large" onClick={handleSubmit}>Register</Button>
                {error && <Alert variant="filled" severity="error">{error}</Alert>}
                <AuthCancelButton  onClick={() => setSignUp(false)}>Cancel</AuthCancelButton>
            </form>

        </div>
     );
}
 
export default SignUp;