import React, { Component } from 'react';
import { Navbar, MenuItem, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">AutoMaily</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem href="/auth/google">Log In</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
