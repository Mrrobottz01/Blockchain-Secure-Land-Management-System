import React, { useState } from 'react';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';

const RegistrationFormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    idNumber: '',
    role: 'citizen' // Default role
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      // This would be replaced with actual API call
      console.log('Registration attempt with:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess('Registration successful! You can now login.');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        idNumber: '',
        role: 'citizen'
      });
      
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 mb-5">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Register for Land Management System</h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="idNumber">
                  <Form.Label>National ID Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="idNumber"
                    placeholder="Enter national ID number"
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="8"
                      />
                      <Form.Text className="text-muted">
                        Password must be at least 8 characters
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="role">
                  <Form.Label>Account Type</Form.Label>
                  <Form.Select 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="citizen">Citizen</option>
                    <option value="landOfficer">Land Officer</option>
                    {/* Admin accounts would typically be created by existing admins */}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Note: Land Officer accounts require verification by administrators
                  </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2 mt-4">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="text-center">
                Already have an account? <a href="/login">Login</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationFormComponent;
