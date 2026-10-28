export type RolePreset = 
  | 'fullstack'
  | 'ai_ml'
  | 'product_designer'
  | 'creative_frontend'
  | 'systems_backend'
  | 'student_newgrad'
  | 'tech_lead_founder';

export type AestheticTheme = 
  | 'bento_dark'
  | 'swiss_editorial'
  | 'modern_monochrome'
  | 'cyber_terminal'
  | 'warm_luxe';

export type PromptMode = 
  | 'claude_artifact' // Single-file interactive React artifact for claude.ai
  | 'claude_project_system' // Claude Project custom instructions + knowledge
  | 'phased_3step' // 3-step prompt chain for deep perfection
  | 'production_repo'; // Next.js / Vite full modular codebase

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  metrics: string; // e.g. "42% latency reduction · 10M daily events"
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  problemSummary: string;
  solutionArchitecture: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface PortfolioProfile {
  name: string;
  handle: string;
  title: string;
  bio: string;
  location: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  primaryMetric: string;
  secondaryMetric: string;
  tertiaryMetric: string;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  philosophies: string[];
}

export interface PromptOptions {
  mode: PromptMode;
  rolePreset: RolePreset;
  aesthetic: AestheticTheme;
  includeCmdK: boolean;
  includeProjectModal: boolean;
  includeContactForm: boolean;
  includeTechRadar: boolean;
  includeExperienceTimeline: boolean;
  includeTestimonials: boolean;
  enforceAntiSlop: boolean;
  strictNoPlaceholderConstraint: boolean;
  includeMobileDrawer: boolean;
  targetTone: 'confident_technical' | 'editorial_poetic' | 'executive_concise' | 'playful_craft';
}
