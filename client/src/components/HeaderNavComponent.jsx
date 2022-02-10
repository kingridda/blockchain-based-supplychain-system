import React from "react";
import {Navbar, Collapse, NavItem,
    NavLink, NavbarBrand, Nav, NavbarToggler, } from "reactstrap";

function HeaderNav(props){
    return (
        <div>
        <Navbar color="light" expand="md" light>
            <NavbarBrand href="/">Supply App</NavbarBrand>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/">
                  Components
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/">
                  Components
                </NavLink>
              </NavItem>
            </Nav>
        </Navbar>
        
      </div>
    );
}


export default HeaderNav;