import React from 'react';

const Board = ({ layoutMode, content, setContent, editMode }) => {
    const defaultColumns = [
        { title: "To Do", tasks: ["Design wireframes", "Research competitors", "Setup repository"] },
        { title: "In Progress", tasks: ["Develop Topbar", "Configure LLM backend", "Setup routing"] },
        { title: "Done", tasks: ["Initialize Next.js", "Create GitHub repo", "Write README"] }
    ];

    const boardContent = content?.board?.columns ? content.board : { columns: defaultColumns };

    const handleColumnTitleUpdate = (colIndex, e) => {
        if (!setContent) return;
        const newValue = e.currentTarget.textContent;
        setContent(prev => {
            const newColumns = JSON.parse(JSON.stringify(prev.board?.columns || defaultColumns));
            newColumns[colIndex].title = newValue;
            return { ...prev, board: { ...prev.board, columns: newColumns } };
        });
    };

    const handleTaskTitleUpdate = (colIndex, taskIndex, e) => {
        if (!setContent) return;
        const newValue = e.currentTarget.textContent;
        setContent(prev => {
            const newColumns = JSON.parse(JSON.stringify(prev.board?.columns || defaultColumns));
            newColumns[colIndex].tasks[taskIndex] = newValue;
            return { ...prev, board: { ...prev.board, columns: newColumns } };
        });
    };

    const isDark = layoutMode === 'creative' || layoutMode === 'dashboard';

    // Kanban styling semantics
    const bgMain = isDark ? "bg-[#0b0c10]" : "bg-gray-50/50";
    const colBg = isDark ? "bg-slate-900/50 border border-slate-700/50" : "bg-gray-100/60 border border-transparent";
    const cardBg = isDark ? "bg-slate-800 border-slate-700/60 hover:border-slate-600 text-slate-200" : "bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border-transparent hover:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 text-gray-800";
    const textTitle = isDark ? "text-slate-100" : "text-gray-900";
    const badgeColors = ["bg-indigo-500/20 text-indigo-400", "bg-amber-500/20 text-amber-500", "bg-emerald-500/20 text-emerald-500"];

    return (
        <section className={`flex-1 p-6 md:p-8 overflow-x-auto ${bgMain}`}>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className={`text-2xl font-bold tracking-tight mb-1 ${textTitle}`}>Active Sprints</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage issues and track project life cycles efficiently.</p>
                </div>
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-indigo-500/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    New Task
                </button>
            </div>

            <div className="flex gap-6 items-start pb-8">
                {boardContent.columns.map((column, colIndex) => (
                    <div key={colIndex} className={`flex-shrink-0 w-80 rounded-2xl p-4 flex flex-col gap-4 ${colBg}`}>
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${colIndex === 0 ? 'bg-indigo-400' : colIndex === 1 ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                                <h3
                                    className={`font-semibold text-[15px] outline-none ${textTitle} ${editMode ? 'border-b border-dashed border-indigo-400/50 bg-indigo-500/10' : ''}`}
                                    contentEditable={editMode}
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleColumnTitleUpdate(colIndex, e)}
                                >
                                    {column.title}
                                </h3>
                            </div>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColors[colIndex % 3]}`}>
                                {column.tasks.length}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3">
                            {column.tasks.map((task, taskIndex) => (
                                <div
                                    key={taskIndex}
                                    className={`rounded-xl p-4 border transition-all duration-200 cursor-grab active:cursor-grabbing ${cardBg}`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span
                                            className={`text-[15px] font-medium leading-snug outline-none block ${editMode ? 'border-b border-dashed border-indigo-400/50 bg-indigo-500/10' : ''}`}
                                            contentEditable={editMode}
                                            suppressContentEditableWarning
                                            onBlur={(e) => handleTaskTitleUpdate(colIndex, taskIndex, e)}
                                        >
                                            {task}
                                        </span>
                                    </div>

                                    {/* Fake card footer for strict aesthetic rendering */}
                                    <div className="flex items-center justify-between mt-4 border-t border-current border-opacity-10 pt-3">
                                        <div className="flex items-center gap-1.5 opacity-60">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span className="text-[11px] font-medium tracking-wide invisible sm:visible">{(Math.random() * 3 + 1).toFixed(0)}d left</span>
                                        </div>
                                        <div className="flex -space-x-1.5 overflow-hidden">
                                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800" src={`https://ui-avatars.com/api/?name=UX&background=random&font-size=0.4&length=2`} alt="" />
                                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800" src={`https://ui-avatars.com/api/?name=UI&background=random&font-size=0.4&length=2`} alt="" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className={`mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-current border-opacity-20 text-sm font-medium transition-colors opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 ${textTitle}`}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            Add Card
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Board;
