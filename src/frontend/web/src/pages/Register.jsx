import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Redirect if user is already logged in
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Validation schema using Yup
  const RegisterSchema = Yup.object().shape({
    national_id: Yup.string()
      .required('National ID is required'),
    full_name: Yup.string()
      .required('Full name is required'),
    phone: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, 'Phone number must be valid')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    address: Yup.string()
      .required('Address is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    user_type: Yup.string()
      .oneOf(['CITIZEN'], 'Invalid user type')
      .required('User type is required'),
  });

  // Handle registration submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      // Remove confirmPassword as it's not needed for API
      const { confirmPassword, full_name, phone, address, ...otherData } = values;
      
      // Transform data to match backend field names
      const userData = {
        ...otherData,
        // Use email as username if no username provided
        username: values.email,
        // Split full name into first and last name (basic split on the first space)
        first_name: full_name.split(' ')[0] || '',
        last_name: full_name.split(' ').slice(1).join(' ') || '',
        // Match phone_number field name
        phone_number: phone,
        // Address may be stored elsewhere or not used
      };
      
      await authService.register(userData);
      
      toast.success('Registration successful! You can now login with your credentials.');
      navigate('/login');
      resetForm();
    } catch (error) {
      const message = 
        error.response?.data?.detail || 
        error.response?.data?.message || 
        error.message || 
        'An error occurred during registration';
      toast.error(message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="auth-hero py-5 text-center">
        <div className="container">
          <h1 className="display-5 fw-bold mb-3">Create Your Account</h1>
          <p className="lead mb-0">Join our secure land management platform and manage your properties with confidence.</p>
        </div>
      </section>
    
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card auth-card">
              <div className="card-body p-4 p-lg-5">
                <div className="text-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-hexagon-fill text-primary mb-3" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866z"/>
                  </svg>
                  <h2 className="fw-bold">Register</h2>
                  <p className="text-muted">Please fill out all required information to create your account</p>
                </div>
                
                <Formik
                  initialValues={{
                    national_id: '',
                    full_name: '',
                    phone: '',
                    email: '',
                    address: '',
                    password: '',
                    confirmPassword: '',
                    user_type: 'CITIZEN'
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, touched, errors }) => (
                    <Form className="auth-form">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <Field 
                              type="text" 
                              name="national_id" 
                              id="national_id"
                              className={`form-control ${touched.national_id && errors.national_id ? 'is-invalid' : ''}`}
                              placeholder="Enter National ID" 
                            />
                            <label htmlFor="national_id">National ID</label>
                            <ErrorMessage name="national_id" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <Field 
                              type="text" 
                              name="full_name" 
                              id="full_name"
                              className={`form-control ${touched.full_name && errors.full_name ? 'is-invalid' : ''}`}
                              placeholder="Enter Full Name" 
                            />
                            <label htmlFor="full_name">Full Name</label>
                            <ErrorMessage name="full_name" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <Field 
                              type="text" 
                              name="phone" 
                              id="phone"
                              className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                              placeholder="Enter Phone Number" 
                            />
                            <label htmlFor="phone">Phone Number</label>
                            <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <Field 
                              type="email" 
                              name="email"
                              id="email" 
                              className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                              placeholder="Enter Email" 
                            />
                            <label htmlFor="email">Email Address</label>
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                          </div>
                        </div>
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
                      
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <Field 
                              type="password" 
                              name="password"
                              id="password" 
                              className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                              placeholder="Enter Password" 
                            />
                            <label htmlFor="password">Password</label>
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <Field 
                              type="password" 
                              name="confirmPassword"
                              id="confirmPassword" 
                              className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                              placeholder="Confirm Password" 
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Password requirements info */}
                      <div className="alert alert-info small mb-4">
                        <strong>Password Requirements:</strong>
                        <ul className="mb-0 ps-3">
                          <li>At least 8 characters long</li>
                          <li>Must contain at least one letter</li>
                          <li>Must contain at least one number</li>
                        </ul>
                      </div>
                      
                      {/* Hidden field for user type */}
                      <Field type="hidden" name="user_type" />
                      
                      <div className="d-grid gap-2 mb-4">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg py-3" 
                          disabled={isSubmitting || loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Creating Account...
                            </>
                          ) : (
                            'Create Account'
                          )}
                        </button>
                      </div>
                      
                      <div className="auth-divider">
                        <span>Already have an account?</span>
                      </div>
                      
                      <div className="text-center">
                        <Link to="/login" className="btn btn-outline-secondary">
                          Sign In
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
