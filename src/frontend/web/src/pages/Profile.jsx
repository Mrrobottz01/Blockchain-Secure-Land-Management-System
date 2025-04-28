import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import authService from '../services/authService';
import ChangePasswordModal from '../components/ChangePasswordModal';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [savingChanges, setSavingChanges] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
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
  
  // Validation schema using Yup
  const ProfileSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone_number: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, 'Phone number must be valid')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
  });

  // Handle profile update submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSavingChanges(true);
      
      // This would be where you call your API to update the user profile
      // For now, we'll just simulate a successful update
      setTimeout(() => {
        // Update local user data
        const updatedUser = { ...user, ...values };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        toast.success('Profile updated successfully!');
        setEditing(false);
        setSavingChanges(false);
      }, 1000);
      
    } catch (error) {
      const message = error.response?.data?.detail || 
                      error.message || 
                      'An error occurred while updating your profile';
      toast.error(message);
      setSavingChanges(false);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="mt-3">Loading your profile...</h5>
        </div>
      </div>
    );
  }
  
  return (
    <>
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">My Profile</h1>
        </div>
      </div>
      
      <div className="row">
        {/* Profile Sidebar */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="profile-image mb-4">
                <div className="avatar-placeholder rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mx-auto" style={{ width: '150px', height: '150px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
                </div>
              </div>
              
              <h4 className="fw-bold mb-1">{user.first_name} {user.last_name}</h4>
              <p className="text-muted mb-3">
                {user.user_type === 'ADMIN' ? 'Administrator' : 
                 user.user_type === 'LAND_OFFICER' ? 'Land Officer' : 'Citizen'}
              </p>
              
              {!editing && (
                <button 
                  className="btn btn-primary px-4 py-2" 
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            <ul className="list-group list-group-flush">
              <li className="list-group-item py-3">
                <div className="d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope text-primary me-3" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                  </svg>
                  <div>
                    <small className="text-muted d-block">Email</small>
                    <span>{user.email}</span>
                  </div>
                </div>
              </li>
              <li className="list-group-item py-3">
                <div className="d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-telephone text-primary me-3" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                  </svg>
                  <div>
                    <small className="text-muted d-block">Phone</small>
                    <span>{user.phone_number}</span>
                  </div>
                </div>
              </li>
              <li className="list-group-item py-3">
                <div className="d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-credit-card text-primary me-3" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                  </svg>
                  <div>
                    <small className="text-muted d-block">National ID</small>
                    <span>{user.national_id}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Profile Details/Edit Form */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">{editing ? 'Edit Profile' : 'Profile Information'}</h5>
              
              {editing ? (
                <Formik
                  initialValues={{
                    first_name: user.first_name || '',
                    last_name: user.last_name || '',
                    email: user.email || '',
                    phone_number: user.phone_number || '',
                    address: user.address || '',
                  }}
                  validationSchema={ProfileSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, touched, errors }) => (
                    <Form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <Field 
                              type="text" 
                              name="first_name" 
                              id="first_name"
                              className={`form-control ${touched.first_name && errors.first_name ? 'is-invalid' : ''}`}
                              placeholder="Enter First Name" 
                            />
                            <label htmlFor="first_name">First Name</label>
                            <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <Field 
                              type="text" 
                              name="last_name" 
                              id="last_name"
                              className={`form-control ${touched.last_name && errors.last_name ? 'is-invalid' : ''}`}
                              placeholder="Enter Last Name" 
                            />
                            <label htmlFor="last_name">Last Name</label>
                            <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-floating mb-3">
                        <Field 
                          type="email" 
                          name="email" 
                          id="email"
                          className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                          placeholder="Enter Email" 
                        />
                        <label htmlFor="email">Email</label>
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                      
                      <div className="form-floating mb-3">
                        <Field 
                          type="text" 
                          name="phone_number" 
                          id="phone_number"
                          className={`form-control ${touched.phone_number && errors.phone_number ? 'is-invalid' : ''}`}
                          placeholder="Enter Phone Number" 
                        />
                        <label htmlFor="phone_number">Phone Number</label>
                        <ErrorMessage name="phone_number" component="div" className="invalid-feedback" />
                      </div>
                      
                      <div className="form-floating mb-3">
                        <Field 
                          type="text" 
                          name="address" 
                          id="address"
                          className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`}
                          placeholder="Enter Address" 
                        />
                        <label htmlFor="address">Address</label>
                        <ErrorMessage name="address" component="div" className="invalid-feedback" />
                      </div>
                      
                      <div className="d-flex gap-2 mt-4">
                        <button 
                          type="submit" 
                          className="btn btn-primary px-4 py-2" 
                          disabled={isSubmitting || savingChanges}
                        >
                          {savingChanges ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Saving...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-outline-secondary px-4 py-2"
                          onClick={() => setEditing(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <div className="profile-details">
                  <div className="row mb-3 g-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label text-muted small">First Name</label>
                        <div className="fs-6">{user.first_name}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label text-muted small">Last Name</label>
                        <div className="fs-6">{user.last_name}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label text-muted small">Email Address</label>
                    <div className="fs-6">{user.email}</div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label text-muted small">Phone Number</label>
                    <div className="fs-6">{user.phone_number}</div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label text-muted small">Address</label>
                    <div className="fs-6">{user.address || 'Not provided'}</div>
                  </div>
                  
                  <hr className="my-4" />
                  
                  <div className="row mb-3 g-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label text-muted small">Account Type</label>
                        <div className="fs-6">
                          {user.user_type === 'ADMIN' ? 'Administrator' : 
                           user.user_type === 'LAND_OFFICER' ? 'Land Officer' : 'Citizen'}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label text-muted small">Account Status</label>
                        <div className="d-flex align-items-center">
                          <span className={`badge bg-${user.is_verified ? 'success' : 'warning'} rounded-pill me-2`}>
                            {user.is_verified ? 'Verified' : 'Pending Verification'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {user.blockchain_address && (
                    <div className="mb-3">
                      <label className="form-label text-muted small">Blockchain Address</label>
                      <div className="fs-6 font-monospace">
                        <small>{user.blockchain_address}</small>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white p-4">
                  <h5 className="card-title mb-0">Security Settings</h5>
                </div>
                <div className="card-body p-4">
                  <div className="mb-4">
                    <h6>Change Password</h6>
                    <p className="text-muted small mb-3">
                      It's a good idea to use a strong password that you're not using elsewhere
                    </p>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      Change Password
                    </button>
                  </div>
                  
                  <hr />
                  
                  <div>
                    <h6>Two-Factor Authentication</h6>
                    <p className="text-muted small mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <button className="btn btn-outline-primary" disabled>
                      Setup Two-Factor Authentication
                      <span className="badge bg-secondary ms-2">Coming Soon</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Change Password Modal */}
    <ChangePasswordModal 
      show={showPasswordModal} 
      onHide={() => setShowPasswordModal(false)} 
    />
    </>
  );
};

export default Profile;
