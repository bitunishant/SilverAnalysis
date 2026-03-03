/**
 * relation_individual/js/relation-individual.reset.js
 *
 * Resets form state and rehydrates preview.
 */

import { RESET_DEFAULTS } from "./relation-individual.constants.js";
import { setTodayDate } from "./relation-individual.helpers.js";
import { applyToPreview } from "./relation-individual.preview.js";

export function resetForm() {
  const userName = document.getElementById("userName");
  const userAge = document.getElementById("userAge");
  const relationshipStrengths = document.getElementById("relationshipStrengths");
  const areasForGrowth = document.getElementById("areasForGrowth");
  const compatibilitySummary = document.getElementById("compatibilitySummary");

  if (userName) userName.value = RESET_DEFAULTS.userName;
  if (userAge) userAge.value = RESET_DEFAULTS.userAge;
  setTodayDate("reportDate");

  const uploadSignature = document.getElementById("uploadSignature");
  const uploadHandwriting = document.getElementById("uploadHandwriting");
  if (uploadSignature) uploadSignature.value = "";
  if (uploadHandwriting) uploadHandwriting.value = "";

  const signaturePreview = document.getElementById("signaturePreview");
  const handwritingPreview = document.getElementById("handwritingPreview");
  if (signaturePreview) signaturePreview.innerHTML = "No signature uploaded";
  if (handwritingPreview) handwritingPreview.innerHTML = "No handwriting uploaded";

  document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.checked = false;
  });

  [
    "emotional_text",
    "communication_text",
    "conflict_text",
    "intimacy_text",
    "family_text",
    "financial_text",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  if (relationshipStrengths) {
    relationshipStrengths.value = RESET_DEFAULTS.relationshipStrengths;
  }
  if (areasForGrowth) {
    areasForGrowth.value = RESET_DEFAULTS.areasForGrowth;
  }
  if (compatibilitySummary) {
    compatibilitySummary.value = RESET_DEFAULTS.compatibilitySummary;
  }

  applyToPreview();
}

