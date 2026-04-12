import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Lock, Play, BookOpen } from 'lucide-react';
import { learningStages } from '../data/learningData';
import { cn } from '../utils/cn';
import { PageLayout } from '../components/PageLayout';
import { Header } from '../components/Header';

export function LearningPathPage() {
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('completedLessons');
    if (stored) {
      setCompletedLessons(JSON.parse(stored));
    }
  }, []);

  const progressPercentage = Math.round((completedLessons.length / learningStages.length) * 100);
  
  // Find current stage (first incomplete stage)
  const currentStageId = learningStages.find(stage => !completedLessons.includes(stage.id))?.id || learningStages[learningStages.length - 1].id;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header title="Your Learning Path" />
      
      <PageLayout
        mode="left-main"
        left={
          <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Your Learning Path</h1>
              <p className="text-gray-500 text-lg">Follow structured steps to improve your storytelling. Master the basics before moving to advanced techniques.</p>
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-1 block">Course Progress</span>
                  <span className="text-3xl font-bold text-gray-900">{progressPercentage}%<span className="text-lg text-gray-400 font-medium"> Completed</span></span>
                </div>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Current Stage: </span>
                <span className="font-bold text-gray-900">Stage {currentStageId}</span>
              </div>
            </div>

            {/* Empty State / Encouragement */}
            {completedLessons.length === 0 && (
              <div className="bg-blue-50 text-blue-800 px-6 py-4 rounded-xl border border-blue-100 flex flex-col gap-3 shadow-sm">
                <div className="p-2 bg-white rounded-lg self-start">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <p className="font-medium text-sm">Welcome! Start your first lesson to begin your journey.</p>
              </div>
            )}
          </div>
        }
        main={
          <div className="space-y-4">
            {learningStages.map((stage, index) => {
              const isCompleted = completedLessons.includes(stage.id);
              // First stage is unlocked. Subsequent stages are unlocked if the previous stage is in completedLessons
              const isUnlocked = index === 0 || completedLessons.includes(learningStages[index - 1].id);
              const isInProgress = isUnlocked && !isCompleted;

              return (
                <div 
                  key={stage.id}
                  className={cn(
                    "bg-white rounded-2xl p-6 border transition-all duration-200",
                    isUnlocked ? "shadow-sm border-gray-200 hover:border-blue-300 hover:shadow-md" : "border-gray-100 opacity-60 bg-gray-50"
                  )}
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                    <div className="flex items-start gap-4">
                      {/* Status Icon */}
                      <div className="mt-1 shrink-0">
                        {isCompleted ? (
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        ) : isInProgress ? (
                          <Play className="w-8 h-8 text-blue-500" />
                        ) : (
                          <Lock className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stage {stage.id}</span>
                          {/* Badge */}
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                            isCompleted ? "bg-green-100 text-green-700" :
                            isInProgress ? "bg-blue-100 text-blue-700" :
                            "bg-gray-200 text-gray-600"
                          )}>
                            {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Locked"}
                          </span>
                        </div>
                        <h3 className={cn("text-xl font-bold", isUnlocked ? "text-gray-900" : "text-gray-500")}>{stage.title}</h3>
                        <p className="text-gray-500 mt-1 max-w-xl text-sm leading-relaxed">{stage.description}</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    {isUnlocked && (
                      <button
                        onClick={() => navigate(`/lesson/${stage.id}`)}
                        className={cn(
                          "shrink-0 w-full sm:w-auto px-6 py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2",
                          isCompleted 
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                        )}
                      >
                        {isCompleted ? "Review" : isInProgress && completedLessons.length > 0 ? "Continue" : "Start"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        }
      />
    </div>
  );
}
