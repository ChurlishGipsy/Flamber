import { TextField } from '@material-ui/core';
import addUser from '../../assets/add-friend.png'


const SignUp = () => {

    const handleSubmit = () => {

    }
    

    return ( 
        <div className="auth-container">
            <div className="auth-title">Sign Up</div>
            <img className="auth-icon" src={addUser} alt="Add User Logo" />
            <form onSubmit={handleSubmit}>
                <TextField></TextField>
                <TextField></TextField>
            </form>
        </div>
     );
}
 
export default SignUp;