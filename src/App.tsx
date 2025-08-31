import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';
import './index.css'


function App() {
  return (
    <div className="flex w-full h-full max-h-full">
      {/* overflow-auto permite auto scroll */}
      <div className="flex-1 max-w-1/2 max-h-full border-r overflow-auto border-gray-200">
        <FormSection />
      </div>
      <div className="flex-1 max-w-1/2 max-h-full overflow-auto">
        <PreviewSection />
      </div>
    </div>
  )
}

export default App

