import React from "react";

class NewsDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      current_website:this.props.website
    };
  }

  handleChange(event) {
    this.setState({current_website: event.target.value});
    this.props.updateSite(event.target.value);
  }

  render() {
    return (
      <div>
          <label>
            Select the News Site : <span></span><span></span>
            <select onChange={this.handleChange} value={this.state.current_website}>
              <option value='news18.com'>news18.com</option>
              <option value='business-standard'>business-standard</option>
              <option value="livemint">livemint</option>
              <option value="zeebiz">zeebiz</option>
              <option value="NDTV.com">NDTV.com</option>
              <option value="thehindubusinessline">thehindu</option>
            </select>
          </label>
      </div>
    );
  }
}

export default NewsDropdown;
