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

class DeleteHoldingView extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            isOpen:this.props.isOpen,
            isWaitingOpen:this.props.isWaitingOpen,
            scrip: ""
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleDeleteHolding = this.handleDeleteHolding.bind(this);

        this.handleScripChange = this.handleScripChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({isOpen: nextProps.isOpen})
      this.setState({isWaitingOpen: nextProps.isWaitingOpen})
    }

    handleScripChange = (event) => this.setState({ scrip: event.target.value });

    handleClose(){
        this.setState({ isOpen: false });
        this.props.closeDeleteHolding();
    }

    handleDeleteHolding(){
      this.setState({ isOpen: false });
      this.setState({ isWaitingOpen: true });

      this.props.deleteHolding(this.state.scrip);
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
                    </Row>
                    <Row>
                      <Col md="6">
                        <br></br>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6"><Button type="submit" onClick={this.handleDeleteHolding}>Delete Holding</Button><span>               </span>
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

        {this.state.isWaitingOpen ? (<p><b>Delete Holding is in progress...</b></p>) : null}
      
      </div>
    );
    }
  }
export default DeleteHoldingView