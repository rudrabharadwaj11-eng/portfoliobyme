import React, { useState } from 'react';
import { 
  PortfolioProfile, 
  PromptOptions, 
  RolePreset, 
  AestheticTheme, 
  PromptMode, 
  ProjectItem 
} from '../types.ts';
import { ROLE_PRESETS_DATA, AESTHETIC_PREVIEWS } from '../data/defaultConfig.ts';
import { 
  Sliders, 
  User, 
  Palette, 
  FolderGit2, 
  Layers, 
  Sparkles, 
  Plus, 
  Trash2, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink 
} from 'lucide-react';

interface CustomizerPanelProps {
  profile: PortfolioProfile;
  setProfile: React.Dispatch<React.SetStateAction<PortfolioProfile>>;
  options: PromptOptions;
  setOptions: React.Dispatch<React.SetStateAction<PromptOptions>>;
  onOpenAiEnhancer: () => void;
}

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({
  profile,
  setProfile,
  options,
  setOptions,
  onOpenAiEnhancer
}) => {
  const [activeSection, setActiveSection] = useState<'preset' | 'theme' | 'profile' | 'projects' | 'features'>('preset');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(profile.projects[0]?.id || null);

  const handleRoleChange = (role: RolePreset) => {
    const preset = ROLE_PRESETS_DATA[role];
    if (preset) {
      setOptions(prev => ({ ...prev, rolePreset: role }));
      setProfile(prev => ({
        ...prev,
        title: preset.title || prev.title,
        bio: preset.bio || prev.bio,
        primaryMetric: preset.primaryMetric || prev.primaryMetric,
        secondaryMetric: preset.secondaryMetric || prev.secondaryMetric,
        tertiaryMetric: preset.tertiaryMetric || prev.tertiaryMetric,
        philosophies: preset.philosophies || prev.philosophies,
        projects: preset.projects || prev.projects,
        experience: preset.experience || prev.experience,
        skillCategories: preset.skillCategories || prev.skillCategories
      }));
    }
  };

  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `p-${Date.now()}`,
      title: 'New Flagship Project',
      category: 'Full-Stack',
      tagline: 'High-impact distributed tool or web product.',
      metrics: '50k+ active users · 99.9% uptime',
      techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
      problemSummary: 'Latency and scaling bottlenecks during high traffic spikes.',
      solutionArchitecture: 'Decoupled monolithic server into asynchronous worker queues and edge caching.',
      featured: true
    };
    setProfile(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
    setExpandedProjectId(newProj.id);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const updateProjectField = (id: string, field: keyof ProjectItem, value: any) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, [field]: value } : p))
    }));
  };

  return (
    <aside className="w-full lg:w-96 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Panel Navigation Bar */}
      <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-amber-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Prompt Architect Controls
            </h2>
          </div>
          <button
            onClick={onOpenAiEnhancer}
            className="flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Sparkles className="h-3 w-3" />
            <span>AI Polish</span>
          </button>
        </div>

        {/* Section Tabs */}
        <div className="grid grid-cols-5 gap-1 rounded-lg bg-zinc-900 p-1 border border-zinc-800/80">
          <button
            onClick={() => setActiveSection('preset')}
            className={`rounded py-1 text-[11px] font-medium transition-colors ${
              activeSection === 'preset' ? 'bg-zinc-800 text-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Role
          </button>
          <button
            onClick={() => setActiveSection('theme')}
            className={`rounded py-1 text-[11px] font-medium transition-colors ${
              activeSection === 'theme' ? 'bg-zinc-800 text-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Theme
          </button>
          <button
            onClick={() => setActiveSection('profile')}
            className={`rounded py-1 text-[11px] font-medium transition-colors ${
              activeSection === 'profile' ? 'bg-zinc-800 text-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Bio
          </button>
          <button
            onClick={() => setActiveSection('projects')}
            className={`rounded py-1 text-[11px] font-medium transition-colors ${
              activeSection === 'projects' ? 'bg-zinc-800 text-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Works
          </button>
          <button
            onClick={() => setActiveSection('features')}
            className={`rounded py-1 text-[11px] font-medium transition-colors ${
              activeSection === 'features' ? 'bg-zinc-800 text-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Rules
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* SECTION 1: ROLE & CLAUDE MODE */}
        {activeSection === 'preset' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Target Claude Execution Mode
              </label>
              <p className="text-[11px] text-zinc-400 mb-2">
                Choose how Claude will generate your portfolio.
              </p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    id: 'claude_artifact' as PromptMode,
                    name: 'Claude Web Artifact (Recommended)',
                    desc: 'Outputs a single, complete React + Tailwind component that runs live in claude.ai.'
                  },
                  {
                    id: 'claude_project_system' as PromptMode,
                    name: 'Claude Project System Prompt',
                    desc: 'For persistent Claude Projects with custom instructions & project memory.'
                  },
                  {
                    id: 'phased_3step' as PromptMode,
                    name: '3-Step Phased Sequence',
                    desc: 'Step-by-step prompt chain to avoid token truncation on massive websites.'
                  },
                  {
                    id: 'production_repo' as PromptMode,
                    name: 'Next.js 15 Modular Codebase',
                    desc: 'Instructs Claude to write modular app/ components for production git repo.'
                  }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setOptions(prev => ({ ...prev, mode: mode.id }))}
                    className={`text-left p-2.5 rounded-lg border transition-all text-xs ${
                      options.mode === mode.id
                        ? 'border-amber-400/80 bg-amber-400/10 text-zinc-100'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{mode.name}</span>
                      {options.mode === mode.id && <Check className="h-3.5 w-3.5 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">{mode.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80">
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Engineering Discipline & Persona
              </label>
              <p className="text-[11px] text-zinc-400 mb-2">
                Applies curated domain metrics, technical tone, and sample architectures.
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'fullstack' as RolePreset, label: 'Staff Full-Stack & Systems' },
                  { id: 'ai_ml' as RolePreset, label: 'AI Engineer & LLM Researcher' },
                  { id: 'product_designer' as RolePreset, label: 'Staff Product Designer & Systems' },
                  { id: 'creative_frontend' as RolePreset, label: 'Creative Technologist / WebGL' },
                  { id: 'systems_backend' as RolePreset, label: 'Principal Systems & Cloud Infra' },
                  { id: 'tech_lead_founder' as RolePreset, label: 'Founding Engineer & Tech Lead' },
                  { id: 'student_newgrad' as RolePreset, label: 'CS Graduate & New Engineer' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleChange(r.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                      options.rolePreset === r.id
                        ? 'border-amber-400/60 bg-zinc-800 text-amber-400 font-semibold'
                        : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>{r.label}</span>
                    {options.rolePreset === r.id && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80">
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Voice & Prose Tone
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'confident_technical', label: 'Technical Rigor' },
                  { id: 'editorial_poetic', label: 'Editorial Craft' },
                  { id: 'executive_concise', label: 'Executive ROI' },
                  { id: 'playful_craft', label: 'Builder Spirit' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setOptions(prev => ({ ...prev, targetTone: t.id as any }))}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs text-center transition-all ${
                      options.targetTone === t.id
                        ? 'border-amber-400/70 bg-zinc-800 text-amber-400 font-semibold'
                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: AESTHETIC THEME */}
        {activeSection === 'theme' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Visual Aesthetic & Design Direction
              </label>
              <p className="text-[11px] text-zinc-400 mb-3">
                Instructs Claude on precise hex codes, typography pairings, and layout tension.
              </p>
              <div className="space-y-2.5">
                {(Object.entries(AESTHETIC_PREVIEWS) as [AestheticTheme, typeof AESTHETIC_PREVIEWS['bento_dark']][]).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setOptions(prev => ({ ...prev, aesthetic: key }))}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      options.aesthetic === key
                        ? 'border-amber-400 ring-1 ring-amber-400/40 bg-zinc-900'
                        : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-zinc-100">{item.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="h-3 w-3 rounded-full border border-white/20 shadow-sm" 
                          style={{ backgroundColor: item.bgHex }} 
                          title="Canvas" 
                        />
                        <span 
                          className="h-3 w-3 rounded-full border border-white/20 shadow-sm" 
                          style={{ backgroundColor: item.accentHex }} 
                          title="Accent" 
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-amber-400/90 font-mono mb-1">{item.tagline}</p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: BIO & DETAILS */}
        {activeSection === 'profile' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Headline / Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={e => setProfile(prev => ({ ...prev, title: e.target.value }))}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Elevator Hook / Bio</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={e => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Current Availability Status</label>
              <input
                type="text"
                value={profile.availability}
                onChange={e => setProfile(prev => ({ ...prev, availability: e.target.value }))}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-zinc-800/80">
              <label className="font-semibold text-zinc-300 block mb-1">High-Water Mark Metrics</label>
              <p className="text-[11px] text-zinc-400 mb-2">Quantifiable proof placed directly below the hero split.</p>
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Primary Metric (e.g. 14M+ Active Users)"
                  value={profile.primaryMetric}
                  onChange={e => setProfile(prev => ({ ...prev, primaryMetric: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none font-mono text-xs"
                />
                <input
                  type="text"
                  placeholder="Secondary Metric (e.g. <35ms p95 Latency)"
                  value={profile.secondaryMetric}
                  onChange={e => setProfile(prev => ({ ...prev, secondaryMetric: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none font-mono text-xs"
                />
                <input
                  type="text"
                  placeholder="Tertiary Metric (e.g. 99.995% Uptime)"
                  value={profile.tertiaryMetric}
                  onChange={e => setProfile(prev => ({ ...prev, tertiaryMetric: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-100 focus:border-amber-400 focus:outline-none font-mono text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: PROJECTS */}
        {activeSection === 'projects' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-zinc-200">Featured Works ({profile.projects.length})</h3>
                <p className="text-[11px] text-zinc-400">Structured for Bento grid cards & modal deep dives.</p>
              </div>
              <button
                onClick={handleAddProject}
                className="flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-amber-400 hover:bg-zinc-700 transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            <div className="space-y-2">
              {profile.projects.map(proj => {
                const isExpanded = expandedProjectId === proj.id;
                return (
                  <div
                    key={proj.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/60 overflow-hidden text-xs transition-colors"
                  >
                    <div
                      onClick={() => setExpandedProjectId(isExpanded ? null : proj.id)}
                      className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-zinc-800/50"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-semibold text-zinc-200 truncate">{proj.title}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">({proj.category})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handleDeleteProject(proj.id, e)}
                          className="p-1 text-zinc-500 hover:text-red-400 transition-colors rounded"
                          title="Delete project"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5 text-zinc-400" /> : <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-3 border-t border-zinc-800/80 space-y-2 bg-zinc-950/60">
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-0.5">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={e => updateProjectField(proj.id, 'title', e.target.value)}
                            className="w-full rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-100"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-0.5">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={e => updateProjectField(proj.id, 'category', e.target.value)}
                            className="w-full rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-100"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-0.5">Tagline</label>
                          <input
                            type="text"
                            value={proj.tagline}
                            onChange={e => updateProjectField(proj.id, 'tagline', e.target.value)}
                            className="w-full rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-100"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-0.5">Impact Metric</label>
                          <input
                            type="text"
                            value={proj.metrics}
                            onChange={e => updateProjectField(proj.id, 'metrics', e.target.value)}
                            className="w-full rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-100 font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-0.5">Tech Stack (comma-separated)</label>
                          <input
                            type="text"
                            value={proj.techStack.join(', ')}
                            onChange={e => updateProjectField(proj.id, 'techStack', e.target.value.split(',').map(s => s.trim()))}
                            className="w-full rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-100"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-0.5">Problem Statement (For Modal)</label>
                          <textarea
                            rows={2}
                            value={proj.problemSummary}
                            onChange={e => updateProjectField(proj.id, 'problemSummary', e.target.value)}
                            className="w-full rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-100 leading-snug"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-0.5">Architectural Solution (For Modal)</label>
                          <textarea
                            rows={2}
                            value={proj.solutionArchitecture}
                            onChange={e => updateProjectField(proj.id, 'solutionArchitecture', e.target.value)}
                            className="w-full rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-100 leading-snug"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 5: FEATURES & ANTI-SLOP */}
        {activeSection === 'features' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-zinc-200 block mb-1">Interactive Features to Mandate</label>
              <p className="text-[11px] text-zinc-400 mb-2.5">
                Every toggled feature will have strict requirements injected into the Claude prompt.
              </p>
              <div className="space-y-2">
                {[
                  { key: 'includeCmdK', label: 'Command Palette (Cmd+K)', desc: 'Global keyboard listener with fuzzy search & quick actions.' },
                  { key: 'includeProjectModal', label: 'Project Case Study Modals', desc: 'Deep dive modals with architecture, problem & solution notes.' },
                  { key: 'includeContactForm', label: 'Interactive Contact Terminal', desc: 'Validated message form + one-click clipboard email copy.' },
                  { key: 'includeTechRadar', label: 'Filterable Tech Matrix', desc: 'Categorized languages, frameworks, and architecture values.' },
                  { key: 'includeExperienceTimeline', label: 'Career Journey Timeline', desc: 'Expandable chronology with verifiable metrics.' }
                ].map(item => (
                  <label
                    key={item.key}
                    className="flex items-start gap-2.5 p-2 rounded-lg border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean((options as any)[item.key])}
                      onChange={e => setOptions(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      className="mt-0.5 rounded border-zinc-700 text-amber-400 focus:ring-0 bg-zinc-800"
                    />
                    <div>
                      <div className="font-medium text-zinc-200">{item.label}</div>
                      <div className="text-[11px] text-zinc-400 leading-tight mt-0.5">{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80">
              <label className="font-semibold text-zinc-200 block mb-1">Strict Quality Invariants</label>
              <div className="space-y-2">
                <label className="flex items-start gap-2.5 p-2 rounded-lg border border-amber-900/30 bg-amber-950/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.enforceAntiSlop}
                    onChange={e => setOptions(prev => ({ ...prev, enforceAntiSlop: e.target.checked }))}
                    className="mt-0.5 rounded border-zinc-700 text-amber-400 focus:ring-0 bg-zinc-800"
                  />
                  <div>
                    <div className="font-medium text-amber-300">Enforce Zero-Slop Constitution</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Bans generic purple gradients, fake pill tags, comment headers, and decorative pulsing dots.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2 rounded-lg border border-zinc-800/80 bg-zinc-900/40 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.strictNoPlaceholderConstraint}
                    onChange={e => setOptions(prev => ({ ...prev, strictNoPlaceholderConstraint: e.target.checked }))}
                    className="mt-0.5 rounded border-zinc-700 text-amber-400 focus:ring-0 bg-zinc-800"
                  />
                  <div>
                    <div className="font-medium text-zinc-200">Strict Completeness Protocol</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Commands Claude to write 100% of the code without '// TODO' omissions or truncated ellipsis.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
