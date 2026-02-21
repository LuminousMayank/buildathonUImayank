import React from 'react';

const HorizontalGallery = ({ variant = 'v1' }) => {
    const isV1 = variant === 'v1';

    // Sample data
    const cards = [
        { id: 1, title: 'Project Alpha', subtitle: 'Web Application', gradient: 'from-blue-500 to-cyan-400' },
        { id: 2, title: 'Project Beta', subtitle: 'Mobile iOS', gradient: 'from-purple-500 to-indigo-500' },
        { id: 3, title: 'Project Gamma', subtitle: 'Data Pipeline', gradient: 'from-emerald-500 to-teal-400' },
        { id: 4, title: 'Project Delta', subtitle: 'Cloud Infrastructure', gradient: 'from-orange-500 to-rose-400' },
        { id: 5, title: 'Project Epsilon', subtitle: 'AI Model', gradient: 'from-pink-500 to-fuchsia-500' },
        { id: 6, title: 'Project Zeta', subtitle: 'Hardware IoT', gradient: 'from-amber-400 to-yellow-500' }
    ];

    return (
        <section className="w-full py-16 md:py-24 bg-transparent overflow-hidden">
            {/* Native CSS override for completely hiding standard scrollbars across browsers while retaining scroll mechanics */}
            <style>{`
                .hide-scroll {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .hide-scroll::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Initiatives</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
                    Swipe through our most experimental architectures and scaling modules. Every card represents a paradigm shift natively running on edge compute.
                </p>
            </div>

            {/* Horizontal Scroll Container utilizing native CSS scroll snapping targets */}
            <div className="flex w-full overflow-x-auto hide-scroll snap-x snap-mandatory px-6 pb-12 pt-4 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="flex gap-6 md:gap-8 mx-auto w-max max-w-7xl relative pl-2 lg:pl-0 pr-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`
                                relative flex-shrink-0 w-[280px] h-[380px] md:w-[320px] md:h-[420px] rounded-xl snap-center md:snap-start
                                transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-3 cursor-pointer group
                                ${isV1
                                    ? "bg-gradient-to-br " + card.gradient + " shadow-xl hover:shadow-2xl"
                                    : 'bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)]'
                                }
                            `}
                        >
                            {/* Inner Accent Container */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end overflow-hidden rounded-xl">
                                {isV1 && (
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                                )}

                                <div className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-2">
                                    <p className={`text-sm font-semibold tracking-wider uppercase mb-2 ${isV1 ? 'text-white/80' : 'text-blue-500 line-clamp-1'}`}>
                                        {card.subtitle}
                                    </p>
                                    <h3 className={`text-2xl font-bold ${isV1 ? 'text-white' : 'text-slate-900 dark:text-white line-clamp-2'}`}>
                                        {card.title}
                                    </h3>
                                </div>

                                {/* Decorative V2 elements: Glassmorphism massive blurred spheres mapped to the array index gradient */}
                                {!isV1 && (
                                    <div
                                        className={`absolute top-6 right-6 w-32 h-32 rounded-full bg-gradient-to-br ${card.gradient} opacity-20 filter blur-3xl group-hover:scale-[2] group-hover:opacity-40 transition-all duration-700 pointer-events-none`}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default HorizontalGallery;
