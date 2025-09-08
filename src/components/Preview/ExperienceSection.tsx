import React from 'react';
import { useCVData } from '../../hooks/useCVData';

const ExperienceSection: React.FC = () => {
  const { state } = useCVData();
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Experiências</h3>
      <div className="space-y-4 text-sm text-slate-700">
        {state.experiences.length === 0 ? (
          <div className="italic text-slate-400">Nenhuma experiência registrada.</div>
        ) : (
          state.experiences.map((ex) => (
            <div key={ex.id} className="border-l-2 border-slate-100 pl-3">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{ex.role || 'Cargo não informado'}</div>
                  <div className="text-xs text-slate-500">{ex.company || 'Empresa não informada'}</div>
                </div>
                <div className="text-xs text-slate-500">{ex.current ? `${ex.periodStart} — Atualmente` : `${ex.periodStart} — ${ex.periodEnd || ''}`}</div>
              </div>
              <div className={`mt-1 text-sm text-slate-700 ${!ex.description ? 'italic text-slate-400' : ''}`}>{ex.description || 'Descrição da experiência.'}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
