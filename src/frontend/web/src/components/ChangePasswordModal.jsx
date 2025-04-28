import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import authService from '../services/authService';

const ChangePasswordModal = ({ show, onHide }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema using Yup
  const PasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required('Current password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setIsSubmitting(true);
      
      // Here you would make an API call to your backend to update the password
      // For now, we'll simulate a successful password change with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If the API call was successful:
      toast.success('Password changed successfully!');
      resetForm();
      onHide();
    } catch (error) {
      const errorMessage = 
        error.response?.data?.detail || 
        error.message || 
        'Failed to change password. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={PasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="mb-3">
                <Form.Label htmlFor="currentPassword">Current Password</Form.Label>
                <Field
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  className={`form-control ${touched.currentPassword && errors.currentPassword ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="currentPassword" component="div" className="invalid-feedback" />
              </div>
              
              <div className="mb-3">
                <Form.Label htmlFor="newPassword">New Password</Form.Label>
                <Field
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className={`form-control ${touched.newPassword && errors.newPassword ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
              </div>
              
              <div className="mb-3">
                <Form.Label htmlFor="confirmPassword">Confirm New Password</Form.Label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
              </div>
              
              <div className="alert alert-info small">
                <strong>Password Requirements:</strong>
                <ul className="mb-0 ps-3">
                  <li>At least 8 characters long</li>
                  <li>Must contain at least one letter</li>
                  <li>Must contain at least one number</li>
                </ul>
              </div>
            </Modal.Body>
            
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={onHide}>Cancel</Button>
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Changing...
                  </>
                ) : 'Change Password'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangePasswordModal;
