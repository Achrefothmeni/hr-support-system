import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";
import Settings from '../views/examples/Settings.js'


class ModalsTest extends React.Component {
  
   state = {
    exampleModal: this.props.exampleModal
  }; 
  /* close = () => {
    
      console.log("aaaa")
      exampleModal = false
    
  };
 */

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });

    {console.log("state",this.state.exampleModal)}

  };



  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          toggle={() => this.toggleModal("exampleModal")}
          style={{position: 'absolute', right: 5}}
        >
             <i className="ni ni-fat-add" />
          Add Settings
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog modal-lg"
          isOpen={this.state.exampleModal}
         // toggle={() => this.toggleModal("exampleModal")}
          
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {this.props.name}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
              >
            
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">


          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.close}
            >
              Close
            </Button>
            <Button color="primary" type="button">
              Save changes
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalsTest;