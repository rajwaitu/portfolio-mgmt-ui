import React, { Component } from 'react';
import { Row, Col,CardBody,Button } from "shards-react";

import HoldingTable from "./HoldingTable";
import AddHoldingView from "./AddHoldingView";

class HoldingList extends Component {

     constructor(props) {
        super(props);

        this.state = {
            current_portfolio:'',
            holdingView:{},
            holdingViewLoaded:false,
            isAddHoldingOpen:false,
            isWaitingOpen:false
        };

        this.fetchHoldingList = this.fetchHoldingList.bind(this);
        this.openAddHolding = this.openAddHolding.bind(this);

        this.addHolding = this.addHolding.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({current_portfolio: nextProps.portfolio})
        this.setState({holdingView: nextProps.holdingView})
        this.setState({holdingViewLoaded: nextProps.holdingViewLoaded})

        if(Object.entries(nextProps.holdingView).length === 0 
        && nextProps.holdingView.constructor === Object){
          this.fetchHoldingList(nextProps.portfolio);
        }

      }

      async fetchHoldingList(portfolio) {
        let apiUrl;
        if (portfolio === 'zerodha') {
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/1/holding'
            this.setState({ current_portfolio: 'zerodha' })
        }else if(portfolio === 'upstox'){
            //apiUrl = configData.GET_HOLDING_VIEW_API_URL.concat("2").concat("/holding");
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/2/holding'
            this.setState({ current_portfolio: 'upstox' })
        }else if(portfolio === 'angel'){
            //apiUrl = configData.GET_HOLDING_VIEW_API_URL.concat("3").concat("/holding");
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/3/holding'
            this.setState({ current_portfolio: 'angel' })
        }else if(portfolio === 'groww'){
            //apiUrl = configData.GET_HOLDING_VIEW_API_URL.concat("4").concat("/holding");
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/4/holding'
            this.setState({ current_portfolio: 'groww' })
        }

        const response = await fetch(apiUrl);
        const json = await response.json();
        this.setState({ holdingView: json });
        this.setState({ holdingViewLoaded: true });
      }

      async addHolding(scrip,company,qty,avg_price){
        let apiUrl;
        let holdings = []

        if (this.state.current_portfolio === 'zerodha') {
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/1/holding'
        }else if(this.state.current_portfolio === 'upstox'){
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/2/holding'
        }else if(this.state.current_portfolio === 'angel'){
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/3/holding'
        }else if(this.state.current_portfolio === 'groww'){
            apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/4/holding'
        }

        let holding = {
            "company": company,
            "scrip": scrip,
            "quantity": qty,
            "avgPrice": avg_price
           }

        holdings.push(holding)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ holdingList: holdings })
        };

        await fetch(apiUrl,requestOptions)
        .then((response) => {
            if(!response.ok) console.log("holding creation failed");
            else{
                this.fetchHoldingList(this.state.current_portfolio);
                this.setState({ isAddHoldingOpen: false });
                this.setState({ isWaitingOpen: false });
            }
        })
        .catch((error) => {
            console.log('error: ' + error);
        });
    }

    openAddHolding = () => this.setState({ isAddHoldingOpen: true });

    async componentDidMount() {
        this.fetchHoldingList(this.props.portfolio);
    }

    render() {
        const isLoaded = this.state.holdingViewLoaded;
        const isAddHoldingOpen = this.state.isAddHoldingOpen;
        const isWaitingOpen = this.state.isWaitingOpen;

        return (
            <div>
                <Row>
                    <Col className="col-lg mb-4">
                    <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                    <tbody>
                    <tr>
                        <td><Button onClick={this.openAddHolding} ><strong>Add Holding</strong></Button> <span></span><span></span>
                        <Button><strong>Edit Holding</strong></Button> <span></span><span></span>
                        <Button><strong>Delete Holding</strong></Button>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                    </CardBody>  
                    </Col>
                </Row>

                {isAddHoldingOpen ? (
                    <Row> 
                    <Col className="col-lg mb-4">
                    <CardBody className="p-0 pb-3">
                        <AddHoldingView isOpen={isAddHoldingOpen} isWaitingOpen={isWaitingOpen} addHolding={this.addHolding} />
                    </CardBody>
                    </Col>
                    </Row>)
                 : <span></span>}

               
                {isLoaded ? (<HoldingTable holdingView={this.state.holdingView} portfolio={this.state.current_portfolio} />)
                 : (<p>Loading Holding...</p>)}
          </div>
            
            )
        }
    }
    
export default HoldingList