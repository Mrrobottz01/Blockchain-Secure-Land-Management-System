import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import NavigationBar from '../NavigationBar';
import { useAuth } from '../../context/AuthContext';

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      // This would be replaced with actual blockchain verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate verification result
      setVerificationResult({
        isValid: true,
        details: {
          id: certificateId,
          issueDate: '2025-04-15',
          landParcel: 'Plot 1001',
          owner: 'John Doe',
          issuer: 'Land Registry Office'
        }
      });
    } catch (error) {
      setVerificationResult({
        isValid: false,
        error: 'Certificate verification failed. Please check the ID and try again.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow">
              <Card.Header as="h5">Verify Land Certificate</Card.Header>
              <Card.Body>
                <Form onSubmit={handleVerify}>
                  <Form.Group className="mb-3">
                    <Form.Label>Certificate ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      placeholder="Enter certificate ID"
                      required
                    />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isVerifying || !certificateId}
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Certificate'}
                  </Button>
                </Form>

                {verificationResult && (
                  <div className="mt-4">
                    {verificationResult.isValid ? (
                      <>
                        <Alert variant="success">
                          Certificate is valid and verified on the blockchain
                        </Alert>
                        <Card>
                          <Card.Body>
                            <h6>Certificate Details</h6>
                            <p><strong>ID:</strong> {verificationResult.details.id}</p>
                            <p><strong>Issue Date:</strong> {verificationResult.details.issueDate}</p>
                            <p><strong>Land Parcel:</strong> {verificationResult.details.landParcel}</p>
                            <p><strong>Owner:</strong> {verificationResult.details.owner}</p>
                            <p><strong>Issuer:</strong> {verificationResult.details.issuer}</p>
                          </Card.Body>
                        </Card>
                      </>
                    ) : (
                      <Alert variant="danger">
                        {verificationResult.error}
                      </Alert>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VerifyCertificate;
