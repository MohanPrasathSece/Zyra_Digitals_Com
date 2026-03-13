const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 1. Send Email to Admin
        const adminMailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.ADMIN_EMAIL || 'zyradigitalsofficial@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
        };

        await transporter.sendMail(adminMailOptions);

        // 2. Send Confirmation Email to User
        const userMailOptions = {
            from: `"Zyra Digitals" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'We received your message!',
            text: `Hi ${name},\n\nThank you for reaching out to Zyra Digitals. We have received your message and will get back to you shortly.\n\nBest regards,\nZyra Digitals Team`,
            html: `<h3>Hi ${name},</h3><p>Thank you for reaching out to <strong>Zyra Digitals</strong>.</p><p>We have received your message and will get back to you shortly.</p><br><p>Best regards,</p><p><strong>Zyra Digitals Team</strong></p>`,
        };

        await transporter.sendMail(userMailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Emails sent successfully' })
        };
    } catch (error) {
        console.error('Email sending failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' })
        };
    }
};
