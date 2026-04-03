import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { SortableSection } from './SortableSection';
import AddSectionButton from './AddSectionButton';
import AddSectionModal from './AddSectionModal';
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

const getDefaultContent = (type) => {
    switch (type) {
        case 'hero':
        case 'fullscreenHero':
            return { title: 'Welcome to Our Platform', subtitle: 'Discover amazing features that help you grow.', cta1: 'Get Started', cta2: 'Learn More' };
        case 'features':
        case 'featuresRow':
            return {
                title: 'Core Features', subtitle: 'Everything you need to succeed',
                features: [
                    { title: 'Lightning Fast', desc: 'Optimized for speed and performance.', icon: '⚡️' },
                    { title: 'Highly Secure', desc: 'Enterprise-grade security built-in.', icon: '🔒' },
                    { title: 'Scalable', desc: 'Grows natively with your business.', icon: '📈' }
                ]
            };
        case 'projectsGrid':
            return {
                title: 'Our Projects', subtitle: 'See what we have been working on',
                projects: [
                    { title: 'Project Alpha', desc: 'A revolutionary new application.', image: 'https://ui-avatars.com/api/?name=Alpha&background=random' },
                    { title: 'Project Beta', desc: 'Redesigning the future of web.', image: 'https://ui-avatars.com/api/?name=Beta&background=random' },
                    { title: 'Project Gamma', desc: 'Next-generation AI solutions.', image: 'https://ui-avatars.com/api/?name=Gamma&background=random' }
                ]
            };
        case 'testimonial':
            return {
                title: 'What our clients say', subtitle: 'Trusted by thousands worldwide',
                items: [
                    { text: 'This product completely transformed our workflow. Highly recommended!', author: 'Jane Doe', role: 'CEO, TechCorp', avatar: 'https://i.pravatar.cc/150?u=1' },
                    { text: 'Incredible experience from start to finish. The support team is amazing.', author: 'John Smith', role: 'CTO, StartupInc', avatar: 'https://i.pravatar.cc/150?u=2' }
                ]
            };
        case 'pricing':
            return {
                title: 'Simple, transparent pricing', subtitle: 'No hidden fees. Cancel anytime.',
                plans: [
                    { name: 'Starter', price: '$9', period: '/month', features: ['1 User', '5GB Storage', 'Basic Support'], cta: 'Start Free Trial', highlighted: false },
                    { name: 'Pro', price: '$29', period: '/month', features: ['5 Users', '50GB Storage', 'Priority Support', 'Advanced Analytics'], cta: 'Get Started', highlighted: true }
                ]
            };
        case 'faq':
            return {
                title: 'Frequently Asked Questions', subtitle: 'Got questions? We have answers.',
                faqs: [
                    { question: 'How does it work?', answer: 'Our platform is designed to be intuitive and easy to use straight out of the box.' },
                    { question: 'Is there a free trial?', answer: 'Yes! We offer a 14-day free trial on all plans.' },
                    { question: 'Can I cancel anytime?', answer: 'Absolutely. There are no long-term contracts.' }
                ]
            };
        case 'contactForm':
            return { title: 'Get in Touch', subtitle: 'We would love to hear from you. Send us a message.', cta: 'Send Message' };
        case 'footer':
            return { text: '© 2026 Your Company. All rights reserved.', links: ['About Us', 'Privacy Policy', 'Terms of Service', 'Contact'] };
        default:
            return { title: 'New Component Section', subtitle: 'Customize this content.' };
    }
};

const SectionRenderer = ({ sections, setSections, tree, layoutMode, content, setContent, editMode, onReorder, onAdd }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedInsertIndex, setSelectedInsertIndex] = useState(null);

    const handleAddClick = (index) => {
        setSelectedInsertIndex(index);
        setIsAddModalOpen(true);
    };

    const handleComponentSelect = (componentType) => {
        if (selectedInsertIndex === null || !setSections) {
            setIsAddModalOpen(false);
            return;
        }

        const newSection = { type: componentType, variant: 'default' };

        setSections(prev => {
            if (!Array.isArray(prev)) return prev;
            const newSections = [...prev];
            newSections.splice(selectedInsertIndex, 0, newSection);
            return newSections;
        });

        if (setContent) {
            setContent(prev => {
                if (prev && prev[componentType]) return prev;
                return {
                    ...prev,
                    [componentType]: getDefaultContent(componentType)
                };
            });
        }

        setIsAddModalOpen(false);
        setSelectedInsertIndex(null);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    if (!sections || !Array.isArray(sections) || !tree || !tree.children) return null;

    if (sections.length === 0) {
        return (
            <div className="w-full py-16 px-6 bg-gray-50 flex items-center justify-center text-gray-500 border border-dashed rounded">
                <p>No sections to render. Please try another prompt.</p>
            </div>
        );
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!active || !over || active.id === over.id) return;

        const oldIndex = tree.children.findIndex((c) => c.id === active.id);
        const newIndex = tree.children.findIndex((c) => c.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            if (setSections) {
                setSections((items) => arrayMove(items, oldIndex, newIndex));
            }
            if (onReorder) {
                onReorder(oldIndex, newIndex);
            }
        }
    };

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
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={tree.children.map(c => c.id)} strategy={verticalListSortingStrategy}>
                        <div className="flex-1 overflow-y-auto w-full relative">
                            {contentSecs.map((sec, i) => {
                                const origIndex = sections.findIndex(s => s === sec);
                                const treeNode = tree.children[origIndex];
                                const Comp = SECTION_MAP[sec.type] || FallbackSection;
                                const isBoard = sec.type === 'board';
                                return (
                                    <React.Fragment key={treeNode.id}>
                                        <SortableSection id={treeNode.id}>
                                            <div
                                                className={`animate-fade-in-up w-full ${isBoard ? 'h-full flex flex-col' : 'py-6 px-4 md:px-8'}`}
                                                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
                                            >
                                                <Comp variant={sec.variant} type={sec.type} layoutMode={layoutMode} content={content} setContent={setContent} editMode={editMode} />
                                            </div>
                                        </SortableSection>
                                        <AddSectionButton index={origIndex + 1} onAdd={handleAddClick} />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
                <AddSectionModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSelect={handleComponentSelect} />
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
                <React.Fragment key={`grid-${i}-frag`}>
                    <div key={`grid-${i}`} className={`w-full ${pyClass} flex flex-col md:flex-row gap-6 animate-fade-in-up`} style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}>
                        <div className="flex-1 bg-slate-800/80 rounded-2xl shadow-xl border border-slate-700/50 p-6 backdrop-blur-sm overflow-hidden">
                            <Comp1 variant={sec.variant} type={sec.type} layoutMode={layoutMode} sectionContent={sectionContent} content={content} setContent={setContent} editMode={editMode} />
                        </div>
                        <div className="flex-1 bg-slate-800/80 rounded-2xl shadow-xl border border-slate-700/50 p-6 backdrop-blur-sm overflow-hidden">
                            <Comp2 variant={nextSec.variant} type={nextSec.type} layoutMode={layoutMode} sectionContent={nextSectionContent} content={content} setContent={setContent} editMode={editMode} />
                        </div>
                    </div>
                    <AddSectionButton index={i + 2} onAdd={handleAddClick} />
                </React.Fragment>
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

        const treeNode = tree.children[i];

        renderNodes.push(
            <React.Fragment key={treeNode.id}>
                <SortableSection id={treeNode.id}>
                    <div
                        className={`w-full animate-fade-in-up transition-all duration-500 rounded-inherit ${isDashboard ? 'py-4 px-4 md:px-8' : 'py-20 border-b border-current border-opacity-20'}`}
                        style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}
                    >
                        {renderedBlock}
                    </div>
                </SortableSection>
                <AddSectionButton index={i + 1} onAdd={handleAddClick} />
            </React.Fragment>
        );
    }

    return (
        <div className={`w-full h-full flex flex-col transition-all duration-500 overflow-hidden bg-transparent mx-auto ${isDashboard ? 'py-4 max-w-[1400px]' : 'max-w-[1200px]'}`}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={tree.children.map(c => c.id)} strategy={verticalListSortingStrategy}>
                    {renderNodes}
                </SortableContext>
            </DndContext>
            <AddSectionModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSelect={handleComponentSelect} />
        </div>
    );
};

export default SectionRenderer;
