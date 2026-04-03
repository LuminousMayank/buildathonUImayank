import React from 'react';

export default function AddSectionButton({ index, onAdd }) {
  return (
    <div className="w-full relative flex justify-center items-center group py-4 -my-4 z-20">
      <button
        onClick={() => onAdd(index)}
        className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 px-4 py-1.5 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 border border-gray-200 rounded-full shadow-sm text-sm font-medium cursor-pointer"
        title="Add Section"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Section
      </button>
    </div>
  );
}
