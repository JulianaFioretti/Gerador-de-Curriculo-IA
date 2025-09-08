import React, { useState } from 'react';
import { generatePdf } from '../../services/pdfService';
import Toast from '../UI/Toast';

interface ExportButtonProps {
  targetId: string;
  fileName: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ targetId, fileName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const handleExport = async () => {
    const element = document.getElementById(targetId);
    if (!element) {
      setToast({ message: 'Não foi possível gerar o PDF. Recarregue a página.', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 3000));
      await generatePdf(element, fileName);
      setToast({ message: 'PDF exportado com sucesso!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Erro ao gerar o PDF.', type: 'error' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <>
      <button onClick={handleExport} className="btn-exportar" disabled={isLoading}>
        {isLoading ? 'Carregando...' : 'Exportar PDF'}
      </button>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
};

export default ExportButton;
