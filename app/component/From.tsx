'use client';
import React, { FormEvent, useState } from 'react';

const EmailForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emails, setEmails] = useState('');
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
                body: JSON.stringify({ emails: emails.split(','), subject, body }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Email sent successfully');
                // Reset form fields
                setEmails('');
                setSubject('');
                setBody('');
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage('Error sending email');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                <label htmlFor="emails" className="text-xl text-gray-700 font-spaceGrotesk my-4 font-bold dark:text-black">
                    Email addresses (comma separated)
                </label>
                <div className="mb-5">
                    <input
                        type="text"
                        required
                        id="emails"
                        placeholder="Enter email addresses separated by commas"
                        value={emails}
                        onChange={(e) => setEmails(e.target.value)}
                        className="w-full h-[60px]  text-center dark:text-black"
                    />
                </div>
                <label htmlFor="subject" className="text-xl text-gray-700 font-spaceGrotesk my-4 font-bold dark:text-black">
                    Subject
                </label>
                <div className="mb-5">
                    <input
                        type="text"
                        required
                        id="subject"
                        placeholder="Enter the subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full h-[60px] text-center dark:text-black"
                    />
                </div>
                <label htmlFor="body" className="text-xl text-gray-700 font-spaceGrotesk my-4 font-bold dark:text-black">
                    Message
                </label>
                <div className="mb-5">
                    <textarea
                        required
                        id="body"
                        placeholder="Enter the message"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full h-[150px]  dark:text-black"
                    />
                </div>
                <button
                    type="submit"
                    className={`btn ${isSubmitting ? 'btn-disabled' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {message && <p className="mt-2 text-center font-bold font-spaceGrotesk text-xl text-black dark:text-white">{message}</p>}
        </div>
    );
};

export default EmailForm;
