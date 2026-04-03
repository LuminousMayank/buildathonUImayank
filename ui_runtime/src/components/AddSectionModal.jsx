import React, { useEffect } from 'react';

const COMPONENTS_LIST = [
    { 
        id: 'hero', 
        name: 'Hero', 
        icon: <><rect x="3" y="3" width="18" height="12" rx="2" /><path d="M7 19h10"/><path d="M12 19v2"/></> 
    },
    { 
        id: 'featuresRow', 
        name: 'Features', 
        icon: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></> 
    },
    { 
        id: 'projectsGrid', 
        name: 'Projects Grid', 
        icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18"/><path d="M9 21V9"/></> 
    },
    { 
        id: 'testimonial', 
        name: 'Testimonial', 
        icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></> 
    },
    { 
        id: 'pricing', 
        name: 'Pricing', 
        icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="8" y1="2" x2="8" y2="4"/><line x1="16" y1="2" x2="16" y2="4"/><line x1="3" y1="10" x2="21" y2="10"/></> 
    },
    { 
        id: 'faq', 
        name: 'FAQ', 
        icon: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17"/></> 
    },
    { 
        id: 'contactForm', 
        name: 'Contact Form', 
        icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></> 
    },
    { 
        id: 'footer', 
        name: 'Footer', 
        icon: <><rect x="3" y="14" width="18" height="7" rx="2" /><path d="M3 10h18"/><path d="M3 6h18"/></> 
    },
];

export default function AddSectionModal({ open, onClose, onSelect }) {
    // Close on esc key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (open) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            {/* Modal backdrop click area */}
            <div className="absolute inset-0" onClick={onClose} aria-label="Close modal"></div>
            
            {/* Modal Content */}
            <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Add a New Section</h2>
                        <p className="text-sm text-slate-500 mt-1">Choose a component to insert into your page layout.</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
                        title="Close"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                {/* Grid */}
                <div className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {COMPONENTS_LIST.map((comp) => (
                            <button
                                key={comp.id}
                                onClick={() => {
                                    onSelect(comp.id);
                                    onClose();
                                }}
                                className="flex flex-col items-center justify-center p-6 text-center bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md hover:bg-blue-50/30 transition-all duration-200 group text-slate-600 hover:text-blue-700"
                            >
                                <div className="mb-4 lg:p-4 p-3 bg-slate-50 rounded-lg group-hover:bg-blue-100/50 transition-colors text-slate-400 group-hover:text-blue-500">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100">
                                        {comp.icon}
                                    </svg>
                                </div>
                                <span className="text-sm font-semibold">{comp.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
