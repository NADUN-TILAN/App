import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
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
        fetch("http://localhost:5000/api/tasks")
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Error fetching tasks:", error));

        fetch("http://localhost:5000/api/employees")
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
        <Container className="mt-4">
            {/* Page Header */}
            <div className="page-header">
                <Container>
                    <Row className="align-items-center">
                        <Col md={12}>
                            <ul className="breadcrumb">
                                <li><a href="index.html">Home /</a></li>
                                <li>Dashboard</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h1 className="dashboard-title">Dashboard</h1>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Task and Employee Statistics */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="stat-card bg-light">
                        <h5>Total Employees</h5>
                        <h3>{totalEmployees}</h3>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="stat-card bg-success text-white">
                        <h5>Completed Tasks</h5>
                        <h3>{completedTasks}</h3>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="stat-card bg-info text-white">
                        <h5>Ongoing Tasks</h5>
                        <h3>{pendingTasks}</h3>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="stat-card bg-danger text-white">
                        <h5>Unassigned Employees</h5>
                        <h3>{unassignedEmployees}</h3>
                    </Card>
                </Col>
            </Row>

            {/* Charts */}
            <Row>
                <Col md={6}>
                    <Card className="chart-card">
                        <h5>Task Overview</h5>
                        <Pie data={taskData} />
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="chart-card">
                        <h5>Task Status</h5>
                        <Bar data={taskData} />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
