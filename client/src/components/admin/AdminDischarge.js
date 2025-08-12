import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Badge } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDischarge = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/discharge/patients');
      setPatients(response.data);
    } catch (error) {
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleDischarge = async (patientId) => {
    // This would typically open a modal with discharge form
    toast.info('Discharge functionality would open a form here');
  };

  const handleDownloadPDF = async (patientId) => {
    try {
      const response = await axios.get(`/api/discharge/${patientId}/pdf`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bill-${patientId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="mb-4">Patient Discharge</h2>
      <Card>
        <Card.Header>
          <h5>Patients for Discharge</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Symptoms</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.user?.firstName} {patient.user?.lastName}</td>
                  <td>{patient.user?.email}</td>
                  <td>{patient.symptoms}</td>
                  <td>{patient.mobile}</td>
                  <td>{patient.address}</td>
                  <td>
                    <Button 
                      size="sm" 
                      variant="primary" 
                      onClick={() => handleDischarge(patient._id)}
                      className="me-2"
                    >
                      Discharge
                    </Button>
                    <Button 
                      size="sm" 
                      variant="info" 
                      onClick={() => handleDownloadPDF(patient._id)}
                    >
                      Download PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDischarge; 