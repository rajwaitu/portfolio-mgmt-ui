import React, { Component } from 'react';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../common/PageTitle";
import PortfolioDropdown from "./PortfolioDropdown";
import HoldingList from "./HoldingList";
import InvestmentHistory from "./InvestmentHistory";
import HoldingWeights from "./HoldingWeights";

class PortfolioDashboard extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        current_portfolio :'zerodha'
      };
  
      this.updatePortfolio = this.updatePortfolio.bind(this);
  }
  
  updatePortfolio(portfolio) {
    this.setState({current_portfolio: portfolio});
  }
  
  
    render() {
          return (
            <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
              <PageTitle title="Portfolio Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
            </Row>
        
            <Row>
              {/* Portfolio Dropdown */}
              <Col lg="8" md="12" sm="12" className="mb-4">
                <PortfolioDropdown portfolio={this.state.current_portfolio} clickMe={this.updatePortfolio} />
              </Col>
            </Row>

            <Row>
              {/* Holding List */}
              <Col lg="12" md="12" sm="12" className="mb-4">
                <HoldingList portfolio={this.state.current_portfolio} holdingView={{}} holdingViewLoaded={false}/>
              </Col>
            </Row>

            <Row>
              {/* Investment Overview */}
              <Col lg="12" md="12" sm="12" className="mb-4">
                <InvestmentHistory portfolio={this.state.current_portfolio} investment={{}} investmentLoaded={false}/>
              </Col>
            </Row>

            <Row>
              {/* Holding Weight Overview */}
              <Col lg="12" md="12" sm="12" className="mb-4">
                <HoldingWeights portfolio={this.state.current_portfolio} holdingWeightLoaded={false}/>
              </Col>
            </Row>
           </Container>
         
          );
      }
  }
      
  export default PortfolioDashboard