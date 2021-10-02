import React, { Component } from 'react';
import TradingViewWidget from 'react-tradingview-widget';

class StockChartWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
           symbol : 'BSE:' + this.props.symbol
               
         };
        }

    componentWillReceiveProps(nextProps) {
        this.setState({symbol: 'BSE:' + nextProps.symbol})
      }

    render() {
        return (
            <div>
              <TradingViewWidget symbol={this.state.symbol} width="950" height="610" 
              details="true" calendar="true" />
            </div> 
            )
        }

    }
export default StockChartWidget