import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap";

const ReadUser = () => {
  const { id, firstname, lastname } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReadUser = async () => {
      try {
        console.log(`Fetching User: ID=${id}, FirstName=${firstname}, LastName=${lastname}`);

        const response = await fetch(`https://localhost:44346/api/users/details/${id}/${firstname}/${lastname}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        console.log("API Response Data:", data); // Debugging API response

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("User not found or empty response.");
        }

        // Extract the first user from the array
        setUser(data[0]);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReadUser();
  }, [id, firstname, lastname]);

  useEffect(() => {
    console.log("Updated User State:", user);
  }, [user]);

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
                  src="https://i.pinimg.com/736x/24/4b/15/244b15a6347da58e2cf9c48ba3adfc3e.jpg" 
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <h3 className="text-center">{user?.FirstName ?? "N/A"} {user?.LastName ?? "N/A"}</h3>
              <p className="text-center text-muted">{user?.Email ?? "N/A"}</p>
              <hr />
              <p>
                <strong>Middle Name:</strong> {user?.MiddleName ?? "N/A"}
              </p>
              <p>
                <strong>Contact No:</strong> {user?.ContactNo ?? "N/A"}
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

export default ReadUser;
