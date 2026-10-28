import { PortfolioProfile, RolePreset, AestheticTheme, PromptOptions } from '../types.ts';

export const ROLE_PRESETS_DATA: Record<RolePreset, Partial<PortfolioProfile>> = {
  fullstack: {
    title: 'Staff Full-Stack Engineer & Systems Architect',
    bio: 'Building resilient distributed web systems and tactile user interfaces. Focused on sub-50ms user interactions, real-time sync engines, and zero-downtime infrastructure.',
    primaryMetric: '14M+ Monthly Active Users',
    secondaryMetric: '<35ms p95 Global Edge Latency',
    tertiaryMetric: '99.995% Service Availability',
    philosophies: [
      'Architecture should mirror the domain, not the hype cycle.',
      'Fast software is a moral obligation; latency is user cognitive overhead.',
      'Small, composable primitives trump monolithic frameworks.'
    ],
    projects: [
      {
        id: 'p1',
        title: 'Chronos Edge',
        category: 'Distributed Systems',
        tagline: 'Global state synchronization layer using Conflict-Free Replicated Data Types (CRDTs).',
        metrics: '12M sync ops/sec · 18ms convergence time',
        techStack: ['Rust', 'TypeScript', 'WebAssembly', 'Cloudflare Workers', 'WebSocket'],
        demoUrl: 'https://chronos.edge.internal',
        githubUrl: 'https://github.com/example/chronos-edge',
        featured: true,
        problemSummary: 'Multiplayer editing applications suffered from network jitter and split-brain document states across continents.',
        solutionArchitecture: 'Implemented a lightweight Yjs-compatible hybrid logical clock engine deployed on edge workers with p2p fallback.'
      },
      {
        id: 'p2',
        title: 'Verve UI Studio',
        category: 'Design Engineering',
        tagline: 'Zero-runtime CSS micro-engine with fluid spatial scale and accessibility primitives.',
        metrics: '4.2k GitHub Stars · 140k weekly npm installs',
        techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Accessible Radix'],
        demoUrl: 'https://verve-ui.dev',
        githubUrl: 'https://github.com/example/verve-ui',
        featured: true,
        problemSummary: 'Existing UI component systems added 80kb+ runtime overhead and forced rigid design tokens.',
        solutionArchitecture: 'Designed a compiler-level component library with zero runtime styles and automatic WCAG AAA contrast recalculation.'
      },
      {
        id: 'p3',
        title: 'Pulse Query Engine',
        category: 'Data & Databases',
        tagline: 'Streaming analytics platform over Postgres WAL replication logs.',
        metrics: 'Processed 2.8B rows/day · 65% AWS cost reduction',
        techStack: ['Go', 'PostgreSQL', 'Kafka', 'Redis', 'Docker'],
        demoUrl: 'https://pulse.internal',
        githubUrl: 'https://github.com/example/pulse-query',
        featured: false,
        problemSummary: 'Real-time dashboard queries were degrading production OLTP databases during peak flash sales.',
        solutionArchitecture: 'Tapped into Postgres CDC logical replication slots to maintain hot memory projections with automatic failover.'
      },
      {
        id: 'p4',
        title: 'Aegis Sentinel',
        category: 'Security & Infrastructure',
        tagline: 'Zero-trust API gateway enforcing cryptographic token provenance and rate limiting.',
        metrics: 'Filtered 450M malicious probes · 0 false drops',
        techStack: ['eBPF', 'Rust', 'Envoy', 'gRPC'],
        demoUrl: 'https://aegis.dev',
        githubUrl: 'https://github.com/example/aegis-sentinel',
        featured: false,
        problemSummary: 'Sophisticated layer-7 credential stuffing attacks were bypassing traditional IP-based WAFs.',
        solutionArchitecture: 'Built an in-kernel eBPF network packet inspector with dynamic token reputation scoring in sub-millisecond overhead.'
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'Starlight Systems',
        role: 'Staff Infrastructure Engineer',
        period: '2023 — Present',
        location: 'San Francisco, CA',
        achievements: [
          'Spearheaded migration of core microservices to edge architecture, cutting compute spend by $480k annually.',
          'Mentored 14 senior engineers across distributed systems design and frontend performance budgets.',
          'Maintained 99.995% uptime across 4 peak global traffic spikes handling 180k req/sec.'
        ]
      },
      {
        id: 'exp2',
        company: 'Hyperplane Media',
        role: 'Senior Full-Stack Engineer',
        period: '2020 — 2023',
        location: 'New York, NY',
        achievements: [
          'Rewrote editorial publishing pipeline in TypeScript and Go, decreasing article publishing latency from 14s to 320ms.',
          'Authored high-retention interactive canvas engine driving 45M pageviews.'
        ]
      }
    ],
    skillCategories: [
      { name: 'Core Languages', skills: ['TypeScript', 'Rust', 'Go', 'Python', 'SQL'] },
      { name: 'Frontend & UI', skills: ['React 19', 'Next.js', 'Tailwind CSS', 'Web Audio/Canvas', 'State Machines'] },
      { name: 'Systems & Backend', skills: ['Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes'] },
      { name: 'Architecture', skills: ['CRDTs', 'Event-Driven Systems', 'Edge Compute', 'Distributed Consensus', 'API Design'] }
    ]
  },
  ai_ml: {
    title: 'Senior AI Engineer & Applied LLM Systems Researcher',
    bio: 'Designing agentic execution loops, evaluation harnesses, and sub-second reasoning pipelines. Bridging frontier foundational models with deterministic production software.',
    primaryMetric: '850M+ LLM Tokens Processed / Mo',
    secondaryMetric: '94.2% Benchmark Evals Accuracy',
    tertiaryMetric: '<180ms TTFT (Time To First Token)',
    philosophies: [
      'Prompt engineering is software engineering: write tests, enforce invariants, measure variance.',
      'Never use an LLM for what a regex or deterministic graph traversal solves in 2ms.',
      'Grounding and retrieval precision dictate output reliability.'
    ],
    projects: [
      {
        id: 'p1',
        title: 'Synapse RAG Core',
        category: 'AI Architecture',
        tagline: 'Hybrid sparse-dense retrieval engine with dynamic query rewrites and reranking.',
        metrics: '+28% NDCG@10 gain · 65ms median retrieval',
        techStack: ['Python', 'Qdrant', 'FastAPI', 'Gemini 3.8', 'HuggingFace'],
        featured: true,
        problemSummary: 'Standard vector search was returning hallucinated context on domain-specific biomedical queries.',
        solutionArchitecture: 'Built a multi-stage pipeline combining reciprocal rank fusion (BM25 + BGE-large) with speculative cross-encoder reranking.'
      },
      {
        id: 'p2',
        title: 'Cognitive Loop Sandbox',
        category: 'Agentic Systems',
        tagline: 'Self-correcting agent harness executing sandboxed bash environments with rollback.',
        metrics: '99.4% safety containment · 3.4x task completion rate',
        techStack: ['TypeScript', 'Docker', 'WebSockets', 'LangGraph', 'Claude 3.7'],
        featured: true,
        problemSummary: 'Code-generating AI agents broke test suites without knowing how to iteratively heal their own syntax errors.',
        solutionArchitecture: 'Implemented a tree-of-thoughts verification cycle with snapshot rollbacks and AST validation.'
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'Nexus AI Labs',
        role: 'Lead Applied AI Engineer',
        period: '2023 — Present',
        location: 'Seattle, WA',
        achievements: [
          'Engineered automated synthetic data generation pipeline bootstrapping fine-tuned domain models.',
          'Reduced agent hallucination rate on financial documents from 8.4% to 0.6% using structured verification.'
        ]
      }
    ],
    skillCategories: [
      { name: 'AI & Inference', skills: ['Gemini API', 'Claude API', 'OpenAI', 'vLLM', 'HuggingFace', 'LangGraph'] },
      { name: 'Vector & Storage', skills: ['Qdrant', 'pgvector', 'Chroma', 'Redis', 'DuckDB'] },
      { name: 'Languages & Core', skills: ['Python', 'TypeScript', 'PyTorch', 'FastAPI', 'Rust'] }
    ]
  },
  product_designer: {
    title: 'Staff Product Designer & Design Systems Lead',
    bio: 'Sculpting high-density digital instruments and intentional design systems. Specializing in complex workflows, information architecture, and micro-interaction typography.',
    primaryMetric: '65+ Components Built & Scaled',
    secondaryMetric: '0.98 System Accessibility Rating',
    tertiaryMetric: '2.4M Designers & Devs Reached',
    philosophies: [
      'Clarity over novelty: every pixel must earn its right to exist.',
      'Information density done right reduces cognitive friction, not increases it.',
      'A design system without code parity is just a static picture book.'
    ],
    projects: [
      {
        id: 'p1',
        title: 'Atelier Design System',
        category: 'Design Systems',
        tagline: 'Unified multi-platform token architecture spanning web, iOS, and desktop consoles.',
        metrics: 'Used by 22 product teams · 70% decrease in UI regression bugs',
        techStack: ['Figma Tokens', 'React', 'CSS Variables', 'Storybook', 'WCAG AAA'],
        featured: true,
        problemSummary: 'Fragmented team libraries caused inconsistent button radii, unreadable contrast ratios, and developer friction.',
        solutionArchitecture: 'Constructed an automated token pipeline compiling Figma variables into typed CSS custom properties and React hooks.'
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'Linear Spatial',
        role: 'Principal Product Designer',
        period: '2022 — Present',
        location: 'Remote',
        achievements: [
          'Redesigned the primary project triage interface, lifting user task completion velocity by 34%.',
          'Standardized cross-platform typography and dark-mode optical balance across web and native apps.'
        ]
      }
    ],
    skillCategories: [
      { name: 'Design Craft', skills: ['Design Systems', 'Information Architecture', 'Figma', 'Prototyping', 'Typography'] },
      { name: 'Code & Execution', skills: ['HTML/Tailwind', 'React', 'CSS Grid', 'Micro-Interactions', 'Accessibility'] }
    ]
  },
  creative_frontend: {
    title: 'Creative Technologist & Frontend Artist',
    bio: 'Crafting spatial web experiences, interactive graphics, and audio-reactive digital installations. Blending math, typography, and web performance.',
    primaryMetric: '60 FPS Lock on Mobile',
    secondaryMetric: '18 Webby & Awwwards Honors',
    tertiaryMetric: '<1.2MB Total Page Bundle',
    philosophies: [
      'The browser is a canvas for kinetic typography and tactile physics.',
      'Performance is the first design constraint; beauty that stutters is ugly.',
      'Craft lives in the transitions.'
    ],
    projects: [
      {
        id: 'p1',
        title: 'Kinetic Monolith',
        category: 'Interactive WebGL',
        tagline: 'Real-time raymarched audio visualizer running purely on fragment shaders.',
        metrics: '120k interactive sessions · 60fps steady on Intel MacBooks',
        techStack: ['Three.js', 'GLSL', 'Web Audio API', 'TypeScript', 'Tailwind'],
        featured: true,
        problemSummary: 'Audio visualizers routinely pegged CPU at 100% and drained mobile battery within minutes.',
        solutionArchitecture: 'Wrote custom GLSL raymarching shaders calculating volumetric lighting directly in GPU passes with instanced geometry.'
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'Studio Monochrome',
        role: 'Lead Creative Developer',
        period: '2021 — Present',
        location: 'Tokyo / Remote',
        achievements: [
          'Architected flagship brand exhibitions for global luxury fashion and technology clients.',
          'Pioneered zero-jank page transition technique using Web Animations API.'
        ]
      }
    ],
    skillCategories: [
      { name: 'Graphics & Creative', skills: ['WebGL', 'Three.js', 'GLSL Shaders', 'Web Audio API', 'SVG Animation'] },
      { name: 'Web Core', skills: ['TypeScript', 'React 19', 'Tailwind CSS', 'Vite', 'Canvas 2D'] }
    ]
  },
  systems_backend: {
    title: 'Principal Systems & Cloud Infrastructure Engineer',
    bio: 'Specializing in high-concurrency distributed databases, Linux internals, and high-volume data streams. Obsessed with mechanical sympathy and failure tolerance.',
    primaryMetric: '4.5M Requests / Sec Peak',
    secondaryMetric: 'Zero Data Loss Incidents',
    tertiaryMetric: '$1.4M Annual Cloud Savings',
    philosophies: [
      'Understand the hardware underneath your abstractions.',
      'Design for partial failures; networks partition and disks slow down.',
      'Measure p99.9, not averages.'
    ],
    projects: [
      {
        id: 'p1',
        title: 'RaftKV Engine',
        category: 'Distributed Databases',
        tagline: 'Consensus-driven distributed key-value store in Go with LSM-tree storage engine.',
        metrics: '350k writes/sec per node · Linearizable reads',
        techStack: ['Go', 'Raft Consensus', 'LSM Tree', 'gRPC', 'Prometheus'],
        featured: true,
        problemSummary: 'Existing store was locking the entire keyspace on leader election changes, stalling downstream clients.',
        solutionArchitecture: 'Implemented segmented Raft logs and multi-raft groups with asynchronous snapshot compaction.'
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'CloudVault Corp',
        role: 'Principal Systems Engineer',
        period: '2021 — Present',
        location: 'Austin, TX',
        achievements: [
          'Spearheaded multi-region data replication topology across US and EU zones.',
          'Rewrote connection pooling layer in C, reducing socket thrashing during DDoS events.'
        ]
      }
    ],
    skillCategories: [
      { name: 'Systems Languages', skills: ['Go', 'Rust', 'C', 'Python', 'Bash'] },
      { name: 'Infrastructure', skills: ['Kubernetes', 'Terraform', 'PostgreSQL', 'Kafka', 'eBPF', 'Linux Internals'] }
    ]
  },
  student_newgrad: {
    title: 'Software Engineer & Computer Science Graduate',
    bio: 'Recent CS graduate passionate about full-stack engineering, open-source tooling, and algorithmic efficiency. Ready to contribute production code from day one.',
    primaryMetric: '3.94 / 4.0 GPA (Honors CS)',
    secondaryMetric: '1,200+ LeetCode & Competitive Alg Solves',
    tertiaryMetric: '4 Active Open-Source Repos',
    philosophies: [
      'Strong computer science fundamentals empower rapid language adoption.',
      'Clean code is written for humans to read and machines to execute.',
      'Ship small, iterate fast, solicit feedback relentlessly.'
    ],
    projects: [
      {
        id: 'p1',
        title: 'MiniGit',
        category: 'Compilers & Tooling',
        tagline: 'Content-addressable version control system built from scratch in Rust.',
        metrics: 'Full SHA-1 blob/tree/commit implementation · 450+ unit tests',
        techStack: ['Rust', 'CLI', 'File I/O', 'Zlib Compression'],
        featured: true,
        problemSummary: 'Understood git commands superficially without mastering index staging and DAG tree mechanics.',
        solutionArchitecture: 'Engineered a functional git clone replicating init, hash-object, commit-tree, and checkout algorithms.'
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'DataTech Innovations',
        role: 'Software Engineering Intern',
        period: 'Summer 2024',
        location: 'Boston, MA',
        achievements: [
          'Engineered internal telemetry dashboard aggregating 50k daily microservice health pings.',
          'Authored automated integration test suite cutting pull-request CI run times by 18%.'
        ]
      }
    ],
    skillCategories: [
      { name: 'Languages', skills: ['TypeScript', 'Python', 'Java', 'C++', 'Rust', 'SQL'] },
      { name: 'Frameworks & Tools', skills: ['React', 'Node.js', 'Express', 'Git', 'Docker', 'PostgreSQL'] }
    ]
  },
  tech_lead_founder: {
    title: 'Founding Engineer & Technical Lead',
    bio: 'Guiding products from 0 to 1 and scaling engineering teams. Combining product velocity with technical rigor, pragmatic architecture, and customer focus.',
    primaryMetric: '$3.2M Seed Raised with Tech Prototype',
    secondaryMetric: '10x Team Velocity Multiplier',
    tertiaryMetric: 'Zero Tech Debt Rewrites in 3 Yrs',
    philosophies: [
      'Architecture exists to enable business agility, not as an academic exercise.',
      'A great engineer writes code; a great tech lead creates an environment where everyone ships.',
      'Speak the language of customer outcomes.'
    ],
    projects: [
      {
        id: 'p1',
        title: 'Foundry OS',
        category: 'B2B SaaS Core',
        tagline: 'Automated procurement and invoice reconciliation platform for supply chain vendors.',
        metrics: '$18M invoices processed in 90 days · 99.8% extraction accuracy',
        techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Stripe', 'Python OCR'],
        featured: true,
        problemSummary: 'Manual three-way matching was draining 40+ hours per week from accounts payable teams.',
        solutionArchitecture: 'Designed an asynchronous workflow engine pairing OCR extraction with double-entry ledger verification.'
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'VentureScale Technologies',
        role: 'Head of Engineering',
        period: '2022 — Present',
        location: 'San Francisco, CA',
        achievements: [
          'Scaled engineering organization from 2 to 16 engineers while maintaining weekly production deploy cadence.',
          'Architected SOC2 Type II certified cloud infrastructure with automated compliance auditing.'
        ]
      }
    ],
    skillCategories: [
      { name: 'Leadership & Architecture', skills: ['System Architecture', 'Team Mentorship', 'Hiring', 'SOC2 / Compliance', 'Roadmapping'] },
      { name: 'Full-Stack Execution', skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS / GCP', 'CI/CD'] }
    ]
  }
};

export const DEFAULT_PROFILE: PortfolioProfile = {
  name: 'Alex Rivera',
  handle: 'arivera',
  title: 'Staff Full-Stack Engineer & Systems Architect',
  bio: 'Building resilient distributed web systems and tactile user interfaces. Focused on sub-50ms user interactions, real-time sync engines, and zero-downtime infrastructure.',
  location: 'San Francisco, CA (or Remote)',
  availability: 'Available for Staff/Lead roles & High-Impact Consulting',
  email: 'alex.rivera.dev@gmail.com',
  github: 'https://github.com/alexrivera-dev',
  linkedin: 'https://linkedin.com/in/alexrivera-eng',
  twitter: 'https://x.com/alexrivera_dev',
  website: 'https://alexrivera.dev',
  primaryMetric: '14M+ Monthly Active Users',
  secondaryMetric: '<35ms p95 Global Edge Latency',
  tertiaryMetric: '99.995% Service Availability',
  philosophies: [
    'Architecture should mirror the domain, not the hype cycle.',
    'Fast software is a moral obligation; latency is user cognitive overhead.',
    'Small, composable primitives trump monolithic frameworks.'
  ],
  projects: ROLE_PRESETS_DATA.fullstack.projects!,
  experience: ROLE_PRESETS_DATA.fullstack.experience!,
  skillCategories: ROLE_PRESETS_DATA.fullstack.skillCategories!
};

export const DEFAULT_PROMPT_OPTIONS: PromptOptions = {
  mode: 'claude_artifact',
  rolePreset: 'fullstack',
  aesthetic: 'bento_dark',
  includeCmdK: true,
  includeProjectModal: true,
  includeContactForm: true,
  includeTechRadar: true,
  includeExperienceTimeline: true,
  includeTestimonials: true,
  enforceAntiSlop: true,
  strictNoPlaceholderConstraint: true,
  includeMobileDrawer: true,
  targetTone: 'confident_technical'
};

export const AESTHETIC_PREVIEWS: Record<AestheticTheme, {
  name: string;
  tagline: string;
  bgHex: string;
  cardHex: string;
  accentHex: string;
  borderHex: string;
  fontDisplay: string;
  description: string;
}> = {
  bento_dark: {
    name: 'Bento Dark Architecture',
    tagline: 'Deep Obsidian & Razor-Sharp Hairlines',
    bgHex: '#09090b',
    cardHex: '#121215',
    accentHex: '#3b82f6',
    borderHex: '#27272a',
    fontDisplay: 'Outfit / Sans',
    description: 'The definitive Silicon Valley / modern developer aesthetic: rich dark canvas, subtle 1px zinc borders, high contrast tabular metrics, and crisp typography.'
  },
  swiss_editorial: {
    name: 'Minimalist Swiss / Editorial',
    tagline: 'Warm Paper, Black Ink & Serif Impact',
    bgHex: '#faf9f6',
    cardHex: '#ffffff',
    accentHex: '#0f172a',
    borderHex: '#e5e5e0',
    fontDisplay: 'Fraunces Serif + Sans',
    description: 'Editorial monograph vibe inspired by modern architectural journals. Warm paper texture, high typographic contrast, zero-pill discipline, pure elegance.'
  },
  modern_monochrome: {
    name: 'Modernist Monochrome',
    tagline: 'High-Contrast Stark Precision',
    bgHex: '#ffffff',
    cardHex: '#f4f4f5',
    accentHex: '#18181b',
    borderHex: '#e4e4e7',
    fontDisplay: 'Plus Jakarta Sans',
    description: 'Clean, gallery-grade white canvas with dark charcoal structural surfaces. Pristine readability and museum-level restraint.'
  },
  cyber_terminal: {
    name: 'Clean Cyber / Terminal Studio',
    tagline: 'Dark Slate with Tactical Monospace',
    bgHex: '#0c0f14',
    cardHex: '#141a24',
    accentHex: '#10b981',
    borderHex: '#1e293b',
    fontDisplay: 'JetBrains Mono',
    description: 'Engineered for systems architects and security researchers. Subtle monospace data points, dark slate surfaces, and emerald accent touches without tacky sci-fi tropes.'
  },
  warm_luxe: {
    name: 'Warm Studio Luxe',
    tagline: 'Deep Espresso & Warm Bronze Accent',
    bgHex: '#121110',
    cardHex: '#1c1a18',
    accentHex: '#d97706',
    borderHex: '#2e2b27',
    fontDisplay: 'Outfit + Cormorant',
    description: 'Boutique design agency feel. Warm dark tones, soft amber highlights, curated spacing, and handcrafted feel.'
  }
};
