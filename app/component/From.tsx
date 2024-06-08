'use client'
import React, { FormEvent, useState } from 'react';

const EmailForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
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
                body: JSON.stringify({ email }),
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
        }
    };

    return (
        <div>
            <form className='flex flex-col mt-5' onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-sm font-medium text-gray-700'>
                    Email address
                </label>
                <div className='dialog-input_container'>
                    <input
                        type="email"
                        required
                        id='email'
                        placeholder='Enter your email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='dialog-input'
                    />
                </div>
                <button type='submit' className='btn'>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EmailForm;
