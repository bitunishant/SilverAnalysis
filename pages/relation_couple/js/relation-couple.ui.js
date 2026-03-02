/**
 * relation_couple/js/relation-couple.ui.js
 *
 * Module hub:
 * - wires page listeners
 * - initializes default date + first preview render
 *
 * Purpose:
 * Entry-point orchestrator for the modular relation-couple frontend.
 *
 * Responsibilities:
 * 1) Import and connect section modules (preview, reset, compatibility, exports)
 * 2) Attach all top-level button/input listeners
 * 3) Initialize derived defaults (date) and first render pass
 *
 * Maintainer note:
 * Keep this file lightweight; business logic belongs in dedicated modules.
 */

import { updateTraitAnalyses } from "./relation-couple.compatibility.js";
import { downloadHtmlSnapshot } from "./relation-couple.export-html.js";
import { handleImageUpload, setTodayDate } from "./relation-couple.helpers.js";
import { downloadPDF } from "./relation-couple.pdf.js";
import { applyToPreview } from "./relation-couple.preview.js";
import { resetForm } from "./relation-couple.reset.js";

setTodayDate("reportDate");

const applyBtn = document.getElementById("applyBtn");
if (applyBtn) applyBtn.addEventListener("click", applyToPreview);

const downloadPdfBtn = document.getElementById("downloadPdf");
if (downloadPdfBtn) downloadPdfBtn.addEventListener("click", downloadPDF);

const resetBtn = document.getElementById("resetBtn");
if (resetBtn) resetBtn.addEventListener("click", resetForm);

const downloadHtmlBtn = document.getElementById("downloadHtml");
if (downloadHtmlBtn)
  downloadHtmlBtn.addEventListener("click", downloadHtmlSnapshot);

[
  "person1Signature",
  "person1Handwriting",
  "person2Signature",
  "person2Handwriting",
].forEach((id) => {
  const input = document.getElementById(id);
  if (!input) return;

  input.addEventListener("change", function () {
    const parts = id.match(/^(person[12])(.+)$/);
    if (!parts) return;

    handleImageUpload(this, parts[1], parts[2].toLowerCase());
  });
});

document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
  cb.addEventListener("change", updateTraitAnalyses);
});

applyToPreview();
