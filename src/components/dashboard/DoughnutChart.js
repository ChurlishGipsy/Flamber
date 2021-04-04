import { useContext } from 'react';
import { useEffect } from 'react';
import {Doughnut} from 'react-chartjs-2';
import {UserContext} from '../../contexts/UserContext';


const DoughtnutChart = () => {

    const {data} = useContext(UserContext);
    

    const chartData = {
        labels: ['Red','Green','Yellow'],
        datasets: [{
            data: [300, 50, 100,50,100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };

    useEffect(() => {
        if (!data) return; 
        else {

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