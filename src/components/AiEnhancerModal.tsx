import React, { useState } from 'react';
import { PortfolioProfile, PromptOptions } from '../types.ts';
import { Sparkles, X, Check, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

interface AiEnhancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PortfolioProfile;
  setProfile: React.Dispatch<React.SetStateAction<PortfolioProfile>>;
  options: PromptOptions;
}

export const AiEnhancerModal: React.FC<AiEnhancerModalProps> = ({
  isOpen,
  onClose,
  profile,
  setProfile,
  options
}) => {
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleEnhance = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawInput: rawText || profile.bio,
          role: options.rolePreset,
          targetAesthetic: options.aesthetic,
          existingData: {
            title: profile.title,
            currentBio: profile.bio,
            projects: profile.projects.map(p => ({ title: p.title, metrics: p.metrics }))
          }
        })
      });

      if (!res.ok) {
        throw new Error('Enhancement request failed. Please check network.');
      }

      const data = await res.json();
      setAiResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Could not connect to Gemini AI enhancement service.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!aiResult) return;

    setProfile(prev => ({
      ...prev,
      bio: aiResult.enhancedBio || prev.bio,
      primaryMetric: aiResult.keyHighlights?.[0] || prev.primaryMetric,
      secondaryMetric: aiResult.keyHighlights?.[1] || prev.secondaryMetric,
      tertiaryMetric: aiResult.keyHighlights?.[2] || prev.tertiaryMetric,
      projects: aiResult.recommendedProjects && aiResult.recommendedProjects.length > 0
        ? aiResult.recommendedProjects.map((p: any, idx: number) => ({
            id: `ai-p-${idx}`,
            title: p.title || 'Production System',
            category: p.category || 'Architecture',
            tagline: p.tagline || 'High-throughput system',
            metrics: p.metrics || 'Quantified scale impact',
            techStack: p.tech || ['TypeScript', 'Distributed Systems'],
            problemSummary: 'Scaling bottleneck under high peak concurrency.',
            solutionArchitecture: 'Decoupled data layer and introduced caching.',
            featured: idx < 2
          }))
        : prev.projects
    }));

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-100 p-6 shadow-2xl space-y-5 text-xs max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-100">
                Gemini Prompt & Resume Synthesizer
              </h2>
              <p className="text-[11px] text-zinc-400">
                Turns raw bullet points into Claude-optimized executive metrics and architecture notes
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Input Area */}
        <div className="space-y-2">
          <label className="block text-zinc-300 font-medium">
            Paste your rough notes, resume bullets, or project accomplishments:
          </label>
          <textarea
            rows={4}
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            placeholder="e.g. Worked at fintech company for 3 years. Rebuilt the payment gateway to handle black friday traffic. Wrote an open-source react component that got 4k stars. Love distributed consensus and clean UI..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-zinc-100 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none leading-relaxed text-xs"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-zinc-500">
              Powered by Gemini 3.8 Flash (Server-Side)
            </span>
            <button
              onClick={handleEnhance}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2 font-semibold text-zinc-950 hover:bg-amber-300 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Enhance for Claude</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/80 text-red-300 text-xs">
            {error}
          </div>
        )}

        {/* AI Results Preview */}
        {aiResult && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-4 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-amber-400">
                Synthesized Prompt Improvements
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Ready to apply</span>
            </div>

            {aiResult.enhancedBio && (
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-zinc-300">Sharpened Bio:</span>
                <p className="text-xs text-zinc-200 leading-relaxed bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                  {aiResult.enhancedBio}
                </p>
              </div>
            )}

            {aiResult.keyHighlights && aiResult.keyHighlights.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-zinc-300">Quantified Impact Metrics:</span>
                <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside">
                  {aiResult.keyHighlights.map((hl: string, idx: number) => (
                    <li key={idx} className="font-mono text-[11px] text-emerald-400">{hl}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs"
              >
                Discard
              </button>
              <button
                onClick={handleApply}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 text-xs"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Apply to Claude Prompt</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
