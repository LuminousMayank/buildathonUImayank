import React from 'react';

const defaultTilesData = [
    {
        title: "Performance First",
        subtext: "Latency drops to near zero with edge rendering globally instantly.",
        gradient: "from-orange-500/10 to-rose-500/5 hover:to-rose-500/20",
        v1Span: "col-span-1 md:col-span-2 row-span-1",
        v2Span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
        title: "Dynamic Engines",
        subtext: "Self-healing distributed systems out of the box running cleanly.",
        gradient: "from-blue-500/10 to-cyan-500/5 hover:to-cyan-500/20",
        v1Span: "col-span-1 md:col-span-2 row-span-1",
        v2Span: "col-span-1 md:col-span-1 row-span-1",
    },
    {
        title: "Secure Design",
        subtext: "Enterprise SSO baked securely into the framework natively without wrappers.",
        gradient: "from-emerald-500/10 to-teal-500/5 hover:to-teal-500/20",
        v1Span: "col-span-1 md:col-span-2 row-span-1",
        v2Span: "col-span-1 md:col-span-1 row-span-2",
    },
    {
        title: "Limitless Scale",
        subtext: "Deploy anywhere. Handle millions of requests simultaneously.",
        gradient: "from-purple-500/10 to-indigo-500/5 hover:to-indigo-500/20",
        v1Span: "col-span-1 md:col-span-2 row-span-1",
        v2Span: "col-span-1 md:col-span-2 row-span-1",
    },
    {
        title: "Deep Analytics",
        subtext: "Real-time pipeline metrics tracking your user retention inherently.",
        gradient: "from-amber-500/10 to-yellow-500/5 hover:to-yellow-500/20",
        v1Span: "col-span-1 md:col-span-4 row-span-1",
        v2Span: "col-span-1 md:col-span-1 row-span-1",
    }
];

const BentoGrid = ({ variant = 'v1', designDNA = {}, content, setContent, editMode }) => {
    // 1. Map Design DNA
    const gapClass = designDNA?.density === 'compact' ? 'gap-4' : 'gap-6 md:gap-8';

    // Apple/Notion style rounding requires highly pronounced radius limits.
    const radiusClass = {
        'sm': 'rounded-xl',
        'md': 'rounded-2xl',
        'lg': 'rounded-[2rem]',
        'none': 'rounded-none'
    }[designDNA?.radius] || 'rounded-3xl';

    // 2. Safe Array Extraction & Hydration
    const tilesToRender = Array.isArray(content?.bentoGrid) && content.bentoGrid.length > 0
        ? content.bentoGrid.map((t, i) => ({ ...defaultTilesData[i], ...t }))
        : defaultTilesData;

    const isV1 = variant === 'v1';

    // Handler to safely update the nested contentEditable array structure
    const handleUpdate = (index, field, e) => {
        if (!setContent) return;
        const newValue = e.currentTarget.textContent;

        setContent(prev => {
            const currentTiles = Array.isArray(prev.bentoGrid) && prev.bentoGrid.length > 0
                ? [...prev.bentoGrid]
                : defaultTilesData.map(t => ({ ...t }));

            while (currentTiles.length <= index) {
                currentTiles.push({ ...defaultTilesData[currentTiles.length] });
            }

            currentTiles[index] = {
                ...currentTiles[index],
                [field]: newValue
            };

            return {
                ...prev,
                bentoGrid: currentTiles
            };
        });
    };

    const editableClass = editMode
        ? "border-dashed border-2 border-indigo-500/50 bg-indigo-500/10 outline-none rounded-md transition-all px-1 inline-block"
        : "outline-none";

    return (
        <section className="w-full max-w-7xl mx-auto py-16 px-6 relative animate-fade-in-up">
            <div className={`grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(220px,auto)] ${gapClass}`}>
                {tilesToRender.map((tile, idx) => {
                    const spanClass = isV1 ? tile.v1Span : tile.v2Span;

                    return (
                        <div
                            key={idx}
                            /* The hover state animations are totally unbroken because they target nested elements natively via group modifiers */
                            className={`${spanClass} ${radiusClass} p-8 flex flex-col justify-end bg-gradient-to-br ${tile.gradient} bg-slate-900/60 ${editMode ? 'border-dashed border-2 border-indigo-400/50' : 'border border-slate-700/50'} shadow-2xl overflow-hidden group hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] relative backdrop-blur-md`}
                        >
                            {/* Inner subtle glow */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10 text-left mt-auto">
                                <h3
                                    className={`text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3 group-hover:translate-x-2 transition-transform duration-500 ease-out ${editableClass}`}
                                    contentEditable={editMode}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleUpdate(idx, 'title', e)}
                                >
                                    {tile.title}
                                </h3>
                                <div>
                                    <p
                                        className={`text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors duration-300 text-sm md:text-base ${editableClass}`}
                                        contentEditable={editMode}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleUpdate(idx, 'subtext', e)}
                                    >
                                        {tile.subtext}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default BentoGrid;
