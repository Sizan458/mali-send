"use server"
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from 'next/server';

export interface EmailContent {
    subject: string;
    body: string;
}

export async function generateEmailBody(subject: string, body: string): Promise<EmailContent> {
    return { subject, body };
}

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});



export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
    const mailOptions = {
        from: '"Mail Sender" <www.shijan23@gmail.com>',
        to: sendTo,
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

export async function POST(request: NextRequest) {
    try {
        const { email, subject, body } = await request.json();

        if (!email || !subject || !body) {
            return NextResponse.json({ message: 'Email, subject, and body are required' }, { status: 400 });
        }

        const emailContent = await generateEmailBody(subject, body);
        const info = await sendEmail(emailContent, [email]);

        return NextResponse.json({ message: 'Email sent successfully', info }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);

        let errorMessage = 'Error sending email';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}
