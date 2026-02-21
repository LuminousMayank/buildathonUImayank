import React, { useState } from 'react';

const Sidebar = ({ layoutMode, content, setContent, editMode }) => {
    const sidebarContent = content?.sidebar?.items ? content.sidebar : {
        items: ["Dashboard", "Tasks", "Team", "Settings"]
    };

    const [activeIndex, setActiveIndex] = useState(0);

    const handleUpdate = (index, e) => {
        if (!setContent) return;
        const newValue = e.currentTarget.textContent;
        setContent(prev => {
            const newItems = [...(prev.sidebar?.items || sidebarContent.items)];
            newItems[index] = newValue;
            return {
                ...prev,
                sidebar: { ...prev.sidebar, items: newItems }
            };
        });
    };

    const isDark = layoutMode === 'creative' || layoutMode === 'dashboard';
    const containerBase = isDark
        ? "bg-slate-900/40 border-slate-700/50 text-slate-300"
        : "bg-white/40 border-gray-200/50 text-gray-600";

    const activeBg = isDark ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-50 text-indigo-600 font-medium";
    const hoverBg = isDark ? "hover:bg-slate-800/60" : "hover:bg-gray-100/60";

    // Generic icon mapped to index for visual variety
    const getIcon = (idx) => {
        const icons = [
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />, // Dashboard
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />, // Tasks
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />, // Team
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> // Settings
        ];
        return icons[idx % icons.length];
    };

    return (
        <aside className={`w-60 min-h-[calc(100vh-4rem)] border-r backdrop-blur-sm flex flex-col py-6 px-3 transition-colors ${containerBase}`}>
            <div className="mb-4 px-3">
                <p className="text-xs font-bold tracking-wider uppercase opacity-50 mb-4">Main Menu</p>
            </div>

            <nav className="flex-1 space-y-1">
                {sidebarContent.items.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                        <div
                            key={idx}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${isActive ? activeBg : hoverBg}`}
                            onClick={() => setActiveIndex(idx)}
                        >
                            <svg
                                className={`w-5 h-5 transition-colors ${isActive ? (isDark ? 'text-indigo-400' : 'text-indigo-600') : 'opacity-60 group-hover:opacity-100'}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {getIcon(idx)}
                            </svg>

                            <span
                                className={`flex-1 text-sm outline-none transition-colors ${editMode ? 'border-b border-dashed border-indigo-400/50 bg-indigo-500/10' : ''}`}
                                contentEditable={editMode}
                                suppressContentEditableWarning
                                onBlur={(e) => handleUpdate(idx, e)}
                            >
                                {item}
                            </span>

                            {isActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Bottom element just to fill out the UI realistically */}
            <div className={`mt-auto px-3 pt-6 border-t ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${hoverBg}`}>
                    <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    <span className="text-sm font-medium">Log out</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
