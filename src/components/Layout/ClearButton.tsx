import React from 'react';
import { useCVData } from '../../hooks/useCVData';

const ClearButton: React.FC = () => {
  const { setState } = useCVData();

  const handleClear = () => {
    localStorage.removeItem('cv_state_v1');
    setState({
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      summary: '',
      skills: [],
      experiences: []
    });
  };

  return (
    <button
      onClick={handleClear}
      className="btn-clean"
      title="Limpar Currículo"
    >
      Limpar Currículo
    </button>
  );
};

export default ClearButton;
