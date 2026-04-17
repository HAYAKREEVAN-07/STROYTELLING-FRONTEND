const fs = require('fs');
const path = require('path');

const replacements = {
  // From pages to new modules
  '../components/PageLayout': '../../components/layout/PageLayout',
  '../components/Header': '../../components/layout/Header',
  '../components/FlowIndicator': '../../components/layout/FlowIndicator',
  '../components/VoiceButton': '../../components/ui/VoiceButton',
  '../components/Accordion': '../../components/ui/Accordion',
  '../components/ActionButtons': '../../components/ui/ActionButtons',
  '../components/ScoreCard': '../../features/evaluation/ScoreCard',
  '../components/Feedback': '../../features/evaluation/Feedback',
  '../components/StoryComparison': '../../features/evaluation/StoryComparison',
  
  // utils, services, data
  '../utils/cn': '../../utils/cn',
  '../services/api': '../../services/api',
  '../data/mockData': '../../data/mockData',
  '../data/learningData': '../../data/learningData',
  '../data/examplesData': '../../data/examplesData',
};

const componentsReplacements = {
  '../utils/cn': '../../utils/cn',
  '../types/evaluation': '../../types/evaluation',
  '../components/ScoreCard': '../features/evaluation/ScoreCard',
  '../components/Feedback': '../features/evaluation/Feedback',
  '../components/StoryComparison': '../features/evaluation/StoryComparison',
};

function processDirectory(dir, isPageDir = false, isComponentDir = false, isFeatureDir = false) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath, isPageDir || dir.includes('pages'), isComponentDir || dir.includes('components'), isFeatureDir || dir.includes('features'));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      const applyReplacements = (dict) => {
        for (const [oldVal, newVal] of Object.entries(dict)) {
          // Replace both single and double quotes variants
          const regexStrSq = oldVal.replace(/\./g, '\\.') + "'";
          const regexSq = new RegExp(regexStrSq, 'g');
          if (regexSq.test(content)) {
             content = content.replace(regexSq, newVal + "'");
             changed = true;
          }
          
          const regexStrDq = oldVal.replace(/\./g, '\\.') + '"';
          const regexDq = new RegExp(regexStrDq, 'g');
          if (regexDq.test(content)) {
             content = content.replace(regexDq, newVal + '"');
             changed = true;
          }
        }
      };

      if (isPageDir && !fullPath.includes('App.tsx')) applyReplacements(replacements);
      if (isComponentDir) applyReplacements(componentsReplacements);
      if (isFeatureDir) applyReplacements(componentsReplacements);

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

// Update App.tsx imports manually
function updateApp() {
  const appPath = path.join(process.cwd(), 'src/App.tsx');
  let content = fs.readFileSync(appPath, 'utf8');
  content = content.replace(/from '\.\/pages\//g, "from './pages/");
  // Specific mappings
  const appMap = {
    './pages/OnboardingPage': './pages/onboarding/OnboardingPage',
    './pages/DashboardPage': './pages/dashboard/DashboardPage',
    './pages/SubmitPage': './pages/practice/SubmitPage',
    './pages/EvaluationPage': './pages/evaluation/EvaluationPage',
    './pages/GuidedBuilderPage': './pages/practice/GuidedBuilderPage',
    './pages/TemplatesPage': './pages/practice/TemplatesPage',
    './pages/LearningPathPage': './pages/learning/LearningPathPage',
    './pages/LessonPage': './pages/learning/LessonPage',
    './pages/LearnBasicsPage': './pages/learning/LearnBasicsPage',
    './pages/WordEnhancementPage': './pages/improve/WordEnhancementPage',
    './pages/TipsPage': './pages/improve/TipsPage',
    './pages/RoleplayPage': './pages/practice/RoleplayPage',
    './pages/DeliveryCoachingPage': './pages/practice/DeliveryCoachingPage',
    './pages/ProgressAnalyticsPage': './pages/track/ProgressAnalyticsPage',
    './pages/RevisionHistoryPage': './pages/track/RevisionHistoryPage',
    './pages/ExamplesLibraryPage': './pages/learning/ExamplesLibraryPage'
  };
  
  Object.entries(appMap).forEach(([oldP, newP]) => {
    content = content.replace(`from '${oldP}'`, `from '${newP}'`);
    content = content.replace(`from "${oldP}"`, `from "${newP}"`);
  });
  
  fs.writeFileSync(appPath, content);
  console.log('Updated App.tsx');
}

processDirectory(path.join(process.cwd(), 'src/pages'), true, false, false);
processDirectory(path.join(process.cwd(), 'src/components'), false, true, false);
processDirectory(path.join(process.cwd(), 'src/features'), false, false, true);
updateApp();
