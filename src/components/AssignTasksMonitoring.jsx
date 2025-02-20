import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const AssignTasksMonitoring = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Make sure this URL matches the correct API endpoint
    fetch("http://localhost:5000/api/tasks/informations")
      .then((res) => res.json())  // Parse JSON response
      .then((data) => setTasks(data))  // Store data in state
      .catch((error) => console.error("Error fetching tasks:", error));  // Handle errors
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">List of Assigned Tasks</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Assignee</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task.TaskID}>
                <td>{index + 1}</td>
                <td>{task.Title}</td>
                <td>{task.Assignee}</td>
                <td>{task.DueDate ? task.DueDate : "No due date"}</td>
                <td>{task.Category}</td>
                <td>{task.Status ? task.Status : "Pending"}</td>
                <td>
                  <Button variant="success" size="sm">
                    Complete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No tasks available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AssignTasksMonitoring;
