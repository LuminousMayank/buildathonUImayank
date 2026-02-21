import React from 'react';

const ContactForm = ({ variant }) => {
    if (variant === 'v1') {
        return (
            <section className="animate-fade-in-up py-24 px-6 md:px-12 bg-transparent text-center">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-extrabold mb-8">Get In Touch</h2>
                    <form className="space-y-6 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 opacity-80">Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-current rounded bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 opacity-80">Email</label>
                                <input type="email" className="w-full px-4 py-2 border border-current rounded bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 opacity-80">Message</label>
                            <textarea rows="4" className="w-full px-4 py-2 border border-current rounded bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="How can we help?"></textarea>
                        </div>
                        <button type="button" className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition shadow-md">Send Message</button>
                    </form>
                </div>
            </section>
        );
    }

    if (variant === 'v2') {
        return (
            <section className="animate-fade-in-up py-20 px-6 bg-transparent">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
                    <div className="flex-1">
                        <h2 className="text-4xl font-black mb-6">Let's talk about your project.</h2>
                        <p className="text-lg opacity-80 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
                        <div className="space-y-4 opacity-80 font-medium">
                            <p className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center font-bold">@</span>
                                hello@agency.com
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center font-bold">#</span>
                                +1 (555) 123-4567
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 p-8 rounded-2xl shadow-xl border border-current opacity-90 text-sm">
                        <form className="space-y-5">
                            <input type="text" className="w-full px-0 py-3 border-b border-current focus:border-blue-500 outline-none transition-colors bg-transparent placeholder-current opacity-70" placeholder="Your Name" />
                            <input type="email" className="w-full px-0 py-3 border-b border-current focus:border-blue-500 outline-none transition-colors bg-transparent placeholder-current opacity-70" placeholder="Email Address" />
                            <textarea rows="3" className="w-full px-0 py-3 border-b border-current focus:border-blue-500 outline-none transition-colors bg-transparent placeholder-current opacity-70 resize-none" placeholder="Tell us about it"></textarea>
                            <button type="button" className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">Submit Request</button>
                        </form>
                    </div>
                </div>
            </section>
        );
    }

    // Variant v3: Minimal, huge inputs
    return (
        <section className="animate-fade-in-up py-32 px-6 bg-transparent text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-5xl font-light tracking-tight mb-16">Start a conversation.</h2>
                <form className="space-y-8">
                    <input type="email" className="w-full text-center text-2xl py-4 bg-transparent border-b-2 border-current outline-none transition-opacity opacity-70 placeholder-current focus:opacity-100" placeholder="Enter your email" />
                    <button type="button" className="text-xl border-b pb-1 hover:opacity-50 transition inline-block mt-8">Continue &rarr;</button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
