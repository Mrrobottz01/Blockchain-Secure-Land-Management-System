import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import NavigationBar from '../NavigationBar';
import { useAuth } from '../../context/AuthContext';
import { MapContainer, TileLayer, Marker, useMapEvents, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in leaflet
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({ iconUrl, shadowUrl: iconShadow });

const DEFAULT_COORDS = { lat: -1.286389, lng: 36.817223 }; // Nairobi default

function LocationSelector({ coordinates, setCoordinates }) {
  useMapEvents({
    click(e) {
      setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return coordinates.lat && coordinates.lng ? (
    <Marker position={[coordinates.lat, coordinates.lng]} />
  ) : null;
}

const LandRegistryInterface = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [newLand, setNewLand] = useState({
    parcelId: '',
    location: '',
    area: '',
    owner: '',
    coordinates: { lat: '', lng: '' },
  });

  // Mock data for demonstration - this would come from your API
  const mockLandRecords = [
    { id: '1', parcelId: 'P1001', location: 'Nairobi, Block 4', area: '2.5 acres', owner: 'John Doe', status: 'Registered', registrationDate: '2025-01-15' },
    { id: '2', parcelId: 'P1002', location: 'Mombasa, Plot 72', area: '1.8 acres', owner: 'Jane Smith', status: 'Pending', registrationDate: '2025-03-21' },
    { id: '3', parcelId: 'P1003', location: 'Kisumu, Sector 8', area: '3.2 acres', owner: 'Robert Johnson', status: 'Registered', registrationDate: '2024-11-10' },
  ];

  // Mock polygon data for demonstration (replace with real data from API as needed)
  const mockLandPolygons = {
    'P1001': [
      [-1.285, 36.816],
      [-1.285, 36.818],
      [-1.287, 36.818],
      [-1.287, 36.816],
    ],
    'P1002': [
      [-4.043, 39.668],
      [-4.043, 39.670],
      [-4.045, 39.670],
      [-4.045, 39.668],
    ],
    'P1003': [
      [-0.091, 34.767],
      [-0.091, 34.769],
      [-0.093, 34.769],
      [-0.093, 34.767],
    ],
  };

  // Filter records based on search term
  const filteredRecords = mockLandRecords.filter(record => 
    record.parcelId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers for modals
  const handleOpenRegister = () => setShowRegisterModal(true);
  const handleCloseRegister = () => setShowRegisterModal(false);
  const handleOpenView = (record) => {
    setSelectedRecord(record);
    setShowViewModal(true);
  };
  const handleCloseView = () => setShowViewModal(false);

  // For manual coordinate entry
  const handleCoordChange = (e) => {
    const { name, value } = e.target;
    setNewLand({
      ...newLand,
      coordinates: {
        ...newLand.coordinates,
        [name]: value,
      },
    });
  };

  return (
    <>
      <NavigationBar userRole={user.role} />
      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <h1>Land Registry</h1>
            <p className="lead">Search, view, and manage land registry records</p>
          </Col>
        </Row>
        
        {/* Search and filter section */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <InputGroup>
                      <Form.Control 
                        type="text" 
                        placeholder="Search by Parcel ID, Location, or Owner" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button variant="primary">Search</Button>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Land records table */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Land Records</span>
                  {user.role !== 'citizen' && (
                    <Button variant="success" size="sm" onClick={handleOpenRegister}>+ Register New Land</Button>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Parcel ID</th>
                      <th>Location</th>
                      <th>Area</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map(record => (
                        <tr key={record.id}>
                          <td>{record.parcelId}</td>
                          <td>{record.location}</td>
                          <td>{record.area}</td>
                          <td>{record.owner}</td>
                          <td>
                            <span className={`badge bg-${record.status === 'Registered' ? 'success' : 'warning'}`}>
                              {record.status}
                            </span>
                          </td>
                          <td>{record.registrationDate}</td>
                          <td>
                            <Button variant="info" size="sm" className="me-1" onClick={() => handleOpenView(record)}>View</Button>
                            {user.role !== 'citizen' && (
                              <Button variant="warning" size="sm">Edit</Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No records found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Register New Land Modal */}
      <Modal show={showRegisterModal} onHide={handleCloseRegister} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Register New Land Parcel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Parcel ID</Form.Label>
                  <Form.Control type="text" value={newLand.parcelId} onChange={e => setNewLand({ ...newLand, parcelId: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" value={newLand.location} onChange={e => setNewLand({ ...newLand, location: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Area</Form.Label>
                  <Form.Control type="text" value={newLand.area} onChange={e => setNewLand({ ...newLand, area: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Owner</Form.Label>
                  <Form.Control type="text" value={newLand.owner} onChange={e => setNewLand({ ...newLand, owner: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control type="number" step="any" name="lat" value={newLand.coordinates.lat} onChange={handleCoordChange} placeholder="Latitude" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control type="number" step="any" name="lng" value={newLand.coordinates.lng} onChange={handleCoordChange} placeholder="Longitude" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pick Coordinates on Map</Form.Label>
                  <div style={{ width: '100%', height: '250px' }}>
                    <MapContainer
                      center={newLand.coordinates.lat && newLand.coordinates.lng ? [parseFloat(newLand.coordinates.lat), parseFloat(newLand.coordinates.lng)] : [DEFAULT_COORDS.lat, DEFAULT_COORDS.lng]}
                      zoom={13}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationSelector coordinates={newLand.coordinates} setCoordinates={coords => setNewLand({ ...newLand, coordinates: coords })} />
                    </MapContainer>
                  </div>
                  <div className="small text-muted mt-1">Click on the map or enter coordinates manually.</div>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">Register Land</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Land Details Modal */}
      <Modal show={showViewModal} onHide={handleCloseView} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Land Parcel Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRecord && (
            <>
              <Row>
                <Col md={6}>
                  <p><strong>Parcel ID:</strong> {selectedRecord.parcelId}</p>
                  <p><strong>Location:</strong> {selectedRecord.location}</p>
                  <p><strong>Area:</strong> {selectedRecord.area}</p>
                  <p><strong>Owner:</strong> {selectedRecord.owner}</p>
                  <p><strong>Status:</strong> {selectedRecord.status}</p>
                  <p><strong>Registration Date:</strong> {selectedRecord.registrationDate}</p>
                </Col>
                <Col md={6}>
                  <div className="mb-2"><strong>Coordinates:</strong> Lat: {selectedRecord.coordinates?.lat || '--'} | Lng: {selectedRecord.coordinates?.lng || '--'}</div>
                  <div style={{ width: '100%', height: '250px' }}>
                    <MapContainer
                      center={selectedRecord.coordinates?.lat && selectedRecord.coordinates?.lng ? [parseFloat(selectedRecord.coordinates.lat), parseFloat(selectedRecord.coordinates.lng)] : [DEFAULT_COORDS.lat, DEFAULT_COORDS.lng]}
                      zoom={13}
                      style={{ width: '100%', height: '100%' }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {selectedRecord.coordinates?.lat && selectedRecord.coordinates?.lng && (
                        <Marker position={[parseFloat(selectedRecord.coordinates.lat), parseFloat(selectedRecord.coordinates.lng)]} />
                      )}
                      {/* Show polygon if available */}
                      {mockLandPolygons[selectedRecord.parcelId] && (
                        <Polygon 
                          positions={mockLandPolygons[selectedRecord.parcelId]} 
                          color="blue"
                          eventHandlers={{
                            click: (e) => {
                              if (e.target && e.target.openPopup) {
                                e.target.openPopup();
                              }
                            },
                          }}
                        >
                          <Popup>
                            <div>
                              <strong>Owner:</strong> {selectedRecord.owner}<br />
                              <strong>Location:</strong> {selectedRecord.location}<br />
                              <strong>Area:</strong> {selectedRecord.area}
                            </div>
                          </Popup>
                        </Polygon>
                      )}
                    </MapContainer>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LandRegistryInterface;
