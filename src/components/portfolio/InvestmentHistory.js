import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from "shards-react";

import Chart from "../../utils/chart";


class InvestmentHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current_portfolio:'',
            investment_history: {},
            investmentLoaded: false
        };

        this.fetchInvestmentHistory = this.fetchInvestmentHistory.bind(this);
        this.createChartData = this.createChartData.bind(this);
        this.canvasRef = React.createRef();

        this.chartOptions = {
            ...{
              responsive: true,
              legend: {
                position: "top"
              },
              elements: {
                line: {
                  // A higher value makes the line look skewed at this ratio.
                  tension: 0.3
                },
                point: {
                  radius: 0
                }
              },
              scales: {
                xAxes: [
                  {
                    gridLines: false,
                    ticks: {
                      callback(tick, index) {
                        // Jump every 7 values on the X axis labels to avoid clutter.
                        return index % 7 !== 0 ? "" : tick;
                      }
                    }
                  }
                ],
                yAxes: [
                  {
                    ticks: {
                      suggestedMax: 45,
                      callback(tick) {
                        if (tick === 0) {
                          return tick;
                        }
                        // Format the amounts using Ks for thousands.
                        return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                      }
                    }
                  }
                ]
              },
              hover: {
                mode: "nearest",
                intersect: false
              },
              tooltips: {
                custom: false,
                mode: "nearest",
                intersect: false
              }
            },
            ...this.props.chartOptions
          };
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({current_portfolio: nextProps.portfolio})
        this.setState({investment_history: nextProps.investment})
        this.setState({investmentLoaded: nextProps.investmentLoaded})

        if(Object.entries(nextProps.investment).length === 0 
        && nextProps.investment.constructor === Object){
            let json = await this.fetchInvestmentHistory(nextProps.portfolio);
            let chartData = this.createChartData(json);
            const InvestmentHistoryChart = new Chart(this.canvasRef.current, {
                type: "line",
                data: chartData,
                options: this.chartOptions
              });
          
              InvestmentHistoryChart.render();
        }

      }

    async componentDidMount() {
        let json = await this.fetchInvestmentHistory(this.props.portfolio);
        
        let chartData = this.createChartData(json);

        const InvestmentHistoryChart = new Chart(this.canvasRef.current, {
            type: "line",
            data: chartData,
            options: this.chartOptions
          });
      
          InvestmentHistoryChart.render();
    }

    async fetchInvestmentHistory(portfolio) {
        let apiUrl;
        if (portfolio === 'zerodha') {
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/1/investment'
            this.setState({ current_portfolio: 'zerodha' })
        }else if(portfolio === 'upstox'){
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/2/investment'
            this.setState({ current_portfolio: 'upstox' })
        }else if(portfolio === 'angel'){
            //apiUrl = configData.GET_HOLDING_VIEW_API_URL.concat("3").concat("/holding");
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/3/investment'
            this.setState({ current_portfolio: 'angel' })
        }else if(portfolio === 'groww'){
            //apiUrl = configData.GET_HOLDING_VIEW_API_URL.concat("4").concat("/holding");
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/4/investment'
            this.setState({ current_portfolio: 'groww' })
        }

        const response = await fetch(apiUrl);
        const json = await response.json();
        this.setState({ investment_history: json });
        this.setState({ investmentLoaded: true });
        return json;
      }

      createChartData(investmentResponseJson){
        let investmentObj = {
            label: "Investment",
            fill: "start",
            data: investmentResponseJson.investments,
            backgroundColor: "rgba(0,123,255,0.1)",
            borderColor: "rgba(0,123,255,1)",
            pointBackgroundColor: "#ffffff",
            pointHoverBackgroundColor: "rgb(0,123,255)",
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 3
          };
        let holdingObj = {
            label: "Holding",
            fill: "start",
            data:investmentResponseJson.holdings ,
            backgroundColor: "rgba(255,65,105,0.1)",
            borderColor: "rgba(255,65,105,1)",
            pointBackgroundColor: "#ffffff",
            pointHoverBackgroundColor: "rgba(255,65,105,1)",
            borderDash: [3, 3],
            borderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 2,
            pointBorderColor: "rgba(255,65,105,1)"
          };

          let datasets = [investmentObj,holdingObj];

          let chartData = {};
          chartData.labels = investmentResponseJson.dates;
          chartData.datasets = datasets;
          return chartData;
      }

    render() {
        const isLoaded = this.state.investmentLoaded

        return (
            <div>
             {isLoaded ? ( 
             <Card small className="h-100">
             <CardHeader className="border-bottom">
             <h6 className="m-0">Investment Overview - {this.props.portfolio}</h6>
             </CardHeader>
             <CardBody className="pt-0">
             <canvas height="120" ref={this.canvasRef} style={{ maxWidth: "100% !important" }} />
             </CardBody>
             </Card>) : 
             (<p>Loading Investment...</p>)}
            </div>
        );


    }
}

export default InvestmentHistory
