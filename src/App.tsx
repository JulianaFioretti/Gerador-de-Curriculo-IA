import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';
import './index.css'

function App() {
  return (
    <div className="flex w-full">
      <div className="flex-1 max-w-1/2 border-r border-gray-200">
        <FormSection />
      </div>
      <div className="flex-1 max-w-1/2">
        <PreviewSection />
      </div>
    </div>
  )
}

export default App

