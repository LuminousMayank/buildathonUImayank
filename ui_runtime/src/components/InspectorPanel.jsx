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
    if (!plan) return null;

    return (
        <div className="w-full lg:w-80 h-full flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-l border-white/20 dark:border-gray-700/50 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] overflow-y-auto animate-fade-in-up transition-colors duration-500 p-6 font-sans text-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">AI Inspector</h2>
            </div>

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
    );
};

export default InspectorPanel;
