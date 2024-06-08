import { generateEmailBody, sendEmail } from '@/lib/nodemailer';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    const { email } = await request.json();

    if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    try {
        const emailContent = await generateEmailBody();
        await sendEmail(emailContent, [email]);
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
    }
}
