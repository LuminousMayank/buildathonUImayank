import React from 'react';

const Footer = ({ variant }) => {
    if (variant === 'v1') {
        return (
            <footer className="animate-fade-in-up py-12 px-6 md:px-12 bg-transparent text-sm opacity-80 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>&copy; {new Date().getFullYear()} UI Builder. All rights reserved.</div>
                <div className="flex gap-6">
                    <a href="#" className="hover:opacity-50 transition">Twitter</a>
                    <a href="#" className="hover:opacity-50 transition">LinkedIn</a>
                    <a href="#" className="hover:opacity-50 transition">GitHub</a>
                </div>
            </footer>
        );
    }

    if (variant === 'v2') {
        return (
            <footer className="animate-fade-in-up pt-16 pb-8 px-6 md:px-12 bg-transparent opacity-90">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">UI Builder</h3>
                        <p className="max-w-xs leading-relaxed opacity-80">Crafting digital products that inspire and perform. Based in San Francisco, CA.</p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Navigation</h4>
                        <ul className="space-y-2 opacity-80">
                            <li><a href="#" className="hover:opacity-50 transition">Home</a></li>
                            <li><a href="#" className="hover:opacity-50 transition">Work</a></li>
                            <li><a href="#" className="hover:opacity-50 transition">Services</a></li>
                            <li><a href="#" className="hover:opacity-50 transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Legal</h4>
                        <ul className="space-y-2 opacity-80">
                            <li><a href="#" className="hover:opacity-50 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:opacity-50 transition">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 border-t border-current border-opacity-20 text-sm flex justify-between opacity-60">
                    <span>&copy; {new Date().getFullYear()} UI Builder.</span>
                    <span>Made with precision.</span>
                </div>
            </footer>
        );
    }

    // Variant v3: Bold typography
    return (
        <footer className="animate-fade-in-up py-20 px-6 bg-transparent flex flex-col items-center justify-center text-center">
            <h2 className="text-6xl md:text-9xl font-black opacity-10 mb-8 uppercase tracking-tighter">UI Builder</h2>
            <div className="flex gap-8 text-lg font-medium opacity-80">
                <a href="#" className="hover:opacity-50 transition">Dribbble</a>
                <a href="#" className="hover:opacity-50 transition">Instagram</a>
                <a href="#" className="hover:opacity-50 transition">Behance</a>
            </div>
        </footer>
    );
};

export default Footer;
