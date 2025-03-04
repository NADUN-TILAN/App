import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ FirstName: "", MiddleName: "", LastName: "", Email: "", ContactNo: "" });
  const navigate = useNavigate();

  // Memoize the fetch function to avoid unnecessary re-renders
  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(`https://localhost:44346/api/users/${id}`);
      if (!response.ok) throw new Error("Failed to fetch user details");

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [id]); // Only re-run when `id` param changes

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]); // Add fetchUserDetails to the dependency array

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:44346/api/users/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("User updated successfully!");
        navigate("/"); // Redirect back to user list
      } else {
        alert("Failed to update user!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Edit User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="FirstName" value={user.FirstName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Middle Name</Form.Label>
          <Form.Control type="text" name="MiddleName" value={user.MiddleName} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="LastName" value={user.LastName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="Email" value={user.Email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact No</Form.Label>
          <Form.Control type="text" name="ContactNo" value={user.ContactNo} onChange={handleChange} required />
        </Form.Group>
        <Button variant="success" type="submit">Save Changes</Button>
      </Form>
      <Button variant="secondary" className="mt-3" onClick={() => navigate(-1)}>Cancel</Button>
    </Container>
  );
};

export default EditUser;
