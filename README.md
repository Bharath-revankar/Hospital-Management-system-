# Hospital Management System - MERN Stack

A comprehensive Hospital Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with JWT authentication, role-based access control, and real-time communication.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Doctor, Patient)
- Secure password hashing with bcrypt
- Protected routes and middleware

### 👥 User Management
- **Admin**: Manage doctors, patients, appointments, and billing
- **Doctor**: View assigned patients, manage appointments
- **Patient**: Book appointments, view medical records, manage healthcare

### 📋 Appointment System
- Book appointments with doctors
- Real-time appointment updates via Socket.io
- Appointment approval workflow
- Search and filter appointments

### 🔍 Search & Filter
- Advanced search for doctors by department
- Patient search by symptoms
- Appointment filtering by status

### 📊 Dashboard Analytics
- Real-time statistics for each user role
- Visual cards showing key metrics
- Recent activity tables

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Socket.io** - Real-time communication
- **PDFKit** - PDF generation
- **Express Validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **React Bootstrap** - UI components
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Toastify** - Notifications
- **React Icons** - Icon library

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/hospital_management
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```
4. Start the server:
   ```bash
   npm run server
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Running Both (Development)
From the root directory:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Admin Routes
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/doctors` - Get all doctors
- `POST /api/admin/doctors` - Add new doctor
- `PUT /api/admin/doctors/:id/approve` - Approve doctor
- `DELETE /api/admin/doctors/:id` - Delete doctor
- `GET /api/admin/patients` - Get all patients
- `POST /api/admin/patients` - Add new patient
- `PUT /api/admin/patients/:id/approve` - Approve patient
- `DELETE /api/admin/patients/:id` - Delete patient

### Doctor Routes
- `GET /api/doctor/dashboard` - Doctor dashboard data
- `GET /api/doctor/patients` - Get assigned patients
- `GET /api/doctor/appointments` - Get doctor's appointments
- `PUT /api/doctor/profile` - Update doctor profile

### Patient Routes
- `GET /api/patient/dashboard` - Patient dashboard data
- `GET /api/patient/doctors` - Get available doctors
- `GET /api/patient/appointments` - Get patient's appointments
- `POST /api/patient/appointments` - Book new appointment
- `GET /api/patient/discharge` - Get discharge details

### Appointment Routes
- `GET /api/appointment` - Get appointments
- `POST /api/appointment` - Create appointment
- `PUT /api/appointment/:id` - Update appointment
- `DELETE /api/appointment/:id` - Delete appointment
- `PUT /api/appointment/:id/approve` - Approve appointment

### Discharge Routes
- `GET /api/discharge/patients` - Get patients for discharge
- `POST /api/discharge/:patientId` - Discharge patient
- `GET /api/discharge/:patientId/pdf` - Generate PDF bill

## Database Schema

### User
- firstName, lastName, username, email, password, role, createdAt

### Doctor
- user (ref), profilePic, address, mobile, department, status, createdAt

### Patient
- user (ref), profilePic, address, mobile, symptoms, assignedDoctorId, admitDate, status, createdAt

### Appointment
- patientId, doctorId, patientName, doctorName, appointmentDate, description, status, createdAt

### PatientDischargeDetails
- patientId, patientName, assignedDoctorName, address, mobile, symptoms, admitDate, releaseDate, daySpent, roomCharge, medicineCost, doctorFee, otherCharge, total, createdAt

## Features by Role

### Admin
- View dashboard with statistics
- Manage doctors (add, edit, delete, approve)
- Manage patients (add, edit, delete, approve)
- Manage appointments (view, approve, delete)
- Discharge patients and generate bills
- Download PDF invoices

### Doctor
- View dashboard with patient statistics
- View assigned patients
- View and manage appointments
- Update profile information

### Patient
- View personal dashboard
- Book appointments with doctors
- View appointment history
- Search and view available doctors
- View discharge details and bills

## Real-time Features

- Socket.io integration for real-time updates
- Live appointment status updates
- Real-time notifications for new appointments
- Instant dashboard updates

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected API endpoints
- Input validation and sanitization

## Deployment

### Backend Deployment
1. Set up environment variables
2. Configure MongoDB connection
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository. 
