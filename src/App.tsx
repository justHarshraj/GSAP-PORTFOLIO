import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { TerminalSection } from './components/sections/TerminalSection';
import { ContactSection } from './components/sections/ContactSection';
import { ParticleCanvas } from './components/ParticleCanvas';

function App() {
  useEffect(() => {
    // Reset scroll restoration behavior so the browser does not jump to the previous position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to the very top immediately
    window.scrollTo(0, 0);

    // If there is any hash in the URL on load, clear it to ensure they start at the home section
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: '#070709',
        backgroundImage: `
          radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.09) 0%, transparent 40%),
          radial-gradient(circle at 85% 85%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 40%, rgba(99, 102, 241, 0.03) 0%, transparent 60%)
        `
      }}
    >
      {/* GSAP-driven canvas particle background (replaces Three.js Scene3D) */}
      <ParticleCanvas />

      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CertificationsSection />
        <SkillsSection />
        <TerminalSection />
        <ContactSection />
      </main>

      <footer className="relative z-10 py-6 md:py-8 text-center text-gray-500 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-xs sm:text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            © 2026 HARSH RAJ. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
