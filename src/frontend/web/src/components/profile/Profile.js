import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import NavigationBar from '../NavigationBar';
import { useAuth } from '../../context/AuthContext';

const ProfileComponent = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    address: user.address || ''
  });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This would be replaced with actual API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to update profile. Please try again.' });
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">My Profile</h5>
                <Button 
                  variant={isEditing ? "secondary" : "primary"} 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Card.Header>
              <Card.Body>
                {message && (
                  <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
                    {message.text}
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter address"
                    />
                  </Form.Group>

                  {isEditing && (
                    <Button variant="success" type="submit">
                      Save Changes
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileComponent;
