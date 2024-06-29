import nodemailer from 'nodemailer';

export interface EmailContent {
    subject: string;
    body: string;
}

export async function generateEmailBody(subject: string, body: string): Promise<EmailContent> {
    return { subject, body };
}

const transporter = nodemailer.createTransport({
    pool: true,
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    maxConnections: 34,
    maxMessages: 100,
    rateDelta: 10000,
    rateLimit: 5
});

export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
    const mailOptions = {
        from: `"Mail Sender" <${process.env.EMAIL_USER}>`,
        to: sendTo.join(','), // Join the array of email addresses
        subject: emailContent.subject,
        html: emailContent.body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
