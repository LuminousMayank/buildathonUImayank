import React from 'react';

const FullscreenHero = ({ variant = 'v1', designDNA = {} }) => {
    // 1. Map Design DNA dynamically
    // density -> spacing scale
    const paddingY = designDNA?.density === 'compact' ? 'py-12' : 'py-32';
    const paddingX = designDNA?.density === 'compact' ? 'px-6' : 'px-12';

    // radius -> button rounding
    const btnRadius = {
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-full',
        'none': 'rounded-none'
    }[designDNA?.radius] || 'rounded-full';

    // Premium styling variants
    const isV1 = variant === 'v1';

    return (
        <section className={`relative w-full min-h-screen flex items-center overflow-hidden bg-slate-950 text-white ${paddingX} ${paddingY}`}>
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-black/80"></div>
                {/* Subtle moving blobs for premium aesthetic fluidity */}
                <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content Container */}
            <div className={`relative z-10 w-full max-w-7xl mx-auto flex flex-col ${isV1 ? 'items-center text-center' : 'items-start text-left'} animate-fade-in-up`}>

                <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-8">
                    Crafting Digital <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Masterpieces</span>
                </h1>

                <p className={`text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12 ${isV1 ? 'max-w-3xl' : 'max-w-2xl'}`}>
                    We blend cutting-edge technology with premium aesthetic design frameworks to build experiences that define the future of the web.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                    <button className={`px-10 py-4 bg-white text-black text-lg font-semibold tracking-wide hover:bg-slate-200 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-white/10 ${btnRadius}`}>
                        Start the Vision
                    </button>
                    <button className={`px-10 py-4 bg-transparent border border-white/20 text-white text-lg font-semibold tracking-wide hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 ${btnRadius}`}>
                        Explore Our Work
                    </button>
                </div>

                {/* Decorative floating shapes for v2 */}
                {!isV1 && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex opacity-90 pointer-events-none items-center justify-center">
                        <div className="relative w-96 h-96">
                            <div className="absolute inset-0 border-[1px] border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-8 border-[1px] border-blue-400/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                            <div className="absolute inset-16 border-[1px] border-purple-400/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                            {/* Inner core glow matching aesthetic */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FullscreenHero;
