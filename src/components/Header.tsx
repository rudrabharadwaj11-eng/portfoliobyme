import React from 'react';
import { Copy, Check, Sparkles, Terminal, BookOpen, Eye, Code2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'studio' | 'preview' | 'guide';
  setActiveTab: (tab: 'studio' | 'preview' | 'guide') => void;
  onCopyPrompt: () => void;
  copied: boolean;
  onOpenAiEnhancer: () => void;
  tokenCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onCopyPrompt,
  copied,
  onOpenAiEnhancer,
  tokenCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (1 line, strict top bar contract) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 text-zinc-950 shadow-sm font-bold">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-zinc-100 whitespace-nowrap">
                Claude Portfolio Architect
              </span>
              <span className="hidden sm:inline-block rounded px-1.5 py-0.5 text-[10px] font-mono font-medium uppercase bg-zinc-800 text-amber-400 border border-zinc-700/60">
                v2.5 Sonnet
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden md:block">
              Expert prompt engineer for Claude Web, Projects & Artifacts
            </p>
          </div>
        </div>

        {/* Zone 2: Primary Navigation Tabs (Single line, whitespace-nowrap) */}
        <nav className="flex items-center gap-1 rounded-xl bg-zinc-900/80 p-1 border border-zinc-800/80">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'studio'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Prompt Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'preview'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Live Output Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'guide'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Claude Playbook</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & AI Enhancer */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden lg:flex items-center text-xs font-mono text-zinc-400 mr-2">
            <span className="text-zinc-500">~</span>
            <span className="font-semibold text-zinc-200 tabular-nums">{tokenCount.toLocaleString()}</span>
            <span className="ml-1 text-zinc-500">tokens</span>
          </div>

          <button
            onClick={onOpenAiEnhancer}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20 transition-colors whitespace-nowrap shrink-0"
            title="Enhance profile details and metrics with Gemini AI"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>AI Polish</span>
          </button>

          <button
            onClick={onCopyPrompt}
            className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-amber-300 transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-900" />
                <span>Copied for Claude!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Claude Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
