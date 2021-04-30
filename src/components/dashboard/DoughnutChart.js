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
        const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56','#8bc34a', '#ff9800', '#673ab7', '#795548', '#303f9f', '#bdbdbd', '#ff5722', '#00e676', '#00bcd4', '#37474f', '#f50057', '##ffff00', '#fff3e0', '#8d6e63', '#c6ff00', '#00bfa5', '#d50000'  ]

        if (data && data.realWalletUpdates.length)  {
            for (const walletSnapshot of data.realWalletUpdates[data.realWalletUpdates.length-1].realWallet) {
                if (walletSnapshot.value > 0 ) {
                    assetsValues.push(walletSnapshot.value);
                    labels.push(walletSnapshot.name);
                }
              }
        }

        const configData = {
            labels: labels,
            datasets: [{
                data: assetsValues,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: backgroundColors
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