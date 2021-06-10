import {createContext, useState, useEffect, useContext} from 'react';
import { AuthContext } from './AuthContext';
import { db } from '../firebase';

export const UserContext = createContext();


const UserContextProvider = (props) => {

    const {currentUser} = useContext(AuthContext);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        if (currentUser) {
            db.collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                        if (doc.id === currentUser.uid) {
                        const docData = doc.data();
                        setData(docData);
                        } else {
                            const empty = {
                                doesWalletExist: false,
                                modelWallet: [],
                                realWalletUpdates: [],
                                creationDate: null
                            }
                            setData(empty);
                        }
                });
            });


            // fetch('http://localhost:8000/user')
            // .then(res => {
            //     if (!res.ok) {
            //         throw Error('Could not fetch the data for that resource');
            //     }
            //     return res.json();
            // })
            // .then((data) => {
            //     setData(data);
            // })
        }
        
    },[currentUser])

    return (
         <UserContext.Provider value={{data, setData}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;