import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Send } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Header } from '../../components/layout/Header';
import { FlowIndicator } from '../../components/layout/FlowIndicator';
import { VoiceButton } from '../../components/ui/VoiceButton';

const STEPS = [
  { id: 'when_where', prompt: 'When and where did this happen?', placeholder: 'Last summer in New York...' },
  { id: 'who', prompt: 'Who was involved?', placeholder: 'My manager, Sarah, and I...' },
  { id: 'what', prompt: 'What exactly happened?', placeholder: 'The server crashed right before launch...' },
  { id: 'feelings', prompt: 'How did you feel during this?', placeholder: 'I was extremely anxious but focused...' },
  { id: 'outcome', prompt: 'What happened in the end or what did you learn?', placeholder: 'We restored it successfully and I learned to always have backups ready.' }
];

export function GuidedBuilderPage() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentStep = STEPS[currentStepIndex];
  const isFinalStep = currentStepIndex >= STEPS.length;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length) {
      setCurrentStepIndex(s => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(s => s - 1);
    }
  };

  const currentText = answers[currentStep?.id] || '';

  const generatedStory = STEPS.map(s => answers[s.id]).filter(text => text && text.trim().length > 0).join('\n\n');

  const handleSubmit = () => {
    localStorage.setItem('currentStory', generatedStory);
    navigate('/evaluation', { state: generatedStory });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header title="Guided Builder" />
      <div className="w-full px-6 lg:px-12 pt-8">
        <FlowIndicator currentStep="Practice" />
      </div>
      
      {!isFinalStep ? (
        <PageLayout
          mode="left-main"
          left={
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Step {currentStepIndex + 1} of {STEPS.length}</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3 leading-tight">{currentStep.prompt}</h2>
            </div>
          }
          main={
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col h-full space-y-4">
              <VoiceButton onTranscript={(text) => setAnswers(prev => ({ ...prev, [currentStep.id]: prev[currentStep.id] ? `${prev[currentStep.id]} ${text}` : text }))} />

              <textarea
                value={currentText}
                onChange={(e) => setAnswers(prev => ({ ...prev, [currentStep.id]: e.target.value }))}
                placeholder={currentStep.placeholder}
                className="w-full flex-1 min-h-[300px] p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-lg leading-relaxed"
              />

              <div className="flex items-center justify-between mt-4">
                <button 
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!currentText.trim()}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-sm"
                >
                  Next Step <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          }
        />
      ) : (
        <PageLayout 
          mode="left-main"
          left={
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Generated Story</h2>
              <p className="text-gray-500">Review your full story before proceeding to evaluation.</p>
            </div>
          }
          main={
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl flex-1 overflow-y-auto mb-8 min-h-[300px]">
                {STEPS.map((step) => {
                  const text = answers[step.id];
                  if (!text) return null;
                  return (
                    <p key={step.id} className="text-gray-800 text-lg leading-relaxed mb-4 last:mb-0">
                      {text}
                    </p>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => setCurrentStepIndex(STEPS.length - 1)}
                  className="w-full sm:w-auto flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Edit Inputs
                </button>
                <button 
                  onClick={handleSubmit}
                  className="w-full sm:w-auto flex flex-1 items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-sm"
                >
                  <Send className="w-5 h-5" /> Submit for Evaluation
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
