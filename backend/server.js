require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// --- API Routes ---
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// POST: Add new student
app.post('/api/students', async (req, res) => {
    try {
        // Check if email exists
        const existing = await Student.findOne({ email: req.body.email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Update student
app.put('/api/students/:id', async (req, res) => {
    try {
        // Enforce unique email check if they changed their email
        const existing = await Student.findOne({ email: req.body.email.toLowerCase(), _id: { $ne: req.params.id } });
        if (existing) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) return res.status(404).json({ error: 'Student not found' });
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Remove student
app.delete('/api/students/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ error: 'Student not found' });
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on${PORT}`);
});
