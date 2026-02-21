import React from 'react';

const ActivityFeed = ({ layoutMode, content, setContent, editMode }) => {
    const defaultActivities = [
        { id: 1, user: "Alice Chen", action: "pushed a commit to", target: "main", time: "2h ago", initials: "AC", color: "bg-blue-500" },
        { id: 2, user: "Bob Smith", action: "moved task 'Build Topbar' to", target: "Done", time: "4h ago", initials: "BS", color: "bg-emerald-500" },
        { id: 3, user: "Charlie Davis", action: "commented on issue", target: "#412", time: "yesterday", initials: "CD", color: "bg-amber-500" },
        { id: 4, user: "System", action: "deployed release", target: "v2.0.4", time: "yesterday", initials: "SYS", color: "bg-indigo-500" }
    ];

    const feedContent = content?.activityFeed?.items ? content.activityFeed.items : defaultActivities;

    const handleUpdate = (index, field, e) => {
        if (!setContent) return;
        const newValue = e.currentTarget.textContent;
        setContent(prev => {
            const newFeed = JSON.parse(JSON.stringify(prev.activityFeed?.items || defaultActivities));
            newFeed[index][field] = newValue;
            return { ...prev, activityFeed: { ...prev.activityFeed, items: newFeed } };
        });
    };

    const isDark = layoutMode === 'creative' || layoutMode === 'dashboard';

    const containerBg = isDark ? "bg-slate-900/60 border border-slate-700/50" : "bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-gray-100";
    const textColor = isDark ? "text-slate-200" : "text-gray-800";
    const textMuted = isDark ? "text-slate-400" : "text-gray-500";
    const targetColor = isDark ? "text-indigo-400" : "text-indigo-600";
    const dividerLine = isDark ? "border-slate-700/50" : "border-gray-100";

    return (
        <div className={`p-6 rounded-2xl w-full max-w-sm mx-auto flex flex-col backdrop-blur-sm ${containerBg}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-bold tracking-tight ${textColor}`}>Activity Feed</h3>
                <button className={`text-xs font-semibold hover:underline ${targetColor}`}>View All</button>
            </div>

            <div className="flex flex-col relative">
                {/* Continuous timeline line */}
                <div className={`absolute top-2 bottom-6 left-5 border-l-2 ${dividerLine} -z-10`}></div>

                <div className="flex flex-col gap-6">
                    {feedContent.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start group">
                            <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center text-white text-sm font-bold shadow-sm ring-4 ring-transparent transition-all group-hover:ring-black/5 dark:group-hover:ring-white/5 ${item.color || 'bg-indigo-500'}`}>
                                {item.initials}
                            </div>
                            <div className="flex flex-col pt-0.5">
                                <p className={`text-[14px] leading-tight ${textColor}`}>
                                    <span
                                        className={`font-semibold outline-none ${editMode ? 'border-b border-dashed border-indigo-400/50 bg-indigo-500/10' : ''}`}
                                        contentEditable={editMode}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleUpdate(idx, 'user', e)}
                                    >
                                        {item.user}
                                    </span>
                                    {' '}
                                    <span
                                        className={`outline-none ${editMode ? 'border-b border-dashed border-indigo-400/50 bg-indigo-500/10' : ''}`}
                                        contentEditable={editMode}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleUpdate(idx, 'action', e)}
                                    >
                                        {item.action}
                                    </span>
                                    {' '}
                                    <span
                                        className={`font-medium ${targetColor} outline-none ${editMode ? 'border-b border-dashed border-indigo-400/50 bg-indigo-500/10' : ''}`}
                                        contentEditable={editMode}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleUpdate(idx, 'target', e)}
                                    >
                                        {item.target}
                                    </span>
                                </p>
                                <span className={`text-[11px] font-medium tracking-wide mt-1.5 opacity-80 uppercase ${textMuted}`}>
                                    {item.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivityFeed;
