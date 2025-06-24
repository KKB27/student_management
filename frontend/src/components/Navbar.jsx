import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Container, Navbar, Nav, Button, Row, Col, NavDropdown } from "react-bootstrap";
import {jwtDecode} from 'jwt-decode';


const NavigationBar = () => {
    const [isSignIn,setSignIn] = useState(false);
    const [user,setUser] = useState('');
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setSignIn(true); 
            const decoded = jwtDecode(token);
            //console.log(decoded); // { id, email, name, exp, iat }
            setUser(decoded.name);
        }
    }, []);
    const navigate = useNavigate();
    const handleSignInStart = (e)=>{
        e.preventDefault();
        navigate("/signin");
    }
    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        window.location.reload();
        navigate("/");
    }

     return (
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            Student Management App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              {!isSignIn && <Button variant="primary" className="ms-lg-3 mt-2 mt-lg-0" onClick={handleSignInStart}>
                Sign In
              </Button>}
              {isSignIn && <NavDropdown title= {user} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogOut}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>)
}

export default NavigationBar;