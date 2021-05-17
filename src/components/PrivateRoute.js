import {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {

    const {currentUser} = useContext(AuthContext)

    return ( 
        <Route {...rest} render={props => {
            return currentUser ? <Component {...props}/> : <Redirect to="/"/>
        }}>

        </Route>
     );
}
 
export default PrivateRoute;