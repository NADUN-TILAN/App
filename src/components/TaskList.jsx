import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks") 
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

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
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.assignee}</td>
              <td>{task.dueDate}</td>
              <td>{task.category}</td>
              <td>{task.status}</td>
              <td>
                <Button variant="success" size="sm">Complete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskList;
