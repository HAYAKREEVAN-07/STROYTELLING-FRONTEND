import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SubmitPage } from './pages/SubmitPage';
import { EvaluationPage } from './pages/EvaluationPage';
import { GuidedBuilderPage } from './pages/GuidedBuilderPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { LessonPage } from './pages/LessonPage';
import { LearnBasicsPage } from './pages/LearnBasicsPage';
import { WordEnhancementPage } from './pages/WordEnhancementPage';
import { TipsPage } from './pages/TipsPage';
import { RoleplayPage } from './pages/RoleplayPage';
import { DeliveryCoachingPage } from './pages/DeliveryCoachingPage';
import { ProgressAnalyticsPage } from './pages/ProgressAnalyticsPage';
import { RevisionHistoryPage } from './pages/RevisionHistoryPage';
import { ExamplesLibraryPage } from './pages/ExamplesLibraryPage';

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
