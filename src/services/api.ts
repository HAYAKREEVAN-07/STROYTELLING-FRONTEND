import { StoryEvaluation } from '../types/evaluation';
import { mockEvaluation } from '../data/mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const evaluationApi = {
  getEvaluation: async (_id: string): Promise<StoryEvaluation> => {
    await delay(1000); // Simulate network latency
    // Return mock data for now. In a real app, this would be an axios/fetch call.
    return mockEvaluation;
  }
};
