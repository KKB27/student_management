import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import NavigationBar from "../components/Navbar";
import { Modal } from "react-bootstrap";
const API_PREFIX = import.meta.env.VITE_API_PREFIX;
import { Card, Spinner } from "react-bootstrap";
const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState([]); // <-- Add this
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    dueDate: "",
    description: "",
    totalPoints: "",
    estimatedHours: ""
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
          navigate("/signin");
          return
      };
      const decoded = jwtDecode(token);
      // Replace with your API endpoint
      fetch(`${API_PREFIX}student/getassignments/${decoded.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch assignments.");
          return res.json();
        })
        .then((data) => {
          setAssignments(data.assignments);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch assignments.");
          setLoading(false);
        });

        fetch(`${API_PREFIX}student/getsubjects/${decoded.id}`, {

    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch subjects.");
        return res.json();
      })
      .then((data) => {
        setSubjects(data.subjects || []);
      })
      .catch(() => {
        setSubjects([]);
      });
    }, []);

  const handleCreate = async (e) => {
    const token = localStorage.getItem("token");
      if (!token) {
          navigate("/signin");
          return
      };
      const decoded = jwtDecode(token);
    e.preventDefault();
    console.log("I WAS HERE");
    setFormError("");
    try {
    console.log("I WAS HERE2");
      const res = await fetch(`${API_PREFIX}student/createassignment/${decoded.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setFormError(data.error || "Creation failed");
        return;
      }

      // Refresh assignments list
      setShowModal(false);
      setFormData({
        subject: "",
        dueDate: "",
        description: "",
        totalPoints: "",
        estimatedHours: ""
      });
    } catch (err) {
        console.log(err);
      setFormError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
    <NavigationBar />
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2>My Assignments</h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => setShowModal(true)}>
            + Create New Assignment
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : assignments.length === 0 ? (
        <p className="text-muted">No assignments found. Time to create one!</p>
      ) : (
        <Row>
          {assignments.map((assignment) => (
            <Col key={assignment._id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{assignment.subject?.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text>{assignment.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <small>Points: {assignment.totalPoints}</small>
                    {assignment.estimatedHours && (
                      <small>Est: {assignment.estimatedHours} hrs</small>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Create Assignment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select subject</option>
                  {subjects.map((subj) => (
                    <option key={subj._id} value={subj._id}>
                      {subj.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Points</Form.Label>
              <Form.Control
                type="number"
                name="totalPoints"
                value={formData.totalPoints}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estimated Hours</Form.Label>
              <Form.Control
                type="number"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={handleChange}
              />
            </Form.Group>

            {formError && <p className="text-danger text-center">{formError}</p>}

            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Cancel
              </Button>
              <Button type="submit" variant="success" onClick={handleCreate}>
                Create
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container></>
    
  );
};

export default AssignmentsPage;
