import React, { useState } from "react";
import { Container, Navbar, Nav, Button, Row, Col, NavDropdown, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
const API_PREFIX = import.meta.env.VITE_API_PREFIX;


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

    const response = await fetch(`${API_PREFIX}student/signin`, {
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

  const goToSignUp = () =>{
    navigate("/signup");
  }
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
    <Container className="py-5">
  <Row className="align-items-center">
    {/* Left Side: Image */}
    <Col md={6} className="text-center mb-4 mb-md-0">
      <img
        src="/assets/signinimage.jpg" // You can replace with any other animal-study image
        alt="Animals studying"
        className="img-fluid rounded"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
      <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
    </Col>

    {/* Right Side: Sign In Form */}
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

            <Button variant="success" type="submit" className="w-100">
              Sign In
            </Button>

            {isError && (
              <p className="text-center text-danger mt-3">{error}</p>
            )}
          </Form>

          <div className="text-center mt-4">
            <p className="mb-2">Don't have an account?</p>
            <Button variant="outline-success" className="w-50" onClick={goToSignUp}>
              Sign Up
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

    </>
  );
};

export default SignIn;
