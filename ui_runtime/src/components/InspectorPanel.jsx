import React, { useEffect, useState } from 'react';

const ProgressBar = ({ label, value, plan, colorClass = "bg-blue-500" }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(0);
        const timer = setTimeout(() => setWidth(value * 100), 50);
        return () => clearTimeout(timer);
    }, [value, plan]);

    return (
        <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
                <span className="text-gray-500 font-mono">{(value * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                <div
                    className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${colorClass}`}
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
};

const InspectorPanel = ({ prediction, plan }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!plan) return null;

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-gray-900/95 backdrop-blur-xl border border-white/10 text-white rounded-full shadow-2xl hover:bg-black transition-all hover:scale-105 animate-fade-in-up group"
            >
                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] group-hover:bg-indigo-400"></div>
                <span className="text-xs font-bold tracking-wider opacity-90 group-hover:opacity-100">AI Logic Inspector</span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[340px] max-h-[85vh] flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in-up transition-colors duration-500 font-sans text-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">AI Inspector</h2>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-300 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white transition-all pointer-events-auto"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div className="p-6 overflow-y-auto">

                {/* A) Prediction Details (if available) */}
                {prediction && (
                    <div className="mb-8 space-y-6">

                        {/* Category Block */}
                        <div>
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-3">Intent Prediction</h3>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                                <ProgressBar
                                    label={`Category: ${prediction.category.label}`}
                                    value={prediction.category.confidence}
                                    plan={plan}
                                    colorClass="bg-indigo-500"
                                />

                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700/50 space-y-2">
                                    <p className="text-[10px] uppercase tracking-wider text-gray-400">Top-K Candidates</p>
                                    {prediction.category.top_k.map((k, idx) => (
                                        <div key={idx} className="flex justify-between text-xs">
                                            <span className="text-gray-600 dark:text-gray-400">{k.label}</span>
                                            <span className="font-mono text-gray-400">{k.prob.toFixed(3)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Complexity Block */}
                        <div>
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-3">Complexity</h3>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                                <ProgressBar
                                    label={prediction.complexity.label}
                                    value={prediction.complexity.confidence}
                                    plan={plan}
                                    colorClass="bg-teal-500"
                                />
                                <div className="mt-3 flex justify-between items-center text-xs">
                                    <span className="text-gray-500">Computed Budget:</span>
                                    <span className="font-mono font-bold bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                                        {plan.section_budget} sections
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* B) Plan Details (always available) */}
                <div className="mb-6 space-y-6">
                    {/* 🧠 Why This Layout? Explanation Card */}
                    {plan.explanation && (
                        <div>
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-3">🧠 Why This Layout?</h3>
                            <div className="bg-white/50 dark:bg-gray-800/40 backdrop-blur-md p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm space-y-3 relative overflow-hidden transition-all duration-300 hover:shadow-md">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-0.5">Layout Topology</span>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{plan.explanation.layout_reason}</p>
                                </div>
                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-0.5">Semantic Depth</span>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{plan.explanation.complexity_reason}</p>
                                </div>
                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-0.5">Scaffolding Backbone</span>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{plan.explanation.section_reason}</p>
                                </div>
                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-0.5">ML Node Injection</span>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{plan.explanation.ml_reason}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400">Planned Sections</h3>
                            <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
                                {plan.sections?.length || 0} Total
                            </span>
                        </div>

                        <div className="space-y-2">
                            {plan.sections?.map((sec, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 p-2.5 rounded-lg">
                                    <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{sec.type}</span>
                                    <span className="text-[10px] font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 shadow-sm text-gray-500">
                                        {sec.variant}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Design DNA */}
                    {plan.designDNA && (
                        <div>
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-3">Design DNA</h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(plan.designDNA).map(([key, val]) => (
                                    <div key={key} className="flex flex-col bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-3 py-2 rounded-lg flex-1 min-w-[45%]">
                                        <span className="text-[9px] uppercase tracking-wider text-gray-400 mb-0.5">{key}</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Flags */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-3">System Flags</h3>
                        <div className={`flex items-center gap-2 p-3 rounded-xl border ${plan.needs_clarification ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-400' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-400'}`}>
                            <div className={`w-2 h-2 rounded-full ${plan.needs_clarification ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                            <span className="font-medium text-xs">
                                {plan.needs_clarification ? 'Low Confidence (Needs Clarification)' : 'High Confidence (Auto-Approved)'}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InspectorPanel;
