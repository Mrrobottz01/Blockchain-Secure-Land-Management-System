import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge } from 'react-bootstrap';
import NavigationBar from '../NavigationBar';
import { useAuth } from '../../context/AuthContext';

const DocumentManagement = () => {
  const { user } = useAuth();
  // State for document upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // State for document filter
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock data for demonstration - would come from your API
  const mockDocuments = [
    { 
      id: '1', 
      name: 'Land Title Deed - Plot 1001', 
      type: 'Title Deed', 
      uploadDate: '2025-02-15', 
      status: 'Verified', 
      size: '1.2 MB',
      parcelId: 'P1001',
      blockchainHash: '0xf7c8a87d5285f85e8d396d688d2f89c27b923864b69214f19c7ca2b87e42186f'
    },
    { 
      id: '2', 
      name: 'Survey Certificate - Mombasa Plot', 
      type: 'Survey', 
      uploadDate: '2025-01-22', 
      status: 'Pending', 
      size: '3.4 MB',
      parcelId: 'P1002',
      blockchainHash: '0x4a87f4e18b2fcf2ba37d1b6dd389594d4c4226be5f2e2f2f2a2f208025179821'
    },
    { 
      id: '3', 
      name: 'Transfer Agreement - John to Alice', 
      type: 'Transfer', 
      uploadDate: '2025-03-10', 
      status: 'Rejected', 
      size: '0.8 MB',
      parcelId: 'P1003',
      blockchainHash: '0x7b232f4e1f1c5a2b8f3d6e7a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c'
    },
  ];
  
  // Filter documents based on status
  const filteredDocuments = filterStatus === 'all' 
    ? mockDocuments 
    : mockDocuments.filter(doc => doc.status.toLowerCase() === filterStatus.toLowerCase());
  
  // Handle document upload
  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // This would be an actual API call to upload the document to IPFS and register on blockchain
      console.log('Uploading document:', {
        file: fileSelected,
        type: documentType,
        description: documentDescription
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Close modal and reset form
      setShowUploadModal(false);
      setFileSelected(null);
      setDocumentType('');
      setDocumentDescription('');
      
      // In a real app, we would refresh the documents list here
      
    } catch (error) {
      console.error('Upload error:', error);
      // Handle error (show message, etc)
    } finally {
      setUploading(false);
    }
  };
  
  // Get badge variant based on document status
  const getStatusBadgeVariant = (status) => {
    switch(status.toLowerCase()) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <>
      <NavigationBar userRole={user.role} />
      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <h1>Document Management</h1>
            <p className="lead">Securely store, verify, and manage your land-related documents</p>
          </Col>
        </Row>
        
        {/* Filter and upload controls */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <Form>
                  <Form.Group>
                    <Form.Label>Filter by status:</Form.Label>
                    <Form.Select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      style={{ width: '200px' }}
                    >
                      <option value="all">All Documents</option>
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
                
                <Button 
                  variant="primary"
                  onClick={() => setShowUploadModal(true)}
                >
                  <i className="bi bi-upload me-2"></i>
                  Upload New Document
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Documents table */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Your Documents</span>
                </div>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Document Name</th>
                      <th>Type</th>
                      <th>Date Uploaded</th>
                      <th>Status</th>
                      <th>Size</th>
                      <th>Related Parcel</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map(doc => (
                        <tr key={doc.id}>
                          <td>{doc.name}</td>
                          <td>{doc.type}</td>
                          <td>{doc.uploadDate}</td>
                          <td>
                            <Badge bg={getStatusBadgeVariant(doc.status)}>
                              {doc.status}
                            </Badge>
                          </td>
                          <td>{doc.size}</td>
                          <td>{doc.parcelId}</td>
                          <td>
                            <Button variant="info" size="sm" className="me-1">View</Button>
                            <Button variant="secondary" size="sm" className="me-1">
                              <i className="bi bi-link-45deg"></i> Copy Link
                            </Button>
                            {doc.status !== 'Verified' && (
                              <Button variant="danger" size="sm">Delete</Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No documents found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer className="text-muted">
                <small>
                  Documents are stored on IPFS and references are secured on blockchain. 
                  Verified documents cannot be modified or deleted.
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        
        {/* Blockchain verification info */}
        <Row className="mt-4">
          <Col>
            <Card className="bg-light">
              <Card.Body>
                <h5>Blockchain Verification</h5>
                <p className="mb-0">
                  All documents in this system are securely stored on IPFS and verified on blockchain.
                  Each document receives a unique hash that proves authenticity and prevents tampering.
                  Verified documents are immutable and provide permanent proof of land ownership and transactions.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Document Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDocumentUpload}>
            <Form.Group className="mb-3">
              <Form.Label>Document Type</Form.Label>
              <Form.Select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                required
              >
                <option value="">Select document type</option>
                <option value="Title Deed">Title Deed</option>
                <option value="Survey">Survey Certificate</option>
                <option value="Transfer">Transfer Agreement</option>
                <option value="ID">Identification Document</option>
                <option value="Other">Other Document</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Document Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Brief description of this document"
                value={documentDescription}
                onChange={(e) => setDocumentDescription(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Related Parcel ID (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter parcel ID if applicable"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Upload Document</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFileSelected(e.target.files[0])}
                required
              />
              <Form.Text className="text-muted">
                Supported formats: PDF, JPG, PNG (max 10MB)
              </Form.Text>
            </Form.Group>
            
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Document'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DocumentManagement;
