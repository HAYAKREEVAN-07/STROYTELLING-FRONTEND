import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { Header } from '../../components/layout/Header';
import { ChevronRight, BookOpen, Heart, MessageCircle, Mic, Loader2 } from 'lucide-react';
import { VoiceButton } from '../../components/ui/VoiceButton';

export function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [story, setStory] = useState('');
  const navigate = useNavigate();

  const handleNext = () => setStep((s) => s + 1);

  const handleSubmitStory = () => {
    if (!story.trim()) return;
    setStep(5); // Processing Step
    
    setTimeout(() => {
      setStep(6); // Result Step
    }, 2000);
  };

  const finishOnboarding = () => {
    // Optionally save initial placement logic to localStorage here
    localStorage.setItem('userLevel', 'Intermediate');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header title="Welcome" />
      
      <PageLayout
        mode="left-main"
        left={
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Setup your Profile</h2>
            <ul className="space-y-4">
              <li className={step >= 1 ? 'text-blue-600 font-bold flex items-center gap-2' : 'text-gray-400 font-medium flex items-center gap-2'}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}>1</div>
                Welcome
              </li>
              <li className={step >= 2 ? 'text-blue-600 font-bold flex items-center gap-2' : 'text-gray-400 font-medium flex items-center gap-2'}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}>2</div>
                What to Expect
              </li>
              <li className={step >= 3 ? 'text-blue-600 font-bold flex items-center gap-2' : 'text-gray-400 font-medium flex items-center gap-2'}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}>3</div>
                Diagnostic Story
              </li>
              <li className={step >= 6 ? 'text-blue-600 font-bold flex items-center gap-2' : 'text-gray-400 font-medium flex items-center gap-2'}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 6 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}>4</div>
                Results
              </li>
            </ul>
          </div>
        }
        main={
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 h-full flex flex-col justify-center">
            
            {step === 1 && (
              <div className="space-y-8 text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Learn to Tell Real-Life Stories Clearly</h1>
                <p className="text-gray-600 text-xl">Master the art of storytelling and captivate any audience, whether in interviews, meetings, or casual chats.</p>
                <button 
                  onClick={handleNext} 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 text-lg rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  Start Journey <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">What You'll Learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LearningCard icon={<BookOpen className="w-6 h-6 text-indigo-500" />} title="Structure stories clearly" />
                  <LearningCard icon={<Heart className="w-6 h-6 text-pink-500" />} title="Express emotions" />
                  <LearningCard icon={<MessageCircle className="w-6 h-6 text-blue-500" />} title="Improve vocabulary" />
                  <LearningCard icon={<Mic className="w-6 h-6 text-green-500" />} title="Speak confidently" />
                </div>
                <button 
                  onClick={handleNext} 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 text-lg rounded-xl transition-all shadow-sm mt-4 flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <Mic className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Diagnostic Intro</h2>
                <p className="text-gray-600 text-lg leading-relaxed">We'll ask you to tell a short real-life story to understand your current level and tailor your training.</p>
                <button 
                  onClick={handleNext} 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 text-lg rounded-xl transition-all shadow-sm mt-4 flex items-center justify-center gap-2"
                >
                  Start Test <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 flex flex-col h-full">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Tell your story</h2>
                  <p className="text-gray-600">Write about a recent challenge you faced and how you overcame it.</p>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <VoiceButton onTranscript={(text) => setStory(story ? `${story} ${text}` : text)} />
                  <textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Start typing your story here..."
                    className="w-full flex-1 min-h-[250px] p-5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-lg"
                  />
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleSubmitStory} 
                    disabled={!story.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-sm"
                  >
                    Submit Story
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-16 space-y-6 flex flex-col items-center justify-center flex-1">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <h2 className="text-2xl font-bold text-gray-900">Analyzing your story...</h2>
                <p className="text-gray-500 text-lg">Evaluating structure, emotional depth, and vocabulary.</p>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8">
                <div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-700 font-semibold text-sm mb-4 border border-green-200">
                    Placement Complete
                  </div>
                  <h2 className="text-4xl font-extrabold text-gray-900">Intermediate Level</h2>
                </div>
                
                <div className="bg-amber-50 rounded-xl p-6 text-left border border-amber-100">
                  <h3 className="font-bold text-amber-900 mb-3 text-lg">Suggested Improvements:</h3>
                  <ul className="space-y-3 text-amber-800 font-medium">
                    <li className="flex items-center gap-2">🎯 Improve emotional depth</li>
                    <li className="flex items-center gap-2">🔄 Use better transitions</li>
                    <li className="flex items-center gap-2">✨ Add stronger ending</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={finishOnboarding} 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-xl transition-all shadow-sm text-lg"
                  >
                    Take me to my Dashboard
                  </button>
                </div>
              </div>
            )}

          </div>
        }
      />
    </div>
  );
}

function LearningCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 border border-gray-100">
      <div className="bg-white p-2 rounded-lg shadow-sm">{icon}</div>
      <span className="font-medium text-gray-800">{title}</span>
    </div>
  );
}
