import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavigationBar from '../NavigationBar';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  // This would be populated with actual user data from authentication context
  
  return (
    <>
      <NavigationBar userRole={user.role} />
      <Container className="mt-4">
        <Row>
          <Col>
            <h1>Welcome, {user.name}</h1>
            <p className="lead">Blockchain-Based Land Management System Dashboard</p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={4}>
            <Card className="mb-4">
              <Card.Header>Land Registry</Card.Header>
              <Card.Body>
                <Card.Title>Your Land Properties</Card.Title>
                <Card.Text>
                  View and manage your registered land properties, certificates, and ownership documents.
                </Card.Text>
                <Button variant="primary" href="/land-registry">Access Land Registry</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-4">
              <Card.Header>Documents</Card.Header>
              <Card.Body>
                <Card.Title>Document Management</Card.Title>
                <Card.Text>
                  Upload, verify, and manage your land-related documents securely on blockchain.
                </Card.Text>
                <Button variant="primary" href="/documents">Manage Documents</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-4">
              <Card.Header>Certificate Verification</Card.Header>
              <Card.Body>
                <Card.Title>Verify Certificates</Card.Title>
                <Card.Text>
                  Verify the authenticity of land certificates using blockchain verification.
                </Card.Text>
                <Button variant="primary" href="/verify-certificate">Verify Certificate</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity Section */}
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>Recent Activities</Card.Header>
              <Card.Body>
                <p>No recent activities to display.</p>
                {/* This would be populated with actual activity data */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
