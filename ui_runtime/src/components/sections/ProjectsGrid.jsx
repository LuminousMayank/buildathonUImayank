import React from 'react';

const ProjectsGrid = ({ variant }) => {
    const dummyProjects = [1, 2, 3, 4, 5, 6];

    if (variant === 'v1') {
        return (
            <section className="animate-fade-in-up py-20 px-6 md:px-12 max-w-7xl mx-auto bg-transparent">
                <h2 className="text-3xl font-bold mb-12 border-b pb-4">Selected Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dummyProjects.map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="aspect-[4/3] bg-slate-500/10 rounded-lg mb-4 overflow-hidden relative transition hover:opacity-20"></div>
                            <h3 className="font-semibold text-lg transition opacity-90 group-hover:opacity-100">Project Title {item}</h3>
                            <p className="text-sm opacity-60">UI/UX Design</p>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (variant === 'v2') {
        return (
            <section className="animate-fade-in-up py-24 bg-transparent">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <h2 className="text-4xl font-light mb-16 text-center tracking-wide">Featured Case Studies</h2>
                    <div className="space-y-24">
                        {dummyProjects.slice(0, 3).map((item, index) => (
                            <div key={item} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                                <div className="flex-1 w-full aspect-[16/9] border border-current rounded-xl overflow-hidden opacity-30 shadow-2xl">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500 opacity-20"></div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <span className="opacity-60 font-mono text-sm tracking-widest uppercase">0{item} / Web App</span>
                                    <h3 className="text-3xl font-bold opacity-90">Client Project Name</h3>
                                    <p className="opacity-80 leading-relaxed max-w-md">A comprehensive overhaul of an enterprise platform, improving user retention by 40% and streamlining the deeply complex workflow.</p>
                                    <button className="mt-4 px-6 py-2 border border-current rounded hover:bg-current hover:text-white transition">Read Case Study</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Variant v3: Masonry-style tight grid
    return (
        <section className="animate-fade-in-up py-20 px-4 md:px-8 max-w-screen-2xl mx-auto bg-transparent">
            <h2 className="text-2xl font-medium mb-10 uppercase tracking-widest text-center opacity-80">Portfolio</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dummyProjects.map((item) => (
                    <div key={item} className={`border border-current opacity-30 relative overflow-hidden group ${item === 1 || item === 4 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}>
                        <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-80 flex items-center justify-center transition duration-500">
                            <div className="text-center translate-y-4 group-hover:translate-y-0 transition duration-500 text-white">
                                <h3 className="font-bold text-xl mb-1">Project {item}</h3>
                                <p className="text-sm">View Details</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsGrid;
