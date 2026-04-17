import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { Header } from '../../components/layout/Header';
import { PenSquare } from 'lucide-react';
import { VoiceButton } from '../../components/ui/VoiceButton';

export function SubmitPage() {
  const [storyText, setStoryText] = useState('');
  const navigate = useNavigate();

  // Optionally load draft from local storage on mount
  useEffect(() => {
    const draft = localStorage.getItem('storyDraft');
    if (draft) setStoryText(draft);
  }, []);

  const handleSaveDraft = (text: string) => {
    setStoryText(text);
    localStorage.setItem('storyDraft', text);
  };

  const handleSubmit = () => {
    if (!storyText.trim()) return;
    
    // Clear draft on submit
    localStorage.removeItem('storyDraft');
    // Save to persistence (stringify per requirements)
    localStorage.setItem('currentStory', JSON.stringify(storyText));
    
    // Navigate and pass story payload safely
    navigate('/evaluation', { state: storyText });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header title="Submit Story" />
      
      <PageLayout
        mode="left-main"
        left={
          <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <PenSquare className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tell your story</h1>
              </div>
            </div>
            <p className="text-gray-600">Draft Your Story. Practice what you've learned. Be emotionally expressive.</p>
          </div>
        }
        main={
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col h-full space-y-4">
            <VoiceButton onTranscript={(text) => handleSaveDraft(storyText ? `${storyText} ${text}` : text)} />
            
            <textarea
              value={storyText}
              onChange={(e) => handleSaveDraft(e.target.value)}
              placeholder="It started when..."
              className="w-full flex-1 min-h-[300px] p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-base leading-relaxed"
            />

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs font-medium text-gray-400">
                {storyText.length} characters
              </span>
              <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={!storyText.trim()}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-sm"
                >
                  Submit Story
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
