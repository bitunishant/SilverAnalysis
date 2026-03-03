/**
 * relation_individual/js/relation-individual.ui.js
 *
 * Module entry point: wires listeners and performs initial render.
 */

import { downloadHtmlSnapshot } from "./relation-individual.export-html.js";
import { handleImageUpload, setTodayDate } from "./relation-individual.helpers.js";
import { downloadPDF, previewPdf } from "./relation-individual.pdf.js";
import { applyToPreview } from "./relation-individual.preview.js";
import { resetForm } from "./relation-individual.reset.js";

setTodayDate("reportDate");

const applyBtn = document.getElementById("applyBtn");
if (applyBtn) applyBtn.addEventListener("click", applyToPreview);

const downloadPdfBtn = document.getElementById("downloadPdf");
if (downloadPdfBtn) downloadPdfBtn.addEventListener("click", downloadPDF);

const previewPdfBtn = document.getElementById("previewPdf");
if (previewPdfBtn) previewPdfBtn.addEventListener("click", previewPdf);

const resetBtn = document.getElementById("resetBtn");
if (resetBtn) resetBtn.addEventListener("click", resetForm);

const downloadHtmlBtn = document.getElementById("downloadHtml");
if (downloadHtmlBtn) {
  downloadHtmlBtn.addEventListener("click", downloadHtmlSnapshot);
}

const uploadSignature = document.getElementById("uploadSignature");
if (uploadSignature) {
  uploadSignature.addEventListener("change", function () {
    handleImageUpload(this, "signature");
  });
}

const uploadHandwriting = document.getElementById("uploadHandwriting");
if (uploadHandwriting) {
  uploadHandwriting.addEventListener("change", function () {
    handleImageUpload(this, "handwriting");
  });
}

document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
  cb.addEventListener("change", applyToPreview);
});

applyToPreview();
