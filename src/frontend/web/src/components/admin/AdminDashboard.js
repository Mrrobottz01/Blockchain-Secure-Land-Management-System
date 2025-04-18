import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Table, Button, Badge, Form, Modal } from 'react-bootstrap';
import NavigationBar from '../NavigationBar';

const AdminDashboard = ({ user = { name: 'Admin', role: 'admin' } }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Enhanced mock data with more detailed information
  const mockUsers = [
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'citizen',
      status: 'Active',
      registrationDate: '2025-01-15',
      lastLogin: '2025-04-15 09:30:00',
      documentsSubmitted: 8,
      propertiesRegistered: 3
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'landOfficer',
      status: 'Pending',
      registrationDate: '2025-03-21',
      lastLogin: null,
      documentsVerified: 0,
      assignedDistrict: 'Central'
    },
    { 
      id: '3', 
      name: 'Robert Johnson', 
      email: 'robert@example.com', 
      role: 'citizen',
      status: 'Active',
      registrationDate: '2024-11-10',
      lastLogin: '2025-04-14 15:45:00',
      documentsSubmitted: 12,
      propertiesRegistered: 5
    },
    { 
      id: '4', 
      name: 'Alice Brown', 
      email: 'alice@example.com', 
      role: 'landOfficer',
      status: 'Active',
      registrationDate: '2025-02-05',
      lastLogin: '2025-04-15 08:15:00',
      documentsVerified: 156,
      assignedDistrict: 'Northern'
    }
  ];
  
  const mockSystemStats = {
    userStats: {
      totalUsers: 254,
      activeUsers: 178,
      newUsersToday: 12,
      newUsersThisMonth: 45,
      usersByRole: {
        citizens: 198,
        landOfficers: 42,
        administrators: 14
      }
    },
    landStats: {
      totalLandParcels: 1289,
      registeredThisMonth: 89,
      pendingRegistrations: 34,
      totalArea: "12,456 hectares",
      byDistrict: {
        Central: 456,
        Northern: 389,
        Southern: 234,
        Eastern: 210
      }
    },
    documentStats: {
      totalDocuments: 3427,
      pendingVerification: 42,
      verifiedToday: 28,
      rejectedToday: 3,
      byType: {
        titleDeeds: 1245,
        surveyReports: 876,
        transferDeeds: 654,
        mortgageDocuments: 452,
        other: 200
      }
    },
    blockchainStats: {
      totalBlocks: 8725,
      transactionsToday: 156,
      successRate: "99.8%",
      averageBlockTime: "2.3 minutes",
      networkHealth: "Excellent",
      nodesOnline: 5,
      totalNodes: 5
    },
    performanceStats: {
      averageResponseTime: "1.2 seconds",
      uptime: "99.99%",
      lastBackup: "2025-04-15 00:00:00",
      storageUsed: "1.2 TB",
      storageAvailable: "4.8 TB"
    }
  };

  // Enhanced reports data
  const availableReports = [
    {
      id: 1,
      name: "Monthly Land Registration Report",
      description: "Detailed analysis of land registrations, transfers, and verification statistics",
      lastGenerated: "2025-04-14",
      format: "PDF"
    },
    {
      id: 2,
      name: "User Activity & Compliance Report",
      description: "User engagement metrics and compliance with registration requirements",
      lastGenerated: "2025-04-15",
      format: "PDF/Excel"
    },
    {
      id: 3,
      name: "Blockchain Network Performance",
      description: "Detailed metrics on transaction success rates and network health",
      lastGenerated: "2025-04-15",
      format: "PDF"
    },
    {
      id: 4,
      name: "Document Verification Analytics",
      description: "Analysis of document processing times and verification outcomes",
      lastGenerated: "2025-04-14",
      format: "PDF/Excel"
    },
    {
      id: 5,
      name: "System Security Audit Log",
      description: "Comprehensive security event log and access patterns",
      lastGenerated: "2025-04-15",
      format: "PDF"
    }
  ];

  // Handle user approval/rejection
  const handleUserAction = (action) => {
    console.log(`User ${selectedUser.id} ${action}`);
    setShowApprovalModal(false);
  };
  
  // Open user approval modal
  const openApprovalModal = (user) => {
    setSelectedUser(user);
    setShowApprovalModal(true);
  };

  // Render functions for different dashboard sections
  const renderOverviewDashboard = () => (
    <Card.Body>
      <h5 className="mb-4">System Overview</h5>
      
      <Row>
        <Col md={4}>
          <Card className="mb-3 bg-primary text-white">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h3>{mockSystemStats.userStats.totalUsers}</h3>
                  <div>Total Users</div>
                  <small>+{mockSystemStats.userStats.newUsersThisMonth} this month</small>
                </div>
                <div className="display-4">👥</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-3 bg-success text-white">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h3>{mockSystemStats.landStats.totalLandParcels}</h3>
                  <div>Registered Parcels</div>
                  <small>+{mockSystemStats.landStats.registeredThisMonth} this month</small>
                </div>
                <div className="display-4">🗺️</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-3 bg-info text-white">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h3>{mockSystemStats.documentStats.totalDocuments}</h3>
                  <div>Total Documents</div>
                  <small>{mockSystemStats.documentStats.pendingVerification} pending</small>
                </div>
                <div className="display-4">📄</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>Recent System Activity</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Documents Verified Today</div>
                <Badge bg="success">{mockSystemStats.documentStats.verifiedToday}</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>New Users Today</div>
                <Badge bg="primary">{mockSystemStats.userStats.newUsersToday}</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Blockchain Transactions</div>
                <Badge bg="info">{mockSystemStats.blockchainStats.transactionsToday}</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>System Response Time</div>
                <Badge bg="secondary">{mockSystemStats.performanceStats.averageResponseTime}</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>System Health</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Network Status</div>
                <Badge bg="success">{mockSystemStats.blockchainStats.networkHealth}</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Nodes Online</div>
                <Badge bg="primary">{mockSystemStats.blockchainStats.nodesOnline}/{mockSystemStats.blockchainStats.totalNodes}</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Storage Usage</div>
                <Badge bg="warning">{mockSystemStats.performanceStats.storageUsed} / {mockSystemStats.performanceStats.storageAvailable}</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>System Uptime</div>
                <Badge bg="success">{mockSystemStats.performanceStats.uptime}</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Card.Body>
  );

  const renderReports = () => (
    <Card.Body>
      <h5 className="mb-4">System Reports</h5>
      
      <Row>
        {availableReports.map(report => (
          <Col md={6} key={report.id} className="mb-3">
            <Card>
              <Card.Body>
                <h6>{report.name}</h6>
                <p className="text-muted small mb-2">{report.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Last Generated: {report.lastGenerated}
                    <Badge bg="secondary" className="ms-2">{report.format}</Badge>
                  </small>
                  <Button variant="outline-primary" size="sm">Generate Report</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-4">
        <Card.Header>Custom Report Generator</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Report Type</Form.Label>
                  <Form.Select>
                    <option>User Activity Report</option>
                    <option>Land Registration Analytics</option>
                    <option>Document Verification Statistics</option>
                    <option>Blockchain Performance Metrics</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Date Range</Form.Label>
                  <Form.Select>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                    <option>Custom Range</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Format</Form.Label>
                  <Form.Select>
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary">Generate Custom Report</Button>
          </Form>
        </Card.Body>
      </Card>
    </Card.Body>
  );

  const renderUserManagement = () => (
    <Card.Body>
      <h5 className="mb-4">User Management</h5>
      <Row className="mb-3">
        <Col md={3}>
          <Card className="mb-2 bg-primary text-white">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">Total Users</div>
                  <div className="display-6">{mockSystemStats.userStats.totalUsers}</div>
                </div>
                <div>👥</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-2 bg-success text-white">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">Active Users</div>
                  <div className="display-6">{mockSystemStats.userStats.activeUsers}</div>
                </div>
                <div>✅</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-2 bg-info text-white">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">New Today</div>
                  <div className="display-6">{mockSystemStats.userStats.newUsersToday}</div>
                </div>
                <div>🆕</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-2 bg-secondary text-white">
            <Card.Body>
              <div className="fw-bold mb-1">By Role</div>
              <div className="small">Citizens: {mockSystemStats.userStats.usersByRole.citizens}</div>
              <div className="small">Land Officers: {mockSystemStats.userStats.usersByRole.landOfficers}</div>
              <div className="small">Admins: {mockSystemStats.userStats.usersByRole.administrators}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Badge bg={user.status === 'Active' ? 'success' : 'warning'}>
                  {user.status}
                </Badge>
              </td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={() => openApprovalModal(user)}
                >
                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  );

  const renderSystemSettings = () => (
    <Card.Body>
      <h5 className="mb-4">System & Blockchain Network Settings</h5>
      <Row className="mb-3">
        <Col md={4}>
          <Card className="mb-2">
            <Card.Body>
              <div className="fw-bold mb-1">Blockchain Network</div>
              <div>Status: <Badge bg="success">{mockSystemStats.blockchainStats.networkHealth}</Badge></div>
              <div>Blocks: <span className="fw-bold">{mockSystemStats.blockchainStats.totalBlocks}</span></div>
              <div>Transactions Today: <span className="fw-bold">{mockSystemStats.blockchainStats.transactionsToday}</span></div>
              <div>Success Rate: <span className="fw-bold">{mockSystemStats.blockchainStats.successRate}</span></div>
              <div>Avg Block Time: <span className="fw-bold">{mockSystemStats.blockchainStats.averageBlockTime}</span></div>
              <div>Nodes Online: <span className="fw-bold">{mockSystemStats.blockchainStats.nodesOnline}/{mockSystemStats.blockchainStats.totalNodes}</span></div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-2">
            <Card.Body>
              <div className="fw-bold mb-1">System Performance</div>
              <div>Uptime: <span className="fw-bold">{mockSystemStats.performanceStats.uptime}</span></div>
              <div>Avg Response: <span className="fw-bold">{mockSystemStats.performanceStats.averageResponseTime}</span></div>
              <div>Storage: <span className="fw-bold">{mockSystemStats.performanceStats.storageUsed} / {mockSystemStats.performanceStats.storageAvailable}</span></div>
              <div>Last Backup: <span className="fw-bold">{mockSystemStats.performanceStats.lastBackup}</span></div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-2">
            <Card.Body>
              <div className="fw-bold mb-1">Land Registry</div>
              <div>Total Parcels: <span className="fw-bold">{mockSystemStats.landStats.totalLandParcels}</span></div>
              <div>Pending: <span className="fw-bold">{mockSystemStats.landStats.pendingRegistrations}</span></div>
              <div>Total Area: <span className="fw-bold">{mockSystemStats.landStats.totalArea}</span></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>System Maintenance</Form.Label>
              <Form.Control type="text" placeholder="Enter maintenance mode message" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Backup Schedule</Form.Label>
              <Form.Control type="text" placeholder="Enter backup schedule" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary">Save Settings</Button>
      </Form>
    </Card.Body>
  );

  return (
    <>
      <NavigationBar userRole={user.role} />
      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <h1>Administration Dashboard</h1>
            <p className="lead">System management and administration tools</p>
          </Col>
        </Row>
        
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'dashboard'}
                      onClick={() => setActiveTab('dashboard')}
                    >
                      Dashboard Overview
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'reports'}
                      onClick={() => setActiveTab('reports')}
                    >
                      Reports & Analytics
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'users'}
                      onClick={() => setActiveTab('users')}
                    >
                      User Management
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'settings'}
                      onClick={() => setActiveTab('settings')}
                    >
                      System Settings
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              {activeTab === 'dashboard' && renderOverviewDashboard()}
              {activeTab === 'reports' && renderReports()}
              {activeTab === 'users' && renderUserManagement()}
              {activeTab === 'settings' && renderSystemSettings()}
            </Card>
          </Col>
        </Row>
      </Container>
      
      <Modal show={showApprovalModal} onHide={() => setShowApprovalModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Approve or Reject User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to {selectedUser?.status === 'Active' ? 'deactivate' : 'activate'} this user?</p>
          <p><strong>{selectedUser?.name}</strong> ({selectedUser?.email})</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApprovalModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleUserAction(selectedUser?.status === 'Active' ? 'deactivate' : 'activate')}>
            {selectedUser?.status === 'Active' ? 'Deactivate' : 'Activate'} User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminDashboard;
