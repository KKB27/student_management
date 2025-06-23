import React, { useState } from "react";
import { Container, Navbar, Nav, Button, Row, Col, NavDropdown, Form, Card } from "react-bootstrap";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [isError,setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });

    const data = {
        'email':email,
        'password':password
    }    

    const response = await fetch("http://localhost:3000/student/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
    });
    const result =  await response.json();
    if(!response.ok){
        const error = await result.error
        setIsError(true);
        setError(error.toString() || "Something went wrong");
        return
    }
    const token = await result.token;
    localStorage.setItem("token",token);
    console.log("SIGNED IN");
    navigate("/home")
  };

  return (
    <>
    <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            Student Management App
          </Navbar.Brand>
        </Container>
    </Navbar>

    <br></br>
    <br/>
    <br/>
    <br/>

    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center mb-4">Sign In</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
                <br/>
                <br/>
                <p> {isError && error} </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default SignIn;
