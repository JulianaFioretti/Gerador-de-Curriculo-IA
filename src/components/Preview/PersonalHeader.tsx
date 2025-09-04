import React, { useContext } from 'react';
import { CVContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const PersonalHeader: React.FC = () => {
  const { state } = useContext(CVContext);
  return (
    <div className="mb-4">
      <h2 className={`text-2xl font-bold ${!state.name ? 'text-slate-400 italic' : ''}`}>{state.name || 'Seu Nome Aqui'}</h2>
      <div className="flex flex-col gap-1 mt-2 text-sm text-slate-600">
        {state.email && (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
            <span>{state.email}</span>
          </div>
        )}
        {state.phone && (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPhone} className="text-blue-500" />
            <span>{state.phone}</span>
          </div>
        )}
        {state.linkedin && (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLinkedin} className="text-blue-500" />
            <a href={state.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">{state.linkedin}</a>
          </div>
        )}
        {state.github && (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGithub} className="text-blue-500" />
            <a href={state.github} target="_blank" rel="noopener noreferrer" className="hover:underline">{state.github}</a>
          </div>
        )}
        {!state.email && !state.phone && !state.linkedin && !state.github && (
          <div className="italic text-slate-400">email • telefone • linkedin • github</div>
        )}
      </div>
      <div className={`mt-4 max-w-[600px] text-sm text-slate-700 ${!state.summary ? 'italic text-slate-400' : ''}`}>{state.summary || 'Resumo profissional aparecerá aqui.'}</div>
    </div>
  );
};

export default PersonalHeader;
