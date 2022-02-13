import React, {Component} from "react";
import { format } from 'date-fns';

import {Modal, ModalBody, ModalHeader, Label, Input, Form, FormGroup, Button} from 'reactstrap';

//0xc27a6adac593d1c02355f307ea92f6261269566d

import "../test.css";



function RenderCard({trName, trDescription, trAddress, align, circleCol, trDate, trModalToggle}){
  return(
    <article className={'timeline-entry ' + align}>
      <div className="timeline-entry-inner">
        <time className="timeline-time" dateTime="2014-01-10T03:45">
          <span>{format(new Date(trDate*1000), 'yyyy/MM/dd') }</span>
        </time>
        <div className= {'timeline-icon ' +  circleCol}>
          <i className="entypo-feather" />
        </div>
        <div className="timeline-label" onClick={() =>trModalToggle(trAddress)}>
          <h2>{trName}</h2>
          <p>{trDescription}</p>
        </div>
      </div>
  </article>);
}


class Track extends Component{
  constructor(props){
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    this.state = {
      isModalOpen: false,
      paymentAdress: null,
    };
  }

  toggleModal(paymentAdress) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      paymentAdress: paymentAdress
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.toggleModal();
    await this.props.approveCoin(this.amount.value);
    await this.props.payManufacturer(this.state.paymentAdress, this.amount.value)
  }

  render(){
    const modal = (<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>Pay Using SPL</ModalHeader>
      <ModalBody>
      <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                  <Label htmlFor="amount">Amount of SPL Token to send</Label>
                  <Input type="number" id="amount" name="amount"
                      innerRef={(input) => this.amount = input} />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Pay</Button>
          </Form>
      </ModalBody>
    </Modal>);



    return (
      <React.Fragment>
        <div>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <div className="container">
          <div className="row">
            <div className="timeline-centered">
              <p></p>
              {
              this.props.item && this.props.item.transitions.map((transition, index) => 
                (<RenderCard key={index} 
                  trName = {this.props.transitioners[transition.transitionerAddr].name}
                  trDescription = {this.props.transitioners[transition.transitionerAddr].description}
                  trAddress={transition.transitionerAddr}
                  trDate={transition.createdAt}
                  trModalToggle={this.toggleModal}
                  circleCol={(transition.decision)?"bg-success":"bg-danger"}
                  align={(index%2)?"left-aligned":""} />))
              }

              <article className="timeline-entry begin">
                <div className="timeline-entry-inner">
                  <div className="timeline-icon" style={{WebkitTransform: 'rotate(-90deg)', MozTransform: 'rotate(-90deg)'}}>
                    <i className="entypo-flight" />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      {modal}
    </React.Fragment>);
  }
}

export default Track;