/**
 * relation_couple/js/relation-couple.pdf.js
 *
 * Purpose:
 * Generates downloadable PDF from rendered report preview.
 *
 * Flow:
 * 1) Snapshot #reportRoot via html2canvas
 * 2) Stream image into jsPDF pages (multi-page aware)
 * 3) Build filename from partner names
 * 4) Download final PDF
 *
 * Error handling:
 * Any render/export failure is logged and surfaced with user-facing alert.
 */

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

    const p1 =
      document.getElementById("person1Name")?.value.replace(/\s+/g, "_") ||
      "Person1";
    const p2 =
      document.getElementById("person2Name")?.value.replace(/\s+/g, "_") ||
      "Person2";
    pdf.save(`Couple_Compatibility_${p1}_${p2}.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
    alert("Error generating PDF. Please try again.");
  }
}
