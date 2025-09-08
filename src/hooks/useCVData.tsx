import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CVState } from '../types/cv.types';

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

const CVContext = createContext<{
  state: CVState;
  setState: React.Dispatch<React.SetStateAction<CVState>>;
}>({ state: initialState, setState: () => null });

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  function uid(prefix = '') {
    return prefix + Math.random().toString(36).slice(2, 9);
  }

  const [state, setState] = useState<CVState>(() => {
    const raw = localStorage.getItem('cv_state_v1');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
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

  useEffect(() => {
    localStorage.setItem('cv_state_v1', JSON.stringify(state));
  }, [state]);

  return (
    <CVContext.Provider value={{ state, setState }}>
      {children}
    </CVContext.Provider>
  );
};

export function useCVData() {
  return useContext(CVContext);
}
