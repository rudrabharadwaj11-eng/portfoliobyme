import React, { useState, useEffect, useMemo } from 'react';
import { PortfolioProfile, PromptOptions, ProjectItem } from '../types.ts';
import { AESTHETIC_PREVIEWS } from '../data/defaultConfig.ts';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Command, 
  X, 
  Check, 
  Copy, 
  Sparkles, 
  ChevronRight, 
  Laptop, 
  Smartphone, 
  RotateCcw, 
  SlidersHorizontal 
} from 'lucide-react';

interface PortfolioSimulatorProps {
  profile: PortfolioProfile;
  options: PromptOptions;
  onSwitchToStudio: () => void;
}

export const PortfolioSimulator: React.FC<PortfolioSimulatorProps> = ({
  profile,
  options,
  onSwitchToStudio
}) => {
  const theme = AESTHETIC_PREVIEWS[options.aesthetic] || AESTHETIC_PREVIEWS.bento_dark;

  // Simulator controls
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState<'desktop' | 'mobile'>('desktop');

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');

  // Handle global Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdKOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setIsCmdKOpen(false);
        setIsContactOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    profile.projects.forEach(p => cats.add(p.category));
    return ['all', ...Array.from(cats)];
  }, [profile.projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return profile.projects;
    return profile.projects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
  }, [profile.projects, activeCategory]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formMessage) return;
    setContactFormSubmitted(true);
    setTimeout(() => {
      setContactFormSubmitted(false);
      setIsContactOpen(false);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 2200);
  };

  // Determine dynamic styling based on selected aesthetic
  const isLight = options.aesthetic === 'swiss_editorial' || options.aesthetic === 'modern_monochrome';
  const containerClasses = isLight 
    ? 'bg-[#faf9f6] text-neutral-900' 
    : 'bg-[#09090b] text-neutral-100';
  const cardClasses = isLight
    ? 'bg-white border-neutral-200 shadow-sm text-neutral-900'
    : 'bg-zinc-900/60 border-zinc-800 text-zinc-100';
  const mutedText = isLight ? 'text-neutral-500' : 'text-zinc-400';
  const hairlineDivider = isLight ? 'border-neutral-200' : 'border-zinc-800';

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden relative">
      {/* Simulation Controls Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-200">Claude Artifact Live Simulator</span>
            <span className="text-zinc-500">|</span>
            <span className="text-amber-400 font-mono text-[11px]">{theme.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport toggle */}
          <div className="flex items-center rounded-lg bg-zinc-800 p-0.5 border border-zinc-700">
            <button
              onClick={() => setDeviceFrame('desktop')}
              className={`p-1 rounded ${deviceFrame === 'desktop' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}`}
              title="Desktop View (1440px)"
            >
              <Laptop className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setDeviceFrame('mobile')}
              className={`p-1 rounded ${deviceFrame === 'mobile' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}`}
              title="Mobile Responsive View"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsCmdKOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-zinc-300 hover:bg-zinc-700 text-[11px] font-mono"
            title="Press Cmd+K"
          >
            <Command className="h-3 w-3 text-amber-400" />
            <span>Cmd+K</span>
          </button>

          <button
            onClick={onSwitchToStudio}
            className="rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 px-2.5 py-1 text-[11px] font-medium"
          >
            Edit Prompt Config
          </button>
        </div>
      </div>

      {/* Main Simulation Container */}
      <div className="flex-1 overflow-y-auto flex justify-center p-2 sm:p-6 bg-zinc-950">
        <div 
          className={`w-full transition-all duration-300 rounded-2xl overflow-hidden border ${hairlineDivider} shadow-2xl flex flex-col ${containerClasses} ${
            deviceFrame === 'mobile' ? 'max-w-md my-4 h-[840px] overflow-y-auto' : 'max-w-6xl min-h-[900px]'
          }`}
        >
          {/* Top Bar Contract (Strict 3-zone layout) */}
          <header className={`sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-4 border-b ${hairlineDivider} ${isLight ? 'bg-[#faf9f6]/90' : 'bg-[#09090b]/90'} backdrop-blur-md`}>
            {/* Zone 1: Single text element wordmark */}
            <a href="#hero" className="text-base font-bold tracking-tight whitespace-nowrap shrink-0">
              {profile.name}
            </a>

            {/* Zone 2: 4-5 concise single-line nav links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-tight">
              <a href="#projects" className={`${mutedText} hover:text-current transition-colors whitespace-nowrap shrink-0`}>Projects</a>
              <a href="#experience" className={`${mutedText} hover:text-current transition-colors whitespace-nowrap shrink-0`}>Experience</a>
              <a href="#stack" className={`${mutedText} hover:text-current transition-colors whitespace-nowrap shrink-0`}>Architecture</a>
              <a href="#contact" className={`${mutedText} hover:text-current transition-colors whitespace-nowrap shrink-0`}>Contact</a>
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsCmdKOpen(true)}
                className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono rounded-lg border ${hairlineDivider} ${mutedText} hover:text-current`}
              >
                <Command className="h-3 w-3" />
                <span>Cmd+K</span>
              </button>

              <button
                onClick={() => setIsContactOpen(true)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                Get in Touch
              </button>
            </div>
          </header>

          {/* Hero Section: Split-Screen with Typographic Weight */}
          <section id="hero" className={`px-6 py-12 md:py-16 border-b ${hairlineDivider}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-amber-500 font-semibold">{profile.availability}</span>
                  <span aria-hidden="true" className={mutedText}>·</span>
                  <span className={mutedText}>{profile.location}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-balance">
                  {profile.title}
                </h1>

                <p className={`text-base leading-relaxed max-w-xl ${mutedText}`}>
                  {profile.bio}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#projects"
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                      isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-zinc-950 hover:bg-zinc-200'
                    }`}
                  >
                    <span>Explore Selected Works</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border ${hairlineDivider} ${cardClasses} hover:border-current transition-colors`}
                  >
                    {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-zinc-400" />}
                    <span>{copiedEmail ? 'Copied to Clipboard!' : profile.email}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Architectural Status Bento */}
              <div className="lg:col-span-5">
                <div className={`rounded-xl border ${hairlineDivider} ${cardClasses} p-6 space-y-4`}>
                  <div className="flex items-center justify-between border-b pb-3 border-current/10">
                    <span className="text-xs font-mono font-semibold tracking-wider uppercase text-amber-500">
                      Active Production Focus
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">2026</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold">{profile.projects[0]?.title || 'Chronos Edge'}</div>
                    <p className={`text-xs leading-relaxed ${mutedText}`}>
                      {profile.projects[0]?.tagline || 'Global state synchronization layer using Conflict-Free Replicated Data Types (CRDTs).'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-current/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-500 font-semibold">{profile.projects[0]?.metrics}</span>
                    <button
                      onClick={() => setSelectedProject(profile.projects[0])}
                      className="text-xs font-medium text-amber-500 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Proof Metrics Strip: Full-Width Row Below Hero Split */}
            <div className={`mt-10 pt-8 border-t ${hairlineDivider} grid grid-cols-1 sm:grid-cols-3 gap-6`}>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight tabular-nums">
                  {profile.primaryMetric.split(' ')[0]}
                </div>
                <div className={`text-xs ${mutedText}`}>
                  {profile.primaryMetric.split(' ').slice(1).join(' ')}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight tabular-nums">
                  {profile.secondaryMetric.split(' ')[0]}
                </div>
                <div className={`text-xs ${mutedText}`}>
                  {profile.secondaryMetric.split(' ').slice(1).join(' ')}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight tabular-nums">
                  {profile.tertiaryMetric.split(' ')[0]}
                </div>
                <div className={`text-xs ${mutedText}`}>
                  {profile.tertiaryMetric.split(' ').slice(1).join(' ')}
                </div>
              </div>
            </div>
          </section>

          {/* Bento Grid Showcase Section */}
          <section id="projects" className={`px-6 py-12 border-b ${hairlineDivider} space-y-6`}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Selected Engineering Works</h2>
                <p className={`text-xs ${mutedText} mt-1`}>
                  Real systems deployed to production with measured performance impact.
                </p>
              </div>

              {/* Functional interactive category tabs */}
              <div className={`flex items-center gap-1 p-1 rounded-lg border ${hairlineDivider} ${cardClasses} overflow-x-auto max-w-full`}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize whitespace-nowrap shrink-0 ${
                      activeCategory === cat
                        ? (isLight ? 'bg-neutral-900 text-white' : 'bg-white text-zinc-950 font-semibold')
                        : `${mutedText} hover:text-current`
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((proj, idx) => {
                const isWide = idx === 0 || idx === 3;
                return (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`group rounded-xl border ${hairlineDivider} ${cardClasses} p-5 flex flex-col justify-between cursor-pointer hover:border-current/30 transition-all hover:-translate-y-0.5 ${
                      isWide ? 'md:col-span-2' : 'col-span-1'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Zero-Pill Unboxed Metadata with Typographic Separator */}
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="font-semibold text-amber-500">{proj.category}</span>
                        <span aria-hidden="true" className={mutedText}>·</span>
                        <span className={mutedText}>{proj.techStack[0]}</span>
                        <span aria-hidden="true" className={mutedText}>·</span>
                        <span className="text-emerald-500 font-semibold">{proj.metrics}</span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold group-hover:text-amber-500 transition-colors">
                          {proj.title}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-amber-500 transition-colors shrink-0" />
                      </div>

                      <p className={`text-xs leading-relaxed ${mutedText}`}>
                        {proj.tagline}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-current/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                      {/* Tech Stack Unboxed Text */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                        {proj.techStack.map((tech, tIdx) => (
                          <span key={tech}>
                            {tech}{tIdx < proj.techStack.length - 1 ? ' ·' : ''}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs font-medium text-amber-500 flex items-center gap-1">
                        <span>Case study</span>
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Experience / Career Timeline */}
          <section id="experience" className={`px-6 py-12 border-b ${hairlineDivider} space-y-6`}>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight">Career Journey</h2>
              <p className={`text-xs ${mutedText} mt-1`}>
                Leadership roles, architecture ownership, and quantifiable outcomes.
              </p>
            </div>

            <div className="space-y-4">
              {profile.experience.map(exp => (
                <div key={exp.id} className={`rounded-xl border ${hairlineDivider} ${cardClasses} p-5 space-y-3`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-500">
                        <span>{exp.company}</span>
                        <span aria-hidden="true" className={mutedText}>·</span>
                        <span className={mutedText}>{exp.location}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
                  </div>

                  <ul className={`space-y-1.5 text-xs ${mutedText} list-disc list-inside leading-relaxed`}>
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture & Skills Matrix */}
          <section id="stack" className={`px-6 py-12 border-b ${hairlineDivider} space-y-6`}>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Technical Stack & Systems</h2>
              <p className={`text-xs ${mutedText} mt-1`}>
                Core languages, infrastructure primitives, and engineering philosophy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {profile.skillCategories.map(cat => (
                <div key={cat.name} className={`rounded-xl border ${hairlineDivider} ${cardClasses} p-4 space-y-3`}>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
                    {cat.name}
                  </div>
                  <div className="space-y-1.5">
                    {cat.skills.map(skill => (
                      <div key={skill} className="text-xs font-medium flex items-center justify-between">
                        <span>{skill}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">Production</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer & Contact Strip */}
          <footer id="contact" className="px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className={`flex items-center gap-2 ${mutedText}`}>
              <span>© 2026 {profile.name}</span>
              <span aria-hidden="true">·</span>
              <span>All rights reserved</span>
            </div>

            <div className="flex items-center gap-4">
              <a href={profile.github} target="_blank" rel="noreferrer" className={`${mutedText} hover:text-current transition-colors`}>
                <Github className="h-4 w-4" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={`${mutedText} hover:text-current transition-colors`}>
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={profile.twitter} target="_blank" rel="noreferrer" className={`${mutedText} hover:text-current transition-colors`}>
                <Twitter className="h-4 w-4" />
              </a>
              <button onClick={() => setIsContactOpen(true)} className="font-semibold text-amber-500 hover:underline">
                {profile.email}
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* PROJECT CASE STUDY MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className={`w-full max-w-2xl rounded-2xl border ${hairlineDivider} ${cardClasses} p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-500 mb-1">
                  <span>{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-500 font-semibold">{selectedProject.metrics}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">{selectedProject.title}</h2>
                <p className={`text-xs mt-1 ${mutedText}`}>{selectedProject.tagline}</p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className={`p-2 rounded-lg border ${hairlineDivider} text-zinc-400 hover:text-zinc-100 transition-colors`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Problem & Architectural Solution */}
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="space-y-1">
                <span className="font-mono uppercase text-[10px] font-semibold text-zinc-400">The Problem</span>
                <p className={mutedText}>{selectedProject.problemSummary}</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono uppercase text-[10px] font-semibold text-amber-500">Architectural Solution</span>
                <p className={mutedText}>{selectedProject.solutionArchitecture}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <span className="font-mono uppercase text-[10px] font-semibold text-zinc-400">Production Tech Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-current/10 bg-current/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className={`pt-4 border-t ${hairlineDivider} flex items-center justify-between gap-3 text-xs`}>
              <div className="flex items-center gap-2">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors"
                  >
                    <span>Live Architecture</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${hairlineDivider} text-zinc-300 hover:text-zinc-100`}
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>

              <span className="text-[11px] text-zinc-500 font-mono">Press ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {/* COMMAND PALETTE (CMD+K) MODAL */}
      {isCmdKOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 shadow-2xl overflow-hidden text-xs">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
              <Command className="h-4 w-4 text-amber-400" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command, project, or section name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:outline-none text-xs"
              />
              <button onClick={() => setIsCmdKOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
              <div className="px-2 py-1 text-[10px] font-mono uppercase text-zinc-500">Navigation</div>
              <button
                onClick={() => { setIsCmdKOpen(false); window.location.hash = 'projects'; }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 flex items-center justify-between text-zinc-200"
              >
                <span>Jump to Selected Works</span>
                <span className="font-mono text-[10px] text-zinc-500">#projects</span>
              </button>
              <button
                onClick={() => { setIsCmdKOpen(false); window.location.hash = 'experience'; }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 flex items-center justify-between text-zinc-200"
              >
                <span>Jump to Experience & Timeline</span>
                <span className="font-mono text-[10px] text-zinc-500">#experience</span>
              </button>
              <button
                onClick={() => { setIsCmdKOpen(false); window.location.hash = 'stack'; }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 flex items-center justify-between text-zinc-200"
              >
                <span>Jump to Technical Stack</span>
                <span className="font-mono text-[10px] text-zinc-500">#stack</span>
              </button>

              <div className="px-2 py-1 text-[10px] font-mono uppercase text-zinc-500 pt-2">Actions</div>
              <button
                onClick={() => { handleCopyEmail(); setIsCmdKOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 flex items-center justify-between text-zinc-200"
              >
                <span>Copy Email Address ({profile.email})</span>
                <span className="font-mono text-[10px] text-amber-400">Copy</span>
              </button>
              <button
                onClick={() => { setIsCmdKOpen(false); setIsContactOpen(true); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 flex items-center justify-between text-zinc-200"
              >
                <span>Open Contact Drawer</span>
                <span className="font-mono text-[10px] text-amber-400">Open</span>
              </button>
            </div>

            <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>Navigate with Arrows or Click</span>
              <span>ESC to Exit</span>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT DRAWER MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-100 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Initiate Direct Outreach</h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">Direct line to {profile.name}</p>
              </div>
              <button onClick={() => setIsContactOpen(false)} className="text-zinc-400 hover:text-zinc-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            {contactFormSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <div className="text-sm font-bold text-zinc-100">Inquiry Prepared</div>
                <p className="text-zinc-400 text-xs">Your message has been staged. Opening email client...</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    placeholder="ada@example.com"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Project Brief / Inquiry</label>
                  <textarea
                    rows={3}
                    required
                    value={formMessage}
                    onChange={e => setFormMessage(e.target.value)}
                    placeholder="Tell me about your team, timeline, and architectural challenges..."
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy email instead</span>
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-zinc-950 hover:bg-amber-300 transition-colors"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
