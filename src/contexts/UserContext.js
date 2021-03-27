import {createContext, useState, useEffect} from 'react';

export const UserContext = createContext();


const UserContextProvider = (props) => {

    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:8000/user')
        .then(res => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            setData(data);
        })
    },[])

    return (
         <UserContext.Provider value={{data, setData}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;