import Header from './components/Layout/Header';
import { useEffect, useState } from 'react';
import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';
import Footer from './components/Layout/Footer';
import './index.css';
import { CVProvider } from './hooks/useCVData';
import ErrorBoundary from './components/UI/ErrorBoundary';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ClearButton from './components/Layout/ClearButton';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento inicial (ex: 1 segundo)
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Enquanto carrega, mostra o spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <CVProvider>
      <ErrorBoundary>
        <div className="relative w-full h-full max-h-full">
          <Header />
          <div className="absolute top-26 right-8 z-50">
            <ClearButton />
          </div>
          <div className="flex w-full pt-16 h-full max-h-full">
            {/* overflow-auto permite auto scroll */}
            <div className="flex-1 max-w-1/2 max-h-full border-r overflow-auto border-gray-200">
              <FormSection />
            </div>
            <div className="flex-1 max-w-1/2 max-h-full overflow-auto">
              <PreviewSection />
            </div>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    </CVProvider>
  );
}

export default App;

