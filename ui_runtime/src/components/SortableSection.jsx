import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableSection({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms ease',
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div
        className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-gray-700 bg-white shadow-sm border border-gray-100 rounded cursor-grab active:cursor-grabbing z-[60] flex items-center justify-center"
        {...attributes}
        {...listeners}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="5" r="1"></circle>
          <circle cx="9" cy="12" r="1"></circle>
          <circle cx="9" cy="19" r="1"></circle>
          <circle cx="15" cy="5" r="1"></circle>
          <circle cx="15" cy="12" r="1"></circle>
          <circle cx="15" cy="19" r="1"></circle>
        </svg>
      </div>
      {children}
    </div>
  );
}
