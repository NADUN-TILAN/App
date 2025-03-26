import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner, Card, Row, Col } from "react-bootstrap";

const EditUser = () => {
  const { id, firstname, lastname } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // Initially null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch user details when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(`Fetching User: ID=${id}, FirstName=${firstname}, LastName=${lastname}`);

        const response = await fetch(`https://localhost:44346/api/users/details/${id}/${firstname}/${lastname}`);
        if (!response.ok) throw new Error(`Failed to fetch user details: ${response.statusText}`);

        const data = await response.json();
        console.log("API Response Data:", data); // Debugging API response

        if (!data || (Array.isArray(data) && data.length === 0)) {
          throw new Error("User not found or empty response.");
        }

        // If API returns an array, take the first element
        setUser(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, firstname, lastname]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!user) {
      setError("User data is not loaded yet!");
      return;
    }

    try {
      console.log("Submitting updated user data:", user); // Debugging log

      const response = await fetch(`https://localhost:44346/api/users/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to update user: ${errorMsg}`);
      }

      setSuccess(true);
      setTimeout(() => navigate("/user-list"), 2000); // Redirect after success
    } catch (error) {
      console.error("Update Error:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">No user data found.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white text-center">
              <h3 className="mb-0">Edit User</h3>
            </Card.Header>
            <Card.Body>
              {success && <Alert variant="success">User updated successfully!</Alert>}

              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="FirstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="FirstName"
                    value={user.FirstName || ""}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="MiddleName" className="mb-3">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="MiddleName"
                    value={user.MiddleName || ""}
                    onChange={handleChange}
                    placeholder="Enter middle name"
                  />
                </Form.Group>

                <Form.Group controlId="LastName" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="LastName"
                    value={user.LastName || ""}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="Email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={user.Email || ""}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="ContactNo" className="mb-3">
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type="text"
                    name="ContactNo"
                    value={user.ContactNo || ""}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="primary" type="submit">
                    Update User
                  </Button>
                  <Button variant="secondary" onClick={() => navigate("/user-list")}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUser;
