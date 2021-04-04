import { useEffect, useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';
import icon from '../../assets/money.png';

const CurrentAssets = () => {

    const {data} = useContext(UserContext);

    useEffect(() => {
       if (!data) return; 
    }, [data])

    return  ( 
        <div className="dashboard-tile-small">
            <div>
                <p style={{padding: 5}}>Current assets</p>
                {data.realWalletUpdates.length > 0  && <h1 style={{paddingTop: 20, paddingBottom: 25}}>{data.realWalletUpdates[data.realWalletUpdates.length-1].currentAssets.toFixed(2).toString().replace(/\./g, ',')} zł</h1>}
                {data.realWalletUpdates.length < 1  && <h1 style={{paddingTop: 20, paddingBottom: 25}}>-</h1>}
            </div>
             <img src={icon} alt="Money Icon"/>
        </div> 
    );
}
 
export default CurrentAssets;