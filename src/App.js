import React from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import Chart from 'react-apexcharts'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    id: 'apexchart-eg',
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

                stroke: {
                    curve: 'smooth'
                },

                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                },

                yaxis: {
                    max: 1.2,
                    min: -1.2
                }
            },
            series: [{
                name: 'series-1',
                data: [-0.5, 0.5, 1, -1, -0.4, 0.4, -0.3, -0.2]
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
        })
    }

    updateDashboard(data) {
        const prevState = this.state;
        this.setState({
            items: [],
            dropdownOptions: [],
            selectedValue: null,
            amRevenue: null,
            ebRevenue: null,
            etRevenue: null,
            totalRevenue: null,
            productViews: null,
            purchaseRate: " ",
            checkoutRate: " ",
            abandonedRate: " ",
            ordersTrendStore: [],

            dancerData: {
                timestamp: prevState.dancerData.timestamp.concat(data.timestamp),

                dancer1: {
                    ax: prevState.dancerData.dancer1.ax.concat(data.dancer1.ax),
                    ay: prevState.dancerData.dancer1.ay.concat(data.dancer1.ay),
                    az: prevState.dancerData.dancer1.az.concat(data.dancer1.az),
                    gx: prevState.dancerData.dancer1.gx.concat(data.dancer1.gx),
                    gy: prevState.dancerData.dancer1.gy.concat(data.dancer1.gy),
                    gz: prevState.dancerData.dancer1.gz.concat(data.dancer1.gz)
                },

                dancer2: {
                    ax: prevState.dancerData.dancer2.ax.concat(data.dancer2.ax),
                    ay: prevState.dancerData.dancer2.ay.concat(data.dancer2.ay),
                    az: prevState.dancerData.dancer2.az.concat(data.dancer2.az),
                    gx: prevState.dancerData.dancer2.gx.concat(data.dancer2.gx),
                    gy: prevState.dancerData.dancer2.gy.concat(data.dancer2.gy),
                    gz: prevState.dancerData.dancer2.gz.concat(data.dancer2.gz)
                },

                dancer3: {
                    ax: prevState.dancerData.dancer3.ax.concat(data.dancer3.ax),
                    ay: prevState.dancerData.dancer3.ay.concat(data.dancer3.ay),
                    az: prevState.dancerData.dancer3.az.concat(data.dancer3.az),
                    gx: prevState.dancerData.dancer3.gx.concat(data.dancer3.gx),
                    gy: prevState.dancerData.dancer3.gy.concat(data.dancer3.gy),
                    gz: prevState.dancerData.dancer3.gz.concat(data.dancer3.gz)
                }
            }
        });
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
