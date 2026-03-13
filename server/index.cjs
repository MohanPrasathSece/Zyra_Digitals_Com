const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email Transporter (Configure with your email service)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your preferred service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// API Routes
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // 1. Send Email to Admin
        const adminMailOptions = {
            from: `"${name}" <${email}>`, // Show sender's name
            to: process.env.ADMIN_EMAIL || 'zyradigitalsofficial@gmail.com', // Admin email
            subject: `New Contact Form Submission from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        await transporter.sendMail(adminMailOptions);

        // 2. Send Confirmation Email to User
        const userMailOptions = {
            from: `"Zyra Digitals" <${process.env.EMAIL_USER}>`,
            to: email, // User's email
            subject: 'We received your message!',
            text: `Hi ${name},\n\nThank you for reaching out to Zyra Digitals. We have received your message and will get back to you shortly.\n\nBest regards,\nZyra Digitals Team`,
            html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out to <strong>Zyra Digitals</strong>.</p>
        <p>We have received your message and will get back to you shortly.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Zyra Digitals Team</strong></p>
      `,
        };

        await transporter.sendMail(userMailOptions);

        res.status(200).json({ success: true, message: 'Emails sent successfully' });

    } catch (error) {
        console.error('Email sending failed:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the dist directory
    app.use(express.static(path.join(__dirname, '../dist')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
