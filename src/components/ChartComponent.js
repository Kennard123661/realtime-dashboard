import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);
class ChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChart: true,
            dataSource: {
                "chart": {
                    "caption": "CG4002 Dance Readings",
                    "subCaption": "",
                    "xAxisName": "Time Stamp",
                    "yAxisName": "Reading Values",
                    "refreshinterval": "1",
                    "slantLabels": "1",
                    "numdisplaysets": "100",
                    "labeldisplay": "rotate",
                    "showValues": "0",
                    "showRealTimeValue": "0",
                    "theme": "fusion"
                },

                "categories": [{
                    "category": [
                        { "label": "timestamp" }
                    ]
                }],

                "dataset": [{
                    "gx": [{ "value": 0 }],
                    "gy": [{ "value": 0 }],
                    "gz": [{ "value": 0 }],
                }]
            }
        };
        console.log('initiated')
        this.chartConfigs = {
            type: 'realtimeline',
            renderAt: 'container',
            width: '100%',
            height: '350',
            dataFormat: 'json'
        }
    }

    getChartRef(chart){
        this.chartRef = chart;
    }

    render() {
        return (
            <div className="dataChart">
                {
                    this.state.showChart ?
                        <ReactFC
                            {...this.chartConfigs}
                            dataSource={this.state.dataSource}
                            onRender={this.getChartRef.bind(this)}/>: null
                }
            </div>)
    }
}
export default ChartComponent