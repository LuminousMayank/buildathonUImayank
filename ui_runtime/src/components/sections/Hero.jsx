import React from 'react';

const Hero = ({ layoutMode }) => {
    // DASHBOARD MODE
    if (layoutMode === 'dashboard') {
        return (
            <section className="animate-fade-in-up py-10 px-4 md:px-8 bg-transparent flex flex-col md:flex-row items-center justify-between gap-6 w-full relative z-10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Analytics Dashboard</h1>
                    <p className="text-sm opacity-70 max-w-lg">Monitor your key performance indicators, track active user sessions, and identify emerging trends instantly.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition">Export Report</button>
                    <button className="px-5 py-2 text-sm border border-current opacity-80 font-medium rounded-lg hover:opacity-100 transition">Date Range</button>
                </div>
            </section>
        );
    }

    // LANDING MODE (Default if not dashboard)
    return (
        <section className="animate-fade-in-up py-28 px-6 md:px-12 w-full flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-blue-50/20 to-indigo-100/20 dark:from-blue-900/20 dark:to-indigo-900/20">
            {/* Subtle light flares */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-current opacity-60 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="opacity-90">Next Gen Platform</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight">
                    Build Products That <span className="text-blue-600 dark:text-blue-400">Scale</span> With Your Vision.
                </h1>

                <p className="text-lg md:text-2xl font-light opacity-80 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Transforming complex workflows into elegant, user-centric solutions. Launch faster, iterate quicker, and build something amazing together.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto mt-4">
                    <button className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow-xl shadow-blue-500/20 hover:-translate-y-1">
                        Start Building Free
                    </button>
                    <button className="px-10 py-4 bg-transparent border-2 border-current font-semibold rounded-full hover:opacity-60 transition flex items-center justify-center gap-2">
                        View Product Demo
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
