import React from 'react';

const MarqueeBand = ({ variant = 'v1' }) => {
    const isV1 = variant === 'v1';

    // Core content to repeat continuously
    const items = [
        "INNOVATION", "•", "SPEED", "•", "DESIGN", "•", "SCALE", "•", "FUTURE", "•"
    ];

    // Background contrast logic pairing
    const bgClass = isV1 ? "bg-[#E2F059] border-y border-black/10 text-black shadow-inner" : "bg-black border-y border-white/10 text-white";

    const typographyClass = "text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none hover:scale-105 transition-transform duration-300";

    return (
        <section className={`w-full overflow-hidden flex items-center h-48 md:h-64 relative ${bgClass}`}>
            {/* Inline standard CSS for fluid 50% loop shift perfectly isolated from tailwind resets */}
            <style>{`
                @keyframes infiniteScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infiniteScroll 30s linear infinite;
                }
                .text-stroke-v2 {
                    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
                    color: transparent;
                }
                /* Optimization to prevent painting jitters */
                .hardware-accelerated {
                    will-change: transform;
                    backface-visibility: hidden;
                }
            `}</style>

            {/* Darker subtle gradient overlays for blending the edges */}
            <div className={`absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r ${isV1 ? 'from-[#E2F059]' : 'from-black'} to-transparent`}></div>
            <div className={`absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l ${isV1 ? 'from-[#E2F059]' : 'from-black'} to-transparent`}></div>

            {/* The scrolling track utilizing 200% width and dual flex containers */}
            <div className="flex w-[200%] md:w-[200%] animate-infinite-scroll hardware-accelerated whitespace-nowrap items-center group">

                {/* 
                  We repeat the sequence perfectly identically twice, 
                  because the CSS animation resets when the FIRST block finishes sliding off. 
                */}

                <div className="flex w-1/2 justify-around items-center px-4">
                    {items.map((item, i) => (
                        <span key={`block1-${i}`} className={`${typographyClass} mx-8 ${!isV1 && item !== '•' ? 'text-stroke-v2' : ''} ${item === '•' ? 'text-4xl text-current opacity-40' : ''}`}>
                            {item}
                        </span>
                    ))}
                </div>

                <div className="flex w-1/2 justify-around items-center px-4">
                    {items.map((item, i) => (
                        <span key={`block2-${i}`} className={`${typographyClass} mx-8 ${!isV1 && item !== '•' ? 'text-stroke-v2' : ''} ${item === '•' ? 'text-4xl text-current opacity-40' : ''}`}>
                            {item}
                        </span>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default MarqueeBand;
