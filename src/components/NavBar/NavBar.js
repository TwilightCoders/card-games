import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  /*UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem*/
} from 'reactstrap';

const defaultLinks = [
  { to: '/threeThirteen', label: 'Three Thirteen' },
];

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { links = defaultLinks } = this.props;

    return (
      <Navbar color="light" light expand="md" className='mb-4'>
        <div className="container">
          <NavbarBrand tag={Link} to='/'><i className="fas fa-edit" aria-hidden="true"></i> Card Games</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {links.map((link, index) => 
                <NavItem key={index + link.to}>
                  <NavLink tag={Link} to={link.to}>{link.label}</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default NavBar;
