import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import profitIcon from '../../assets/profit-icon.png';
import { useState } from "react";

const AssetsChange = () => {

    const checkAssetsChange = (data) => {
        let change, percentage;
        if (data && data.realWalletUpdates.length > 1) {
            change = data.realWalletUpdates[data.realWalletUpdates.length-1].currentAssets-data.realWalletUpdates[data.realWalletUpdates.length-2].currentAssets;
            percentage = ((data.realWalletUpdates[data.realWalletUpdates.length-1].currentAssets-data.realWalletUpdates[data.realWalletUpdates.length-2].currentAssets)/data.realWalletUpdates[data.realWalletUpdates.length-2].currentAssets) * 100;
            setAssetsChange(change);
            setPercentageChange(percentage);
        } 
    }

    const {data} = useContext(UserContext);
    const [assetsChange, setAssetsChange] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0)

    useEffect(() => {
        if (!data) return;
        else {
            checkAssetsChange(data);
        }
    }, [data,assetsChange, percentageChange])


    return ( 
        <div className="dashboard-tile-small">
            <div>
                <p style={{padding: 5}}>Assets change</p>
                {assetsChange > 0 && <h1 style={{padding: 10, color: '#00b418'}}>{assetsChange.toFixed(2).replace(/\./g, ',')}zł</h1>}
                {assetsChange < 0 && <h1 style={{padding: 10, color: '#f00'}}>{assetsChange.toFixed(2).replace(/\./g, ',')}zł</h1>}
                {assetsChange === 0 &&  data.realWalletUpdates.length > 1 && <h1 style={{padding: 10}}>{assetsChange.toFixed(2).replace(/\./g, ',')}zł</h1>}
                {assetsChange === 0 && data.realWalletUpdates.length <= 1 && <h1 style={{padding: 10}}>-</h1>}
                {<p style={{paddingTop: 5}}><b>{percentageChange.toFixed(1).replace(/\./g, ',')} %</b> since last update</p>}
            </div>
            <img src={profitIcon} alt=""/>
        </div>
     );
}
 
export default AssetsChange;