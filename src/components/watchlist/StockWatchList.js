import React, { Component } from 'react';
import { Container, Row, Col, Card,CardBody } from "shards-react";
import PageTitle from "../common/PageTitle";
import BootstrapTable from 'react-bootstrap-table-next';
import StockChartWidget from "./StockChartWidget";

class StockWatchList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            symbol:'',

            rupeeIndian:Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }),

            columns : [{
                dataField: 'id',
                text: 'Company'
              },
              {
                dataField: 'price',
                text: 'Watchlist Price'
              }],

            watchlist: [],

            rowEvents:{
                onClick: (e, row, rowIndex) => {
                  this.setState({symbol: `${row['id']}`});
                },
                onMouseEnter: (e, row, rowIndex) => {
                  //console.log(`enter on row with index: ${rowIndex}`);
                }
              }
               
            };
        }

        async componentDidMount() {
            let apiUrl= 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/watchlist';
            const response = await fetch(apiUrl);
            const json = await response.json();
            let watchlistResponseArr = json.watchlist;
            let watchlistArr = []

            for(let i=0 ;i<watchlistResponseArr.length;i++){
               let watchlistObj =  watchlistResponseArr[i];
               let watchlist = {};
               watchlist['id'] = watchlistObj.companyCode;
               watchlist['price'] = this.state.rupeeIndian.format(watchlistObj.price);
               watchlistArr[i] = watchlist;
            }
            this.setState({ watchlist: watchlistArr });
            this.setState({ symbol: watchlistArr[0].id });
        }

    render() {
        return (
            <div>
            <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
              <PageTitle title="Stock WatchList" subtitle="WatchList" className="text-sm-left mb-3" />
            </Row>
            <Row>
            <Col lg="3" md="6" sm="12" className="mb-4">
              <Card small className="mb-4">
                
                <CardBody className="p-0 pb-3">
                <BootstrapTable keyField='id' data={this.state.watchlist} 
                columns={this.state.columns}  rowEvents={this.state.rowEvents}
                 hover condensed/>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4" md="6" sm="12" className="mb-4">
            <StockChartWidget symbol={this.state.symbol} />
            </Col>
          </Row>
          </Container>
            </div> 
            )
        }

    }
export default StockWatchList