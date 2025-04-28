import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4 text-white">
                Secure Land Management System
              </h1>
              <p className="lead text-white mb-5">
                A blockchain-based platform for transparent and secure land registration, 
                ownership verification, and property transactions.
              </p>
              <div className="d-grid gap-3 d-sm-flex">
                <Link to="/login" className="btn btn-light btn-lg px-4 py-3">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-outline-light btn-lg px-4 py-3">
                  Create Account
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="landing-image-wrapper">
                <img 
                  src="/images/land-illustration.svg" 
                  alt="Land Registry Illustration"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400/0d6efd/white?text=Land+Registry";
                  }} 
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-6">
        <div className="container">
          <div className="row mb-5 text-center">
            <div className="col-lg-8 mx-auto">
              <h2 className="fw-bold">Why Choose Our Platform?</h2>
              <p className="lead text-muted">
                Built on blockchain technology for maximum security and transparency
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="icon-wrapper mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-shield-check text-primary" viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.856C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453a7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                    <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <h4>Secure</h4>
                <p>Advanced blockchain technology ensures all records are tamper-proof and immutable.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card">
                <div className="icon-wrapper mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-graph-up text-primary" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
                  </svg>
                </div>
                <h4>Transparent</h4>
                <p>All transactions and ownership records can be traced and verified by authorized parties.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card">
                <div className="icon-wrapper mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-lightning-charge text-primary" viewBox="0 0 16 16">
                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                  </svg>
                </div>
                <h4>Efficient</h4>
                <p>Process land transfers and registrations quickly with reduced paperwork and bureaucracy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="landing-footer bg-dark text-white py-5">
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-4">
              <h5 className="mb-3">Land Registry System</h5>
              <p className="mb-0">Securing land ownership with blockchain technology</p>
            </div>
            <div className="col-md-4">
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/login" className="text-white-50">Sign In</Link></li>
                <li><Link to="/register" className="text-white-50">Register</Link></li>
                <li><Link to="/verify" className="text-white-50">Verify Certificate</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="mb-3">Contact</h5>
              <ul className="list-unstyled text-white-50">
                <li>Email: test@test.com</li>
                <li>Phone: +123-456-7890</li>
              </ul>
            </div>
          </div>
          <hr className="my-4 bg-secondary" />
          <div className="row">
            <div className="col-md-6">
              <p className="mb-md-0">&copy; {new Date().getFullYear()} Land Registry System. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">Blockchain-Based Land Management</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
