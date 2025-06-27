import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import NavigationBar from "../components/Navbar";
import { Modal } from "react-bootstrap";
const API_PREFIX = import.meta.env.VITE_API_PREFIX;
import { Card, Spinner } from "react-bootstrap";
const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    facultyName: "",
    currentlyTaking: true,
    category: ""
  });
  const [formError, setFormError] = useState("");

  const token = localStorage.getItem("token");
  let decoded;

  try {
    decoded = jwtDecode(token);
  } catch {
    decoded = {};
  }

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_PREFIX}student/getsubjects/${decoded.id}`, {
        headers: { },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch subjects.");

      setSubjects(data.subjects);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {navigate("/signin");return};
    fetchSubjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      const res = await fetch(`${API_PREFIX}student/createsubject/${decoded.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Creation failed");
        return;
      }

      await fetchSubjects();
      setShowModal(false);
      setFormData({
        name: "",
        facultyName: "",
        currentlyTaking: true,
        category: ""
      });
    } catch (err) {
      setFormError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <>
    <NavigationBar />
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2>My Subjects</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Add New Subject
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : subjects.length === 0 ? (
        <p className="text-muted">No subjects found. Add your first one!</p>
      ) : (
        <Row>
          {subjects.map((subject) => (
            <Col key={subject._id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{subject.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Faculty: {subject.facultyName}
                  </Card.Subtitle>
                  <Card.Text>
                    Category: {subject.category || "N/A"} <br />
                    Status: {subject.currentlyTaking ? "Ongoing" : "Completed"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal to Create New Subject */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Faculty Name</Form.Label>
              <Form.Control
                name="facultyName"
                value={formData.facultyName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                label="Currently Taking"
                name="currentlyTaking"
                checked={formData.currentlyTaking}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
  <Form.Label>Category</Form.Label>
  <Form.Select
    name="category"
    value={formData.category}
    onChange={handleChange}
    required
  >
    <option value="">Select difficulty</option>
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
  </Form.Select>
</Form.Group>


            {formError && <p className="text-danger text-center">{formError}</p>}

            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add Subject
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
    </>
    
  );
};

export default SubjectsPage;
