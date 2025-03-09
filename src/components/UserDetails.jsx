import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap";

const UserDetails = () => {
  const { id, firstname, lastname } = useParams();  
  const navigate = useNavigate();  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Ensure the API URL matches your backend route
        const response = await fetch(`https://localhost:44346/api/users/details/${id}/${firstname}/${lastname}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        console.log("User Data:", data); // Debugging API response

        if (!data || Object.keys(data).length === 0) {
          throw new Error("User not found or empty response.");
        }

        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id, firstname, lastname]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading user details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <p>Error: {error}</p>
        </Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          <p>No user details found.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="user-profile-card shadow-sm">
            <Card.Body>
              <div className="text-center mb-3">
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/150" // Replace with actual user image URL if available
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <h3 className="text-center">{`${user.firstName} ${user.lastName}`}</h3>
              <p className="text-center text-muted">{user.email}</p>
              <hr />
              <p>
                <strong>Middle Name:</strong> {user.middleName || "N/A"}
              </p>
              <p>
                <strong>Contact No:</strong> {user.contactNo || "N/A"}
              </p>
              <div className="text-center mt-3">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Back
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
