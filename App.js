import React from 'react';
import Papa from 'papaparse';
import Dropzone from 'react-dropzone'
import _ from 'lodash';
import { Bubble, Doughnut, Scatter } from 'react-chartjs-2';

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



    constructor() {
        super()
        this.state = { files: [], data: {} };
        this.plotBubbleChart = this.plotBubbleChart.bind(this);
    }

    onDrop(files) {
        this.setState({
            files
        });
        console.log(files);
        Papa.parse(files[0], {
            delimiter: ",",
            header: true,
            complete: this.plotBubbleChart,
        });
        Papa.parse(files[0], {
            config: {
                delimiter: ",",
                header: true,
                complete: function (results) {
                    console.log(results);
                },
            },
        });
    }
    plotBubbleChart(results) {

        // console.log(this.state);
        let maleData = [];
        let femaleData = [];

        for (let pt of results.data) {
            if (pt.sex == 'male')
                maleData.push(pt);
            else if (pt.sex == 'female')
                femaleData.push(pt);
        }

        let maleDataAbove = [];
        let maleDataBelow = [];

        _.map(maleData, (pt) => {
            if (pt.mean_survived >= 0.5)
                maleDataAbove.push(pt);
            else if (pt.mean_survived < 0.5)
                maleDataBelow.push(pt);
        });

        let femaleDataAbove = [];
        let femaleDataBelow = [];

        _.map(femaleData, (pt) => {
            if (pt.mean_survived >= 0.5)
                femaleDataAbove.push(pt);
            else if (pt.mean_survived < 0.5)
                femaleDataBelow.push(pt);
        });

        let chartData = {
            datasets: [{
                label: ['Female <0.5'],
                data: _.map(femaleDataBelow, (pt) => {
                    let arr = pt.ageinterval10.split(' ');
                    let start = parseInt(arr[0]);
                    let end = parseInt(arr[2]);
                    let x = (start + end + 1) / 2;
                    return {
                        x: x,
                        y: 1,
                        r: pt.total_survived
                    }
                }),
                backgroundColor: "#FF9966"
            },
            {
                label: ['Female >=0.5'],
                data: _.map(femaleDataAbove, (pt) => {
                    let arr = pt.ageinterval10.split(' ');
                    let start = parseInt(arr[0]);
                    let end = parseInt(arr[2]);
                    let x = (start + end + 1) / 2;
                    return {
                        x: x,
                        y: 1,
                        r: pt.total_survived
                    }
                }),
                backgroundColor: "#87CEFA"
            },
            {
                label: ['Male <0.5'],
                data: _.map(maleDataBelow, (pt) => {
                    let arr = pt.ageinterval10.split(' ');
                    let start = parseInt(arr[0]);
                    let end = parseInt(arr[2]);
                    let x = (start + end + 1) / 2;
                    return {
                        x: x,
                        y: 0,
                        r: pt.total_survived
                    }
                }),
                backgroundColor: "#FF9966"
            },
            {
                label: ['Male >=0.5'],
                data: _.map(maleDataAbove, (pt) => {
                    let arr = pt.ageinterval10.split(' ');
                    let start = parseInt(arr[0]);
                    let end = parseInt(arr[2]);
                    let x = (start + end + 1) / 2;
                    return {
                        x: x,
                        y: 0,
                        r: pt.total_survived
                    }
                }),
                backgroundColor: "#87CEFA"
            }]
        }
        console.log(chartData);
        let options = {
            scales: {
                yAxes: [{
                    ticks: {
                        min: -1,
                        max: 3,
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            if (value == 0)
                                return 'Male';
                            if (value == 1)
                                return 'Female'
                        }
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
        this.setState({
            files: this.state.files,
            data: chartData,
            options: options

        })

        // For a bubble chart
        // var myBubbleChart = new Chart(ctx, {
        //     type: 'bubble',
        //     data: chartData,
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     min: -1,
        //                     max: 3,
        //                     // Include a dollar sign in the ticks
        //                     callback: function (value, index, values) {
        //                         if (value == 0)
        //                             return 'Male';
        //                         if (value == 1)
        //                             return 'Female'
        //                     }
        //                 }
        //             }]
        //         },
        //         responsive: true,
        //         maintainAspectRatio: false
        //     }
        // });

    }

    render() {
        return (
            <div className="App">
                <section>
                    <div className="dropzone">
                        <Dropzone onDrop={this.onDrop.bind(this)}>
                            <p>Try dropping some files here, or click to select files to upload.</p>
                        </Dropzone>
                    </div>
                    <aside>
                        <h2>Dropped files</h2>
                        <ul>
                            {
                                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                            }
                        </ul>
                    </aside>
                </section>
                <div>
                    <h2>Bubble Example</h2>
                    <Bubble data={this.state.data} options={this.state.options} />
                </div>
            </div>
        );
    }
}
export default App;