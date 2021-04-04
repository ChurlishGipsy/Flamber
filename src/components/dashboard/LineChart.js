import { useEffect, useState, useContext } from 'react';
import {Line} from 'react-chartjs-2';
import { UserContext } from '../../contexts/UserContext';


const LineChart = () => {

    const addValues = (data) => {
      let assetsValues = [];
      let dates = [];
      if (data && data.realWalletUpdates.length > 0) {
        for (const walletSnapshot of data.realWalletUpdates) {
          assetsValues.push(walletSnapshot.currentAssets);
          dates.push(walletSnapshot.date)
        }
        const configData = {
          labels: dates,
          datasets: [
            {
              label: 'Wallet Worth',
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 5,
              pointHoverRadius: 8,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: assetsValues
            }
          ]
        };
        setChartData(configData);
      }
    }

    const {data} = useContext(UserContext);
    const [chartData, setChartData] = useState({});
    useEffect(() => {
      if (!data) return;
      else {
        addValues(data);  
      }
    }, [data ])

    return( 
        <div>
            <h2>Wallet Value</h2>
            <Line data={chartData} />
        </div>
     )
     ;
}
 
export default LineChart;