import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaDownload, FaCalendarAlt, FaFileInvoiceDollar } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { useAuth } from '../../contexts/AuthContext';

const PatientAppointmentWithPDF = () => {
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchAppointments();
    fetchInvoices();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointment/approved');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const patientId = user.patientId || user._id;
      const response = await axios.get(`/api/invoices/patient/${patientId}`);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const generateAppointmentPDF = (appointment) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(0, 123, 255);
      doc.text('HOSPITAL MANAGEMENT SYSTEM', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('APPOINTMENT CONFIRMATION', pageWidth / 2, 35, { align: 'center' });

      // Patient Information
      doc.setFontSize(14);
      doc.setTextColor(0, 100, 0);
      doc.text('Patient Information:', 20, 55);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${appointment.patientId?.user?.firstName} ${appointment.patientId?.user?.lastName}`, 20, 70);
      doc.text(`Email: ${appointment.patientId?.user?.email}`, 20, 80);

      // Appointment Details
      doc.setFontSize(14);
      doc.setTextColor(0, 100, 0);
      doc.text('Appointment Details:', 20, 100);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Doctor: Dr. ${appointment.doctorId?.user?.firstName} ${appointment.doctorId?.user?.lastName}`, 20, 115);
      doc.text(`Department: ${appointment.doctorId?.department}`, 20, 125);
      doc.text(`Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}`, 20, 135);
      doc.text(`Time: ${appointment.appointmentTime}`, 20, 145);
      doc.text(`Status: ${appointment.status ? 'Confirmed' : 'Pending'}`, 20, 155);
      
      if (appointment.description) {
        doc.text(`Notes: ${appointment.description}`, 20, 165);
      }

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280);
      doc.text('Please arrive 15 minutes before your appointment time.', pageWidth / 2, 290, { align: 'center' });

      // Save the PDF
      const fileName = `appointment-${appointment._id}.pdf`;
      doc.save(fileName);
      toast.success('Appointment PDF downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating appointment PDF:', error);
      toast.error('Failed to generate appointment PDF. Please try again.');
    }
  };

  const generateInvoicePDF = (invoice) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(0, 123, 255);
      doc.text('HOSPITAL MANAGEMENT SYSTEM', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('INVOICE', pageWidth / 2, 35, { align: 'center' });

      // Invoice Info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 20, 55);
      doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 20, 65);
      doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, 75);

      // Patient Information
      doc.setFontSize(14);
      doc.setTextColor(0, 100, 0);
      doc.text('Bill To:', 20, 95);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`${invoice.patient?.firstName} ${invoice.patient?.lastName}`, 20, 110);

      // Items
      doc.setFontSize(14);
      doc.setTextColor(0, 100, 0);
      doc.text('Services:', 20, 130);
      
      let yPos = 145;
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      invoice.items.forEach(item => {
        doc.text(`${item.description}: $${item.amount}`, 20, yPos);
        yPos += 10;
      });

      // Totals
      yPos += 10;
      doc.text(`Subtotal: $${invoice.subtotal}`, 20, yPos);
      doc.text(`Tax: $${invoice.tax.toFixed(2)}`, 20, yPos + 10);
      
      doc.setFontSize(14);
      doc.setTextColor(255, 0, 0);
      doc.text(`Total: $${invoice.total.toFixed(2)}`, 20, yPos + 25);

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280);

      // Save the PDF
      const fileName = `invoice-${invoice.invoiceNumber}.pdf`;
      doc.save(fileName);
      toast.success('Invoice PDF downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
      toast.error('Failed to generate invoice PDF. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    return status ? (
      <Badge bg="success">Confirmed</Badge>
    ) : (
      <Badge bg="warning">Pending</Badge>
    );
  };

  const findInvoiceForAppointment = (appointmentId) => {
    return invoices.find(invoice => invoice.appointment?._id === appointmentId);
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">My Appointments</h2>
      
      <Card>
        <Card.Header>
          <h5 className="mb-0">
            <FaCalendarAlt className="me-2" />
            Confirmed Appointments
          </h5>
        </Card.Header>
        <Card.Body>
          {appointments.length === 0 ? (
            <Alert variant="info">
              No confirmed appointments found.
            </Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => {
                  const invoice = findInvoiceForAppointment(appointment._id);
                  
                  return (
                    <tr key={appointment._id}>
                      <td>
                        Dr. {appointment.doctorId?.user?.firstName} {appointment.doctorId?.user?.lastName}
                      </td>
                      <td>{appointment.doctorId?.department}</td>
                      <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                      <td>{appointment.appointmentTime}</td>
                      <td>{getStatusBadge(appointment.status)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => generateAppointmentPDF(appointment)}
                          >
                            <FaDownload className="me-1" />
                            Download Appointment
                          </Button>
                          
                          {invoice && (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => generateInvoicePDF(invoice)}
                            >
                              <FaFileInvoiceDollar className="me-1" />
                              Download Invoice
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PatientAppointmentWithPDF;
