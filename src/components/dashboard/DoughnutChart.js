import { useContext, useState, useEffect } from 'react';
import {Doughnut} from 'react-chartjs-2';
import {UserContext} from '../../contexts/UserContext';


const DoughtnutChart = () => {

    const {data} = useContext(UserContext);
    const [chartData, setChartData] = useState({});

    const checkWallet = (data) => {
        let labels = [];
        let assetsValues = [];
        let colors = []; 

        if (data && data.realWalletUpdates.length)  {
            for (const walletSnapshot of data.realWalletUpdates[data.realWalletUpdates.length-1].realWallet) {
                if (walletSnapshot.value > 0 ) {
                    assetsValues.push(walletSnapshot.value);
                    labels.push(walletSnapshot.name);
                    colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
                }
              }
            console.log(assetsValues);
            console.log(labels);
            console.log(colors);
        }

        const configData = {
            labels: labels,
            datasets: [{
                data: assetsValues,
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }]
        };
        setChartData(configData);
    }

   

    useEffect(() => {
        if (!data) return; 
        else {
            checkWallet(data);
        }
    }, [data])


    return ( 
        <div>
            <h2>Actual Wallet Composition</h2>
            <Doughnut data={chartData} />
        </div>
     );
}
 
export default DoughtnutChart;