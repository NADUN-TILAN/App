import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AssignTask = () => {
  const [task, setTask] = useState({
    title: "",
    assignee: "",
    dueDate: "",
    category: "",
    description: "",
    assignor: "",
    uploadedDocs: null,
  });

  const [assignee, setAssignee] = useState([]);

  useEffect(() => {
    // Fetch assignees from API
    const fetchAssignees = async () => {
      try {
        const response = await fetch(
          "https://localhost:44346/api/users/assignees"
        );
        if (!response.ok) throw new Error("Failed to fetch assignees");

        const data = await response.json();
        setAssignee(data);
      } catch (error) {
        console.error("Error fetching assignees:", error);
      }
    };

    fetchAssignees();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 0) {
      // Validate file type (PDF, PNG, or JPEG)
      if (!['application/pdf', 'image/png', 'image/jpeg'].includes(file.type)) {
        alert('Invalid file type. Only PDF, PNG, and JPEG are allowed.');
        return;
      }
      setTask({ ...task, uploadedDocs: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("assignee", task.assignee);
    formData.append("dueDate", task.dueDate);
    formData.append("category", task.category);
    formData.append("description", task.description);
    formData.append("assignor", task.assignor);
    if (task.uploadedDocs) {
      formData.append("uploadedDocs", task.uploadedDocs);
    }

    try {
      const response = await fetch("https://localhost:44346/api/tasks/add", {
        // insert api
        method: "POST",
        body: formData, 
      headers: {
      },
      });

      if (response.ok) {
        alert("Task assigned successfully!");
        setTask({
          title: "",
          assignee: "",
          dueDate: "",
          category: "",
          description: "",
          assignor: "",
          uploadedDocs: null,
        });
      } else {
        alert("Error assigning task!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error assigning task!");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Assign Task</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Task Title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assignee</Form.Label>
              <Form.Select
                name="assignee"
                value={task.assignee}
                onChange={handleChange}
                disabled={assignee.length === 0} // Disable until assignees are fetched
              >
                <option value="">Select Assignee</option>
                {assignee.length > 0 ? (
                  assignee.map((user) => (
                    <option key={user.UserID} value={user.UserID}>
                      {user.Assignee}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading assignees...</option>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Enter Category"
                value={task.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter Task Description"
                value={task.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Who is the Assignor</Form.Label>
              <Form.Control
                type="text"
                name="assignor"
                placeholder="Enter Assignor Name"
                value={task.assignor}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Document</Form.Label>
              <Form.Control
                type="file"
                name="uploadedDocs"
                onChange={handleFileChange}
                accept="*/*" // Allows all file formats
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Assign Task
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AssignTask;
