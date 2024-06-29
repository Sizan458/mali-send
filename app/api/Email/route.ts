import { generateEmailBody, sendEmail } from '@/lib/nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { emails, subject, body } = await request.json();

        if (!emails || !subject || !body) {
            return NextResponse.json({ message: 'Emails, subject, and body are required' }, { status: 400 });
        }

        const emailContent = await generateEmailBody(subject, body);
        await sendEmail(emailContent, emails);

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
