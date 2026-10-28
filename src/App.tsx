/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header.tsx';
import { CustomizerPanel } from './components/CustomizerPanel.tsx';
import { PromptViewer } from './components/PromptViewer.tsx';
import { PortfolioSimulator } from './components/PortfolioSimulator.tsx';
import { AiEnhancerModal } from './components/AiEnhancerModal.tsx';
import { ClaudeGuideModal } from './components/ClaudeGuideModal.tsx';
import { DEFAULT_PROFILE, DEFAULT_PROMPT_OPTIONS } from './data/defaultConfig.ts';
import { PortfolioProfile, PromptOptions } from './types.ts';
import { generateClaudePortfolioPrompt } from './services/promptGenerator.ts';

export default function App() {
  const [profile, setProfile] = useState<PortfolioProfile>(DEFAULT_PROFILE);
  const [options, setOptions] = useState<PromptOptions>(DEFAULT_PROMPT_OPTIONS);
  const [activeTab, setActiveTab] = useState<'studio' | 'preview' | 'guide'>('studio');
  const [isAiEnhancerOpen, setIsAiEnhancerOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate prompt deterministically whenever profile or options change
  const promptResult = useMemo(() => {
    return generateClaudePortfolioPrompt(profile, options);
  }, [profile, options]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptResult.fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTabChange = (tab: 'studio' | 'preview' | 'guide') => {
    if (tab === 'guide') {
      setIsGuideOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onCopyPrompt={handleCopyPrompt}
        copied={copied}
        onOpenAiEnhancer={() => setIsAiEnhancerOpen(true)}
        tokenCount={promptResult.tokenEstimate}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {activeTab === 'studio' ? (
          <>
            {/* Customizer Sidebar */}
            <CustomizerPanel
              profile={profile}
              setProfile={setProfile}
              options={options}
              setOptions={setOptions}
              onOpenAiEnhancer={() => setIsAiEnhancerOpen(true)}
            />

            {/* Prompt Viewport & Code Area */}
            <PromptViewer
              promptResult={promptResult}
              onCopy={handleCopyPrompt}
              copied={copied}
              onOpenAiEnhancer={() => setIsAiEnhancerOpen(true)}
            />
          </>
        ) : (
          /* Live Output Simulator */
          <PortfolioSimulator
            profile={profile}
            options={options}
            onSwitchToStudio={() => setActiveTab('studio')}
          />
        )}
      </main>

      {/* Gemini AI Enhancer Modal */}
      <AiEnhancerModal
        isOpen={isAiEnhancerOpen}
        onClose={() => setIsAiEnhancerOpen(false)}
        profile={profile}
        setProfile={setProfile}
        options={options}
      />

      {/* Claude Playbook Guide Modal */}
      <ClaudeGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
