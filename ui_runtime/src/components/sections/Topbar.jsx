import React from 'react';

const Topbar = ({ layoutMode, content, setContent, editMode }) => {
    // Graceful fallback if content is uninitialized
    const topbarContent = content?.topbar || {
        appName: "Buildathon OS"
    };

    const handleUpdate = (field, e) => {
        if (!setContent) return;
        const newValue = e.currentTarget.textContent;
        setContent(prev => ({
            ...prev,
            topbar: { ...prev.topbar, [field]: newValue }
        }));
    };

    // Modern SaaS styling toggles based on inferred layout mode
    const isDark = layoutMode === 'creative' || layoutMode === 'dashboard';
    const containerBase = isDark
        ? "bg-slate-900/60 border-slate-700/50 text-slate-100"
        : "bg-white/70 border-gray-200/50 text-gray-900";

    const searchBg = isDark ? "bg-slate-800/80 focus:bg-slate-800 text-sm focus:border-indigo-500 border-slate-700 placeholder-slate-500" : "bg-gray-100/80 focus:bg-white text-sm focus:border-indigo-500 border-transparent placeholder-gray-400";

    const iconColor = isDark ? "text-slate-400" : "text-gray-400";

    return (
        <header className={`w-full h-16 px-6 flex items-center justify-between backdrop-blur-md border-b sticky top-0 z-50 transition-colors ${containerBase}`}>

            {/* Left: App Identity */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h1
                    className={`text-lg font-bold tracking-tight outline-none ${editMode ? 'border-b border-dashed border-indigo-400 bg-indigo-500/10' : ''}`}
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onBlur={(e) => handleUpdate("appName", e)}
                >
                    {topbarContent.appName}
                </h1>
            </div>

            {/* Right: Search & Actions */}
            <div className="flex items-center gap-5">

                {/* Search Input */}
                <div className="relative hidden md:block">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${iconColor}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        placeholder="Search resources..."
                        className={`w-64 pl-10 pr-4 py-1.5 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${searchBg}`}
                    />
                </div>

                {/* Notifications */}
                <button className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative ${iconColor} hover:text-indigo-500`}>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-transparent"></span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                {/* User Avatar Circle */}
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] cursor-pointer hover:shadow-lg transition-transform hover:scale-105">
                    <div className="h-full w-full rounded-full bg-white dark:bg-slate-900 border-2 border-transparent overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=eff6ff&color=4f46e5" alt="User Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
