'use client'
import React, { FormEvent, useState } from 'react';

const EmailForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('/api/Email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, subject, body }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Email sent successfully');
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage('Error sending email');
        } finally {
            setIsSubmitting(false);
            setEmail('');
            setSubject('');
            setBody('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form className='flex flex-col mt-5' onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-xl text-gray-700 font-spaceGrotesk my-4 font-bold dark:text-white'>
                    Email address
                </label>
                <div className='mb-5'>
                    <input
                        type="email"
                        required
                        id='email'
                        placeholder='Enter your email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full h-[60px] rounded-full text-center'
                    />
                </div>
                <label htmlFor="subject" className='text-xl text-gray-700 font-spaceGrotesk my-4 font-bold dark:text-white'>
                    Subject
                </label>
                <div className='mb-5'>
                    <input
                        type="text"
                        required
                        id='subject'
                        placeholder='Enter the subject'
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className='w-full h-[60px] rounded-full text-center'
                    />
                </div>
                <label htmlFor="body" className='text-xl text-gray-700 font-spaceGrotesk my-4 font-bold dark:text-white'>
                    Body
                </label>
                <div className='mb-5'>
                    <textarea
                        required
                        id='body'
                        placeholder='Enter the email body'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className='w-full h-[150px] rounded-lg text-center'
                    />
                </div>
                <button
                    type='submit'
                    className={`btn ${isSubmitting ? 'btn-disabled' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {message && <p className='mt-2 text-center font-bold font-spaceGrotesk text-xl text-black dark:text-white'>{message}</p>}
        </div>
    );
};

export default EmailForm;
