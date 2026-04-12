export type ScoreLabel = 'Excellent' | 'Good' | 'Needs Improvement' | 'Weak';

export interface Parameter {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  label: ScoreLabel;
}

export interface ParameterGroup {
  id: string;
  title: string;
  parameters: Parameter[];
}

export interface Feedback {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface Story {
  original: string;
  improved: string;
}

export interface StoryEvaluation {
  id: string;
  storyTitle: string;
  timestamp: string;
  overallScore: number;
  maxOverallScore: number;
  performanceSummary: string;
  parameterGroups: ParameterGroup[];
  feedback: Feedback;
  storyComparison: Story;
}
