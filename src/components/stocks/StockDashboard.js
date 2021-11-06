import React, { Component } from 'react';
import { Container, Row, Col, Card,CardBody,FormRadio } from "shards-react";
import PageTitle from "../common/PageTitle";

class StockDashboard extends Component {

  

    render() {
        return (
            <div>
            <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
              <PageTitle title="Stock Dashboard" subtitle="Stock Dashboard" className="text-sm-left mb-3" />
            </Row>
            <Row>
            <Col lg="3" md="6" sm="12" className="mb-4">

            <Card small className="mb-4">
                
                <CardBody className="p-0 pb-3">
                <strong className="text-muted d-block mb-2">Radio Buttons</strong>
                <fieldset>
                    <FormRadio>Stock Watchlist</FormRadio>
                    <FormRadio >Stock 12 Months Trends</FormRadio>
                    <FormRadio >Stock 6 Months Trends</FormRadio>
                    <FormRadio>Fast Movers</FormRadio>
                </fieldset>
                
                </CardBody>
              </Card>

                
            </Col>
          </Row>
          </Container>
            </div> 
            )
        }

    }
export default StockDashboard