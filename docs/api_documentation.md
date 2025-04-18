# API Documentation for Blockchain-Based Land Management System

## Overview

This document outlines the REST API endpoints provided by the backend server of the blockchain-based land management system. The API serves as the interface between the frontend client applications and the blockchain infrastructure, providing secure and authenticated access to land records, user management, and transaction processing.

## Base URL

```
https://api.landregistry.example.com/v1
```

## Authentication

### Authentication Endpoints

#### Register User

```
POST /auth/register
```

Creates a new user account in the system.

**Request Body:**
```json
{
  "national_id": "123456789",
  "full_name": "John Doe",
  "phone": "+255712345678",
  "email": "john.doe@example.com",
  "address": "123 Main St, Dar es Salaam",
  "password": "SecurePassword123",
  "user_type": "landowner"  // Options: landowner, official, surveyor, admin
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Status Codes:**
- 201: Created
- 400: Bad Request
- 409: Conflict (User already exists)

#### Login

```
POST /auth/login
```

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "user_type": "landowner",
    "email": "john.doe@example.com"
  }
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 404: Not Found

#### Refresh Token

```
POST /auth/refresh
```

Refreshes an expired JWT token using a refresh token.

**Request Headers:**
```
Authorization: Bearer [refresh_token]
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized

#### Logout

```
POST /auth/logout
```

Invalidates the current user's token.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Response:**
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized

## User Management

All endpoints in this section require authentication.

#### Get User Profile

```
GET /users/profile
```

Retrieves the profile information of the authenticated user.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "national_id": "123456789",
  "full_name": "John Doe",
  "phone": "+255712345678",
  "email": "john.doe@example.com",
  "address": "123 Main St, Dar es Salaam",
  "user_type": "landowner",
  "created_at": "2025-01-15T10:30:00Z"
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 404: Not Found

#### Update User Profile

```
PUT /users/profile
```

Updates the profile information of the authenticated user.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Request Body:**
```json
{
  "phone": "+255787654321",
  "address": "456 New St, Dar es Salaam",
  "email": "john.new@example.com"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "user": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "phone": "+255787654321",
    "address": "456 New St, Dar es Salaam",
    "email": "john.new@example.com",
    "updated_at": "2025-04-15T14:30:00Z"
  }
}
```

**Status Codes:**
- 200: OK
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found

#### Change Password

```
PUT /users/change-password
```

Changes the password of the authenticated user.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Request Body:**
```json
{
  "current_password": "SecurePassword123",
  "new_password": "EvenMoreSecure456"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Password changed successfully"
}
```

**Status Codes:**
- 200: OK
- 400: Bad Request
- 401: Unauthorized

## Land Parcel Management

#### Get All Land Parcels

```
GET /parcels
```

Retrieves a list of land parcels based on query parameters. For officials, it shows all parcels; for landowners, it shows only their parcels.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10)
- `status` (optional): Filter by status (active, pending, disputed, etc.)
- `location` (optional): Filter by location coordinates
- `owner_id` (optional): Filter by owner ID (admin/official only)

**Response:**
```json
{
  "total": 42,
  "page": 1,
  "limit": 10,
  "parcels": [
    {
      "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
      "owner": {
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "full_name": "John Doe"
      },
      "location_data": {
        "latitude": -6.776012,
        "longitude": 39.178326,
        "region": "Dar es Salaam",
        "district": "Kinondoni"
      },
      "area": 2500,
      "parcel_type": "residential",
      "status": "active",
      "blockchain_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "created_at": "2025-01-10T09:00:00Z"
    },
    // More parcels...
  ]
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden

#### Get Land Parcel Details

```
GET /parcels/{parcel_id}
```

Retrieves detailed information about a specific land parcel.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `parcel_id`: The unique identifier of the land parcel

**Response:**
```json
{
  "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
  "owner": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "national_id": "123456789",
    "contact": "+255712345678"
  },
  "location_data": {
    "latitude": -6.776012,
    "longitude": 39.178326,
    "region": "Dar es Salaam",
    "district": "Kinondoni",
    "ward": "Msasani",
    "street": "Beach Road"
  },
  "area": 2500,
  "boundaries": [
    {"latitude": -6.775012, "longitude": 39.177326},
    {"latitude": -6.775012, "longitude": 39.179326},
    {"latitude": -6.777012, "longitude": 39.179326},
    {"latitude": -6.777012, "longitude": 39.177326}
  ],
  "parcel_type": "residential",
  "status": "active",
  "blockchain_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "blockchain_verification": {
    "verified": true,
    "timestamp": "2025-01-10T09:05:23Z",
    "node_count": 15
  },
  "created_at": "2025-01-10T09:00:00Z",
  "updated_at": "2025-01-10T09:00:00Z"
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

#### Register New Land Parcel

```
POST /parcels
```

Registers a new land parcel in the system (officials only).

**Request Headers:**
```
Authorization: Bearer [token]
```

**Request Body:**
```json
{
  "owner_id": "550e8400-e29b-41d4-a716-446655440000",
  "location_data": {
    "latitude": -6.776012,
    "longitude": 39.178326,
    "region": "Dar es Salaam",
    "district": "Kinondoni",
    "ward": "Msasani",
    "street": "Beach Road"
  },
  "area": 2500,
  "boundaries": [
    {"latitude": -6.775012, "longitude": 39.177326},
    {"latitude": -6.775012, "longitude": 39.179326},
    {"latitude": -6.777012, "longitude": 39.179326},
    {"latitude": -6.777012, "longitude": 39.177326}
  ],
  "parcel_type": "residential"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Land parcel registered successfully",
  "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
  "blockchain_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "blockchain_transaction": {
    "tx_id": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "timestamp": "2025-04-15T15:30:00Z",
    "status": "confirmed"
  }
}
```

**Status Codes:**
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden

#### Update Land Parcel

```
PUT /parcels/{parcel_id}
```

Updates information about a land parcel (officials only).

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `parcel_id`: The unique identifier of the land parcel

**Request Body:**
```json
{
  "location_data": {
    "ward": "New Msasani",
    "street": "Updated Beach Road"
  },
  "area": 2600,
  "status": "pending"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Land parcel updated successfully",
  "blockchain_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "blockchain_transaction": {
    "tx_id": "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    "timestamp": "2025-04-15T16:15:00Z",
    "status": "confirmed"
  }
}
```

**Status Codes:**
- 200: OK
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

## Certificates

#### Get All Certificates

```
GET /certificates
```

Retrieves a list of land certificates based on query parameters.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10)
- `parcel_id` (optional): Filter by parcel ID
- `status` (optional): Filter by status (active, revoked, expired)

**Response:**
```json
{
  "total": 25,
  "page": 1,
  "limit": 10,
  "certificates": [
    {
      "certificate_id": "550e8400-e29b-41d4-a716-446655440002",
      "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
      "owner": {
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "full_name": "John Doe"
      },
      "issue_date": "2025-01-15T12:00:00Z",
      "expiry_date": "2055-01-15T12:00:00Z",
      "status": "active",
      "blockchain_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "ipfs_document_hash": "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ"
    },
    // More certificates...
  ]
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden

#### Get Certificate Details

```
GET /certificates/{certificate_id}
```

Retrieves detailed information about a specific certificate.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `certificate_id`: The unique identifier of the certificate

**Response:**
```json
{
  "certificate_id": "550e8400-e29b-41d4-a716-446655440002",
  "parcel": {
    "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
    "location_data": {
      "region": "Dar es Salaam",
      "district": "Kinondoni"
    },
    "area": 2500
  },
  "owner": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "national_id": "123456789"
  },
  "issue_date": "2025-01-15T12:00:00Z",
  "expiry_date": "2055-01-15T12:00:00Z",
  "issuer": {
    "user_id": "550e8400-e29b-41d4-a716-446655441111",
    "full_name": "Jane Smith",
    "title": "Land Registrar"
  },
  "status": "active",
  "blockchain_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "blockchain_verification": {
    "verified": true,
    "timestamp": "2025-01-15T12:05:41Z",
    "node_count": 18
  },
  "ipfs_document_hash": "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ",
  "created_at": "2025-01-15T12:00:00Z",
  "updated_at": "2025-01-15T12:00:00Z"
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

#### Issue Certificate

```
POST /certificates
```

Issues a new land certificate for a parcel (officials only).

**Request Headers:**
```
Authorization: Bearer [token]
```

**Request Body:**
```json
{
  "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
  "expiry_date": "2055-01-15T12:00:00Z",
  "certificate_data": {
    "rights_description": "Full ownership rights",
    "restrictions": "No commercial development"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Certificate issued successfully",
  "certificate_id": "550e8400-e29b-41d4-a716-446655440002",
  "blockchain_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "ipfs_document_hash": "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ",
  "blockchain_transaction": {
    "tx_id": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "timestamp": "2025-04-15T17:45:00Z",
    "status": "confirmed"
  },
  "document_url": "/api/v1/documents/QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ"
}
```

**Status Codes:**
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found (If parcel doesn't exist)

#### Revoke Certificate

```
PUT /certificates/{certificate_id}/revoke
```

Revokes a land certificate (officials only).

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `certificate_id`: The unique identifier of the certificate

**Request Body:**
```json
{
  "reason": "Fraudulent documentation",
  "notes": "Investigation revealed forged ownership documents"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Certificate revoked successfully",
  "blockchain_transaction": {
    "tx_id": "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    "timestamp": "2025-04-15T18:20:00Z",
    "status": "confirmed"
  }
}
```

**Status Codes:**
- 200: OK
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

## Transactions (Land Transfers)

#### Get All Transactions

```
GET /transactions
```

Retrieves a list of land transfer transactions based on query parameters.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10)
- `parcel_id` (optional): Filter by parcel ID
- `status` (optional): Filter by status (pending, completed, rejected)
- `from_user` (optional): Filter by previous owner ID
- `to_user` (optional): Filter by new owner ID
- `txn_type` (optional): Filter by transaction type (sale, inheritance, gift)

**Response:**
```json
{
  "total": 18,
  "page": 1,
  "limit": 10,
  "transactions": [
    {
      "txn_id": "550e8400-e29b-41d4-a716-446655440003",
      "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
      "from_user": {
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "full_name": "John Doe"
      },
      "to_user": {
        "user_id": "550e8400-e29b-41d4-a716-446655442222",
        "full_name": "Alice Johnson"
      },
      "txn_type": "sale",
      "amount": 150000000,
      "status": "completed",
      "blockchain_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      "created_at": "2025-02-20T14:30:00Z"
    },
    // More transactions...
  ]
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden

#### Get Transaction Details

```
GET /transactions/{txn_id}
```

Retrieves detailed information about a specific transaction.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `txn_id`: The unique identifier of the transaction

**Response:**
```json
{
  "txn_id": "550e8400-e29b-41d4-a716-446655440003",
  "parcel": {
    "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
    "location_data": {
      "region": "Dar es Salaam",
      "district": "Kinondoni"
    },
    "area": 2500
  },
  "from_user": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "national_id": "123456789"
  },
  "to_user": {
    "user_id": "550e8400-e29b-41d4-a716-446655442222",
    "full_name": "Alice Johnson",
    "national_id": "987654321"
  },
  "txn_type": "sale",
  "amount": 150000000,
  "status": "completed",
  "payment": {
    "payment_id": "550e8400-e29b-41d4-a716-446655443333",
    "method": "bank",
    "reference_no": "BANK123456",
    "receipt_no": "RCT987654",
    "status": "completed"
  },
  "documents": [
    {
      "document_id": "550e8400-e29b-41d4-a716-446655444444",
      "document_type": "sale_agreement",
      "document_name": "Sale Agreement.pdf",
      "ipfs_hash": "QmT9qk3CRYbFDWpDFYeAv8T8H1gnongwKhh5J68NLkLir6",
      "uploaded_by": "550e8400-e29b-41d4-a716-446655440000",
      "upload_date": "2025-02-20T13:45:00Z"
    },
    {
      "document_id": "550e8400-e29b-41d4-a716-446655444445",
      "document_type": "id_verification",
      "document_name": "ID Verification.pdf",
      "ipfs_hash": "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsaBCD",
      "uploaded_by": "550e8400-e29b-41d4-a716-446655442222",
      "upload_date": "2025-02-20T14:00:00Z"
    }
  ],
  "blockchain_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "blockchain_verification": {
    "verified": true,
    "timestamp": "2025-02-20T14:35:12Z",
    "node_count": 17
  },
  "ipfs_docs_hash": "QmT9qk3CRYbFDWpDFYeAv8T8H1gnongwKhh5J68NLkLir6",
  "created_at": "2025-02-20T14:30:00Z",
  "updated_at": "2025-02-20T14:30:00Z",
  "completed_at": "2025-02-20T15:45:00Z"
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

#### Initiate Transaction

```
POST /transactions
```

Initiates a new land transfer transaction.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Request Body:**
```json
{
  "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
  "to_user_id": "550e8400-e29b-41d4-a716-446655442222",
  "txn_type": "sale",
  "amount": 150000000
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Transaction initiated successfully",
  "txn_id": "550e8400-e29b-41d4-a716-446655440003",
  "next_steps": [
    {
      "step": "Upload required documents",
      "endpoint": "/api/v1/documents/upload",
      "required_documents": [
        "sale_agreement",
        "id_verification",
        "tax_clearance"
      ]
    },
    {
      "step": "Process payment",
      "endpoint": "/api/v1/payments/create"
    }
  ]
}
```

**Status Codes:**
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found (If parcel or user doesn't exist)

#### Approve Transaction

```
PUT /transactions/{txn_id}/approve
```

Approves a land transfer transaction (officials only).

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `txn_id`: The unique identifier of the transaction

**Request Body:**
```json
{
  "notes": "All documentation validated and payment confirmed"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Transaction approved successfully",
  "blockchain_transaction": {
    "tx_id": "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    "timestamp": "2025-04-15T19:10:00Z",
    "status": "confirmed"
  },
  "new_certificate_id": "550e8400-e29b-41d4-a716-446655440004"
}
```

**Status Codes:**
- 200: OK
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

#### Reject Transaction

```
PUT /transactions/{txn_id}/reject
```

Rejects a land transfer transaction (officials only).

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `txn_id`: The unique identifier of the transaction

**Request Body:**
```json
{
  "reason": "Incomplete documentation",
  "notes": "Missing tax clearance certificate"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Transaction rejected successfully"
}
```

**Status Codes:**
- 200: OK
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

## Documents

#### Upload Document

```
POST /documents/upload
```

Uploads a document to IPFS and registers it in the system.

**Request Headers:**
```
Authorization: Bearer [token]
Content-Type: multipart/form-data
```

**Form Data:**
- `document`: The document file
- `document_type`: Type of the document (deed, survey, transfer, id, etc.)
- `document_name`: Name of the document
- `document_desc` (optional): Description of the document
- `related_entity_type` (optional): Type of entity the document relates to (parcel, certificate, transaction)
- `related_entity_id` (optional): ID of the entity the document relates to

**Response:**
```json
{
  "status": "success",
  "message": "Document uploaded successfully",
  "document_id": "550e8400-e29b-41d4-a716-446655444444",
  "ipfs_hash": "QmT9qk3CRYbFDWpDFYeAv8T8H1gnongwKhh5J68NLkLir6",
  "blockchain_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "document_url": "/api/v1/documents/QmT9qk3CRYbFDWpDFYeAv8T8H1gnongwKhh5J68NLkLir6"
}
```

**Status Codes:**
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 413: Payload Too Large

#### Get Document

```
GET /documents/{ipfs_hash}
```

Retrieves a document by its IPFS hash.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `ipfs_hash`: The IPFS hash of the document

**Response:**
The actual document file with appropriate Content-Type header.

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

#### Get Document Metadata

```
GET /documents/{ipfs_hash}/metadata
```

Retrieves metadata about a document.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `ipfs_hash`: The IPFS hash of the document

**Response:**
```json
{
  "document_id": "550e8400-e29b-41d4-a716-446655444444",
  "document_type": "sale_agreement",
  "document_name": "Sale Agreement.pdf",
  "document_desc": "Sale agreement for parcel #550e8400-e29b-41d4-a716-446655440001",
  "ipfs_hash": "QmT9qk3CRYbFDWpDFYeAv8T8H1gnongwKhh5J68NLkLir6",
  "blockchain_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "blockchain_verification": {
    "verified": true,
    "timestamp": "2025-02-20T13:50:35Z",
    "node_count": 16
  },
  "upload_date": "2025-02-20T13:45:00Z",
  "uploaded_by": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe"
  },
  "related_entity": {
    "type": "transaction",
    "id": "550e8400-e29b-41d4-a716-446655440003"
  },
  "status": "active"
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

## Disputes

#### File Dispute

```
POST /disputes
```

Files a new land dispute.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Request Body:**
```json
{
  "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
  "respondent_id": "550e8400-e29b-41d4-a716-446655440000",
  "dispute_type": "boundary",
  "description": "The neighbor has encroached on my land by building a fence 2 meters inside my property line"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Dispute filed successfully",
  "dispute_id": "550e8400-e29b-41d4-a716-446655445555",
  "blockchain_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "next_steps": [
    {
      "step": "Upload supporting documents",
      "endpoint": "/api/v1/documents/upload",
      "required_documents": [
        "property_survey",
        "photographic_evidence"
      ]
    }
  ]
}
```

**Status Codes:**
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found (If parcel or user doesn't exist)

#### Get All Disputes

```
GET /disputes
```

Retrieves a list of disputes based on query parameters.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10)
- `parcel_id` (optional): Filter by parcel ID
- `status` (optional): Filter by status (filed, reviewing, resolved, closed)
- `complainant_id` (optional): Filter by complainant ID
- `respondent_id` (optional): Filter by respondent ID

**Response:**
```json
{
  "total": 5,
  "page": 1,
  "limit": 10,
  "disputes": [
    {
      "dispute_id": "550e8400-e29b-41d4-a716-446655445555",
      "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
      "complainant": {
        "user_id": "550e8400-e29b-41d4-a716-446655442222",
        "full_name": "Alice Johnson"
      },
      "respondent": {
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "full_name": "John Doe"
      },
      "dispute_type": "boundary",
      "status": "reviewing",
      "created_at": "2025-03-10T10:30:00Z"
    },
    // More disputes...
  ]
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden

#### Get Dispute Details

```
GET /disputes/{dispute_id}
```

Retrieves detailed information about a specific dispute.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `dispute_id`: The unique identifier of the dispute

**Response:**
```json
{
  "dispute_id": "550e8400-e29b-41d4-a716-446655445555",
  "parcel": {
    "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
    "location_data": {
      "region": "Dar es Salaam",
      "district": "Kinondoni"
    },
    "area": 2500
  },
  "complainant": {
    "user_id": "550e8400-e29b-41d4-a716-446655442222",
    "full_name": "Alice Johnson",
    "national_id": "987654321"
  },
  "respondent": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "national_id": "123456789"
  },
  "dispute_type": "boundary",
  "description": "The neighbor has encroached on my land by building a fence 2 meters inside my property line",
  "status": "reviewing",
  "documents": [
    {
      "document_id": "550e8400-e29b-41d4-a716-446655444446",
      "document_type": "property_survey",
      "document_name": "Property Survey.pdf",
      "ipfs_hash": "QmT9qk3CRYbFDWpDFYeAv8T8H1gnongwKhh5J68NLkLWXZ",
      "uploaded_by": "550e8400-e29b-41d4-a716-446655442222",
      "upload_date": "2025-03-10T11:15:00Z"
    }
  ],
  "blockchain_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "created_at": "2025-03-10T10:30:00Z",
  "updated_at": "2025-03-10T10:30:00Z"
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

#### Update Dispute Status

```
PUT /disputes/{dispute_id}
```

Updates the status of a dispute (officials only).

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `dispute_id`: The unique identifier of the dispute

**Request Body:**
```json
{
  "status": "resolved",
  "resolution": "After surveying the property, it was determined that the fence is indeed encroaching on the complainant's land. The respondent has agreed to relocate the fence to the correct boundary line within 30 days."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Dispute status updated successfully",
  "blockchain_transaction": {
    "tx_id": "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    "timestamp": "2025-04-15T20:00:00Z",
    "status": "confirmed"
  }
}
```

**Status Codes:**
- 200: OK
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

## Payments

#### Create Payment

```
POST /payments
```

Creates a new payment record for a transaction.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Request Body:**
```json
{
  "txn_id": "550e8400-e29b-41d4-a716-446655440003",
  "amount": 150000000,
  "payment_method": "bank",
  "reference_no": "BANK123456"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Payment recorded successfully",
  "payment_id": "550e8400-e29b-41d4-a716-446655443333",
  "receipt_no": "RCT987654"
}
```

**Status Codes:**
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found (If transaction doesn't exist)

#### Get Payment Details

```
GET /payments/{payment_id}
```

Retrieves detailed information about a specific payment.

**Request Headers:**
```
Authorization: Bearer [token]
```

**Path Parameters:**
- `payment_id`: The unique identifier of the payment

**Response:**
```json
{
  "payment_id": "550e8400-e29b-41d4-a716-446655443333",
  "transaction": {
    "txn_id": "550e8400-e29b-41d4-a716-446655440003",
    "parcel_id": "550e8400-e29b-41d4-a716-446655440001",
    "txn_type": "sale"
  },
  "amount": 150000000,
  "payment_method": "bank",
  "reference_no": "BANK123456",
  "receipt_no": "RCT987654",
  "status": "completed",
  "created_at": "2025-02-20T15:00:00Z",
  "updated_at": "2025-02-20T15:15:00Z"
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

## Verification

#### Verify Blockchain Record

```
POST /verify/blockchain
```

Verifies a record on the blockchain.

**Request Body:**
```json
{
  "blockchain_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "entity_type": "certificate"
}
```

**Response:**
```json
{
  "verified": true,
  "entity_type": "certificate",
  "blockchain_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "timestamp": "2025-01-15T12:05:41Z",
  "node_count": 18,
  "consensus_percentage": 100
}
```

**Status Codes:**
- 200: OK
- 400: Bad Request
- 404: Not Found

#### Verify IPFS Document

```
POST /verify/ipfs
```

Verifies a document on IPFS.

**Request Body:**
```json
{
  "ipfs_hash": "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ"
}
```

**Response:**
```json
{
  "verified": true,
  "ipfs_hash": "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ",
  "content_type": "application/pdf",
  "size_bytes": 1258974,
  "last_accessed": "2025-04-15T14:30:10Z"
}
```

**Status Codes:**
- 200: OK
- 400: Bad Request
- 404: Not Found

## Audit Log

#### Get Audit Logs

```
GET /audit-logs
```

Retrieves audit logs based on query parameters (officials/admins only).

**Request Headers:**
```
Authorization: Bearer [token]
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10)
- `entity_type` (optional): Filter by entity type (user, parcel, certificate, etc.)
- `entity_id` (optional): Filter by entity ID
- `action` (optional): Filter by action (create, update, delete)
- `actor_id` (optional): Filter by user who performed the action
- `start_date` (optional): Filter by start date
- `end_date` (optional): Filter by end date

**Response:**
```json
{
  "total": 256,
  "page": 1,
  "limit": 10,
  "logs": [
    {
      "log_id": "550e8400-e29b-41d4-a716-446655446666",
      "entity_type": "certificate",
      "entity_id": "550e8400-e29b-41d4-a716-446655440002",
      "action": "create",
      "actor": {
        "user_id": "550e8400-e29b-41d4-a716-446655441111",
        "full_name": "Jane Smith",
        "user_type": "official"
      },
      "action_time": "2025-01-15T12:00:00Z",
      "details": {
        "description": "Certificate issued for parcel #550e8400-e29b-41d4-a716-446655440001",
        "blockchain_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
      },
      "ip_address": "41.222.xxx.xxx"
    },
    // More audit logs...
  ]
}
```

**Status Codes:**
- 200: OK
- 401: Unauthorized
- 403: Forbidden

## Error Responses

All API endpoints follow a consistent error response format:

```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "The requested resource was not found",
  "details": {
    "resource_type": "certificate",
    "resource_id": "550e8400-e29b-41d4-a716-446655440099"
  }
}
```

Common error codes:
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `RESOURCE_NOT_FOUND`: The requested resource was not found
- `VALIDATION_ERROR`: Request validation failed
- `BLOCKCHAIN_ERROR`: Error interacting with blockchain
- `IPFS_ERROR`: Error interacting with IPFS
- `SERVER_ERROR`: Internal server error

## Rate Limiting

API requests are rate-limited to prevent abuse. The current limits are:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1619983228
```

When rate limits are exceeded, a 429 Too Many Requests response is returned.

## Webhooks

Clients can register webhook endpoints to receive real-time notifications for various events:

```
POST /webhooks/register
```

**Request Headers:**
```
Authorization: Bearer [token]
```

**Request Body:**
```json
{
  "url": "https://client-app.example.com/webhooks/land-registry",
  "events": [
    "transaction.created",
    "transaction.completed",
    "certificate.issued",
    "certificate.revoked"
  ],
  "secret": "your_webhook_secret"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Webhook registered successfully",
  "webhook_id": "550e8400-e29b-41d4-a716-446655447777"
}
```

Webhook payloads are signed with the provided secret using HMAC-SHA256.

## API Versioning

The API is versioned in the URL path (e.g., `/v1/`). The current version is v1.

When a new, potentially breaking API version is released, the previous version will be supported for at least 12 months to allow clients to migrate.

## Conclusion

This API documentation provides a comprehensive outline of the endpoints available in the blockchain-based land management system. Implementation details may vary based on specific requirements and technical constraints. Always refer to the latest documentation for the most up-to-date information.
