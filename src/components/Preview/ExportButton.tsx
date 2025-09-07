import React from 'react';
import { generatePdf } from '../../services/pdfService';

interface ExportButtonProps {
  targetId: string;
  fileName: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ targetId, fileName }) => {
  const handleExport = async () => {
    const element = document.getElementById(targetId);

    if (element) {
      try {
        await generatePdf(element, fileName);
      } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
      }
    } else {
      console.error(`Elemento com o ID "${targetId}" não encontrado.`);
      alert("Não foi possível gerar o PDF. O elemento do currículo não foi encontrado. Por favor, recarregue a página.");
    }
  };

  return (
    <button onClick={handleExport} className="btn-exportar">
      Exportar PDF
    </button>
  );
};

export default ExportButton;
