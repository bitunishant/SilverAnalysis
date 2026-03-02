/**
 * relation_couple/js/relation-couple.reset.js
 *
 * Purpose:
 * Restores default form state and immediately rehydrates preview output.
 *
 * Responsibilities:
 * 1) Reset identity/date/report fields
 * 2) Clear file input elements and local image preview placeholders
 * 3) Uncheck trait selections and clear free-text fields
 * 4) Re-seed key assessment textareas with default baseline text
 * 5) Call applyToPreview() so report panel reflects reset state instantly
 */

import { applyToPreview } from "./relation-couple.preview.js";

export function resetForm() {
  const person1Name = document.getElementById("person1Name");
  const person1Age = document.getElementById("person1Age");
  const person2Name = document.getElementById("person2Name");
  const person2Age = document.getElementById("person2Age");
  const reportDate = document.getElementById("reportDate");
  const reportId = document.getElementById("reportId");

  if (person1Name) person1Name.value = "Sarah Johnson";
  if (person1Age) person1Age.value = "28";
  if (person2Name) person2Name.value = "Michael Chen";
  if (person2Age) person2Age.value = "30";
  if (reportDate) reportDate.value = "September 15, 2025";
  if (reportId) reportId.value = "COUPLE-2025-001";

  ["person1Signature", "person1Handwriting", "person2Signature", "person2Handwriting"].forEach((id) => {
    const input = document.getElementById(id);
    const preview = document.getElementById(`${id}Preview`);
    if (input) input.value = "";
    if (preview) preview.innerHTML = "No file uploaded";
  });

  document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.checked = false;
  });

  document.querySelectorAll("textarea").forEach((ta) => {
    ta.value = "";
  });

  const strengths = document.getElementById("relationshipStrengths");
  const challenges = document.getElementById("relationshipChallenges");
  const recommendations = document.getElementById("relationshipRecommendations");

  if (strengths) {
    strengths.value =
      "Both partners show strong emotional intelligence and complementary communication styles, creating a solid foundation for understanding and growth.";
  }
  if (challenges) {
    challenges.value =
      "Different conflict resolution approaches may require patience and compromise to find common ground during disagreements.";
  }
  if (recommendations) {
    recommendations.value =
      "Focus on leveraging your complementary strengths while working on understanding and respecting each other's different approaches to conflict resolution. Regular check-ins about emotional needs will strengthen your bond.";
  }

  applyToPreview();
}
