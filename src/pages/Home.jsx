import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ProblemSection from '../components/ProblemSection';
import SolutionPipeline from '../components/SolutionPipeline';
import HowItWorks from '../components/HowItWorks';
import DetectorDemo from '../components/DetectorDemo';
import AIAnalysis from '../components/AIAnalysis';
import Technology from '../components/Technology';
import Models from '../components/Models';
import TrustSection from '../components/TrustSection';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <ProblemSection />
      <SolutionPipeline />
      <HowItWorks />
      <DetectorDemo />
      <AIAnalysis />
      <Technology />
      <Models />
      <TrustSection />
      <CTA />
    </main>
  );
}
