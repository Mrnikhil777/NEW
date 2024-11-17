import Layout from './components/Layout';
import Hero from './components/Hero';
import Features from './components/Features';
import Capabilities from './components/Capabilities';
import LiveDemo from './components/LiveDemo';
import AdUnit from './components/AdUnit';

function App() {
  return (
    <Layout>
      <Hero />
      <AdUnit 
        slot="1234567890" 
        className="py-8 bg-gray-50" 
        style={{ minHeight: '250px' }} 
      />
      <Features />
      <AdUnit 
        slot="0987654321" 
        className="py-8" 
        style={{ minHeight: '250px' }} 
      />
      <Capabilities />
      <LiveDemo />
    </Layout>
  );
}

export default App;