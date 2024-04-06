import "./styles.css";
import {useEffect,useState} from 'react';
import axios from "axios"; 
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function App() {
  
  const [xAxisData,setXAxisData] = useState([])
  const [yAxisData,setYAxisData] = useState([])
  useEffect(()=>{
    axios.get("https://retoolapi.dev/gDa8uC/data").then((res)=>{
    setXAxisData(res.data);
   })
   axios.get("https://retoolapi.dev/o5zMs5/data").then((res)=>{
    setYAxisData(res.data);
   })

  },[])

  const data = {
    datasets: [
      {
        label: 'XY dataset',
        data: Array.from({ length: 50 }, (e,index) => ({
          x: xAxisData[index]?.RandomNumber,
          y: yAxisData[index]?.RandomNumber,
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="App">
      <Scatter options={options} data={data}/>
    </div>
  );
}
