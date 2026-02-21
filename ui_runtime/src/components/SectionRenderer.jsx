import React from 'react';
import Hero from './sections/Hero';
import FullscreenHero from './sections/FullscreenHero';
import ProjectsGrid from './sections/ProjectsGrid';
import ContactForm from './sections/ContactForm';
import FeatureRow from './sections/FeatureRow';
import KpiTiles from './sections/KpiTiles';
import ChartPanel from './sections/ChartPanel';
import Footer from './sections/Footer';
import Topbar from './sections/Topbar';
import Sidebar from './sections/Sidebar';
import Board from './sections/Board';
import ActivityFeed from './sections/ActivityFeed';
import BentoGrid from './sections/BentoGrid';
import MarqueeBand from './sections/MarqueeBand';
import SplitReveal from './sections/SplitReveal';
import HorizontalGallery from './sections/HorizontalGallery';

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
    fullscreenHero: FullscreenHero,
    features: FeatureRow,
    featuresRow: FeatureRow,
    kpiTiles: KpiTiles,
    kpiCards: KpiTiles,
    chartPanel: ChartPanel,
    chart: ChartPanel,
    projectsGrid: ProjectsGrid,
    contactForm: ContactForm,
    footer: Footer,
    topbar: Topbar,
    sidebar: Sidebar,
    board: Board,
    activityFeed: ActivityFeed,
    statsStrip: KpiTiles,
    bentoGrid: BentoGrid,
    bento: BentoGrid,
    marqueeBand: MarqueeBand,
    marquee: MarqueeBand,
    splitReveal: SplitReveal,
    split: SplitReveal,
    horizontalGallery: HorizontalGallery,
    gallery: HorizontalGallery,
    interactiveCardGrid: ProjectsGrid,
};

const SectionRenderer = ({ sections, layoutMode, content, setContent, editMode }) => {
    if (!sections || !Array.isArray(sections)) return null;

    if (sections.length === 0) {
        return (
            <div className="w-full py-16 px-6 bg-gray-50 flex items-center justify-center text-gray-500 border border-dashed rounded">
                <p>No sections to render. Please try another prompt.</p>
            </div>
        );
    }

    const isDashboard = layoutMode === 'dashboard';
    const isApplication = layoutMode === 'application';

    // Application Mode: Flex container for Sidebar & Topbar routing
    if (isApplication) {
        const topbarSec = sections.find(s => s.type === 'topbar');
        const sidebarSec = sections.find(s => s.type === 'sidebar');
        const contentSecs = sections.filter(s => s.type !== 'topbar' && s.type !== 'sidebar');

        const TopbarComp = topbarSec ? SECTION_MAP[topbarSec.type] : null;
        const SidebarComp = sidebarSec ? SECTION_MAP[sidebarSec.type] : null;

        return (
            <div className="w-full h-screen flex flex-col bg-transparent overflow-hidden">
                {TopbarComp && topbarSec && (
                    <div className="w-full shrink-0 z-50 relative">
                        <TopbarComp variant={topbarSec.variant} type={topbarSec.type} layoutMode={layoutMode} content={content} setContent={setContent} editMode={editMode} />
                    </div>
                )}
                <div className="flex-1 flex overflow-hidden">
                    {SidebarComp && sidebarSec && (
                        <div className="hidden md:flex shrink-0 border-r border-white/5 bg-slate-900/40 z-40 relative">
                            <SidebarComp variant={sidebarSec.variant} type={sidebarSec.type} layoutMode={layoutMode} content={content} setContent={setContent} editMode={editMode} />
                        </div>
                    )}
                    <div className="flex-1 overflow-y-auto w-full relative">
                        {contentSecs.map((sec, i) => {
                            const Comp = SECTION_MAP[sec.type] || FallbackSection;
                            const isBoard = sec.type === 'board';
                            return (
                                <div
                                    key={`${sec.type}-${i}`}
                                    className={`animate-fade-in-up w-full ${isBoard ? 'h-full flex flex-col' : 'py-6 px-4 md:px-8'}`}
                                    style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
                                >
                                    <Comp variant={sec.variant} type={sec.type} layoutMode={layoutMode} content={content} setContent={setContent} editMode={editMode} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    const pyClass = isDashboard ? 'py-12 px-4 md:px-8' : 'py-20 px-6 md:px-12 border-b border-current border-opacity-20';

    const renderNodes = [];
    for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const nextSec = i + 1 < sections.length ? sections[i + 1] : null;

        // Extract slice specifically as requested while keeping global ref mapped
        const sectionContent = content ? content[sec.type] : undefined;
        const nextSectionContent = nextSec && content ? content[nextSec.type] : undefined;

        // Special 2-column dashboard grouping rule
        if (isDashboard && sec.type === 'chartPanel' && nextSec && (nextSec.type === 'teamList' || nextSec.type === 'table')) {
            const Comp1 = SECTION_MAP[sec.type] || FallbackSection;
            const Comp2 = SECTION_MAP[nextSec.type] || FallbackSection;

            renderNodes.push(
                <div key={`grid-${i}`} className={`w-full ${pyClass} flex flex-col md:flex-row gap-6 animate-fade-in-up`} style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}>
                    <div className="flex-1 bg-slate-800/80 rounded-2xl shadow-xl border border-slate-700/50 p-6 backdrop-blur-sm overflow-hidden">
                        <Comp1 variant={sec.variant} type={sec.type} layoutMode={layoutMode} sectionContent={sectionContent} content={content} setContent={setContent} editMode={editMode} />
                    </div>
                    <div className="flex-1 bg-slate-800/80 rounded-2xl shadow-xl border border-slate-700/50 p-6 backdrop-blur-sm overflow-hidden">
                        <Comp2 variant={nextSec.variant} type={nextSec.type} layoutMode={layoutMode} sectionContent={nextSectionContent} content={content} setContent={setContent} editMode={editMode} />
                    </div>
                </div>
            );
            i++; // skip next since grouped
            continue;
        }

        const SectionComponent = SECTION_MAP[sec.type] || FallbackSection;

        const renderedBlock = isDashboard ? (
            <div className={`w-full ${sec.type === 'hero' ? 'bg-slate-800/40 p-8' : 'bg-slate-800/80 p-6 md:p-10'} rounded-2xl shadow-xl border border-slate-700/50 backdrop-blur-sm overflow-hidden`}>
                <SectionComponent variant={sec.variant} type={sec.type} layoutMode={layoutMode} sectionContent={sectionContent} content={content} setContent={setContent} editMode={editMode} />
            </div>
        ) : (
            <SectionComponent variant={sec.variant} type={sec.type} layoutMode={layoutMode} sectionContent={sectionContent} content={content} setContent={setContent} editMode={editMode} />
        );

        renderNodes.push(
            <div
                key={`${sec.type}-${i}`}
                className={`w-full animate-fade-in-up transition-all duration-500 rounded-inherit ${isDashboard ? 'py-4 px-4 md:px-8' : 'py-20 border-b border-current border-opacity-20'}`}
                style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}
            >
                {renderedBlock}
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
