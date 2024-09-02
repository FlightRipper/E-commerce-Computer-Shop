import React, {useEffect, useRef} from 'react';
import {Chart} from 'chart.js/auto';
import "../AdminDashboard.css";

const DonutChartCampaigns = () => {
    const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Chart data
    const data = {
      labels: ['Animal', 'Education', 'Medical'],
      datasets: [{
        data: [50, 25, 25],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }],
    };

    // Chart options
    const options = {
    
      cutoutPercentage: 70,
      plugins : {
        legend: {
          labels: {
            color : "white",
            font : {
              size : 16,
              family : 'Helvetica Neue',
            },
          
          },          
        }
      },
      layout: {
        padding: {
          top: 20, // Adjust the bottom padding between legend and chart as needed
        },
      },
     };

    // Create the donut chart
    const myDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options,
    });

    // Cleanup on component unmount
    return () => {
      myDonutChart.destroy();
    };
  }, []);
  return (
    <div className='donut-chart m-5'>
      <canvas className="donut" ref={chartRef} width="350" height="350"></canvas>
   </div>
  )
}

export default DonutChartCampaigns