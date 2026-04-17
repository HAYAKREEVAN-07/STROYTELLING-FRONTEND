import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { Header } from '../../components/layout/Header';
import { FlowIndicator } from '../../components/layout/FlowIndicator';
import { Wand2, Check, Target } from 'lucide-react';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { cn } from '../../utils/cn';

export function WordEnhancementPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const mockSuggestions = [
    "I was genuinely thrilled to see what happened next.",
    "A wave of pure joy washed over me.",
    "I couldn't wipe the smile off my face."
  ];

  const handleEnhance = () => {
    if (!input.trim()) return;
    setIsEnhanced(true);
    setEnhancedText(input); // initialize
    setSelectedSuggestion(null);
  };

  const handleApply = (suggestion: string, index: number) => {
    setEnhancedText(suggestion);
    setSelectedSuggestion(index);
    setFeedbackMsg("Enhancement applied!");
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleUseInStory = () => {
    if (!enhancedText) return;
    localStorage.setItem('currentStory', enhancedText);
    navigate('/evaluation', { state: enhancedText });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header title="Enhance Your Story" />
      <div className="w-full px-6 lg:px-12 pt-8">
        <FlowIndicator currentStep="Improve" />
      </div>
      
      <PageLayout
        mode="left-main"
        left={
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Word Enhancement</h1>
              <p className="text-gray-500 text-lg">Improve vocabulary and expression in your writing.</p>
            </div>

            {/* Input Section */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 flex-1">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Original Text</label>
              <VoiceButton onTranscript={(text) => {
                setInput(prev => prev ? `${prev} ${text}` : text);
                setIsEnhanced(false);
              }} />
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setIsEnhanced(false);
                }}
                placeholder="Paste your story or sentence here..."
                className="w-full min-h-[250px] p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-gray-900 text-lg"
              />
              <button
                onClick={handleEnhance}
                disabled={!input.trim()}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all shadow-sm",
                  input.trim() 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                <Wand2 className="w-5 h-5" /> Enhance Text
              </button>
            </section>
          </div>
        }
        main={
          <div className="flex flex-col gap-6 h-full">
            {/* Suggestions Section */}
            {isEnhanced ? (
              <>
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-bold text-gray-900">Suggestions</h3>
                  <div className="space-y-4">
                    {mockSuggestions.map((sug, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "bg-gray-50 rounded-xl p-5 border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
                          selectedSuggestion === i ? "border-green-500 shadow-md ring-1 ring-green-500 bg-green-50/10" : "border-gray-200 hover:border-blue-300 shadow-sm hover:bg-white"
                        )}
                      >
                        <p className={cn("text-lg font-medium flex-1", selectedSuggestion === i ? "text-green-800" : "text-gray-800")}>
                          "{sug}"
                        </p>
                        <button
                          onClick={() => handleApply(sug, i)}
                          className={cn(
                            "shrink-0 px-6 py-3 rounded-lg font-bold text-sm transition-colors flex items-center gap-2",
                            selectedSuggestion === i 
                              ? "bg-green-100 text-green-800" 
                              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          )}
                        >
                          {selectedSuggestion === i ? <><Check className="w-4 h-4"/> Applied</> : "Apply"}
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Feedback Message */}
                  {feedbackMsg && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center font-bold border border-green-200 animate-in fade-in zoom-in duration-300">
                      {feedbackMsg}
                    </div>
                  )}
                </section>

                {/* Output Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-green-200 space-y-6 flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span> Enhanced Output
                  </label>
                  <textarea
                    value={enhancedText}
                    onChange={(e) => setEnhancedText(e.target.value)}
                    className="w-full flex-1 min-h-[200px] p-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none text-gray-900 text-xl font-medium bg-green-50/30"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button 
                      onClick={handleUseInStory}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-sm text-lg"
                    >
                      Use in Story (Evaluate)
                    </button>
                    <button 
                      onClick={() => navigate('/guided', { state: { draft: enhancedText } })}
                      className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm text-lg"
                    >
                      <Target className="w-5 h-5 text-indigo-500" /> Practice this story
                    </button>
                  </div>
                </section>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Wand2 className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Awaiting Text</h3>
                <p className="text-gray-500 max-w-sm text-lg">Enter your text on the left and click "Enhance" to see smart vocabulary suggestions and improvements.</p>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
