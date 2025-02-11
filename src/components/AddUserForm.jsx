import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AddUserForm = () => {
    const [user, setUser] = useState({
      firstName: '',
      middleName: '',
      lastName: '',
      department: '',
      dob: '',
      address: '',
      country: '',
      contactNo: '',
      email: '',
      verifyEmail: ''
    });
  
    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (user.email !== user.verifyEmail) {
        alert('Emails do not match!');
        return;
      }

      try {
        const response = await fetch('https://localhost:44346/api/users/add', { // Ensure correct API URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            department: user.department,
            dob: user.dob,
            address: user.address,
            country: user.country,
            contactNo: user.contactNo,
            email: user.email
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message || 'User created successfully!');
          setUser({
            firstName: '',
            middleName: '',
            lastName: '',
            department: '',
            dob: '',
            address: '',
            country: '',
            contactNo: '',
            email: '',
            verifyEmail: ''
          });
        } else {
          alert(data.message || 'Error creating user!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error creating user!');
      }
    };
  
    return (
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h2 className="text-center mb-4">Add Employers</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={user.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="middleName"
                      placeholder="Enter Middle Name"
                      value={user.middleName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
  
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={user.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={user.dob}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="department"
                      placeholder="Enter Department"
                      value={user.department}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
  
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  placeholder="Enter Address"
                  value={user.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
  
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      placeholder="Enter Country"
                      value={user.country}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                      type="tel"
                      name="contactNo"
                      placeholder="Enter Contact Number"
                      value={user.contactNo}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
  
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Verify Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="verifyEmail"
                      placeholder="Re-enter email"
                      value={user.verifyEmail}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row> 
                
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default AddUserForm;
