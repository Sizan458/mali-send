import { generateEmailBody, sendEmail } from '@/lib/nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email, subject, body } = await request.json();

        if (!email || !subject || !body) {
            return NextResponse.json({ message: 'Email, subject, and body are required' }, { status: 400 });
        }

        const emailContent = await generateEmailBody(subject, body);
        await sendEmail(emailContent, [email]);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
    }
}
