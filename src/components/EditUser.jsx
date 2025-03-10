import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

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
        if (!response.ok) throw new Error("Failed to fetch user details");

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
      const response = await fetch(`https://localhost:44346/api/users/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setSuccess(true);
      setTimeout(() => navigate("/user-list"), 2000); // Redirect after success
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!user) return <Alert variant="warning">No user data found.</Alert>;

  return (
    <Container className="mt-4">
      <h2>Edit User</h2>
      {success && <Alert variant="success">User updated successfully!</Alert>}

      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="FirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="FirstName"
            value={user.FirstName || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="MiddleName">
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type="text"
            name="MiddleName"
            value={user.MiddleName || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="LastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="LastName"
            value={user.LastName || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            value={user.Email || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="ContactNo">
          <Form.Label>Contact No</Form.Label>
          <Form.Control
            type="text"
            name="ContactNo"
            value={user.ContactNo || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update User
        </Button>
        <Button variant="secondary" className="mt-3 ms-2" onClick={() => navigate("/user-list")}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default EditUser;
