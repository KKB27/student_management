import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import NavigationBar from "../components/Navbar";
import { Modal } from "react-bootstrap";
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    age: "",
    institutionName: "",
  });
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deletePassword, setDeletePassword] = useState("");
const [deleteError, setDeleteError] = useState("");
const [deleteSuccess, setDeleteSuccess] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/signin");
        return
    };
    const decoded = jwtDecode(token);
    // Replace with your API endpoint
    fetch(`${API_PREFIX}student/get/${decoded.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile.");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    if (!token || decoded.id !== profile.id) {
      setError("Unauthorized action.");
      return
    }

    fetch(`${API_PREFIX}student/updatestudent/${profile.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed.");
        setSuccess("Profile updated!");
      })
      .catch(() => setError("Update failed."));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    fetch(`${API_PREFIX}student/changepassword/${decoded.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Password change failed.");
        return res.json();
      })
      .then((data) => {
        setPasswordSuccess("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setShowPasswordModal(false), 1200);
      })
      .catch(() => setPasswordError("Password change failed."));
  };

  const handleDeleteAccount = async () => {
  try {
    const res = await fetch(`${API_PREFIX}student/delete/${profile.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: deletePassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setDeleteError(data.error || "Failed to delete account");
      return;
    }

    // Success: clean up and redirect
    localStorage.removeItem("token");
    navigate("/");
  } catch (err) {
    console.error(err);
    setDeleteError("Something went wrong");
  }
};


  if (loading) return <div>Loading...</div>;

  return (
    <>
    <NavigationBar/>
    <Container className="mt-4">
  <Row className="align-items-start">
    {/* Left: Profile Form */}
    <Col md={6}>
      <h2>My Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!edit}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!edit}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            disabled={!edit}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            name="age"
            type="number"
            value={profile.age}
            onChange={handleChange}
            disabled={!edit}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Institution Name</Form.Label>
          <Form.Control
            name="institutionName"
            value={profile.institutionName}
            onChange={handleChange}
            disabled={!edit}
          />
        </Form.Group>
        <Button variant="info" onClick={() => setEdit(!edit)} className="me-2">
          {edit ? "Cancel" : "Edit"}
        </Button>
        <Button type="submit" variant="primary" disabled={!edit}>
          Save
        </Button>
        
      </Form>
    </Col>

    {/* Right: Illustration */}
    <Col md={6} className="text-center mt-4 mt-md-0">
      <img
        src="/assets/profile.jpg" // Change path if needed
        alt="Profile illustration"
        className="img-fluid rounded"
        style={{ maxHeight: "400px", objectFit: "contain" }}
      />
        <p className="mt-2">
            <a href="https://www.freepik.com/author/juicy-fish">Designed by juicy-fish / Freepik</a>  
        </p>
    </Col>
  </Row>
  <br />
  <br />
  <Row className="align-items-center justify-content-center">
          <Col>
            <Button
              type="button"
              variant="warning"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </Button>
          </Col>
          <Col>
            <Button
              type="button"
              variant="danger"
              onClick={() => setShowDeleteModal(true)}

            >
              Delete Account
            </Button>
          </Col>
        </Row>
</Container>


     <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {passwordError && <Alert variant="danger">{passwordError}</Alert>}
          {passwordSuccess && <Alert variant="success">{passwordSuccess}</Alert>}
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onClick={() => setShowDeleteModal(true)}
                autoComplete="new-password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Account Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p className="text-danger fw-semibold">
      This action is irreversible. Are you sure you want to delete your account?
    </p>

    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Enter your password to confirm</Form.Label>
        <Form.Control
          type="password"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          placeholder="Your password"
        />
      </Form.Group>

      {deleteError && (
        <p className="text-danger text-center">{deleteError}</p>
      )}
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDeleteAccount}>
      Delete Account
    </Button>
  </Modal.Footer>
</Modal>

    </>
    
  );
};

export default Profile;