import React, { useContext } from 'react';
import { CVContext } from '../../App';

const SkillsSection: React.FC = () => {
  const { state } = useContext(CVContext);
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Habilidades</h3>
      <ul className="space-y-1 gap-2 text-sm text-slate-700">
        {state.skills.length === 0 ? (
          <li className="italic text-slate-400">Nenhuma habilidade adicionada.</li>
        ) : (
          state.skills.map((s) => (
            <li key={s.id} className="flex items-center gap-2">
              <span className="font-medium">{s.name}</span>
              <span className="text-xs text-slate-500">({s.level})</span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default SkillsSection;
