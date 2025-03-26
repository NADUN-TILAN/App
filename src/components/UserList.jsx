import React, { useEffect, useState } from "react";
import { Table, Button, Container, Col, Row, Modal } from "react-bootstrap"; // Added Modal
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for deletion
  const navigate = useNavigate();

  // Fetch users only once on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://localhost:44346/api/users/informations"
      );
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(
          `https://localhost:44346/api/users/${selectedUser.UserID}/${selectedUser.FirstName}/${selectedUser.LastName}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.UserID !== selectedUser.UserID)
          );
          setShowDeleteModal(false); // Close modal after successful deletion
        } else {
          alert("Error deleting user!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <Container className="mt-4">
      {/* Enhanced Page Header */}
      <div className="page-header">
        <Row className="align-items-center">
          <Col md={12}>
            <ul className="breadcrumb">
              <li>
                <a href="index.html">User /</a>
              </li>
              <li>User List</li>
            </ul>
            <h1 className="dashboard-title">List of Employees</h1>
          </Col>
        </Row>
      </div>

      {/* User Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.UserID}>
                <td>{index + 1}</td>
                <td>{user.FirstName}</td>
                <td>{user.MiddleName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                <td>{user.ContactNo}</td>
                <td>
                  <Button
                    variant="info"
                    className="me-2"
                    onClick={() =>
                      navigate(`/read-user/${user.UserID}/${user.FirstName}/${user.LastName}`)
                    } // Updated URL format
                  >
                    Read
                  </Button>

                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/edit-user/${user.UserID}`)                      
                    }
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => openDeleteModal(user)} // Open modal
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>
            {selectedUser?.FirstName} {selectedUser?.LastName}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
