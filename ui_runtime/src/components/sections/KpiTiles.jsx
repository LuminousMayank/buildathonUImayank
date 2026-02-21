import React from 'react';

const kpiData = [
    {
        label: "Total Revenue",
        value: "$84,293.00",
        growth: "+14.5%",
        isPositive: true,
        trendSymbol: "↑"
    },
    {
        label: "Active Users (MRR)",
        value: "14,092",
        growth: "+8.1%",
        isPositive: true,
        trendSymbol: "↑"
    },
    {
        label: "Churn Rate",
        value: "1.2%",
        growth: "-0.4%",
        isPositive: true, // A decrease in churn is positive
        trendSymbol: "↓"
    },
    {
        label: "Avg. Session Time",
        value: "4m 12s",
        growth: "-2.3%",
        isPositive: false,
        trendSymbol: "↓"
    }
];

const KpiTiles = ({ variant, layoutMode }) => {
    // We can conditionally slice the array depending on variant or layout space if needed.
    const tilesToRender = kpiData;

    // Adjust padding heavily based on layout mode. Dashboards prefer tighter padded cards natively.
    const isDashboard = layoutMode === 'dashboard';

    return (
        <section className={`animate-fade-in-up w-full max-w-7xl mx-auto ${isDashboard ? 'py-2 px-1' : 'py-12 px-6'}`}>
            {/* Optional Header for Landing mode; Dashboards usually just drop KPIs straight under the Hero */}
            {!isDashboard && (
                <div className="mb-10">
                    <h2 className="text-3xl font-extrabold tracking-tight">Performance Metrics</h2>
                    <p className="opacity-70 text-sm mt-2">Real-time overview of your core operational statistics.</p>
                </div>
            )}

            {/* Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tilesToRender.map((kpi, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col p-6 rounded-xl bg-current bg-opacity-[0.02] border border-current border-opacity-10 shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                    >
                        {/* Shimmer line effect on hover */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Top Label Layer */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium opacity-70 tracking-wide uppercase">{kpi.label}</span>
                        </div>

                        {/* Core Metric Value */}
                        <div className="text-3xl font-bold tracking-tight mb-2">
                            {kpi.value}
                        </div>

                        {/* Growth / Trend Indicator Layer */}
                        <div className="flex items-center gap-2 mt-auto pt-2">
                            <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-md ${kpi.isPositive
                                    ? 'bg-emerald-500 bg-opacity-10 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-rose-500 bg-opacity-10 text-rose-600 dark:text-rose-400'
                                }`}>
                                <span>{kpi.trendSymbol}</span>
                                <span>{kpi.growth}</span>
                            </div>
                            <span className="text-xs opacity-50">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KpiTiles;
