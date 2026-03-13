import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, message, isChatbot } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        // 1. Send Email to Admin
        const adminSubject = isChatbot
            ? `🤖 New AI Lead: ${name} (via Zyra Chatbot)`
            : `New Contact Form Submission from ${name}`;

        const adminHtml = isChatbot
            ? `<h3>🤖 New AI Lead Collected</h3>
               <p><strong>Source:</strong> Zyra Digital Assistant</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Project Details:</strong></p>
               <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${message.replace(/\n/g, '<br>')}</div>`
            : `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`;

        const adminMailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.ADMIN_EMAIL || 'zyradigitalsofficial@gmail.com',
            subject: adminSubject,
            text: `Source: Zyra Chatbot\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: adminHtml,
        };

        await transporter.sendMail(adminMailOptions);

        // 2. Send Confirmation Email to User
        const userMailOptions = {
            from: `"Zyra Digitals" <${process.env.EMAIL_USER}>`,
            to: email, // User's email
            subject: 'We received your message!',
            text: `Hi ${name},\n\nThank you for reaching out to Zyra Digitals. We have received your message and will get back to you shortly.\n\nBest regards,\nZyra Digitals Team`,
            html: `<h3>Hi ${name},</h3><p>Thank you for reaching out to <strong>Zyra Digitals</strong>.</p><p>We have received your message and will get back to you shortly.</p><br><p>Best regards,</p><p><strong>Zyra Digitals Team</strong></p>`,
        };

        await transporter.sendMail(userMailOptions);

        return res.status(200).json({ success: true, message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Email sending failed:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
