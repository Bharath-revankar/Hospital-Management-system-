const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
const MedicalRecord = require('./models/MedicalRecord');
const Message = require('./models/Message');
const Prescription = require('./models/Prescription');
const Invoice = require('./models/Invoice');
const PatientDischargeDetails = require('./models/PatientDischargeDetails');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clearDatabase = async () => {
  try {
    console.log('Starting database cleanup...');

    // Clear all collections
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    await MedicalRecord.deleteMany({});
    await Message.deleteMany({});
    await Prescription.deleteMany({});
    await Invoice.deleteMany({});
    await PatientDischargeDetails.deleteMany({});

    console.log('✅ All data cleared successfully!');
    console.log('\n📝 Database is now empty and ready for fresh user registration.');
    console.log('\n🔐 You can now:');
    console.log('   1. Register new admin users');
    console.log('   2. Register new doctor users');
    console.log('   3. Register new patient users');
    console.log('   4. All authentication will use the database');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();

