import {createContext, useState} from 'react';

export const UserContext = createContext();


const UserContextProvider = (props) => {

    const [data, setData] = useState(null);
    


    return (
        <UserContext.Provider value={{data, setData}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;