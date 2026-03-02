/**
 * relation_couple/js/relation-couple.preview.js
 *
 * Purpose:
 * Synchronizes left-panel form values into right-panel live report preview.
 *
 * Responsibilities:
 * 1) Copy partner identity/date/report metadata into report header blocks
 * 2) Read uploaded images and show them in report placeholders
 * 3) Trigger trait-analysis + compatibility refresh
 * 4) Convert long-form assessment fields into bullets/paragraphs for report sections
 *
 * Boundaries:
 * - Does not attach DOM listeners (handled in relation-couple.ui.js)
 * - Does not perform reset/PDF/export actions (other modules own those concerns)
 */

import { updateTraitAnalyses } from "./relation-couple.compatibility.js";
import { formatAsBullets } from "./relation-couple.helpers.js";

export function applyToPreview() {
  const person1Name = document.getElementById("person1Name")?.value || "Person 1";
  const person2Name = document.getElementById("person2Name")?.value || "Person 2";

  const p1Name = document.getElementById("r_person1_name");
  const p2Name = document.getElementById("r_person2_name");
  const p1Age = document.getElementById("r_person1_age");
  const p2Age = document.getElementById("r_person2_age");
  const rDate = document.getElementById("r_date");
  const rId = document.getElementById("r_id");
  const coupleNames = document.getElementById("r_couple_names");

  if (p1Name) p1Name.textContent = `Person 1: ${person1Name}`;
  if (p2Name) p2Name.textContent = `Person 2: ${person2Name}`;
  if (p1Age) p1Age.textContent = document.getElementById("person1Age")?.value || "";
  if (p2Age) p2Age.textContent = document.getElementById("person2Age")?.value || "";
  if (rDate) rDate.textContent = document.getElementById("reportDate")?.value || "";

  const reportIdInput = document.getElementById("reportId");
  if (rId && reportIdInput) rId.textContent = reportIdInput.value;
  if (coupleNames) coupleNames.textContent = `${person1Name} & ${person2Name}`;

  ["person1", "person2"].forEach((person) => {
    ["signature", "handwriting"].forEach((type) => {
      const fileInput = document.getElementById(`${person}${type.charAt(0).toUpperCase() + type.slice(1)}`);
      const file = fileInput?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.getElementById(`r_${person}_${type}_img`);
        const placeholder = document.getElementById(`r_${person}_${type}_placeholder`);
        if (!img || !placeholder) return;

        img.src = e.target.result;
        img.style.display = "block";
        placeholder.style.display = "none";
      };
      reader.readAsDataURL(file);
    });
  });

  updateTraitAnalyses();

  const mappings = [
    ["relationshipStrengths", "r_strengths"],
    ["relationshipChallenges", "r_challenges"],
    ["relationshipRecommendations", "r_recommendations"],
    ["communicationCompatibility", "r_communication_compatibility"],
    ["emotionalCompatibility", "r_emotional_compatibility"],
    ["intellectualCompatibility", "r_intellectual_compatibility"],
    ["lifestyleCompatibility", "r_lifestyle_compatibility"],
    ["conflictResolution", "r_conflict_resolution"],
    ["overallCompatibility", "r_overall_compatibility"]
  ];

  mappings.forEach(([inputId, previewId]) => {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (input && preview) {
      preview.innerHTML = formatAsBullets(input.value);
    }
  });
}
