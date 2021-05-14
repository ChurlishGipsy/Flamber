import user from '../../assets/user.png'

const Login = () => {
    return ( 
        <div className="auth-container">
            <div className="auth-title">Login</div>
            <img className="auth-icon" src={user} alt="Add User Logo" />
            
        </div>
     );
}
 
export default Login;