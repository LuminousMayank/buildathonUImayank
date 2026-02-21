import React, { useEffect, useState } from 'react';

const SplitReveal = ({ variant = 'v1', designDNA = {}, content, setContent, editMode }) => {
    const isV1 = variant === 'v1';
    const [isVisible, setIsVisible] = useState(false);

    // Simple mount animation driver
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const radiusClass = {
        'sm': 'rounded-lg',
        'md': 'rounded-xl',
        'lg': 'rounded-3xl',
        'none': 'rounded-none'
    }[designDNA?.radius] || 'rounded-3xl';

    // Extract dynamic content cleanly
    const splitContent = content?.splitReveal || content?.split || {
        title: "Building the foundation for tomorrow.",
        description: "We don't just write code; we architect scalable solutions that empower businesses to operate at the speed of thought. Every module is a testament to our obsession with perfection."
    };

    const handleUpdate = (field, e) => {
        if (!setContent) return;
        const newValue = e.currentTarget.textContent;
        setContent(prev => ({
            ...prev,
            splitReveal: {
                ...(prev.splitReveal || prev.split || {}),
                [field]: newValue
            }
        }));
    };

    const editableClass = editMode
        ? "border-dashed border-2 border-indigo-500/50 bg-indigo-500/10 outline-none rounded-md transition-all px-2 py-1 min-w-[20px] inline-block"
        : "outline-none";

    return (
        <section className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 overflow-hidden">
            <div className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${!isV1 ? 'md:flex-row-reverse' : ''}`}>

                {/* Text Content */}
                <div
                    className={`flex-1 flex flex-col justify-center transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-500 uppercase bg-blue-500/10 rounded-full w-fit">
                        Our Story
                    </div>

                    <h2
                        className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white leading-tight ${editableClass}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleUpdate('title', e)}
                    >
                        {splitContent.title}
                    </h2>

                    <p
                        className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl ${editableClass}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleUpdate('description', e)}
                    >
                        {splitContent.description}
                    </p>

                    <ul className="space-y-4 mb-8">
                        {["Pixel-perfect precision.", "Data-driven architectures.", "Uncompromising performance."].map((item, i) => (
                            <li key={i} className="flex items-center text-slate-700 dark:text-slate-300 font-medium text-lg">
                                <svg className="w-6 h-6 text-emerald-500 mr-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Decorative Visual Block */}
                <div
                    className={`flex-1 w-full transition-all duration-1000 delay-300 ease-[cubic-bezier(0.25,1,0.5,1)] transform ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-16 scale-95'}`}
                >
                    <div className={`relative w-full aspect-square md:aspect-[4/5] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${radiusClass} overflow-hidden shadow-2xl group`}>
                        {/* Abstract Gradient Mesh Placeholder */}
                        <div className="absolute inset-0 opacity-80 mix-blend-multiply dark:mix-blend-screen filter saturate-150 transition-transform duration-700 group-hover:scale-105 pointer-events-none">
                            <div className="absolute -top-1/4 -right-1/4 w-[120%] h-[120%] bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/10 rounded-full blur-[80px] animate-pulse"></div>
                            <div className="absolute -bottom-1/4 -left-1/4 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/20 via-cyan-500/10 to-emerald-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                        </div>

                        {/* Glassmorphism accent card */}
                        <div className={`absolute bottom-8 ${isV1 ? 'left-8' : 'right-8'} p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 ${radiusClass} shadow-2xl max-w-xs transition-transform duration-500 hover:-translate-y-2 pointer-events-none`}>
                            <p className="text-slate-900 dark:text-white font-bold mb-1 text-lg">Architecture</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Deployed seamlessly across edge nodes globally targeting high availability.</p>
                        </div>

                        {/* Decorative wireframe lines */}
                        <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 m-8 rounded-3xl"></div>
                        <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-16 rounded-3xl"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SplitReveal;
