import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap";

const UserDetails = () => {
  const { id } = useParams();  
  const navigate = useNavigate();  
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    // Function to fetch user details from the backend API
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://localhost:44346/api/users/${id}`);  // Fetch data by user ID
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();  // Parse the JSON response

        // Check if the expected data exists
        if (data) {
          setUser({
            FirstName: data.FirstName || "N/A",
            MiddleName: data.MiddleName || "N/A",
            LastName: data.LastName || "N/A",
            Email: data.Email || "N/A",
            ContactNo: data.ContactNo || "N/A",
          });
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        setError(error.message);  // Set error message if fetch fails
      } finally {
        setLoading(false);  // Set loading to false after fetching data
      }
    };

    fetchUserDetails();  // Call the function to fetch data
  }, [id]);  // Only re-run when the user ID changes

  // If data is still loading
  if (loading) {
    return (
      <Container className="mt-4" style={{ textAlign: "center" }}>
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  // If there was an error fetching the data
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <p>Error: {error}</p>
        </Alert>
      </Container>
    );
  }

  // If no user data is found or incomplete data
  if (!user || !user.FirstName || !user.LastName || !user.Email || !user.ContactNo) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          <p>No user data available or incomplete user data.</p>
        </Alert>
      </Container>
    );
  }

  // Render the user details when data is successfully fetched
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="user-profile-card shadow-sm">
            <Card.Body>
              <div className="text-center mb-3">
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/150"
                  className="rounded-circle user-profile-img"
                />
              </div>
              <Card.Title className="text-center user-name">
                {`${user.FirstName} ${user.MiddleName} ${user.LastName}`}
              </Card.Title>
              <Card.Text className="text-center text-muted user-email">
                {user.Email}
              </Card.Text>
              <Card.Text className="text-center user-contact">
                Contact No: {user.ContactNo}
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Go Back
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
