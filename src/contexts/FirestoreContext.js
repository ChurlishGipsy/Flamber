import { createContext, useContext } from "react";
import { db } from '../firebase'
import { UserContext } from '../contexts/UserContext';


export const FirestoreContext = createContext();

const FirestoreContextProvider = (props) => {


    const { setData } = useContext(UserContext);




    const sendDataReset = (userId) => {
        const emptyData = {
            doesWalletExist: false,
            modelWallet: [],
            realWalletUpdates: [],
            creationDate: null
        }
        setData(emptyData);
        return db.collection("users").doc(userId).set(emptyData);
    };

    const sendRealWalletUpdate = (userData, userId) => {
        setData(userData);
        return db.collection("users").doc(userId).set(userData);
    }

    
    const value = {
        sendDataReset,
        sendRealWalletUpdate
    }

    return (
        <FirestoreContext.Provider value={value}>
            {props.children}
        </FirestoreContext.Provider>
    )
}


export default FirestoreContextProvider;