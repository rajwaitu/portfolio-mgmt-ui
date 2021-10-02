import React from "react";

class PortfolioDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      current_portfolio:this.props.portfolio
    };
  }

  handleChange(event) {
    console.log('event ' + event.target.value)
    this.setState({current_portfolio: event.target.value});
    this.props.clickMe(event.target.value);
  }

  render() {
    console.log('current portfolio in dropsown ' + this.state.current_portfolio)
    return (
      <div>
          <label>
            Select the Portfolio : <span></span><span></span>
            <select onChange={this.handleChange} value={this.state.current_portfolio}>
              <option value='zerodha'>Zerodha</option>
              <option value='upstox'>Upstox</option>
              <option value="angel">Angel</option>
              <option value="groww">Groww</option>
            </select>
          </label>
      </div>
    );
  }
}

export default PortfolioDropdown;
