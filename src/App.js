import React from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';


const nData = 1000;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

        this.nData = nData;
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
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}
export default App;
