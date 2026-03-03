/**
 * relation_individual/js/relation-individual.pdf.js
 *
 * PDF utilities: preview hint + downloadable PDF export.
 */

export function previewPdf() {
  const previewArea = document.querySelector(".preview-area");
  if (previewArea) previewArea.scrollTop = 0;
  alert(
    'Preview is shown in the right panel. Review your report and click "Download PDF" when ready.',
  );
}

export async function downloadPDF() {
  const jsPDFRef = window.jspdf?.jsPDF;
  const element = document.getElementById("reportRoot");
  if (!jsPDFRef || !element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDFRef("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const name = document.getElementById("userName")?.value || "User";
    const fileName = `Relationship_Analysis_${name.replace(/\s+/g, "_")}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error("PDF generation error:", error);
    alert("Error generating PDF. Please try again.");
  }
}

