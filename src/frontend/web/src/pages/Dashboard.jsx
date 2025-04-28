import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Get current user details
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="mt-3">Loading your dashboard...</h5>
        </div>
      </div>
    );
  }
  
  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  // Statistics cards for dashboard
  const stats = [
    { title: 'Land Parcels', count: 3, icon: 'grid-3x3', color: 'success' },
    { title: 'Active Transactions', count: 1, icon: 'arrow-left-right', color: 'info' },
    { title: 'Documents', count: 12, icon: 'file-earmark-text', color: 'warning' },
    { title: 'Verified Certificates', count: 2, icon: 'patch-check', color: 'primary' }
  ];
  
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-lg-8">
          <h2 className="display-6 fw-bold mb-0">
            {getGreeting()}, {user?.first_name || user?.full_name?.split(' ')[0] || 'User'}
          </h2>
          <p className="text-muted">Here's what's happening with your properties today.</p>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className={`icon-shape bg-${stat.color} bg-opacity-10 text-${stat.color} rounded p-3 me-3`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-${stat.icon}`} viewBox="0 0 16 16">
                      {stat.icon === 'grid-3x3' && <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5V5h4V1zM5 6H1v4h4zm1 4h4V6H6zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5zm1 0v4h4v-4zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11zm0-1h4V6h-4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11zm-1 0V1H6v4z"/>}
                      {stat.icon === 'arrow-left-right' && <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>}
                      {stat.icon === 'file-earmark-text' && <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>}
                      {stat.icon === 'patch-check' && <><path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" /><path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" /></>}
                    </svg>
                  </div>
                  <div>
                    <h2 className="h1 fw-bold mb-0">{stat.count}</h2>
                    <p className="mb-0 text-muted">{stat.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content Row */}
      <div className="row g-4 mb-4">
        {/* Land Parcels Card */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">My Land Parcels</h5>
                <button className="btn btn-sm btn-primary">View All</button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Parcel ID</th>
                      <th scope="col">Location</th>
                      <th scope="col">Area (m²)</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TEST123</td>
                      <td>Test Address, City</td>
                      <td>100.00</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary">View</button>
                          <button className="btn btn-outline-secondary">Certificate</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>LAND457</td>
                      <td>123 Main Street, City</td>
                      <td>250.00</td>
                      <td><span className="badge bg-info">Pending</span></td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary">View</button>
                          <button className="btn btn-outline-secondary">Certificate</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>PROP789</td>
                      <td>456 Rural Road, County</td>
                      <td>500.00</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary">View</button>
                          <button className="btn btn-outline-secondary">Certificate</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* User Profile Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Account Information</h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <div className="avatar avatar-lg d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                  {user?.full_name?.charAt(0) || 'U'}
                </div>
                <h5 className="mt-3 mb-0">{user?.full_name}</h5>
                <p className="text-muted mb-0">{user?.user_type || 'User'}</p>
              </div>
              
              <hr className="my-3" />
              
              <div className="mb-3">
                <div className="d-flex mb-2">
                  <div className="text-muted" style={{ width: '100px' }}>Email:</div>
                  <div className="fw-medium">{user?.email}</div>
                </div>
                <div className="d-flex mb-2">
                  <div className="text-muted" style={{ width: '100px' }}>ID:</div>
                  <div className="fw-medium">{user?.national_id || 'N/A'}</div>
                </div>
                <div className="d-flex">
                  <div className="text-muted" style={{ width: '100px' }}>Phone:</div>
                  <div className="fw-medium">{user?.phone_number || 'N/A'}</div>
                </div>
              </div>
              
              <div className="d-grid gap-2 mt-4">
                <Link to="/profile" className="btn btn-outline-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-gear me-2" viewBox="0 0 16 16">
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                    <path d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                  </svg>
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
          
          {/* Quick Actions Card */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <Link to="/land-parcels/new" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-0">
                  <div className="icon-shape bg-success bg-opacity-10 text-success rounded p-2 me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                  </div>
                  Register New Land Parcel
                </Link>
                
                <Link to="/transactions/new" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-0">
                  <div className="icon-shape bg-info bg-opacity-10 text-info rounded p-2 me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
                    </svg>
                  </div>
                  Initiate Land Transfer
                </Link>
                
                <Link to="/documents/upload" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-0">
                  <div className="icon-shape bg-warning bg-opacity-10 text-warning rounded p-2 me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
                      <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"/>
                    </svg>
                  </div>
                  Upload Documents
                </Link>
                
                <Link to="/verify" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-0">
                  <div className="icon-shape bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                      <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                    </svg>
                  </div>
                  Verify Certificate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
