# Database Schema Design

## Overview
This document outlines the database schema design for the blockchain-based land management system. The design follows a relational database model using PostgreSQL, with connections to the blockchain layer through hashes and references.

## Entity Relationship Diagram

```
+---------------+       +----------------+       +-------------------+
| USER          |       | LAND_PARCEL    |       | CERTIFICATE       |
+---------------+       +----------------+       +-------------------+
| user_id (PK)  |       | parcel_id (PK) |       | certificate_id(PK)|
| national_id   |<----->| owner_id (FK)  |<----->| parcel_id (FK)    |
| full_name     |       | location_data  |       | issue_date        |
| phone         |       | area           |       | expiry_date       |
| email         |       | boundaries     |       | status            |
| address       |       | parcel_type    |       | blockchain_hash   |
| user_type     |       | status         |       | ipfs_document_hash|
| password_hash |       | created_at     |       | issuer_id (FK)    |
| created_at    |       | updated_at     |       | created_at        |
| updated_at    |       | blockchain_hash|       | updated_at        |
+---------------+       +----------------+       +-------------------+
        |                      |                         |
        |                      |                         |
        v                      v                         v
+---------------+       +----------------+       +-------------------+
| TRANSACTION   |       | DISPUTE        |       | DOCUMENT          |
+---------------+       +----------------+       +-------------------+
| txn_id (PK)   |       | dispute_id (PK)|       | document_id (PK)  |
| parcel_id (FK)|       | parcel_id (FK) |       | certificate_id(FK)|
| from_user (FK)|       | complainant(FK)|       | document_type     |
| to_user (FK)  |       | respondent (FK)|       | document_name     |
| txn_type      |       | dispute_type   |       | document_desc     |
| amount        |       | description    |       | ipfs_hash         |
| status        |       | status         |       | blockchain_hash   |
| blockchain_hash|      | resolution     |       | upload_date       |
| ipfs_docs_hash|      | created_at     |       | uploaded_by (FK)  |
| created_at    |       | updated_at     |       | status            |
| updated_at    |       | blockchain_hash|       | created_at        |
+---------------+       +----------------+       +-------------------+
        |                      |
        |                      |
        v                      v
+---------------+       +----------------+
| PAYMENT       |       | AUDIT_LOG      |
+---------------+       +----------------+
| payment_id(PK)|       | log_id (PK)    |
| txn_id (FK)   |       | entity_type    |
| amount        |       | entity_id      |
| payment_method|       | action         |
| reference_no  |       | actor_id (FK)  |
| status        |       | action_time    |
| receipt_no    |       | details        |
| created_at    |       | ip_address     |
| updated_at    |       | created_at     |
+---------------+       +----------------+
```

## Tables Description

### 1. USER
Stores information about all users of the system including landowners, government officials, surveyors, etc.

| Column         | Type         | Constraints        | Description                                   |
|----------------|--------------|-------------------|-----------------------------------------------|
| user_id        | UUID         | PK, NOT NULL      | Unique identifier for users                   |
| national_id    | VARCHAR(20)  | UNIQUE, NOT NULL  | National identification number                |
| full_name      | VARCHAR(100) | NOT NULL          | User's full name                              |
| phone          | VARCHAR(15)  | NOT NULL          | Contact phone number                          |
| email          | VARCHAR(100) | UNIQUE            | Email address (optional for some users)       |
| address        | TEXT         |                   | Physical address                              |
| user_type      | ENUM         | NOT NULL          | Type: landowner, official, admin, surveyor    |
| password_hash  | VARCHAR(255) | NOT NULL          | Securely stored password hash                 |
| created_at     | TIMESTAMP    | NOT NULL          | Record creation timestamp                     |
| updated_at     | TIMESTAMP    | NOT NULL          | Record last update timestamp                  |

### 2. LAND_PARCEL
Stores information about land parcels in the system.

| Column         | Type         | Constraints        | Description                                   |
|----------------|--------------|-------------------|-----------------------------------------------|
| parcel_id      | UUID         | PK, NOT NULL      | Unique identifier for land parcels            |
| owner_id       | UUID         | FK, NOT NULL      | Reference to USER table                       |
| location_data  | JSONB        | NOT NULL          | GeoJSON data for parcel location              |
| area           | DECIMAL      | NOT NULL          | Area of the land parcel in square meters      |
| boundaries     | GEOMETRY     | NOT NULL          | Polygon representation of parcel boundaries   |
| parcel_type    | ENUM         | NOT NULL          | Type: residential, commercial, agricultural   |
| status         | ENUM         | NOT NULL          | Status: active, pending, disputed, etc.       |
| created_at     | TIMESTAMP    | NOT NULL          | Record creation timestamp                     |
| updated_at     | TIMESTAMP    | NOT NULL          | Record last update timestamp                  |
| blockchain_hash| VARCHAR(66)  | UNIQUE            | Hash reference to blockchain record           |

### 3. CERTIFICATE
Stores information about land certificates issued.

| Column           | Type         | Constraints        | Description                                   |
|------------------|--------------|-------------------|-----------------------------------------------|
| certificate_id   | UUID         | PK, NOT NULL      | Unique identifier for certificates            |
| parcel_id        | UUID         | FK, NOT NULL      | Reference to LAND_PARCEL table                |
| issue_date       | DATE         | NOT NULL          | Date when certificate was issued              |
| expiry_date      | DATE         |                   | Expiration date if applicable                 |
| status           | ENUM         | NOT NULL          | Status: active, revoked, expired              |
| blockchain_hash  | VARCHAR(66)  | UNIQUE            | Hash reference to blockchain record           |
| ipfs_document_hash| VARCHAR(66) | NOT NULL          | IPFS hash for the certificate document        |
| issuer_id        | UUID         | FK, NOT NULL      | Reference to USER table (government official) |
| created_at       | TIMESTAMP    | NOT NULL          | Record creation timestamp                     |
| updated_at       | TIMESTAMP    | NOT NULL          | Record last update timestamp                  |

### 4. TRANSACTION
Records all land ownership transfers and related transactions.

| Column           | Type         | Constraints        | Description                                   |
|------------------|--------------|-------------------|-----------------------------------------------|
| txn_id           | UUID         | PK, NOT NULL      | Unique identifier for transactions            |
| parcel_id        | UUID         | FK, NOT NULL      | Reference to LAND_PARCEL table                |
| from_user        | UUID         | FK, NOT NULL      | Previous owner (USER reference)               |
| to_user          | UUID         | FK, NOT NULL      | New owner (USER reference)                    |
| txn_type         | ENUM         | NOT NULL          | Type: sale, inheritance, gift, etc.           |
| amount           | DECIMAL      |                   | Transaction amount (if applicable)            |
| status           | ENUM         | NOT NULL          | Status: pending, completed, rejected          |
| blockchain_hash  | VARCHAR(66)  | UNIQUE            | Hash reference to blockchain record           |
| ipfs_docs_hash   | VARCHAR(66)  | NOT NULL          | IPFS hash for transaction documents           |
| created_at       | TIMESTAMP    | NOT NULL          | Record creation timestamp                     |
| updated_at       | TIMESTAMP    | NOT NULL          | Record last update timestamp                  |

### 5. DISPUTE
Tracks land disputes filed within the system.

| Column           | Type         | Constraints        | Description                                   |
|------------------|--------------|-------------------|-----------------------------------------------|
| dispute_id       | UUID         | PK, NOT NULL      | Unique identifier for disputes                |
| parcel_id        | UUID         | FK, NOT NULL      | Reference to LAND_PARCEL table                |
| complainant      | UUID         | FK, NOT NULL      | User filing the dispute (USER reference)      |
| respondent       | UUID         | FK, NOT NULL      | User responding to dispute (USER reference)   |
| dispute_type     | ENUM         | NOT NULL          | Type: boundary, ownership, rights, etc.       |
| description      | TEXT         | NOT NULL          | Detailed description of the dispute           |
| status           | ENUM         | NOT NULL          | Status: filed, reviewing, resolved, closed    |
| resolution       | TEXT         |                   | Details of the resolution if resolved         |
| created_at       | TIMESTAMP    | NOT NULL          | Record creation timestamp                     |
| updated_at       | TIMESTAMP    | NOT NULL          | Record last update timestamp                  |
| blockchain_hash  | VARCHAR(66)  | UNIQUE            | Hash reference to blockchain record           |

### 6. DOCUMENT
Stores references to all documents related to land records.

| Column           | Type         | Constraints        | Description                                   |
|------------------|--------------|-------------------|-----------------------------------------------|
| document_id      | UUID         | PK, NOT NULL      | Unique identifier for documents               |
| certificate_id   | UUID         | FK                | Reference to CERTIFICATE table (if applicable)|
| document_type    | ENUM         | NOT NULL          | Type: deed, survey, transfer, ID, etc.        |
| document_name    | VARCHAR(255) | NOT NULL          | Name of the document                          |
| document_desc    | TEXT         |                   | Document description                          |
| ipfs_hash        | VARCHAR(66)  | NOT NULL, UNIQUE  | IPFS hash for document retrieval              |
| blockchain_hash  | VARCHAR(66)  | UNIQUE            | Hash reference to blockchain record           |
| upload_date      | DATE         | NOT NULL          | Date document was uploaded                    |
| uploaded_by      | UUID         | FK, NOT NULL      | Reference to USER table                       |
| status           | ENUM         | NOT NULL          | Status: active, archived, revoked             |
| created_at       | TIMESTAMP    | NOT NULL          | Record creation timestamp                     |
| updated_at       | TIMESTAMP    | NOT NULL          | Record last update timestamp                  |

### 7. PAYMENT
Records payment information for transactions.

| Column           | Type         | Constraints        | Description                                   |
|------------------|--------------|-------------------|-----------------------------------------------|
| payment_id       | UUID         | PK, NOT NULL      | Unique identifier for payments                |
| txn_id           | UUID         | FK, NOT NULL      | Reference to TRANSACTION table                |
| amount           | DECIMAL      | NOT NULL          | Payment amount                                |
| payment_method   | ENUM         | NOT NULL          | Method: mobile, bank, cash, etc.              |
| reference_no     | VARCHAR(100) | UNIQUE            | Payment reference number                      |
| status           | ENUM         | NOT NULL          | Status: pending, completed, failed            |
| receipt_no       | VARCHAR(100) | UNIQUE            | Receipt number after successful payment       |
| created_at       | TIMESTAMP    | NOT NULL          | Record creation timestamp                     |
| updated_at       | TIMESTAMP    | NOT NULL          | Record last update timestamp                  |

### 8. AUDIT_LOG
Maintains a comprehensive audit log of all system activities.

| Column           | Type         | Constraints        | Description                                   |
|------------------|--------------|-------------------|-----------------------------------------------|
| log_id           | UUID         | PK, NOT NULL      | Unique identifier for log entries             |
| entity_type      | VARCHAR(50)  | NOT NULL          | Type of entity affected (user, parcel, etc.)  |
| entity_id        | UUID         | NOT NULL          | ID of the affected entity                     |
| action           | VARCHAR(50)  | NOT NULL          | Action performed (create, update, delete)     |
| actor_id         | UUID         | FK, NOT NULL      | Reference to USER who performed action        |
| action_time      | TIMESTAMP    | NOT NULL          | When action was performed                     |
| details          | JSONB        | NOT NULL          | Detailed information about the action         |
| ip_address       | VARCHAR(45)  |                   | IP address of the actor                       |
| created_at       | TIMESTAMP    | NOT NULL          | Record creation timestamp                     |

## Relationships

1. **USER to LAND_PARCEL**: One-to-many (One user can own multiple parcels)
2. **LAND_PARCEL to CERTIFICATE**: One-to-one (Each parcel has one active certificate)
3. **USER to CERTIFICATE**: One-to-many (One official can issue multiple certificates)
4. **LAND_PARCEL to TRANSACTION**: One-to-many (One parcel can have multiple transactions)
5. **USER to TRANSACTION**: One-to-many (User can be involved in multiple transactions)
6. **LAND_PARCEL to DISPUTE**: One-to-many (One parcel can have multiple disputes)
7. **USER to DISPUTE**: One-to-many (User can be involved in multiple disputes)
8. **CERTIFICATE to DOCUMENT**: One-to-many (One certificate can reference multiple documents)
9. **TRANSACTION to PAYMENT**: One-to-one (Each transaction has one payment record)
10. **USER to AUDIT_LOG**: One-to-many (User can perform multiple actions logged in the audit)

## Blockchain Integration Points

1. **LAND_PARCEL.blockchain_hash**: References the hash of the land parcel record on Hyperledger Fabric.
2. **CERTIFICATE.blockchain_hash**: References the hash of the certificate record on Hyperledger Fabric.
3. **TRANSACTION.blockchain_hash**: References the hash of the transfer transaction on Hyperledger Fabric.
4. **DISPUTE.blockchain_hash**: References the hash of the dispute record on Hyperledger Fabric.
5. **DOCUMENT.blockchain_hash**: References the hash of the document metadata on Hyperledger Fabric.

## IPFS Integration Points

1. **CERTIFICATE.ipfs_document_hash**: References the hash of the certificate document stored in IPFS.
2. **TRANSACTION.ipfs_docs_hash**: References the hash of the transaction documents stored in IPFS.
3. **DOCUMENT.ipfs_hash**: References the hash of the actual document stored in IPFS.

## Indexing Strategy

1. **USER**: Indexes on national_id, email, user_type
2. **LAND_PARCEL**: Spatial index on boundaries, indexes on owner_id, status
3. **CERTIFICATE**: Indexes on parcel_id, status, issuer_id
4. **TRANSACTION**: Indexes on parcel_id, from_user, to_user, status
5. **DISPUTE**: Indexes on parcel_id, complainant, respondent, status
6. **DOCUMENT**: Indexes on certificate_id, document_type, uploaded_by
7. **PAYMENT**: Indexes on txn_id, status
8. **AUDIT_LOG**: Indexes on entity_type, entity_id, actor_id, action_time

## Data Security Considerations

1. Personally identifiable information (PII) should be encrypted at rest
2. Password hashes should use strong hashing algorithms with salts (bcrypt/Argon2)
3. Database-level encryption should be implemented
4. Row-level security policies should be implemented for multi-tenant access
5. Regular backups should be scheduled with point-in-time recovery options
6. Database access should be restricted to application service accounts only

## Migration Strategy

1. Initial schema creation
2. Seed data for enumerated types and system configurations
3. Integration testing with blockchain and IPFS components
4. Incremental updates using migration scripts versioned in the codebase

## Performance Optimization

1. Appropriate indexing as outlined above
2. Partitioning of large tables (AUDIT_LOG) by date ranges
3. Caching frequently accessed data
4. Query optimization and monitoring
5. Regular database maintenance (VACUUM, ANALYZE)
6. Consider read replicas for reporting and analytics
