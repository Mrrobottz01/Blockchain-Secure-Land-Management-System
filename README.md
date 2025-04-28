# Blockchain-Based Land Management System

<div align="center">

![Blockchain Land Management](https://img.shields.io/badge/Blockchain-Land%20Management-blue)
![Django](https://img.shields.io/badge/Django-5.2-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![Hyperledger](https://img.shields.io/badge/Hyperledger-Fabric-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

</div>

---

This project implements a secure and transparent land management system using blockchain technology for Tanzania. The system consists of a Django backend API, a React frontend (built with Vite), and blockchain integration using Hyperledger Fabric.

## 🚀 Prerequisites

| Technology | Version |
|------------|---------|
| Python | 3.13+ |
| Node.js | 18+ |
| PostgreSQL | Latest |
| Redis | Latest |
| Hyperledger Fabric | 2.x |

## 📁 Project Structure

```bash
fyp/
├── backend/          # Django REST API with PostgreSQL
│   ├── documents/    # Document management
│   ├── land_registry/# Land registry core functionality
│   ├── users/        # User authentication & management
│   └── manage.py     # Django management script
│
├── blockchain/       # Hyperledger Fabric implementation
│   └── contracts/    # Smart contracts for land management
│
├── frontend/        # React + Vite frontend
│   └── web/         # Web application
│
└── design/          # Design resources & mockups
```

## 🔧 Setup and Installation

### ⚙️ Backend Setup

1. Create and activate the virtual environment:
```bash
cd /path/to/project
python -m venv env
source env/bin/activate  # On Windows: .\env\Scripts\activate
```

2. Install backend dependencies:
```bash
cd src/backend
pip install -r requirements.txt
```

3. Configure the database:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create a superuser:
```bash
python manage.py createsuperuser
```

5. Start the Django development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Install frontend dependencies:
```bash
cd src/frontend/web
npm install
```

2. Install additional React dependencies:
```bash
npm install @vitejs/plugin-react react react-dom react-router-dom @tanstack/react-query axios
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

Note: The frontend is built using React 18+ with Vite for faster development and optimized production builds. We use React Query for efficient API data management and React Router for navigation.

## 📚 API Documentation

> **Note:** API documentation is currently under development

### Available Documentation Endpoints
| Interface | URL |
|----------|-----|
| Swagger UI | `http://localhost:8000/swagger/` |
| ReDoc | `http://localhost:8000/redoc/` |

## Testing

To run the backend tests:
```bash
cd src/backend
python manage.py test
```

To run the frontend tests:
```bash
cd src/frontend/web
npm run test
```

## Configuration

1. Backend configuration (.env):
   - Create a `.env` file in the `src/backend` directory
   - Add necessary environment variables:
     ```
     DEBUG=True
     SECRET_KEY=your-secret-key
     DATABASE_URL=postgres://user:password@localhost:5432/dbname
     REDIS_URL=redis://localhost:6379/0
     ```

2. Frontend configuration:
   - Update API endpoint in `src/frontend/web/src/config.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support


