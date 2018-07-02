import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  //NavbarBrand,
  Nav,
  NavItem,
  //NavLink,
  /*UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem*/
} from 'mdbreact';

const defaultLinks = [
  { to: '/threeThirteen', label: 'Three Thirteen' },
];

class NavBar extends Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  render() {
    const { links = defaultLinks } = this.props;

    return (
      <Navbar light color="white" expand="md" className="mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-edit" aria-hidden="true" /> Card Games
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto">
              {links.map((link, index) => <NavItem key={index + link.to}>
                  <Link className='nav-link' to={link.to}>
                    {link.label}
                  </Link>
                </NavItem>)}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default NavBar;
