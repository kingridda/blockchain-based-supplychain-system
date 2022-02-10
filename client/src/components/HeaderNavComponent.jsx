import React from "react";
import {Navbar, Collapse, NavItem,
    NavLink, NavbarBrand, Nav, Button,  } from "reactstrap";

function HeaderNav(props){
    return (
        <div>
        <Navbar color="light" expand="md" light>
            <NavbarBrand href="/">Supply App</NavbarBrand>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink onClick="">
                  <Button color="warning" onClick={props.purchaseCoinModal}> Get SupplyCoin (SPL)</Button>
                </NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
}


export default HeaderNav;