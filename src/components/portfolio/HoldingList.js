import React, { Component } from 'react';
import HoldingTable from "./HoldingTable";

class HoldingList extends Component {

     constructor(props) {
        super(props);

        this.state = {
            current_portfolio:'',
            holdingView:{},
            holdingViewLoaded:false
        };

        this.fetchHoldingList = this.fetchHoldingList.bind(this);
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

    async componentDidMount() {
        this.fetchHoldingList(this.props.portfolio);
    }

    render() {
        const isLoaded = this.state.holdingViewLoaded;
        return (
            <div>
                {isLoaded ? (<HoldingTable holdingView={this.state.holdingView} portfolio={this.state.current_portfolio} />) : (<p>Loading...</p>)}
          </div>
            
            )
        }
    }
    
export default HoldingList