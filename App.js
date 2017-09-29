import React from 'react';
import Papa from 'papaparse';
import Dropzone from 'react-dropzone'
import {Bubble, Doughnut, Scatter} from 'react-chartjs-2';

const popData = {
    datasets: [{
      label: ['Deer Population'],
      data: [{
        x: 100,
        y: 0,
        r: 10
      }, {
        x: 60,
        y: 30,
        r: 20
      }, {
        x: 40,
        y: 60,
        r: 25
      }, {
        x: 80,
        y: 80,
        r: 50
      }, {
        x: 20,
        y: 30,
        r: 25
      }, {
        x: 0,
        y: 100,
        r: 5
      }],
      backgroundColor: "#FF9966"
    }]
  };
  
const dataS = {
    labels: ['Scatter'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          { x: 65, y: 75 },
          { x: 59, y: 49 },
          { x: 80, y: 90 },
          { x: 81, y: 29 },
          { x: 56, y: 36 },
          { x: 55, y: 25 },
          { x: 40, y: 18 },
        ]
      }
    ]
  };

class App extends React.Component {
   render() {
      return (
        <div>
            <h2>Bubble Example</h2>
            <Bubble data={popData} />
        </div>
      );
   }
}
export default App;