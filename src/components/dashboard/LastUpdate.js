import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import logo from '../../assets/revenue-icon.png'


const LastUpdate = () => {

    const {data} = useContext(UserContext);
    const [date, setDate] = useState(null);


    const checkDate = (data) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let day, month, year, lastDate;
        if (data && data.realWalletUpdates.length > 0) {
            const date = data.realWalletUpdates[data.realWalletUpdates.length-1].date;
            year = date.slice(-4);
            if (isNaN(date[1])) {
                day = date[0]; 
                if (isNaN(date[3])) {
                    month = months[parseInt(date[2])-1];
                } else {
                    month = months[parseInt(date.slice(2,4))-1];
                }
            }
            else {
                day = date.slice(0,2);
                if (isNaN(date[4])) {
                    month = months[parseInt(date[3])-1];
                }
                else {
                    month = months[parseInt(date.slice(3,5))-1];
                }
            }
            lastDate = day + ' ' + month + ' ' + year;
            setDate(lastDate);
        }
        
    }
    useEffect(() => {
        if (!data) return;
        else {
            checkDate(data);
        }
    }, [data, date])

 

    return ( 
        <div className="dashboard-tile-small">
            <div>
                <p style={{padding: 5}}>Last wallet update</p>
                {data.realWalletUpdates.length > 0 && <h1 style={{paddingTop: 20, paddingBottom: 25}}>{date}</h1>}
                {data && data.realWalletUpdates.length < 1 && <h1 style={{paddingTop: 20, paddingBottom: 25}}>-</h1>}
            </div>
            <img src={logo} alt="Logo"/>
        </div>
     );
}
 
export default LastUpdate;