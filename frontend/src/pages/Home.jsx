import React from "react";
import { Container, Navbar, Nav, Button, Row, Col, NavDropdown } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
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
            <p className="text-center">Design by Freepik</p>
          </Col>
        </Row>
      </Container>
      <Container className="py-5 bg-light">
  <Row className="align-items-center">
    <Col md={6} className="text-center mb-4 mb-md-0">
      <img
        src="https://img.freepik.com/free-vector/online-certification-illustration_23-2148573634.jpg"
        alt="Empowering students"
        className="img-fluid rounded"
      />
      <p className="text-center">Design by Freepik</p>
    </Col>
    <Col md={6} className="text-center text-md-start">
      <h2 className="fw-bold">
        Keep everything together, without the stress.
      </h2>
      <p className="lead mt-3">
        Your assignments, deadlines, and notes — all neatly in one place. 
        No clutter, no pressure. Just a simple way to stay on top 
        of things and feel a little more in control every day.
      </p>
      <Button variant="outline-success" size="lg" className="mt-3">
        Learn More
      </Button>
    </Col>
  </Row>
      </Container>
      <Container className="py-5">
  <h2 className="text-center fw-bold mb-4">What students are saying</h2>
  <Carousel indicators={false} interval={5000} pause="hover" className="mx-auto" style={{ maxWidth: "700px" }}>
    <Carousel.Item>
      <div className="text-center px-4">
        <p className="lead fst-italic">
          "I didn’t realize how much mental space I was wasting until I started using this. Everything’s just... easier now."
        </p>
        <h6 className="mb-0">Aditi</h6>
        <small className="text-muted">Computer Science</small>
      </div>
    </Carousel.Item>

    <Carousel.Item>
      <div className="text-center px-4">
        <p className="lead fst-italic">
          "It’s like having a gentle nudge in the right direction, every day."
        </p>
        <h6 className="mb-0">Rayyan</h6>
        <small className="text-muted">Literature Major</small>
      </div>
    </Carousel.Item>

    <Carousel.Item>
      <div className="text-center px-4">
        <p className="lead fst-italic">
          "No more sticky notes. No more missed deadlines. Just peace of mind."
        </p>
        <h6 className="mb-0">Mehul</h6>
        <small className="text-muted">Engineering</small>
      </div>
    </Carousel.Item>
  </Carousel>
      </Container>
    </>
  );
};

export default Home;
