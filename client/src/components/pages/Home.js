import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserMd, FaUserInjured, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect authenticated users to their dashboard
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'patient':
          navigate('/patient');
          break;
        default:
          break;
      }
    }
  }, [isAuthenticated, user, navigate]);
  return (
    <div>
      {/* Hero Section */}
      <div className="jumbotron">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="glow">Welcome</h1>
              <h3 className="mt-4">Emergency?</h3>
              <p className="lead">
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary" 
                  size="lg"
                  className="mt-3"
                >
                  Take Appointment
                </Button>
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Role Selection Cards */}
      <Container className="mt-5">
        <Row>
          <Col md={4}>
            <Card className="text-center h-100">
              <Card.Body>
                <FaUserShield size={50} className="text-primary mb-3" />
                <Card.Title>Admin</Card.Title>
                <Card.Text>
                  Manage hospital operations, approve doctors and patients, handle appointments and billing.
                </Card.Text>
                <Button as={Link} to="/login" variant="outline-primary">
                  Admin Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="text-center h-100">
              <Card.Body>
                <FaUserMd size={50} className="text-success mb-3" />
                <Card.Title>Doctor</Card.Title>
                <Card.Text>
                  View assigned patients, manage appointments, and provide medical care.
                </Card.Text>
                <Button as={Link} to="/login" variant="outline-success">
                  Doctor Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="text-center h-100">
              <Card.Body>
                <FaUserInjured size={50} className="text-info mb-3" />
                <Card.Title>Patient</Card.Title>
                <Card.Text>
                  Book appointments, view medical records, and manage your healthcare.
                </Card.Text>
                <Button as={Link} to="/login" variant="outline-info">
                  Patient Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mt-5">
          <Col md={12}>
            <h2 className="text-center mb-4">Hospital Management System Features</h2>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <h5>🔐 Secure Authentication</h5>
                <p>JWT-based authentication with role-based access control for patients, doctors, and administrators.</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <h5>📊 Real-time Updates</h5>
                <p>Socket.io integration for real-time communication and appointment updates.</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <h5>📋 Appointment Management</h5>
                <p>Comprehensive appointment booking and management system for all users.</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <h5>💰 Billing & PDF Generation</h5>
                <p>Automated billing system with PDF invoice generation for patient discharge.</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <h5>👥 User Management</h5>
                <p>Complete user management system with approval workflows for doctors and patients.</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <h5>🔍 Search & Filter</h5>
                <p>Advanced search and filtering capabilities for doctors, patients, and appointments.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home; 