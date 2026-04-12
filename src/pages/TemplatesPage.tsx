import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Header } from '../components/Header';
import { FlowIndicator } from '../components/FlowIndicator';
import { Target, LayoutTemplate, Send, ArrowLeft } from 'lucide-react';
import { VoiceButton } from '../components/VoiceButton';
import { cn } from '../utils/cn';

type FrameworkSection = {
  id: string;
  title: string;
  hint: string;
};

type Framework = {
  id: string;
  name: string;
  description: string;
  sections: FrameworkSection[];
};

const FRAMEWORKS: Framework[] = [
  {
    id: '5c',
    name: '5C Framework',
    description: 'Perfect for balanced, complete storytelling.',
    sections: [
      { id: 'character', title: 'Character', hint: 'Who is the protagonist? What do they want?' },
      { id: 'context', title: 'Context', hint: 'What is the setting and background?' },
      { id: 'conflict', title: 'Conflict', hint: 'What opposes the character?' },
      { id: 'climax', title: 'Climax', hint: 'The turning point or maximum tension.' },
      { id: 'closure', title: 'Closure', hint: 'What was the result or lesson learned?' }
    ]
  },
  {
    id: 'star',
    name: 'STAR Method',
    description: 'The standard for behavioral interviews.',
    sections: [
      { id: 'situation', title: 'Situation', hint: 'Set the scene and provide necessary details.' },
      { id: 'task', title: 'Task', hint: 'Describe your responsibility in that situation.' },
      { id: 'action', title: 'Action', hint: 'What exactly did you do to address it?' },
      { id: 'result', title: 'Result', hint: 'What was the quantifiable outcome?' }
    ]
  },
  {
    id: 'hcr',
    name: 'Hook–Conflict–Resolution',
    description: 'Fast-paced and highly engaging storytelling.',
    sections: [
      { id: 'hook', title: 'Hook', hint: 'Grab attention immediately with a surprising fact or moment.' },
      { id: 'conflict', title: 'Conflict', hint: 'Introduce the core problem escalating.' },
      { id: 'resolution', title: 'Resolution', hint: 'How it ended and why it matters.' }
    ]
  },
  {
    id: 'par',
    name: 'PAR (Problem-Action-Result)',
    description: 'Concise corporate storytelling.',
    sections: [
      { id: 'problem', title: 'Problem', hint: 'What was broken or needed fixing?' },
      { id: 'action', title: 'Action', hint: 'What specific steps did you take?' },
      { id: 'result', title: 'Result', hint: 'What was the impact?' }
    ]
  }
];

export function TemplatesPage() {
  const navigate = useNavigate();
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const selectedFramework = FRAMEWORKS.find(f => f.id === selectedFrameworkId);

  const handleFrameworkSelect = () => {
    if (selectedFrameworkId) {
      setStep(2);
      setInputs({});
    }
  };

  const handleInputChange = (sectionId: string, value: string) => {
    setInputs(prev => ({ ...prev, [sectionId]: value }));
  };

  const generatedStory = selectedFramework?.sections
    .map(section => inputs[section.id])
    .filter(text => text && text.trim().length > 0)
    .join('\n\n') || '';

  const handleSubmit = () => {
    if (!generatedStory) return;
    localStorage.setItem('currentStory', generatedStory);
    navigate('/evaluation', { state: generatedStory });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header title="Story Templates" />
      <div className="w-full px-6 lg:px-12 pt-8">
        <FlowIndicator currentStep="Practice" />
      </div>
      
      {step === 1 ? (
        <PageLayout
          mode="left-main"
          left={
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Select a Blueprint</h1>
                <p className="text-gray-600 text-lg">Use structured frameworks to craft professional, impactful stories.</p>
              </div>
              <button 
                onClick={handleFrameworkSelect}
                disabled={!selectedFrameworkId}
                className="mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white w-full py-4 rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                Use this Template <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
          }
          main={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {FRAMEWORKS.map(fw => {
                const isSelected = selectedFrameworkId === fw.id;
                return (
                  <button
                    key={fw.id}
                    onClick={() => setSelectedFrameworkId(fw.id)}
                    className={cn(
                      "text-left p-6 rounded-2xl border transition-all duration-200 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 flex flex-col h-full",
                      isSelected 
                        ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500" 
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn("p-2 rounded-lg", isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600")}>
                        <LayoutTemplate className="w-5 h-5" />
                      </div>
                      <h3 className={cn("text-xl font-bold", isSelected ? "text-blue-900" : "text-gray-900")}>{fw.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 flex-1">{fw.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {fw.sections.map(s => (
                        <span key={s.id} className="text-xs font-semibold bg-white border border-gray-200 text-gray-500 px-2.5 py-1 rounded-md">
                          {s.title}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          }
        />
      ) : (
        <PageLayout
          mode="main-right"
          main={
            <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 h-[calc(100vh-200px)]">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <button onClick={() => setStep(1)} className="p-2 text-gray-500 hover:bg-white rounded-lg transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h2 className="font-bold text-gray-900">{selectedFramework?.name}</h2>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {selectedFramework?.sections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0">
                        {selectedFramework.sections.indexOf(section) + 1}
                      </span>
                      {section.title}
                    </label>
                    <VoiceButton onTranscript={(text) => handleInputChange(section.id, inputs[section.id] ? `${inputs[section.id]} ${text}` : text)} />
                    <textarea 
                      value={inputs[section.id] || ''}
                      onChange={(e) => handleInputChange(section.id, e.target.value)}
                      placeholder={section.hint}
                      className="w-full min-h-[100px] p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all text-sm leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          }
          right={
            <div className="flex flex-col bg-gray-900 rounded-2xl shadow-lg border border-gray-800 h-[calc(100vh-200px)] text-gray-100 relative">
              <div className="p-4 border-b border-gray-800 bg-gray-950 flex items-center justify-between shrink-0 rounded-t-2xl">
                <h2 className="font-bold flex items-center gap-2 text-blue-400">
                  <Target className="w-4 h-4" /> Live Preview
                </h2>
                <span className="text-xs font-semibold bg-gray-800 text-gray-400 px-2 py-1 rounded-md">
                  {generatedStory.length} chars
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 bg-[#0F172A] pb-24">
                {generatedStory ? (
                  <div className="space-y-5">
                    {selectedFramework?.sections.map((section) => {
                      const text = inputs[section.id];
                      if (!text?.trim()) return null;
                      return (
                        <p key={section.id} className="text-base sm:text-lg leading-relaxed text-gray-300">
                          {text}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                    <LayoutTemplate className="w-16 h-16 mb-4" />
                    <p className="font-medium text-center">Start typing to see<br/>your story take shape.</p>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-950 rounded-b-2xl">
                <button 
                  onClick={handleSubmit}
                  disabled={!generatedStory.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-500 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit for Evaluation
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
