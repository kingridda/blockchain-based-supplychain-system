import React, { Component } from "react";
import {Navbar, NavItem, NavLink, NavbarBrand, Nav, Button, Modal, ModalBody, ModalHeader, 
Form, FormGroup, Label, Input } from "reactstrap";

class Header extends Component{

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    this.state = {
      isModalOpen: false,
      amount: 0
    };
  }

  toggleModal(amount) {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.toggleModal();
    this.props.sendEther(this.amount.value);
  }

  render() {
    const modal = (<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                      <ModalHeader toggle={this.toggleModal}>Purchase SPL Coin now</ModalHeader>
                      <ModalBody>
                      <Form onSubmit={this.handleSubmit}>
                              <FormGroup>
                                  <Label htmlFor="amount">Amount of Ether</Label>
                                  <Input type="number" id="amount" name="amount"
                                      innerRef={(input) => this.amount = input} />
                              </FormGroup>
                              <Button type="submit" value="submit" color="primary">Purchase SPL coins</Button>
                          </Form>
                      </ModalBody>
                    </Modal>);



    return (
        <React.Fragment>
            <Navbar color="dark" expand="md" dark>
              <div className="container">
                  <NavbarBrand className="mr-auto" href="/">Supply App</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink onClick="">
                        <Button color="warning" onClick={this.toggleModal}> Get SupplyCoin (SPL)</Button>
                      </NavLink>
                    </NavItem>
                  </Nav>
              </div>
            </Navbar>
            {modal}
        </React.Fragment>
      );
  }

}


export default Header;