import React, { useState } from 'react';
import { generatePdf } from '../../services/pdfService';

interface ExportButtonProps {
  targetId: string;
  fileName: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ targetId, fileName }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById(targetId);
    if (!element) {
      console.error(`Elemento com ID "${targetId}" não encontrado.`);
      alert("Não foi possível gerar o PDF. Recarregue a página.");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 3000));
      await generatePdf(element, fileName);
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleExport} className="btn-exportar" disabled={isLoading}>
      {isLoading ? 'Carregando...' : 'Exportar PDF'}
    </button>
  );
};

export default ExportButton;
