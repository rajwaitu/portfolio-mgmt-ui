import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from "shards-react";
import SmallStats from "../common/SmallStats";

class HoldingTable extends Component {

     constructor(props) {
        super(props);

      let rupeeIndian = Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
      });
       
      //this.formatHoldingView = this.formatHoldingView.bind(this);

        this.state = {
            holdingView: this.props.holdingView,
            portfolioStats: [
                {
                  label: "Total Investment",
                  value: rupeeIndian.format(this.props.holdingView.totalInvestment),
                  attrs: { md: "6", sm: "6" },
                  chartLabels: [null, null, null, null, null, null, null],
                  datasets: [
                    {
                      label: "Today",
                      fill: "start",
                      borderWidth: 1.5,
                      backgroundColor: "rgba(0, 184, 216, 0.1)",
                      borderColor: "rgb(0, 184, 216)",
                      data: [1, 2, 1, 3, 5, 4, 7]
                    }
                  ]
                },
                {
                  label: "Cuurent Value",
                  value: rupeeIndian.format(this.props.holdingView.currentValue),
                  attrs: { md: "6", sm: "6" },
                  chartLabels: [null, null, null, null, null, null, null],
                  datasets: [
                    {
                      label: "Today",
                      fill: "start",
                      borderWidth: 1.5,
                      backgroundColor: "rgba(0, 184, 216, 0.1)",
                      borderColor: "rgb(0, 184, 216)",
                      data: [1, 2, 1, 3, 5, 4, 7]
                    }
                  ]
                },
                {
                  label: "Return",
                  value: rupeeIndian.format(this.props.holdingView.totalProfitLoss).concat('[').concat(this.props.holdingView.percentageProfitLoss).concat('%').concat(']'),
                  attrs: { md: "6", sm: "6" },
                  chartLabels: [null, null, null, null, null, null, null],
                  datasets: [
                    {
                      label: "Today",
                      fill: "start",
                      borderWidth: 1.5,
                      backgroundColor: "rgba(0, 184, 216, 0.1)",
                      borderColor: "rgb(0, 184, 216)",
                      data: [1, 2, 1, 3, 5, 4, 7]
                    }
                  ]
                }
              ]
        };
    }

    formatHoldingView(holdingView) {
      let rupeeIndian = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    });

      for(let i=0;holdingView.holdings.length;i++){
        console.log('printing holdings arr')
        
        if(holdingView.holdings[i]){
          console.log(holdingView.holdings[i])
          holdingView.holdings[i].investment = rupeeIndian.format(holdingView.holdings[i].investment);
          holdingView.holdings[i].currentValue = rupeeIndian.format(holdingView.holdings[i].currentValue);
          holdingView.holdings[i].profitLoss = rupeeIndian.format(holdingView.holdings[i].profitLoss);
        }
      }
      return holdingView;
    }
    

    render() {
        return (
            <div>
            <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Holding List - {this.props.portfolio}</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          Scrip
                        </th>
                        <th scope="col" className="border-0">
                          Company
                        </th>
                        <th scope="col" className="border-0">
                          QTY
                        </th>
                        <th scope="col" className="border-0">
                          Avg Price
                        </th>
                        <th scope="col" className="border-0">
                          LTP
                        </th>
                        <th scope="col" className="border-0">
                          Invested
                        </th>
                        <th scope="col" className="border-0">
                          Cur.Value
                        </th>
                        <th scope="col" className="border-0">
                          P/L
                        </th>
                        <th scope="col" className="border-0">
                          Net.Chg
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.props.holdingView.holdings.map((item, idx) => (
                     <tr  key={idx}>
                      <td>{item.id}</td>
                      <td>{item.company}</td>
                      <td>{item.qunatity}</td>
                      <td>{item.avaragePrice}</td>
                      <td>{item.lastTradedPrice}</td>
                      <td>{item.investment}</td>
                      <td>{item.currentValue}</td>
                      <td>{item.profitLoss}</td>
                      <td>{item.netChange}</td>
                    </tr>
                  ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
              {this.state.portfolioStats.map((stats, idx) => (
                <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
                   <SmallStats
                   id={`small-stats-${idx}`}
                   variation="1"
                   chartData={stats.datasets}
                   chartLabels={stats.chartLabels}
                   label={stats.label}
                   value={stats.value}
                   percentage={stats.percentage}
                   increase={stats.increase}
                   decrease={stats.decrease}
                />
                </Col>
              ))}
            </Row>
            </div> 
            )
        }
    }
    
export default HoldingTable