import React,{ Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";

class AddHoldingView extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            isOpen:this.props.isOpen,
            isWaitingOpen:this.props.isWaitingOpen,
            scrip: "",
            company: "",
            qty: 0,
            avg_price: 0.0
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleAddHolding = this.handleAddHolding.bind(this);

        this.handleScripChange = this.handleScripChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleQTYChange = this.handleQTYChange.bind(this);
        this.handleAvgPriceChange = this.handleAvgPriceChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({isOpen: nextProps.isOpen})
      this.setState({isWaitingOpen: nextProps.isWaitingOpen})
    }

    handleClose = () => this.setState({ isOpen: false });
    handleScripChange = (event) => this.setState({ scrip: event.target.value });
    handleCompanyChange = (event) => this.setState({ company: event.target.value });
    handleQTYChange = (event) => this.setState({ qty: event.target.value });
    handleAvgPriceChange = (event) => this.setState({ avg_price: event.target.value });

    handleAddHolding(){
      this.setState({ isOpen: false });
      this.setState({ isWaitingOpen: true });

      this.props.addHolding(this.state.scrip,this.state.company,this.state.qty,this.state.avg_price);
    }
  
    render() {
    return (
      <div>
        {this.state.isOpen ? 
          (<ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form>
                    <Row>
                      <Col md="2">
                        <label htmlFor="scrip"><strong>Scrip</strong></label>
                        <FormInput id="scrip" type="text" placeholder="Scrip" value={this.state.scrip} onChange={this.handleScripChange}/>
                      </Col>
                      <Col md="2">
                        <label htmlFor="company"><strong>Company</strong></label>
                        <FormInput id="company" type="text" placeholder="Company" value={this.state.company} onChange={this.handleCompanyChange}
                        />
                      </Col>
                      <Col md="2">
                        <label htmlFor="quantity"><strong>Quantity</strong></label>
                        <FormInput id="quantity" type="number" placeholder="Quantity" value={this.state.qty} onChange={this.handleQTYChange}
                        />
                      </Col>
                      <Col md="2">
                        <label htmlFor="avgPrice"><strong>Avg Price</strong></label>
                        <FormInput id="avgPrice" type="number" placeholder="Avg Price" value={this.state.avg_price} onChange={this.handleAvgPriceChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <br></br>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6"><Button type="submit" onClick={this.handleAddHolding}>Add Holding</Button><span>               </span>
                      <Button type="submit" onClick={this.handleClose}>Cancel</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
          ) 
        : null
        }

        {this.state.isWaitingOpen ? (<p><b>Add Holding is in progress...</b></p>) : null}
      
      </div>
    );
    }
  }
export default AddHoldingView