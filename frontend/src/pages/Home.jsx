import React from "react";
import { Container, Navbar, Nav, Button, Row, Col, NavDropdown } from "react-bootstrap";
import NavigationBar from "../components/Navbar.jsx";
const Home = () => {
  return (
    <>{/* Hero Section */}
    <NavigationBar/>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <h1 className="display-4 fw-bold">
              Organize your academic life.
            </h1>
            <p className="lead mt-3">
              Track assignments, ace deadlines, and simplify your studies —
              all in one place. Your academic companion, right here.
            </p>
            <Button variant="success" size="lg" className="mt-3">
              Get Started
            </Button>
          </Col>
          <Col md={6} className="text-center mt-4 mt-md-0">
            <img
              src="https://img.freepik.com/free-vector/school-management-system-abstract-concept_335657-3170.jpg"
              alt="Student dashboard"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
