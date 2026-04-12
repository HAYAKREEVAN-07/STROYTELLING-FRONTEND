import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Target, BookTemplate, Lightbulb, Star } from 'lucide-react';
import { learningStages } from '../data/learningData';
import { cn } from '../utils/cn';
import { PageLayout } from '../components/PageLayout';
import { Header } from '../components/Header';
import { FlowIndicator } from '../components/FlowIndicator';

export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  
  const lessonId = parseInt(id || '1', 10);
  const lesson = learningStages.find(s => s.id === lessonId);

  useEffect(() => {
    // Check if initially completed
    const stored = localStorage.getItem('completedLessons');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.includes(lessonId)) {
        setIsCompleted(true);
      }
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <button onClick={() => navigate('/learning')} className="text-blue-600 mt-4">Go to Learning Path</button>
      </div>
    );
  }

  const markComplete = () => {
    const stored = localStorage.getItem('completedLessons');
    let completedLessons: number[] = stored ? JSON.parse(stored) : [];
    
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    }
    setIsCompleted(true);
    setFeedbackMsg("Lesson completed! Next stage unlocked.");
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header title={`Stage ${lesson.id}: ${lesson.title}`} backTo="/learning" backLabel="Learning" />
      <div className="w-full px-6 lg:px-12 pt-8">
        <FlowIndicator currentStep="Learn" />
      </div>
      
      <PageLayout
        mode="main-right"
        main={
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-indigo-50 border-b border-indigo-100 p-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                <Star className="w-3 h-3" /> Stage {lesson.id}
              </div>
              <h1 className="text-3xl font-extrabold text-indigo-900">{lesson.title}</h1>
              <p className="text-indigo-700/80 text-lg leading-relaxed">{lesson.description}</p>
            </div>

            <div className="p-8 space-y-10">
              {/* Concept */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookTemplate className="w-6 h-6 text-blue-500" /> The Concept
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">{lesson.explanation}</p>
              </section>

              {/* Interactive Prompt */}
              <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Think About It</h3>
                <p className="text-blue-900 text-lg font-medium">{lesson.prompt}</p>
              </section>
              
              {/* Feedback Message */}
              {feedbackMsg && (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center font-bold border border-green-200 animate-in fade-in zoom-in duration-300">
                  {feedbackMsg}
                </div>
              )}
            </div>
          </div>
        }
        right={
          <>
            <div className="flex flex-col gap-4">
              <button 
                onClick={markComplete}
                disabled={isCompleted}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-6 px-6 rounded-xl font-bold transition-all text-lg",
                  isCompleted 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                )}
              >
                <CheckCircle className="w-5 h-5" /> 
                {isCompleted ? "Completed" : "Mark as Complete"}
              </button>

              <button 
                onClick={() => navigate('/guided', { state: { sourceLesson: lesson.title } })}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-6 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-lg"
              >
                <Target className="w-5 h-5 text-indigo-500" /> Go to Practice
              </button>
            </div>

            <div className="flex flex-col gap-6 mt-2">
              {/* Tip Box */}
              <section className="bg-amber-50 rounded-xl p-6 border border-amber-100 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-amber-500 shrink-0" />
                  <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider">Pro Tip</h3>
                </div>
                <p className="text-amber-900 leading-relaxed">{lesson.tip}</p>
              </section>

              {/* Example Snippet */}
              <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Example</h3>
                <p className="text-gray-600 text-lg italic font-medium">"{lesson.example}"</p>
              </section>
            </div>
          </>
        }
      />
    </div>
  );
}
