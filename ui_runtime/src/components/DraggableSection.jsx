import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function DraggableSection({ id, children, type }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, data: { type } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.7 : 1,
        position: 'relative',
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div
                {...attributes}
                {...listeners}
                className="absolute top-2 left-2 z-[60] bg-white/10 hover:bg-white/20 backdrop-blur-md p-1.5 rounded cursor-grab active:cursor-grabbing border border-white/20 shadow-lg group hidden md:flex items-center justify-center"
                title="Drag to reorder"
            >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
            </div>
            {children}
        </div>
    );
}
