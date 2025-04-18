import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role;
  // Roles: 'admin', 'landOfficer', 'citizen'
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">Land Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/land-registry">Land Registry</Nav.Link>
            <Nav.Link as={NavLink} to="/documents">Documents</Nav.Link>
            
            {/* Admin-only menu items */}
            {userRole === 'admin' && (
              <NavDropdown title="Administration" id="admin-dropdown">
                <NavDropdown.Item onClick={() => navigate('/admin')}>Dashboard Overview</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/admin/users')}>User Management</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/admin/reports')}>Reports</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/admin/settings')}>System Settings</NavDropdown.Item>
              </NavDropdown>
            )}
            
            {/* Land officer specific items */}
            {userRole === 'landOfficer' && (
              <NavDropdown title="Officer Tools" id="officer-dropdown">
                <NavDropdown.Item as={Link} to="/officer/verification">Verification Requests</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/officer/pending">Pending Registrations</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          
          <Nav>
            <NavDropdown title="Account" id="account-dropdown">
              <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => {
                logout();
                navigate('/login');
              }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
