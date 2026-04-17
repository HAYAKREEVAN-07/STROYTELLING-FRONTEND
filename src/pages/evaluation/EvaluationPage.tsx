import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Lightbulb } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Header } from '../../components/layout/Header';
import { FlowIndicator } from '../../components/layout/FlowIndicator';
import { ScoreCard } from '../../features/evaluation/ScoreCard';
import { Accordion } from '../../components/ui/Accordion';
import { Feedback, FeedbackBlock } from '../../features/evaluation/Feedback';
import { StoryComparison } from '../../features/evaluation/StoryComparison';
import { evaluationApi } from '../../services/api';

export function EvaluationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely extract the story data
  let storyData = location.state;
  if (!storyData) {
    const localStory = localStorage.getItem('currentStory');
    try {
      storyData = localStory ? JSON.parse(localStory) : null;
    } catch (e) {
      // Fallback if it was saved as raw string
      storyData = localStory;
    }
  }

  // Handle case where history sends { storyData: text } instead of direct text
  if (storyData && typeof storyData === 'object' && storyData.storyData) {
    storyData = storyData.storyData;
  }

  useEffect(() => {
    if (!storyData) {
      // Navigation Safety: Redirect to /submit if accessed directly without data
      navigate('/submit', { replace: true });
    }
  }, [storyData, navigate]);

  const { data: evaluation, isLoading, isError } = useQuery({
    queryKey: ['evaluation', storyData],
    queryFn: () => evaluationApi.getEvaluation(storyData),
    enabled: !!storyData && typeof storyData === 'string', // Only run the query if we have string data
  });

  if (!storyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center max-w-sm">
          <p className="text-gray-900 font-bold text-lg mb-2">No data available.</p>
          <p className="text-gray-500 text-sm mb-6">Please re-evaluate your story or try submitting again.</p>
          <button 
            onClick={() => navigate('/submit')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm"
          >
            Submit Story
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Analyzing your story...</h2>
            <p className="text-sm font-medium text-gray-500">Evaluating structure, emotional depth, and vocabulary.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !evaluation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center max-w-sm">
          <p className="text-red-500 font-bold text-lg mb-2">Failed to load data</p>
          <p className="text-gray-600 text-sm mb-6">Something went wrong analyzing your story. Please try again.</p>
          <button 
            onClick={() => navigate('/submit')}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header 
        title="Story Evaluation" 
        timestamp={evaluation.timestamp}
        onBack={() => navigate('/dashboard')} 
      />
      <div className="w-full px-6 lg:px-12 pt-8">
        <FlowIndicator currentStep="Evaluate" />
      </div>
      
      <PageLayout
        mode="three-col"
        left={
          <section className="space-y-6 h-full">
            <ScoreCard 
              score={evaluation.overallScore}
              maxScore={evaluation.maxOverallScore}
              label={evaluation.overallScore >= 80 ? 'Excellent' : evaluation.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
              summary={evaluation.performanceSummary}
            />
          </section>
        }
        main={
          <div className="space-y-8 h-full">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 px-1">Detailed Metrics</h2>
              <Accordion groups={evaluation.parameterGroups} />
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 pb-2 border-b border-gray-50">
                <h2 className="text-xl font-bold text-gray-900 px-1">Detailed Feedback</h2>
              </div>
              <Feedback feedback={evaluation.feedback} />
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 pb-8">
              <StoryComparison story={{
                original: storyData,
                improved: evaluation.storyComparison.improved
              }} />
            </section>
          </div>
        }
        right={
          <section className="flex flex-col gap-8 h-full">
            <FeedbackBlock 
              title="Actionable Suggestions" 
              items={evaluation.feedback.suggestions} 
              icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
              bgClass="bg-amber-50/50"
              borderClass="border-amber-100"
              titleClass="text-amber-800"
            />
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 sticky top-6">
              <div className="mb-6">
                <span className="text-sm font-bold uppercase tracking-wider text-indigo-500 mb-2 block">Your Next Step</span>
              <h3 className="text-2xl font-bold text-indigo-900 leading-tight">Keep the momentum going</h3>
            </div>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => navigate('/enhance')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-bold transition-all shadow-sm text-base text-center"
              >
                Improve Story
              </button>
              <button 
                onClick={() => navigate('/guided')}
                className="w-full bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 py-4 px-6 rounded-xl font-bold transition-all shadow-sm text-base text-center"
              >
                Practice Again
              </button>
              <button 
                onClick={() => navigate('/learning')}
                className="w-full bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 py-4 px-6 rounded-xl font-bold transition-all shadow-sm text-base text-center"
              >
                Learn Concept
              </button>
            </div>
            </div>
          </section>
        }
      />
    </div>
  );
}
