/**
 * relation_individual/js/relation-individual.preview.js
 *
 * Synchronizes left panel inputs into right panel report preview.
 */

import {
  updateCompatibility,
  updateTraitAnalyses,
} from "./relation-individual.compatibility.js";
import { formatAsBullets } from "./relation-individual.helpers.js";

export function applyToPreview() {
  const userName = document.getElementById("userName")?.value || "";
  const userAge = document.getElementById("userAge")?.value || "";
  const reportDate = document.getElementById("reportDate")?.value || "";

  const rName = document.getElementById("r_name");
  const rAge = document.getElementById("r_age");
  const rDate = document.getElementById("r_date");
  const rCompatName = document.getElementById("r_compat_name");
  const rFooterName = document.getElementById("r_footer_name");

  if (rName) rName.textContent = userName;
  if (rAge) rAge.textContent = userAge;
  if (rDate) rDate.textContent = reportDate;
  if (rCompatName) rCompatName.textContent = userName;
  if (rFooterName) rFooterName.textContent = userName;

  const signatureFile = document.getElementById("uploadSignature")?.files?.[0];
  const handwritingFile = document.getElementById("uploadHandwriting")?.files?.[0];

  if (signatureFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById("r_signature_img");
      const placeholder = document.getElementById("r_signature_placeholder");
      if (!img || !placeholder) return;

      img.src = e.target.result;
      img.style.display = "block";
      placeholder.style.display = "none";
    };
    reader.readAsDataURL(signatureFile);
  }

  if (handwritingFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById("r_handwriting_img");
      const placeholder = document.getElementById("r_handwriting_placeholder");
      if (!img || !placeholder) return;

      img.src = e.target.result;
      img.style.display = "block";
      placeholder.style.display = "none";
    };
    reader.readAsDataURL(handwritingFile);
  }

  updateTraitAnalyses();
  updateCompatibility();

  const mappings = [
    ["emotional_text", "r_emotional_text"],
    ["communication_text", "r_communication_text"],
    ["conflict_text", "r_conflict_text"],
    ["intimacy_text", "r_intimacy_text"],
    ["family_text", "r_family_text"],
    ["financial_text", "r_financial_text"],
    ["relationshipStrengths", "r_strengths"],
    ["areasForGrowth", "r_growth"],
    ["compatibilitySummary", "r_compatibility"],
  ];

  mappings.forEach(([inputId, previewId]) => {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (input && preview) {
      preview.innerHTML = formatAsBullets(input.value);
    }
  });
}

