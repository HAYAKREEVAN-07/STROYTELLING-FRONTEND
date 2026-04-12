import { useState } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

const RANDOM_TRANSCRIPTS = [
  "I want to share a story about a challenge I faced at my last job. Our main server went down right before a big client presentation, and it was total chaos.",
  "This happened when I was working on that major Q3 deployment. Suddenly, the build failed and nobody knew why.",
  "Let me tell you about the time we had a huge communication breakdown between the engineering and design teams.",
  "I remember working late one evening and realizing we had completely missed a critical requirement for the launch.",
  "So the other day I was managing a project and we hit a massive roadblock when our primary vendor pulled out at the last minute."
];

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
}

export function VoiceButton({ onTranscript }: VoiceButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      
      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
        const randomTranscript = RANDOM_TRANSCRIPTS[Math.floor(Math.random() * RANDOM_TRANSCRIPTS.length)];
        onTranscript(randomTranscript);
      }, 1000);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="mb-3">
      <button
        onClick={handleToggleRecord}
        disabled={isProcessing}
        className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all shadow-sm ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
            : isProcessing
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isRecording ? (
          <>
            <Square className="w-5 h-5 fill-current" /> Stop Recording
          </>
        ) : isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Processing Audio...
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" /> Record Voice
          </>
        )}
      </button>
    </div>
  );
}
