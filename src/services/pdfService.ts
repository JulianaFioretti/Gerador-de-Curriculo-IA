import domtoimage from 'dom-to-image-more';
import jsPDF from 'jspdf';

export const generatePdf = async (element: HTMLElement, fileName: string): Promise<boolean> => {
  if (!element) {
    console.error("Erro: Elemento HTML não fornecido.");
    return false;
  }

  window.getSelection()?.removeAllRanges();

  const tempElement = element.cloneNode(true) as HTMLElement;
  Object.assign(tempElement.style, {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
    backgroundColor: '#ffffff',
  });

  tempElement.querySelectorAll<HTMLElement>('*').forEach(el => {
    el.style.border = 'none';
    el.style.outline = 'none';
  });

  document.body.appendChild(tempElement);

  try {
    const dataUrl = await domtoimage.toPng(tempElement, { bgcolor: '#ffffff' });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const pdfHeight = 297;

    const img = new Image();
    img.src = dataUrl;
    await new Promise(resolve => img.onload = resolve);

    const ratio = Math.min(pdfWidth / img.width, pdfHeight / img.height);
    pdf.addImage(dataUrl, 'PNG', 0, 0, img.width * ratio, img.height * ratio);
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error("Erro na geração do PDF:", error);
    return false;
  } finally {
    tempElement.remove();
  }
};
