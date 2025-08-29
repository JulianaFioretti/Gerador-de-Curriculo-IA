import React from 'react';
import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';

import './index.css'

// Standard functional component with TypeScript
const App: React.FC = () => {
  return (
    <div className="flex h-screen">

		  <FormSection /> 
		  <PreviewSection />
    </div>
  );
};

export default App;