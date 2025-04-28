import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import authService from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if user is already logged in
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Validation schema using Yup
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  // Handle login submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      await authService.login(values.email, values.password);
      
      toast.success('Login successful! Welcome back.');
      
      // Redirect based on user role
      const user = authService.getCurrentUser();
      if (user.user_type === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
      
      resetForm();
    } catch (error) {
      const message = 
        error.response?.data?.detail || 
        error.response?.data?.message || 
        error.message || 
        'Invalid credentials. Please check your email and password.';
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
          <h1 className="display-5 fw-bold mb-3">Welcome to Land Management System</h1>
          <p className="lead mb-0">Secure, transparent & efficient land registry powered by blockchain.</p>
        </div>
      </section>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card auth-card">
              <div className="card-body p-4 p-lg-5">
                <div className="text-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-hexagon-fill text-primary mb-3" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866z"/>
                  </svg>
                  <h2 className="fw-bold">Login</h2>
                  <p className="text-muted">Please enter your credentials to continue</p>
                </div>
                
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, touched, errors }) => (
                    <Form className="auth-form">
                      <div className="mb-4">
                        <div className="form-floating">
                          <Field 
                            type="email" 
                            name="email" 
                            id="email"
                            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                            placeholder="name@example.com" 
                          />
                          <label htmlFor="email">Email address</label>
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="form-floating">
                          <Field 
                            type="password" 
                            name="password" 
                            id="password"
                            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password" 
                          />
                          <label htmlFor="password">Password</label>
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                          <Link to="/forgot-password" className="text-decoration-none small">Forgot password?</Link>
                        </div>
                      </div>
                      
                      <div className="d-grid gap-2 mb-4">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg py-3" 
                          disabled={isSubmitting || loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Logging in...
                            </>
                          ) : (
                            'Sign In'
                          )}
                        </button>
                      </div>
                      
                      <div className="auth-divider">
                        <span>Don't have an account?</span>
                      </div>
                      
                      <div className="text-center">
                        <Link to="/register" className="btn btn-outline-secondary">
                          Create Account
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

export default Login;
