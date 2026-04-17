import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingPage } from './pages/onboarding/OnboardingPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { SubmitPage } from './pages/practice/SubmitPage';
import { EvaluationPage } from './pages/evaluation/EvaluationPage';
import { GuidedBuilderPage } from './pages/practice/GuidedBuilderPage';
import { TemplatesPage } from './pages/practice/TemplatesPage';
import { LearningPathPage } from './pages/learning/LearningPathPage';
import { LessonPage } from './pages/learning/LessonPage';
import { LearnBasicsPage } from './pages/learning/LearnBasicsPage';
import { WordEnhancementPage } from './pages/improve/WordEnhancementPage';
import { TipsPage } from './pages/improve/TipsPage';
import { RoleplayPage } from './pages/practice/RoleplayPage';
import { DeliveryCoachingPage } from './pages/practice/DeliveryCoachingPage';
import { ProgressAnalyticsPage } from './pages/track/ProgressAnalyticsPage';
import { RevisionHistoryPage } from './pages/track/RevisionHistoryPage';
import { ExamplesLibraryPage } from './pages/learning/ExamplesLibraryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
        <Route path="/guided" element={<GuidedBuilderPage />} />
        <Route path="/template" element={<TemplatesPage />} />
        <Route path="/learning" element={<LearningPathPage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/learn-basics" element={<LearnBasicsPage />} />
        <Route path="/enhance" element={<WordEnhancementPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/roleplay" element={<RoleplayPage />} />
        <Route path="/delivery-coaching" element={<DeliveryCoachingPage />} />
        <Route path="/analytics" element={<ProgressAnalyticsPage />} />
        <Route path="/history" element={<RevisionHistoryPage />} />
        <Route path="/examples" element={<ExamplesLibraryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
