import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Square, Play, RotateCcw, Target, Settings2 } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Header } from '../../components/layout/Header';
import { cn } from '../../utils/cn';

export function DeliveryCoachingPage() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Fake timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording || isPlaying) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval!);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPlaying]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecord = () => {
    if (isPlaying) setIsPlaying(false);
    if (!isRecording) {
      setSeconds(0);
      setHasRecorded(false);
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setHasRecorded(true);
    }
  };

  const handlePlayToggle = () => {
    if (isRecording || !hasRecorded) return;
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setSeconds(0);
      setIsPlaying(true);
      // Auto stop after 3 seconds for fake effect
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleSubmit = () => {
    const fakeTranscript = "I was preparing my presentation for the big client meeting. I thought I had all the slides ready, but my computer suddenly crashed five minutes before they arrived. I ended up having to pitch the entire strategy on a whiteboard. It was terrifying, um, but it actually ended up being a much more engaging conversation than reading off slides.";
    
    localStorage.setItem('currentStory', fakeTranscript);
    navigate('/evaluation', { state: { storyData: fakeTranscript } });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header title="Delivery Coaching" />
      
      <PageLayout
        mode="main-right"
        main={
          <>
            <div className="text-center space-y-2 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900">Delivery Coaching</h1>
              <p className="text-gray-500">Get speaking feedback on your pace, tone, and filler words.</p>
            </div>

            {/* Studio Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center space-y-8 flex-1 flex flex-col justify-center min-h-[400px]">
              
              {/* Timer Output */}
              <div className="text-6xl font-mono font-light text-gray-800 tracking-tight">
                {formatTime(seconds)}
              </div>

              {/* Fake Audio Waveform */}
              <div className="h-24 flex items-center justify-center gap-1">
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-1.5 rounded-full transition-all duration-150",
                      (isRecording || isPlaying) ? "bg-blue-500 animate-pulse" : "bg-gray-200 h-2",
                      (isRecording || isPlaying) && `h-${Math.floor(Math.random() * 16 + 4)}` 
                    )}
                    style={{ height: (isRecording || isPlaying) ? `${Math.random() * 80 + 20}%` : '8px' }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => { setHasRecorded(false); setSeconds(0); setIsPlaying(false); setIsRecording(false); }}
                  disabled={!hasRecorded && !isRecording}
                  className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>

                <button
                  onClick={handleRecord}
                  className={cn(
                    "p-6 rounded-full text-white shadow-lg transition-all scale-100 hover:scale-105 active:scale-95",
                    isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
                  )}
                >
                  {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>

                <button
                  onClick={handlePlayToggle}
                  disabled={!hasRecorded || isRecording}
                  className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Play className="w-6 h-6 ml-1" />
                </button>
              </div>
              
              <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                {isRecording ? "Listening..." : isPlaying ? "Analyzing..." : hasRecorded ? "Ready to submit" : "Press mic to start"}
              </div>

            </div>
          </>
        }
        right={
          <>
            {/* Dummy Feedback Section */}
            {hasRecorded && !isRecording ? (
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 animate-in fade-in slide-in-from-bottom-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-amber-900 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-amber-600" /> Coaching Insights
                  </h3>
                  <span className="text-xs font-bold bg-amber-200 text-amber-800 px-2 py-1 rounded-full uppercase tracking-wider">Preview</span>
                </div>
                <ul className="space-y-2 text-amber-800/80 font-medium">
                  <li className="flex items-center gap-2"><span className="text-amber-500">⚠️</span> You spoke a bit too fast in the middle.</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✨</span> Good emotional tone.</li>
                  <li className="flex items-center gap-2"><span className="text-amber-500">💡</span> Try to reduce filler words like 'um'.</li>
                </ul>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center justify-center text-center h-48 opacity-70">
                 <Mic className="w-8 h-8 text-gray-400 mb-2" />
                 <p className="text-sm text-gray-500 font-medium">Insights will appear here after you record.</p>
              </div>
            )}

            {/* Submit Actions */}
            <div className="flex flex-col gap-4 mt-2">
              <button 
                onClick={handleSubmit}
                disabled={!hasRecorded || isRecording}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" /> Submit for Evaluation
              </button>
              <button 
                onClick={() => { setHasRecorded(false); setSeconds(0); setIsRecording(true); }}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-4 px-6 rounded-xl transition-all shadow-sm text-center"
              >
                Try Again
              </button>
            </div>
          </>
        }
      />
    </div>
  );
}
