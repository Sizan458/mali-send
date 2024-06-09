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
    pool: true,
    service: 'hotmail',
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    maxConnections: 34,
    maxMessages: 100, // Example rate limiting
    rateDelta: 10000, // Example rate limiting (10 seconds)
    rateLimit: 5 // Max 5 messages per 10 seconds
});

export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
    const mailOptions = {
        from: '"Mali Send" <shijan23@hotmail.com>',
        to: sendTo,
        subject: emailContent.subject,
        html: emailContent.body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export async function POST(request: NextRequest) {
    try {
        const { email, subject, body } = await request.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const emailContent = await generateEmailBody(subject, body);
        await sendEmail(emailContent, [email]);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);

        let errorMessage = 'Error sending email';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}
