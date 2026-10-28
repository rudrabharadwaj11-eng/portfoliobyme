import React from 'react';
import { BookOpen, X, CheckCircle2, AlertTriangle, Lightbulb, ExternalLink, Terminal, Copy } from 'lucide-react';

interface ClaudeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaudeGuideModal: React.FC<ClaudeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-100 p-6 sm:p-8 shadow-2xl space-y-6 text-xs max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center font-bold">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100">
                The Claude Web Prompt Engineering Playbook
              </h2>
              <p className="text-[11px] text-zinc-400">
                Anthropic-specific best practices for Artifacts, Claude 3.5 Sonnet & Claude 3.7 Sonnet
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Section 1: The Artifacts Magic */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>1. How Claude Web Artifacts Work</span>
          </h3>
          <p className="text-zinc-300 leading-relaxed">
            When you prompt Claude on <code className="bg-zinc-800 px-1 py-0.5 rounded text-amber-300">claude.ai</code> to build a website or React component, it generates a interactive visual <strong>Artifact</strong> on the right half of your screen. Artifacts allow you to interact with the working UI in real-time without installing Node or running local servers.
          </p>
          <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-3 text-[11px] font-mono text-zinc-400 space-y-1">
            <div><span className="text-emerald-400">Environment:</span> React 19 / 18 + Tailwind CSS + Lucide Icons (<code className="text-zinc-200">lucide-react</code>).</div>
            <div><span className="text-emerald-400">Single Component Requirement:</span> Must export a single default component (<code className="text-zinc-200">export default function Portfolio()</code>).</div>
          </div>
        </div>

        {/* Section 2: Why XML Tags Are Essential */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>2. Why Anthropic Loves XML Tag Prompting</span>
          </h3>
          <p className="text-zinc-300 leading-relaxed">
            Unlike other LLMs that get confused by walls of markdown, Anthropic Claude models were trained explicitly on structured XML demarcations. Tags like <code className="bg-zinc-800 px-1 py-0.5 rounded text-amber-300">&lt;role&gt;</code>, <code className="bg-zinc-800 px-1 py-0.5 rounded text-amber-300">&lt;design_system&gt;</code>, and <code className="bg-zinc-800 px-1 py-0.5 rounded text-amber-300">&lt;anti_patterns&gt;</code> create strict cognitive boundaries for Claude, preventing prompt dilution.
          </p>
        </div>

        {/* Section 3: Preventing Truncation & Code Laziness */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>3. How to Prevent Code Truncation & Laziness</span>
          </h3>
          <p className="text-zinc-300 leading-relaxed">
            If you give Claude a lazy prompt like "Build me a cool portfolio", it will often emit placeholder code comments like <code className="text-red-400 bg-red-950/40 px-1 rounded">// Add remaining projects here</code> or run out of tokens before finishing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg border border-red-900/40 bg-red-950/20 space-y-1">
              <span className="font-bold text-red-400 text-[11px]">The Bad Prompt Trap:</span>
              <p className="text-[11px] text-zinc-400">
                "Make me an awesome portfolio website with all my projects and nice animations."
              </p>
            </div>
            <div className="p-3 rounded-lg border border-emerald-900/40 bg-emerald-950/20 space-y-1">
              <span className="font-bold text-emerald-400 text-[11px]">Our Architectural Prompt:</span>
              <p className="text-[11px] text-zinc-400">
                Demands explicit state, pre-structures all project JSON, specifies 60-30-10 color discipline, and forbids placeholder ellipses.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Claude Iteration Magic */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>4. Proven Follow-Up Prompts for Claude</span>
          </h3>
          <p className="text-zinc-300 leading-relaxed">
            Once Claude generates your initial portfolio Artifact, use these surgical 1-line follow-ups to refine it without breaking existing code:
          </p>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="p-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              "Add a light/dark mode toggle button to the top navigation that preserves WCAG AA contrast."
            </div>
            <div className="p-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              "In the Bento grid, make the first project card span 2 columns and add a live architecture diagram tab."
            </div>
            <div className="p-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              "Add audio feedback clicks or subtle 150ms transform hovers to the project cards."
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-semibold text-amber-400 hover:underline"
          >
            <span>Open claude.ai in new tab</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-4 py-2 font-medium text-zinc-200 hover:bg-zinc-700"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
