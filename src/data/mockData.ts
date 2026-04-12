import { StoryEvaluation } from '../types/evaluation';

export const mockEvaluation: StoryEvaluation = {
  id: 'eval_12345',
  storyTitle: 'The Lost Key',
  timestamp: new Date().toISOString(),
  overallScore: 78,
  maxOverallScore: 100,
  performanceSummary: 'Good structure, but lacking emotional depth and pacing in the climax.',
  
  parameterGroups: [
    {
      id: 'structure',
      title: 'Structure',
      parameters: [
        { id: 'hook', name: 'Hook Presence', score: 8, maxScore: 10, label: 'Good' },
        { id: 'context', name: 'Context Clarity', score: 9, maxScore: 10, label: 'Excellent' },
        { id: 'conflict', name: 'Conflict Quality', score: 7, maxScore: 10, label: 'Good' },
        { id: 'rising_action', name: 'Rising Action', score: 6, maxScore: 10, label: 'Needs Improvement' },
        { id: 'climax', name: 'Climax Impact', score: 5, maxScore: 10, label: 'Weak' },
        { id: 'resolution', name: 'Resolution', score: 8, maxScore: 10, label: 'Good' },
      ],
    },
    {
      id: 'flow_quality',
      title: 'Flow & Quality',
      parameters: [
        { id: 'coherence', name: 'Coherence & Flow', score: 8, maxScore: 10, label: 'Good' },
        { id: 'pacing', name: 'Pacing', score: 6, maxScore: 10, label: 'Needs Improvement' },
        { id: 'transitions', name: 'Transition Strength', score: 7, maxScore: 10, label: 'Good' },
        { id: 'conciseness', name: 'Conciseness', score: 8, maxScore: 10, label: 'Good' },
      ],
    },
    {
      id: 'expression',
      title: 'Expression',
      parameters: [
        { id: 'emotional_depth', name: 'Emotional Depth', score: 4, maxScore: 10, label: 'Weak' },
        { id: 'vocabulary', name: 'Vocabulary Power', score: 7, maxScore: 10, label: 'Good' },
      ],
    },
  ],

  feedback: {
    strengths: [
      'Started with a strong hook that immediately grabbed attention.',
      'Clear context setting for the main conflict.',
      'Transition paragraphs flowed naturally without feeling forced.'
    ],
    weaknesses: [
      'The climax felt rushed and lacked a feeling of genuine tension.',
      'Characters did not express enough internal emotion during the key scene.',
      'Pacing faltered right before the resolution.'
    ],
    suggestions: [
      'Add how you felt during the event to increase emotional depth.',
      'Slow down the climax by detailing the sensory experiences (sight, sound, touch).',
      'Use stronger action verbs to build tension rather than just describing what happened.'
    ]
  },

  storyComparison: {
    original: `I walked into the old house. It was dark. I looked around and saw a shiny key on the table. Someone was suddenly behind me. I grabbed the key and ran away fast. It was scary.`,
    improved: `The heavy oak door groaned as I stepped into the suffocating darkness of the abandoned manor. Dust motes danced in the single shaft of moonlight illuminating the room. There, resting on a shattered mahogany table, gleamed a pristine silver key. Just as my fingers brushed the cold metal, a floorboard shrieked behind me. Heart pounding in my throat, I snatched the key and bolted into the night, the shadow's icy breath still haunting my neck.`
  }
};
