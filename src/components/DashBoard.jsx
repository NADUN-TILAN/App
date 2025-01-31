import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
  
  // Register elements
  ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);  

  const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch task data
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")  //API url
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));

      fetch("http://localhost:5000/api/employees") //API url
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));

  }, []);

  // Count completed vs pending tasks
  const completedTasks = tasks.filter(task => task.status === "Completed").length;
  const pendingTasks = tasks.length - completedTasks;

  // Employee statistics
  const totalEmployees = employees.length;
  const unassignedEmployees = employees.filter((emp) => emp.assignedTask === null).length;


  // Chart Data
  const taskData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks Overview",
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#28a745", "#ffc107"],
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      {/* Task and Employee Statistics */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="p-3 text-center bg-light">
            <h5>Total Employees</h5> 
            <h3>{totalEmployees}</h3>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center bg-success text-white">
            <h5>Completed Tasks</h5>
            <h3>{completedTasks}</h3>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center bg-info text-white">
            <h5>Ongoing Tasks</h5>
            <h3>{pendingTasks}</h3>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center bg-danger text-white">
            <h5>Unassigned Employees</h5>
            <h3>{unassignedEmployees}</h3>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="p-3">
            <h5>Task Overview</h5>
            <Pie data={taskData} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h5>Task Status</h5>
            <Bar data={taskData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
