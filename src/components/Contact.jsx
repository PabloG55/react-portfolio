import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa'; // Using react-icons

export default function Contact() {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.target;
        const data = new FormData(form);

        try {
            await fetch('https://script.google.com/macros/s/AKfycbyRAG5dV_3xDXy6xA7hTsFOoipw9LYptLcF8gbnQUCGl5J4LHAJkxFWhYEE1oLkKAE/exec', {
                method: 'POST',
                body: data,
                mode: 'no-cors' // Often needed when posting to Google Scripts like this, though you won't get a direct response.
            });
            setMessage('Message sent successfully!');
            form.reset();
        } catch (error) {
            setMessage('Failed to send message. Please try again.');
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    return (
        <section id="contact" className="scroll-mt-10 py-20 bg-black"> {/* Matched About bg */}
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-12 text-center text-white">Contact Me</h1>
                <div className="flex flex-col md:flex-row gap-16"> {/* Increased gap */}
                    <div className="md:w-1/2 text-gray-300">
                        <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
                        <p className="mb-4 flex items-center"><FaEnvelope className="mr-4 text-blue text-xl" /> pgarcesb1@gmail.com</p>
                        <p className="mb-6 flex items-center"><FaPhone className="mr-4 text-blue text-xl" /> +1 (980) 358-7992</p>
                        <div className="flex gap-6 text-3xl mt-8"> {/* Increased size and gap */}
                            <a href="https://www.linkedin.com/in/pablogarces5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:-translate-y-1"><FaLinkedin /></a>
                            <a href="https://github.com/PabloG55" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:-translate-y-1"><FaGithub /></a>
                        </div>
                        <a href="/src/images/my-cv.pdf" download className="btn inline-block mt-10 px-8 py-3 bg-blue text-white rounded hover:bg-blue-900 transition duration-300 shadow-lg">Download CV</a>
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-semibold text-white mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input type="text" name="Name" placeholder="Your Name" required className="w-full bg-gray-800 p-4 rounded text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="email" name="Email" placeholder="Your Email" required className="w-full bg-gray-800 p-4 rounded text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <textarea name="Message" rows="6" placeholder="Your Message" required className="w-full bg-gray-800 p-4 rounded text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue py-3 rounded hover:bg-blue-900 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>
                            {message && <p className={`mt-3 text-center ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
                        </form>
                    </div>
                </div>
                <div className="text-center mt-20 text-sm text-gray-500"> {/* Increased margin */}
                    <p>Copyright © Pablo Garces — <a href="https://github.com/PabloG55/PortfolioWebsite" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Website Repository</a></p>
                </div>
            </div>
        </section>
    );
}