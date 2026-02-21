import React from 'react';
import Hero from './sections/Hero';
import ProjectsGrid from './sections/ProjectsGrid';
import ContactForm from './sections/ContactForm';
import FeatureRow from './sections/FeatureRow';
import KpiTiles from './sections/KpiTiles';
import ChartPanel from './sections/ChartPanel';
import Footer from './sections/Footer';

// Fallback component for unimplemented sections (like chart, table, gallery)
const FallbackSection = ({ type, variant }) => (
    <section className="py-20 px-6 bg-gray-100 flex items-center justify-center min-h-[40vh] border border-dashed border-gray-300">
        <div className="text-center text-gray-500">
            <h3 className="text-xl font-bold mb-2">[{type}] Placeholder</h3>
            <p className="font-mono text-sm">Variant: {variant}</p>
        </div>
    </section>
);

const SECTION_MAP = {
    hero: Hero,
    features: FeatureRow,
    featuresRow: FeatureRow,
    kpiTiles: KpiTiles,
    kpiCards: KpiTiles,
    chartPanel: ChartPanel,
    chart: ChartPanel,
    projectsGrid: ProjectsGrid,
    contactForm: ContactForm,
    footer: Footer,
};

const SectionRenderer = ({ sections, layoutMode }) => {
    if (!sections || !Array.isArray(sections)) return null;

    if (sections.length === 0) {
        return (
            <div className="w-full py-16 px-6 bg-gray-50 flex items-center justify-center text-gray-500 border border-dashed rounded">
                <p>No sections to render. Please try another prompt.</p>
            </div>
        );
    }

    const isDashboard = layoutMode === 'dashboard';
    const pyClass = isDashboard ? 'py-12 px-4 md:px-8' : 'py-20 px-6 md:px-12 border-b border-current border-opacity-20';

    const renderNodes = [];
    for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const nextSec = i + 1 < sections.length ? sections[i + 1] : null;

        // Special 2-column dashboard grouping rule
        if (isDashboard && sec.type === 'chartPanel' && nextSec && (nextSec.type === 'teamList' || nextSec.type === 'table')) {
            const Comp1 = SECTION_MAP[sec.type] || FallbackSection;
            const Comp2 = SECTION_MAP[nextSec.type] || FallbackSection;

            renderNodes.push(
                <div key={`grid-${i}`} className={`w-full ${pyClass} flex flex-col md:flex-row gap-6 animate-fade-in-up`} style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}>
                    <div className="flex-1 bg-slate-800/80 rounded-2xl shadow-xl border border-slate-700/50 p-6 backdrop-blur-sm overflow-hidden">
                        <Comp1 variant={sec.variant} type={sec.type} layoutMode={layoutMode} />
                    </div>
                    <div className="flex-1 bg-slate-800/80 rounded-2xl shadow-xl border border-slate-700/50 p-6 backdrop-blur-sm overflow-hidden">
                        <Comp2 variant={nextSec.variant} type={nextSec.type} layoutMode={layoutMode} />
                    </div>
                </div>
            );
            i++; // skip next since grouped
            continue;
        }

        const SectionComponent = SECTION_MAP[sec.type] || FallbackSection;

        const content = isDashboard ? (
            <div className={`w-full ${sec.type === 'hero' ? 'bg-slate-800/40 p-8' : 'bg-slate-800/80 p-6 md:p-10'} rounded-2xl shadow-xl border border-slate-700/50 backdrop-blur-sm overflow-hidden`}>
                <SectionComponent variant={sec.variant} type={sec.type} layoutMode={layoutMode} />
            </div>
        ) : (
            <SectionComponent variant={sec.variant} type={sec.type} layoutMode={layoutMode} />
        );

        renderNodes.push(
            <div
                key={`${sec.type}-${i}`}
                className={`w-full animate-fade-in-up transition-all duration-500 rounded-inherit ${isDashboard ? 'py-4 px-4 md:px-8' : 'py-20 border-b border-current border-opacity-20'}`}
                style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}
            >
                {content}
            </div>
        );
    }

    return (
        <div className={`w-full h-full flex flex-col transition-all duration-500 overflow-hidden bg-transparent mx-auto ${isDashboard ? 'py-4 max-w-[1400px]' : 'max-w-[1200px]'}`}>
            {renderNodes}
        </div>
    );
};

export default SectionRenderer;
