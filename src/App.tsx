import Header from './components/Layout/Header';
import React, { useEffect, useState, createContext, useContext } from 'react';
import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';
import './index.css';
import type { CVState, Skill, Experience } from './types/cv.types';

const initialState: CVState = {
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  summary: '',
  skills: [],
  experiences: []
};

export const CVContext = createContext<{
  state: CVState;
  setState: React.Dispatch<React.SetStateAction<CVState>>;
}>({ state: initialState, setState: () => null });

function uid(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9);
}

function App() {
  const [state, setState] = useState<CVState>(() => {
    const raw = localStorage.getItem('cv_state_v1');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback para estado inicial
        return {
          ...initialState,
          skills: [ { id: uid('sk_'), name: 'JavaScript', level: 'Avançado' } ],
          experiences: [ {
            id: uid('ex_'),
            company: 'Empresa Exemplo',
            role: 'Desenvolvedor Front-end',
            periodStart: '01/2021',
            periodEnd: '12/2023',
            current: false,
            description: 'Desenvolvimento de interfaces responsivas e colaboração em times ágeis.'
          } ]
        };
      }
    }
    return {
      ...initialState,
      skills: [ { id: uid('sk_'), name: 'JavaScript', level: 'Avançado' } ],
      experiences: [ {
        id: uid('ex_'),
        company: 'Empresa Exemplo',
        role: 'Desenvolvedor Front-end',
        periodStart: '01/2021',
        periodEnd: '12/2023',
        current: false,
        description: 'Desenvolvimento de interfaces responsivas e colaboração em times ágeis.'
      } ]
    };
  });

  // Persist to localStorage for convenience
  useEffect(() => {
    localStorage.setItem('cv_state_v1', JSON.stringify(state));
  }, [state]);

  const handleClear = () => {
    localStorage.removeItem('cv_state_v1');
    setState({
      ...initialState,
      skills: [ { id: uid('sk_'), name: 'JavaScript', level: 'Avançado' } ],
      experiences: [ {
        id: uid('ex_'),
        company: 'Empresa Exemplo',
        role: 'Desenvolvedor Front-end',
        periodStart: '01/2021',
        periodEnd: '12/2023',
        current: false,
        description: 'Desenvolvimento de interfaces responsivas e colaboração em times ágeis.'
      } ]
    });
  };

  return (
    <CVContext.Provider value={{ state, setState }}>
      <div className="relative w-full h-full max-h-full">
        <Header />
        <div className="absolute top-26 right-8 z-50">
          <button
            onClick={handleClear}
            className="btn-clean"
            title="Limpar Currículo"
          >
            Limpar Currículo
          </button>
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
      </div>
    </CVContext.Provider>
  );
}

export default App;

