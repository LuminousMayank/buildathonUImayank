import React from 'react';

// Common SVG Icons mapped to simple functions to keep the component clean
const Icons = {
    lightning: () => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
    ),
    shield: () => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
    ),
    globe: () => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
    ),
    chart: () => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
    ),
    userGroup: () => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
    ),
    cog: () => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    )
};

const defaultFeatures = [
    {
        title: "Lightning Fast Interpolation",
        description: "Experience absolute zero latency. Every rendering block executes seamlessly upon dynamic load without stutter ensuring your flows never break.",
        icon: "lightning"
    },
    {
        title: "Enterprise Grade Security",
        description: "Secured from the ground up natively. Advanced cryptographic protections and hardened architecture out-of-the-box globally.",
        icon: "shield"
    },
    {
        title: "Global Distribution Edge",
        description: "Deploy everywhere effortlessly. We distribute your payloads securely across 100+ edge locations maximizing scale and impact natively.",
        icon: "globe"
    }
];

const richFeatures = [
    ...defaultFeatures,
    {
        title: "Advanced Data Analytics",
        description: "Tap strictly into powerful telemetry metrics. Uncover rich telemetry mapping dynamically allowing your users full control inherently.",
        icon: "chart"
    },
    {
        title: "Collaborative Teams",
        description: "Native deeply-embedded user access controls allowing massive team alignment and synchronization seamlessly natively without delay.",
        icon: "userGroup"
    },
    {
        title: "Automated Workflows",
        description: "Turn hours into seconds. Configure algorithmic triggers bypassing tedious manual logic saving thousands of developer hours naturally.",
        icon: "cog"
    }
];

const FeatureRow = ({ variant, layoutMode }) => {
    // If variant is mapped as v1/v2, we'll generally default to a 3-item row.
    // However, if we're rendering 'v3' or rich components on standard configurations, we can expand to 6 items wrapping cleanly!
    const featureList = variant === 'v3' ? richFeatures : defaultFeatures;

    return (
        <section className="animate-fade-in-up py-4 px-4 md:px-8 max-w-7xl mx-auto w-full">
            {/* Header Text (conditional to spacing layouts) */}
            <div className={`mb-12 text-center max-w-3xl mx-auto ${layoutMode === 'dashboard' ? 'hidden' : 'block'}`}>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter">Everything You Need</h2>
                <p className="text-lg opacity-70">Built with modern principles ensuring massive performance scaling cleanly across all infrastructures inherently.</p>
            </div>

            {/* Grid Layout Container */}
            <div className={`grid grid-cols-1 ${featureList.length > 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'} gap-8`}>
                {featureList.map((feature, idx) => {
                    const IconComponent = Icons[feature.icon] || Icons.lightning;

                    return (
                        <div
                            key={idx}
                            className="group flex flex-col p-8 rounded-2xl bg-slate-500/5 border border-slate-500/10 shadow-sm backdrop-blur-md hover:-translate-y-2 hover:shadow-2xl hover:bg-slate-500/10 transition-all duration-300 ease-out relative overflow-hidden"
                        >
                            {/* Subtle background glow effect appearing on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                            <div className="relative z-10">
                                {/* Icon Frame */}
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-600 bg-opacity-10 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300 ease-out">
                                    <IconComponent />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                                <p className="opacity-70 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FeatureRow;
