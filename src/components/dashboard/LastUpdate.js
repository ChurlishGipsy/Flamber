import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import logo from '../../assets/revenue-icon.png'


const LastUpdate = () => {

    const {data} = useContext(UserContext);

    useEffect(() => {
        if (!data) return;
    }, [data])

    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);

    return ( 
        <div className="dashboard-tile-small">
            <div>
                <p>Last update</p>
            </div>
            <img src={logo} alt="Logo"/>
        </div>
     );
}
 
export default LastUpdate;