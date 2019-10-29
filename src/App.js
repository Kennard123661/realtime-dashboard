import React from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import Chart from 'react-apexcharts'
import ApexCharts from 'apexcharts'

let data = [];
let timestamp = 0;
const DISPLAY_LENGTH = 10;


function initializeData() {
    let i;
    for (i = 0; i < DISPLAY_LENGTH; i++) {
        data.push({
            x: timestamp,
            y: 0
        });
        timestamp += 1;
    }
}
initializeData();


function updateData(dataPoint) {
    let i = 0;
    for (i = 0; i < data.length - DISPLAY_LENGTH; i++) {
        data[i].x  = timestamp - DISPLAY_LENGTH - 1;
        data[i].y = 0
    }

    data.push({
        x: timestamp,
        y: dataPoint
    });
    timestamp += 1;
}


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'realtime',
                    type: 'line',
                    height: 500,
                    width: 500,
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000
                        }
                    },
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },

                xaxis: {
                    range: DISPLAY_LENGTH,
                    tickAmount: DISPLAY_LENGTH
                },

                stroke: {
                    curve: 'smooth'
                },

                yaxis: {
                    max: 1.2,
                    min: -1.2,
                    decimalsInFloat: 2
                }
            },
            series: [{
                name: 'dancer-1',
                data: data
            }],

            dancerData: {
                timestamp: [],
                dancer1: {
                    ax: [],
                    ay: [],
                    az: [],
                    gx: [],
                    gy: [],
                    gz: []
                },

                dancer2: {
                    ax: [],
                    ay: [],
                    az: [],
                    gx: [],
                    gy: [],
                    gz: []
                },

                dancer3: {
                    ax: [],
                    ay: [],
                    az: [],
                    gx: [],
                    gy: [],
                    gz: []
                }
            }
        };

        this.port = 3001;
    }

    setUpdateIntervals() {
        const appComponent = this;
        window.setInterval(() => {
            // updateData(Math.random() * 2 - 1);
            ApexCharts.exec('realtime', 'updateSeries', [{
                data: data
            }])
        }, 1000)
    };

    componentDidMount() {
        const appComponent = this;
        this.socket = openSocket(`http://localhost:${this.port}`);

        this.socket.on('message', function(msg){
            console.log(msg);
        });

        this.socket.on('change', function(updateData) {
            console.log(updateData);
            appComponent.updateDashboard(updateData);
            console.log(appComponent.state);
        });

        console.log(data);
        this.setUpdateIntervals();
    }

    updateDashboard(newData) {
        const prevState = this.state;
        let newState = prevState;
        newState['dancerData'] = {
            timestamp: prevState.dancerData.timestamp.concat(newData.timestamp),

            dancer1: {
                ax: prevState.dancerData.dancer1.ax.concat(newData.dancer1.ax),
                ay: prevState.dancerData.dancer1.ay.concat(newData.dancer1.ay),
                az: prevState.dancerData.dancer1.az.concat(newData.dancer1.az),
                gx: prevState.dancerData.dancer1.gx.concat(newData.dancer1.gx),
                gy: prevState.dancerData.dancer1.gy.concat(newData.dancer1.gy),
                gz: prevState.dancerData.dancer1.gz.concat(newData.dancer1.gz)
            },

            dancer2: {
                ax: prevState.dancerData.dancer2.ax.concat(newData.dancer2.ax),
                ay: prevState.dancerData.dancer2.ay.concat(newData.dancer2.ay),
                az: prevState.dancerData.dancer2.az.concat(newData.dancer2.az),
                gx: prevState.dancerData.dancer2.gx.concat(newData.dancer2.gx),
                gy: prevState.dancerData.dancer2.gy.concat(newData.dancer2.gy),
                gz: prevState.dancerData.dancer2.gz.concat(newData.dancer2.gz)
            },

            dancer3: {
                ax: prevState.dancerData.dancer3.ax.concat(newData.dancer3.ax),
                ay: prevState.dancerData.dancer3.ay.concat(newData.dancer3.ay),
                az: prevState.dancerData.dancer3.az.concat(newData.dancer3.az),
                gx: prevState.dancerData.dancer3.gx.concat(newData.dancer3.gx),
                gy: prevState.dancerData.dancer3.gy.concat(newData.dancer3.gy),
                gz: prevState.dancerData.dancer3.gz.concat(newData.dancer3.gz)
            }
        };
        console.log(newData)
        this.setState(newState);
        updateData(newData.dancer1.ax)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>CG4002 Dashboard</h1>
                    <Chart options={this.state.options} series={this.state.series} height={500} width={1000}/>
                </header>
            </div>
        );
    }
}
export default App;
