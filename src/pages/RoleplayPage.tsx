import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Header } from '../components/Header';
import { FlowIndicator } from '../components/FlowIndicator';
import { Send, CheckCircle2, RotateCcw } from 'lucide-react';
import { VoiceButton } from '../components/VoiceButton';
import { cn } from '../utils/cn';

interface Message {
  text: string;
  isUser: boolean;
}

const AI_QUESTIONS = [
  "Tell me about a challenge you faced recently.",
  "How did you handle it? What specific steps did you take?",
  "What did you learn from that experience?",
  "That's a great story! We have enough for an evaluation."
];

export function RoleplayPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { text: AI_QUESTIONS[0], isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping || questionIndex >= AI_QUESTIONS.length - 1) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { text: userText, isUser: true }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      setIsTyping(false);
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setMessages(prev => [...prev, { text: AI_QUESTIONS[nextIndex], isUser: false }]);
    }, 1500);
  };

  const handleEndSession = () => {
    // Combine all user messages into a single story
    const userMessages = messages.filter(m => m.isUser).map(m => m.text);
    const storyString = userMessages.join(" ");
    
    // Safety fallback if they ended without typing anything
    const finalStory = storyString.trim() ? storyString : "I didn't have much to say about this challenge.";
    
    localStorage.setItem('currentStory', finalStory);
    navigate('/evaluation', { state: finalStory });
  };

  const handleStartNew = () => {
    setMessages([{ text: AI_QUESTIONS[0], isUser: false }]);
    setQuestionIndex(0);
    setInput('');
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header title="Story Practice" />
      <div className="w-full px-6 lg:px-12 pt-8">
        <FlowIndicator currentStep="Practice" />
      </div>
      
      <PageLayout
        mode="left-main"
        left={
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Interactive Roleplay</h1>
              <p className="text-gray-500 text-lg">Answer real-world storytelling questions naturally.</p>
            </div>

            {/* Global Actions */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleEndSession}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-lg"
              >
                <CheckCircle2 className="w-5 h-5" /> End & Evaluate
              </button>
              <button 
                onClick={handleStartNew}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-lg"
              >
                <RotateCcw className="w-5 h-5 text-gray-500" /> Start New Scenario
              </button>
            </div>
          </div>
        }
        main={
          <div className="h-full min-h-[600px] flex flex-col items-stretch">
            {/* Chat Interface */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full h-[calc(100vh-200px)]">
              
              {/* Messages Area */}
              <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.map((msg, idx) => (
                  <div key={idx} className={cn("flex", msg.isUser ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] rounded-2xl px-6 py-4 text-base leading-relaxed shadow-sm",
                      msg.isUser 
                        ? "bg-blue-600 text-white rounded-br-sm" 
                        : "bg-gray-100 text-gray-800 rounded-bl-sm border border-gray-200"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-sm px-6 py-4 w-20 flex justify-between items-center shadow-sm">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {questionIndex < AI_QUESTIONS.length - 1 && (
                  <VoiceButton onTranscript={(text) => setInput(prev => prev ? `${prev} ${text}` : text)} />
                )}
                <div className="flex gap-3">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isTyping || questionIndex >= AI_QUESTIONS.length - 1}
                    placeholder={questionIndex >= AI_QUESTIONS.length - 1 ? "Session complete." : "Type your answer..."}
                    className="flex-1 bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping || questionIndex >= AI_QUESTIONS.length - 1}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 text-lg"
                  >
                    <span>Send</span> <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
