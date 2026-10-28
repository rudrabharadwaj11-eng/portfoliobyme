import { PortfolioProfile, PromptOptions, AestheticTheme } from '../types.ts';
import { AESTHETIC_PREVIEWS } from '../data/defaultConfig.ts';

export interface GeneratedPromptResult {
  fullPrompt: string;
  systemContext: string;
  userContext: string;
  xmlSections: { title: string; tag: string; content: string }[];
  tokenEstimate: number;
  claudeArtifactInstructions: string;
}

export function generateClaudePortfolioPrompt(
  profile: PortfolioProfile,
  options: PromptOptions
): GeneratedPromptResult {
  const aesthetic = AESTHETIC_PREVIEWS[options.aesthetic] || AESTHETIC_PREVIEWS.bento_dark;

  const aestheticGuidelines = getAestheticDirectives(options.aesthetic);
  const toneDirectives = getToneDirectives(options.targetTone);

  // XML Tag: <role>
  const roleSection = `You are a World-Class Staff Frontend Engineer, Award-Winning Creative Technologist, and Anthropic Claude Artifacts Specialist.
Your mission is to construct an exceptional, production-grade personal portfolio website for ${profile.name}.
The output must be a self-contained, high-performance, visually breathtaking React component built for Claude's interactive web sandbox.`;

  // XML Tag: <design_system>
  const designSystemSection = `Theme: ${aesthetic.name} (${aesthetic.tagline})
- Base Background: ${aesthetic.bgHex}
- Card / Surface Background: ${aesthetic.cardHex}
- Primary Accent Color: ${aesthetic.accentHex}
- Hairline Border Color: ${aesthetic.borderHex}
- Typography Direction: ${aesthetic.fontDisplay}

${aestheticGuidelines}

60-30-10 Color Discipline:
- 60% Neutral Canvas field (${aesthetic.bgHex})
- 30% Structural Surfaces (${aesthetic.cardHex} with subtle 1px border ${aesthetic.borderHex})
- 10% Intentional Accent (${aesthetic.accentHex}) reserved strictly for interactive focus, active tabs, and primary CTAs.`;

  // XML Tag: <user_data>
  const formattedProjects = profile.projects.map((p, idx) => `Project ${idx + 1}:
  - Title: "${p.title}"
  - Category: "${p.category}"
  - Tagline: "${p.tagline}"
  - Key Metric / Quantifiable Proof: "${p.metrics}"
  - Tech Stack: ${p.techStack.join(', ')}
  - Problem Solved: "${p.problemSummary}"
  - Architectural Solution: "${p.solutionArchitecture}"
  - Demo Link: "${p.demoUrl || '#'}"
  - GitHub Repository: "${p.githubUrl || '#'}"`).join('\n\n');

  const formattedExperience = profile.experience.map((e, idx) => `Position ${idx + 1}:
  - Company: "${e.company}"
  - Role: "${e.role}"
  - Timeline: "${e.period}"
  - Location: "${e.location}"
  - Key Impact Statements:
${e.achievements.map(a => `    * ${a}`).join('\n')}`).join('\n\n');

  const formattedSkills = profile.skillCategories.map(s => `  - ${s.name}: ${s.skills.join(', ')}`).join('\n');
  const formattedPhilosophies = profile.philosophies.map(p => `  * "${p}"`).join('\n');

  const userDataSection = `Name: ${profile.name} (@${profile.handle})
Title / Headline: ${profile.title}
Elevator Bio: "${profile.bio}"
Location: ${profile.location}
Current Status / Availability: "${profile.availability}"
Contact Email: ${profile.email}
Social Channels:
  - GitHub: ${profile.github}
  - LinkedIn: ${profile.linkedin}
  - Twitter / X: ${profile.twitter}
  - Personal Domain: ${profile.website}

High-Water Mark Impact Proof Points:
  1. ${profile.primaryMetric}
  2. ${profile.secondaryMetric}
  3. ${profile.tertiaryMetric}

Engineering / Design Principles:
${formattedPhilosophies}

Featured Projects Portfolio:
${formattedProjects}

Career Experience History:
${formattedExperience}

Technical Core Competencies:
${formattedSkills}`;

  // XML Tag: <layout_and_features>
  const featureList: string[] = [
    `1. Clean 3-Zone Top Navigation Bar:
       - Zone 1: Single unadorned wordmark / brand name "${profile.name}" (one line, whitespace-nowrap).
       - Zone 2: 4-5 single-line clean text navigation links with subtle hover underlines ("Projects", "Experience", "Stack", "Contact").
       - Zone 3: 1 primary CTA button ("Get in Touch" or "Copy Email") with clipboard feedback.`
  ];

  featureList.push(`2. Split-Screen Hero Section:
       - Left: Architectural headline, punchy 2-sentence bio, live availability indicator, and primary CTAs.
       - Right: Interactive Bento visual card showcasing live engineering status, latest code deployment, or architectural diagram snippet.
       - Below Split: A full-width 3-column KPI proof ribbon featuring the user's top proof metrics (${profile.primaryMetric} · ${profile.secondaryMetric} · ${profile.tertiaryMetric}).`);

  featureList.push(`3. Dynamic Bento Grid Project Showcase:
       - Interactive category filter tabs (All, Systems, AI/ML, Design, Frontend).
       - Asymmetric layout (e.g. 2-column wide featured cards + 1-column secondary cards).
       - Unboxed metadata (Category · Year · Scale) with typographic separators (NO pill enclosures).
       - Interactive "Explore Case Study" click trigger opening a full deep-dive modal.`);

  if (options.includeProjectModal) {
    featureList.push(`4. Fullscreen / Accessible Project Detail Modal:
       - Triggered upon clicking any project card in the Bento grid.
       - Displays: Project title, category, quantifiable metric header, architectural problem statement, solution design, technical stack breakdown, and live preview buttons.
       - Closes gracefully via top-right (✕) button, clicking outside the backdrop, or pressing the 'Escape' key.`);
  }

  if (options.includeCmdK) {
    featureList.push(`5. Global Command Palette (Cmd+K / Ctrl+K):
       - Global keyboard listener for 'Cmd+K' and 'Ctrl+K' with floating modal menu.
       - Instant fuzzy search across projects, sections, social links, resume download, and quick copy email.
       - Keyboard navigable with Arrow Up / Arrow Down and Enter to select.`);
  }

  if (options.includeTechRadar) {
    featureList.push(`6. Interactive Skills & Architecture Matrix:
       - Interactive category selector or search filter to toggle between Languages, Frameworks, Systems, and Principles.
       - Clean unboxed presentation with subtle hover states and tabular typography.`);
  }

  if (options.includeExperienceTimeline) {
    featureList.push(`7. Career Journey / Experience Timeline:
       - Chronological interactive timeline highlighting company, role, dates, and expandable quantifiable achievements.
       - Hairline connecting line with smooth transition.`);
  }

  if (options.includeContactForm) {
    featureList.push(`8. Contact Drawer / Direct Outreach Terminal:
       - Clean, functional form with fields: Name, Email, Project Brief / Inquiry.
       - Real client-side validation with instant visual feedback and mailto fallback.
       - Prominent "Copy Email (${profile.email})" button with 2-second "Copied to clipboard!" state.`);
  }

  const layoutFeaturesSection = featureList.join('\n\n');

  // XML Tag: <anti_patterns>
  const antiPatternsSection = `STRICT ANTI-PATTERNS (Zero "AI Slop" Policy):
- NO generic purple/violet gradients or neon cybernetic glows.
- NO static pill capsules or bordered chips for metadata. Use clean unboxed text with '·' or '/' separators.
- NO code-comment headers (e.g. NO "// 01 PROJECTS" or ">_ EXPERIENCE"). Use natural, confident title-case prose.
- NO decorative status dots (e.g. animate-pulse green dots) next to static headings or names.
- NO fake percentage breakdown dials (e.g. "94% INNOVATION SCORE"). Every metric must be real and grounded in engineering reality.
- NO thick left-edge accent borders (border-l-4). Use subtle hairline borders or generous whitespace.
- NO generic placeholder lorem ipsum or lazy code comments like "// Add other projects here". Write the full working code!`;

  // XML Tag: <claude_artifacts_protocol>
  const artifactProtocol = `CLAUDE WEB ARTIFACT EXECUTION RULES:
1. Self-Contained React 19/18 Component:
   - Export default component (e.g., 'export default function PersonalPortfolio()').
   - Use standard React hooks: useState, useEffect, useMemo, useCallback.
   - For icons, use standard Lucide React icons (e.g. import { ArrowUpRight, Github, Linkedin, Mail, Command, Terminal, Check, Copy, ExternalLink, X, ChevronRight, Layers, Cpu, Sparkles } from 'lucide-react').
2. Pure Tailwind CSS:
   - Use standard Tailwind utility classes for all styling.
   - Ensure high WCAG AA contrast for dark/light themes.
   - Only animate compositor-friendly properties (opacity, transform) with duration-200 or duration-150.
3. No External Unbundled Dependencies:
   - Do NOT import framer-motion, canvas-confetti, or external libraries that fail in Claude's preview environment. Implement all micro-interactions using native CSS transitions and React state.
4. Completeness Guarantee:
   - You MUST write the complete, functional code without omissions, placeholders, or abbreviated snippets. Every single project and modal state must be fully implemented.`;

  // Mode Specific Wrapping
  let fullPrompt = '';
  if (options.mode === 'claude_artifact') {
    fullPrompt = `<role>
${roleSection}
</role>

<system_context>
Building an elite, portfolio website for Claude Web (claude.ai) that compiles and runs directly inside Claude's interactive Artifact preview sandbox.
Tone: ${toneDirectives}
</system_context>

<design_system>
${designSystemSection}
</design_system>

<user_profile>
${userDataSection}
</user_profile>

<portfolio_architecture>
${layoutFeaturesSection}
</portfolio_architecture>

<anti_patterns>
${antiPatternsSection}
</anti_patterns>

<claude_artifacts_protocol>
${artifactProtocol}
</claude_artifacts_protocol>

<instruction>
Think step-by-step in a <thinking> tag first to plan the component hierarchy, responsive layout, modal state, and keyboard shortcuts.
Then, generate the complete, single-file React component in a single code block. Ensure 100% of the interactive features are wired up and fully functional.
</instruction>`;
  } else if (options.mode === 'claude_project_system') {
    fullPrompt = `# CLAUDE PROJECT SYSTEM PROMPT: PERSONAL PORTFOLIO ARCHITECT

You are the dedicated Lead Design Technologist and Senior Frontend Engineer for ${profile.name}'s personal portfolio web presence.

## System Guidelines & Identity
${roleSection}

## Core Design System
${designSystemSection}

## Profile Knowledge & Canonical Data
${userDataSection}

## Technical & Architectural Requirements
${layoutFeaturesSection}

## Negative Constraints (Zero-Slop Rule)
${antiPatternsSection}

## Codebase Standards
When writing or refactoring components for this portfolio:
- Maintain strict TypeScript type definitions.
- Rely on modern Tailwind CSS with custom theme variables.
- Ensure all interactive modals, filter tabs, and drawer controls work without missing handlers.
- Always output clean, complete code files without placeholders.`;
  } else if (options.mode === 'phased_3step') {
    fullPrompt = `=== PHASE 1 OF 3: DESIGN SYSTEM TOKENS & SHELL SCAFFOLDING ===
I am building a high-end personal portfolio website for ${profile.name} (${profile.title}).
Here is my design system specification and profile data:

<design_system>
${designSystemSection}
</design_system>

<user_profile>
Name: ${profile.name} (@${profile.handle})
Title: ${profile.title}
Bio: ${profile.bio}
Metrics: ${profile.primaryMetric} · ${profile.secondaryMetric} · ${profile.tertiaryMetric}
</user_profile>

<anti_patterns>
${antiPatternsSection}
</anti_patterns>

Please start by outputting the Top Bar navigation and the Split-Screen Hero Section with the full-width KPI metric strip. Include the category filter tab bar below the hero. Make it 100% responsive and ready for the Bento grid in Step 2.

--------------------------------------------------------------------------------
(After Claude outputs Phase 1, send Phase 2:)
=== PHASE 2 OF 3: BENTO GRID & PROJECT CASE STUDY MODAL ===
Now implement the dynamic Bento grid featuring the ${profile.projects.length} projects:
${formattedProjects}

Ensure clicking any project opens the interactive Case Study Modal with the problem statement, architectural diagram/notes, and metrics.

--------------------------------------------------------------------------------
(After Claude outputs Phase 2, send Phase 3:)
=== PHASE 3 OF 3: COMMAND PALETTE (CMD+K), TECH STACK & CONTACT DRAWER ===
Complete the portfolio by adding:
1. Global Cmd+K Command Palette with fuzzy search across projects and actions.
2. The Skills Matrix & Career Timeline.
3. The Contact modal with one-click email copying and interactive message form.`;
  } else {
    // production_repo
    fullPrompt = `You are a Principal Software Architect. Generate a production-ready Next.js 15 (App Router) + Tailwind CSS + TypeScript personal portfolio repository for ${profile.name}.

<design_system>
${designSystemSection}
</design_system>

<user_profile>
${userDataSection}
</user_profile>

<portfolio_architecture>
${layoutFeaturesSection}
</portfolio_architecture>

<anti_patterns>
${antiPatternsSection}
</anti_patterns>

Provide the exact file structure and code for:
1. 'app/layout.tsx' & 'app/page.tsx'
2. 'components/TopNav.tsx'
3. 'components/Hero.tsx'
4. 'components/BentoGrid.tsx'
5. 'components/ProjectModal.tsx'
6. 'components/CommandPalette.tsx'
7. 'components/ContactDrawer.tsx'
Write exhaustive, production-grade TypeScript with full accessibility semantics.`;
  }

  // Calculate approximate token count (~4 characters per token for English text/XML)
  const tokenEstimate = Math.round(fullPrompt.length / 3.8);

  return {
    fullPrompt,
    systemContext: roleSection,
    userContext: userDataSection,
    xmlSections: [
      { title: 'Role & Persona', tag: 'role', content: roleSection },
      { title: 'Design System & Aesthetics', tag: 'design_system', content: designSystemSection },
      { title: 'User Data & Projects', tag: 'user_profile', content: userDataSection },
      { title: 'Layout & Interactive Features', tag: 'portfolio_architecture', content: layoutFeaturesSection },
      { title: 'Anti-Slop Guardrails', tag: 'anti_patterns', content: antiPatternsSection },
      { title: 'Claude Artifact Protocol', tag: 'claude_artifacts_protocol', content: artifactProtocol },
    ],
    tokenEstimate,
    claudeArtifactInstructions: artifactProtocol
  };
}

function getAestheticDirectives(theme: AestheticTheme): string {
  switch (theme) {
    case 'bento_dark':
      return `- Dark obsidian background with subtle zinc borders (border-zinc-800).
- Subtle card elevation with high contrast text (text-zinc-100 on dark, muted text-zinc-400).
- Tabular figures for all technical metrics (tabular-nums font-mono).
- Crisp micro-interactions with smooth 150ms hover transitions.`;
    case 'swiss_editorial':
      return `- Warm paper off-white background with stark, rich typography.
- Prominent editorial serif headlines (Fraunces or Playfair) paired with clean geometric body copy.
- Black hairline dividers (1px solid rgba(0,0,0,0.08)) and generous whitespace margins.
- Clean unboxed metadata with classical typographic bullet separators.`;
    case 'modern_monochrome':
      return `- High-contrast pure white canvas with deep charcoal (#18181b) structural containers.
- Zero color distraction: relies on typographic scale, rhythm, and geometric alignment.
- Stark, crisp buttons with inverted hover states (black to dark gray).`;
    case 'cyber_terminal':
      return `- Dark tactical slate canvas (#0c0f14) with subtle monospace accents for labels and metrics.
- Emerald green accent (#10b981) for interactive state highlights.
- Terminal-inspired command bar and clean status indicators without tacky retro scanline gimmicks.`;
    case 'warm_luxe':
      return `- Deep espresso/obsidian canvas (#121110) with warm bronze and amber accents (#d97706).
- Soft rounded corners (rounded-2xl) and luxurious container padding (p-8).
- Elegant typography pairing with warm, approachable technical narrative.`;
  }
}

function getToneDirectives(tone: PromptOptions['targetTone']): string {
  switch (tone) {
    case 'confident_technical':
      return 'Authoritative, precise, and metric-grounded. Demonstrates deep architectural judgment without buzzwords or hollow self-praise.';
    case 'editorial_poetic':
      return 'Articulate, humanistic, and design-led. Synthesizes software engineering with aesthetic craft and product philosophy.';
    case 'executive_concise':
      return 'Direct, ROI-focused, and high-level. Highlights business outcomes, scale, organizational impact, and strategic clarity.';
    case 'playful_craft':
      return 'Enthusiastic, hands-on, and builder-centric. Celebrates tinkering, micro-interactions, open-source code, and tactile web experiments.';
  }
}
