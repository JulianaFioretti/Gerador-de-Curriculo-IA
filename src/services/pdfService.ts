import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePdf = async (element: HTMLElement, fileName: string): Promise<boolean> => {
  if (!element) {
    console.error("Erro: Elemento HTML não fornecido para a geração do PDF.");
    return false;
  } else {
    console.log("testando")
  }

  const tempElement = element.cloneNode(true) as HTMLElement;
  tempElement.style.backgroundColor = '#ffffff'; 
  tempElement.style.background = '#ffffff';

  document.body.appendChild(tempElement);
  
  try {
    const canvas = await html2canvas(tempElement, {
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');

    const pdfWidth = 210;
    const pdfHeight = 297;

    const imgProps = ((canvas.width / canvas.height) * pdfHeight) > pdfWidth 
      ? { width: pdfWidth, height: (canvas.height * pdfWidth) / canvas.width } 
      : { width: (canvas.width * pdfHeight) / canvas.height, height: pdfHeight };

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, imgProps.width, imgProps.height);
    pdf.save(fileName);
    return true; // Retorna true em caso de sucesso
  } catch (error) {
    console.error("Erro na geração do PDF:", error);
    return false; // Retorna false em caso de falha
  } finally {
    document.body.removeChild(tempElement);
  }
};
