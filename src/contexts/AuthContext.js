
import {createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();


const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email,password);
    }

    const login = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password);
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        resetPassword
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        })
        return unsubscribe;
    }, [])

    return ( 
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;