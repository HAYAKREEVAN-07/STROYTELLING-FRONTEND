export interface StoryExample {
  id: number;
  title: string;
  category: string;
  rawStory: string;
  improvedStory: string;
  explanation: string[];
  tips: string[];
}

export const examplesData: StoryExample[] = [
  {
    id: 1,
    title: "The Projector Failure",
    category: "Interview",
    rawStory: "I was presenting my project to the class and suddenly the projector died. I had to explain everything using just my hands and a whiteboard marker. It was a disaster but I got an A.",
    improvedStory: "My heart raced as the projector screen went pitch black mid-presentation. Armed with nothing but a whiteboard marker and pure adrenaline, I frantically mapped out my entire project by hand. Miraculously, that chaotic breakdown earned me an A.",
    explanation: [
      "Added immediate emotional states ('My heart raced', 'pure adrenaline')",
      "Created a stronger sense of tension and action",
      "Ended with a clear, satisfying resolution"
    ],
    tips: [
      "Start with a physical reaction to build tension",
      "Use strong verbs ('mapped out', 'earned')",
      "Turn negatives into triumphs"
    ]
  },
  {
    id: 2,
    title: "The Missing Wallet",
    category: "Daily",
    rawStory: "I lost my wallet at college. I looked everywhere for it. Then someone called me saying they found it at the library.",
    improvedStory: "I frantically searched every pocket as the reality set in: my wallet was gone, along with my tuition money. Two hours of panic later, my phone rang—a stranger had found it sitting quietly on a library desk.",
    explanation: [
      "Established the stakes early ('tuition money')",
      "Showed the passage of time ('Two hours of panic later')",
      "Contrasted the panic with the calm resolution"
    ],
    tips: [
      "Always establish the stakes (why does it matter?)",
      "Show, don't just tell",
      "Use contrast to make the ending land harder"
    ]
  },
  {
    id: 3,
    title: "First Time Skiing",
    category: "Failure",
    rawStory: "I went skiing for the first time and I kept falling down. It was really hard and I wanted to quit. But I tried one more time and finally got to the bottom without falling.",
    improvedStory: "Snow packed into my jacket for the dozenth time, my legs were burning, and I was completely ready to throw my skis into the trees. But I took one deep breath, pushed off, and somehow—miraculously—glided all the way to the lodge without a single wipeout.",
    explanation: [
      "Replaced generic statements with vivid sensory details",
      "Created a clear moment of decision ('took one deep breath')",
      "Emphasized the relief of the climax"
    ],
    tips: [
      "Include sensory details (temperature, pain, exhaustion)",
      "Focus on the 'turning point' moment",
      "Make the triumph feel earned after the struggle"
    ]
  },
  {
    id: 4,
    title: "Getting Promoted",
    category: "Achievement",
    rawStory: "My boss called me into his office and said I was getting a promotion. I was so happy because I worked hard for it all year.",
    improvedStory: "When my manager's name popped up for a sudden 1-on-1, my stomach dropped. I walked into his office bracing for the worst, only to hear the words I'd been fighting for all year: 'You're getting the promotion.'",
    explanation: [
      "Created a sense of suspense (misdirection)",
      "Replaced a boring sequence with an emotional journey",
      "Used dialogue for the impactful moment"
    ],
    tips: [
      "Misdirection builds great suspense",
      "Use direct quotes for the most important moments",
      "Focus on the contrast between expectation and reality"
    ]
  },
  {
    id: 5,
    title: "Saying Goodbye to a Pet",
    category: "Emotional",
    rawStory: "My dog died last week. We had him for 10 years and he was a good boy. I will really miss him.",
    improvedStory: "For ten years, the rhythmic click of his paws on the hardwood floor was my favorite sound. Yesterday, the house was devastatingly quiet. I lost my best friend, but I keep finding his favorite toys tucked away in corners.",
    explanation: [
      "Focused on a specific, recognizable detail ('click of his paws')",
      "Avoided clichés by focusing on the 'aftermath'",
      "Elicited empathy through shared universal experiences"
    ],
    tips: [
      "Ground emotions in specific physical details",
      "Show the absence rather than declaring sadness",
      "End on a bittersweet, lasting image"
    ]
  }
];

export const CATEGORIES = ["All", "Interview", "Daily", "Failure", "Achievement", "Emotional"];
