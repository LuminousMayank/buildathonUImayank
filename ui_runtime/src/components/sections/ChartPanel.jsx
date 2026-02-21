import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
    { name: 'Jan', revenue: 42000 },
    { name: 'Feb', revenue: 48000 },
    { name: 'Mar', revenue: 45000 },
    { name: 'Apr', revenue: 54000 },
    { name: 'May', revenue: 51000 },
    { name: 'Jun', revenue: 68000 },
    { name: 'Jul', revenue: 65000 },
    { name: 'Aug', revenue: 72000 },
    { name: 'Sep', revenue: 76000 },
    { name: 'Oct', revenue: 84000 },
    { name: 'Nov', revenue: 81000 },
    { name: 'Dec', revenue: 95000 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-md">
                <p className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white text-lg font-bold">
                    ${payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

const ChartPanel = ({ layoutMode, variant }) => {
    // Determine the sizing dynamically if it's rendered on a landing page vs naturally wrapped in a dashboard grid container natively by SectionRenderer logic.
    const isDashboard = layoutMode === 'dashboard';
    const paddingClass = isDashboard ? 'py-2 px-2' : 'py-12 px-6 border filter drop-shadow-lg';

    return (
        <section className={`animate-fade-in-up w-full max-w-7xl mx-auto rounded-3xl ${paddingClass}`}>
            <div className={`w-full bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl relative ${isDashboard ? 'rounded-xl pb-2' : 'rounded-3xl p-8'}`}>

                {/* Header Strip */}
                <div className={`flex justify-between items-center w-full mb-6 ${isDashboard ? 'px-6 pt-6' : ''}`}>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Revenue Operations</h3>
                        <p className="text-slate-400 text-sm mt-1">Monthly recurring revenue (MRR) spanning rolling 12 months.</p>
                    </div>
                    {/* Minimalist interactive toggle block */}
                    <div className="hidden sm:flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                        <button className="px-4 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md shadow">12M</button>
                        <button className="px-4 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors">30D</button>
                        <button className="px-4 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors">7D</button>
                    </div>
                </div>

                {/* Chart Region */}
                <div className="w-full h-[350px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dummyData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />

                            <XAxis
                                dataKey="name"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />

                            <YAxis
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value / 1000}k`}
                                dx={-10}
                            />

                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }} />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: '#1e293b', stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                                animationDuration={1500}
                                animationEasing="ease-in-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default ChartPanel;
