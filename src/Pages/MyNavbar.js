import React, {Component} from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import './Pages.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class MyNavbar extends Component{
    render(){
    return (
        <div>
        <Navbar color='dark' light='false' dark='true' expand='md' fixed='top'>
        <NavbarBrand href="/">Mov.ie</NavbarBrand>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href='/movies'>Movie Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Profile
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/signin'>Sign in</DropdownItem>
                <DropdownItem href='/signup/'>Register</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      </Navbar>
      <p>a</p>
      </div>
    )
    }
}