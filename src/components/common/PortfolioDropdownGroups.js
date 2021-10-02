import React from "react";

class PortfolioDropdownGroups extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      current_component:'zerodha'
    };
  }

  handleChange(event) {
    this.setState({current_component: event.target.value});
  }

  render() {
    return (
      <div>
          <label>
            Select the Portfolio : <span></span><span></span>
            <select  onChange={this.handleChange}>
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

export default PortfolioDropdownGroups;
