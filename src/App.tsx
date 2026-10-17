import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { JourneyProvider } from './state/JourneyContext';
import { SkipLink } from './components/SkipLink';
import { Header } from './components/Header';
import { AccessibilityDrawer } from './components/AccessibilityDrawer';
import { Footer } from './components/Footer';

import { Home } from './routes/Home';
import { BeforeYouStart } from './routes/BeforeYouStart';
import { Eligibility } from './routes/Eligibility';
import { Documents } from './routes/Documents';
import { Application } from './routes/Application';
import { Review } from './routes/Review';
import { Handoff } from './routes/Handoff';
import { Complete } from './routes/Complete';
import { Evidence } from './routes/Evidence';

import './styles/global.css';

export const AppContent: React.FC = () => {
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SkipLink />
      <Header onOpenAccessibility={() => setAccessibilityOpen(true)} />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/before-you-start" element={<BeforeYouStart />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/application" element={<Application />} />
          <Route path="/review" element={<Review />} />
          <Route path="/handoff" element={<Handoff />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      <Footer />

      <AccessibilityDrawer
        isOpen={accessibilityOpen}
        onClose={() => setAccessibilityOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <JourneyProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </JourneyProvider>
  );
};

export default App;
