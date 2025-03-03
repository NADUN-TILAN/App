import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch users only once on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://localhost:44346/api/users/informations");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`https://localhost:44346/api/users/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.UserID !== id));
        } else {
          alert("Error deleting user!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Container className="mt-4">
      {/* Page Header */}
      <div className="page-header">
        <Container>
        <ul className="breadcrumb">
              <li>
                <a href="index.html">User /</a>
              </li>
              <li>User List</li>
            </ul>
          <h1 className="text-center mb-4">List of Employers</h1>
        </Container>
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
                  <Button variant="info" className="me-2" href={`/user/${user.UserID}`}>Read</Button>
                  <Button variant="warning" className="me-2" href={`/edit-user/${user.UserID}`}>Update</Button>
                  <Button variant="danger" onClick={() => handleDelete(user.UserID)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
