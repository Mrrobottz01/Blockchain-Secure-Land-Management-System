import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Layout.css';

function Layout({ hideNavbar = false }) {
  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />}
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer bg-light py-3 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">&copy; {new Date().getFullYear()} Land Registry System. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">Blockchain-Based Land Management</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
