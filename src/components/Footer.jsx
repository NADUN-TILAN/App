import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4 mt-5">
      {/* <Container> */}
        {/* <Row className="text-center text-md-start"> */}
          {/* Column 1: App Info */}
          {/* <Col md={4} className="mb-3 mb-md-0">
            <h5>Management App</h5>
            <p>Empowering teams with seamless task management.</p>
          </Col> */}

          {/* Column 2: Quick Links */}
          {/* <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/DashBoard" className="text-light text-decoration-none">Dashboard</a></li>
              <li><a href="/assign-task" className="text-light text-decoration-none">Assign Task</a></li>
              <li><a href="/user-list" className="text-light text-decoration-none">User List</a></li>
              <li><a href="/tasks" className="text-light text-decoration-none">Tasks</a></li>
            </ul>
          </Col> */}

          {/* Column 3: Contact Info */}
          {/* <Col md={4}>
            <h5>Contact</h5>
            <p>Email: support@managementapp.com</p>
            <p>Phone: +943 456 7890</p>
          </Col>
        </Row> */}

        <hr className="bg-light my-3" />

        {/* Bottom Text */}
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Management App. All rights reserved.</p>
        </div>
      {/* </Container> */}
    </footer>
  );
};

export default Footer;
