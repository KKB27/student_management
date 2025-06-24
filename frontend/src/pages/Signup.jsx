import React, { useState } from "react";
import { Container, Navbar, Nav, Button, Row, Col, NavDropdown, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

const Signup = ()=> {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [institutionName, setInstitutionName] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSignUp = async(e) => {
        e.preventDefault();
        // handle sign up logic here
        try {
            const body = {
                'name':name,
                'email':email,
                'phoneNumber':phoneNumber,
                'age':age,
                'institutionName':institutionName,
                'password':password
            }
            const response = await fetch(`${API_PREFIX}student/signup`,
                {method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body), 
            });
            const result = await response.json()
            if(!response.ok){
                setIsError(true);
                const error = result.error;
                setError(error);
                return
            }
            const token = await result.token;
            localStorage.setItem("token",token);
            console.log("SIGNED IN");
            navigate("/home")
        } catch (error) {
            setIsError(true);
            setError(error.toString());
        }
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

            <Container className="py-5">
  <Row className="align-items-center">
    {/* Left: Illustration */}
    <Col md={6} className="text-center mb-4 mb-md-0">
      <img
        src="/assets/signupimage.jpg" // Replace with your actual image path
        alt="Animals signing up"
        className="img-fluid rounded"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
      <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
    </Col>

    {/* Right: Sign Up Form */}
    <Col md={6}>
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="text-center mb-4">Sign Up</h3>
          <Form onSubmit={handleSignUp}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="10-digit phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAge" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                min="10"
                placeholder="Your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formInstitution" className="mb-3">
              <Form.Label>Institution Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your school or college"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Sign Up
            </Button>

            {isError && (
              <p className="text-center text-danger mt-3">{error}</p>
            )}
          </Form>

          <div className="text-center mt-4">
            <p className="mb-2">Already have an account?</p>
            <Button variant="outline-success" className="w-50" onClick={()=>{
                navigate("/signin")
            }}>
              Sign In
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

        </>
    )
}

export default Signup;