/**
 * career-pdf.js
 *
 * Purpose:
 * Export report preview into a paginated A4 PDF.
 *
 * Flow:
 * 1) Show loading + disable trigger button
 * 2) Capture report container with html2canvas
 * 3) Add image into jsPDF pages (multi-page when needed)
 * 4) Save with candidate-based filename
 * 5) Restore UI state in finally block
 */

/**
 * Generate and download PDF for current report preview.
 *
 * @param {HTMLElement | null | undefined} buttonEl
 * Optional trigger button element. If not provided, current active element is used.
 */
export async function downloadPDF(buttonEl) {
  const button = buttonEl || document.activeElement;
  const loading = document.getElementById("loading");
  const originalText = button?.textContent || "Download PDF";

  try {
    if (button) {
      button.disabled = true;
      button.textContent = "Generating...";
    }
    if (loading) loading.style.display = "block";

    const element = document.getElementById("reportContainer");
    if (!element) throw new Error("Missing report container");

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const imgData = canvas.toDataURL("image/jpeg");
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

    const candidateName = document.getElementById("fullName")?.value || "Candidate";
    pdf.save(`Career_Analysis_Report_${candidateName.replace(/\s+/g, "_")}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
    if (loading) loading.style.display = "none";
  }
}
