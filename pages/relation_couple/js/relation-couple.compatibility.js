/**
 * relation_couple/js/relation-couple.compatibility.js
 *
 * Purpose:
 * Owns compatibility mathematics and trait-analysis rendering.
 *
 * Section map:
 * 1) calculateCompatibilityScore():
 *    - computes weighted score for two trait sets
 *    - maps score to qualitative level
 * 2) updateTraitAnalyses():
 *    - reads selected traits for both partners
 *    - renders interpretation lists and notes in preview
 *    - updates per-category compatibility badges
 *    - updates overall compatibility score + summary line
 *
 * Notes:
 * - Scoring constants/rules come from relation-couple.constants.js.
 * - This module does not handle uploads, reset flow, PDF, or HTML export.
 */

import { CATEGORY_KEYS, COMPATIBILITY_RULES, TRAIT_DATA, WEIGHTS } from "./relation-couple.constants.js";
import { getSelectedCheckboxValues } from "./relation-couple.helpers.js";

export function calculateCompatibilityScore(person1Traits, person2Traits) {
  if (!person1Traits || !person2Traits) {
    return { score: 0, level: "No Data" };
  }

  let weightedScore = 0;
  let totalWeight = 0;

  Object.keys(WEIGHTS).forEach((category) => {
    const traits1 = person1Traits[category] || [];
    const traits2 = person2Traits[category] || [];
    if (traits1.length === 0 || traits2.length === 0) return;

    let categoryScore = 0;
    let comparisons = 0;

    traits1.forEach((trait1) => {
      traits2.forEach((trait2) => {
        const ruleSet = COMPATIBILITY_RULES[category];
        categoryScore += ruleSet?.[trait1]?.[trait2] ?? 0.5;
        comparisons += 1;
      });
    });

    if (comparisons > 0) {
      const avgScore = categoryScore / comparisons;
      weightedScore += avgScore * WEIGHTS[category];
      totalWeight += WEIGHTS[category];
    }
  });

  const score = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;
  let level = "Challenging Match";
  if (score >= 85) level = "Excellent Match";
  else if (score >= 70) level = "Good Match";
  else if (score >= 50) level = "Fair Match";

  return { score, level };
}

export function updateTraitAnalyses() {
  const person1Name = document.getElementById("person1Name")?.value || "Person 1";
  const person2Name = document.getElementById("person2Name")?.value || "Person 2";

  let weightedScore = 0;
  let totalWeight = 0;

  CATEGORY_KEYS.forEach((category) => {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    const person1Traits = getSelectedCheckboxValues(`person1${categoryName}Select`);
    const person2Traits = getSelectedCheckboxValues(`person2${categoryName}Select`);

    const p1Title = document.getElementById(`r_person1_${category}_title`);
    const p2Title = document.getElementById(`r_person2_${category}_title`);
    if (p1Title) p1Title.textContent = `${person1Name}'s ${categoryName} Style`;
    if (p2Title) p2Title.textContent = `${person2Name}'s ${categoryName} Style`;

    const updateTraitList = (traits, listId) => {
      const list = document.getElementById(listId);
      if (!list) return;

      if (traits.length > 0) {
        const analyses = traits
          .map((trait) => (TRAIT_DATA[category][trait] ? `<li>${TRAIT_DATA[category][trait]}</li>` : ""))
          .filter(Boolean);
        list.innerHTML = analyses.length > 0 ? analyses.join("") : "<li>No analysis available</li>";
      } else {
        list.innerHTML = "<li>Select traits to see analysis</li>";
      }
    };

    updateTraitList(person1Traits, `r_person1_${category}_list`);
    updateTraitList(person2Traits, `r_person2_${category}_list`);

    const p1Notes = document.getElementById(`r_person1_${category}_notes`);
    const p2Notes = document.getElementById(`r_person2_${category}_notes`);
    const p1NotesValue = document.getElementById(`person1${categoryName}Notes`)?.value || "No notes provided";
    const p2NotesValue = document.getElementById(`person2${categoryName}Notes`)?.value || "No notes provided";

    // Requested behavior parity with individual tool:
    // emotional notes should support bullet formatting when multi-line text is provided.
    // NOTE: .person-trait ul in CSS uses list-style:none, so we force visible bullets
    // with inline list-style and indentation for this specific notes area.
    if (category === "emotional") {
      const toNotesBulletHtml = (value) => {
        if (!value.trim()) return '<div class="empty-state">No information provided</div>';
        const lines = value.split(/\n+/).map((line) => line.trim()).filter(Boolean);
        if (lines.length > 1) {
          return `<ul style="list-style: disc; padding-left: 18px; margin: 6px 0;">${lines
            .map((line) => `<li style="border-bottom:none; margin: 4px 0;">${line}</li>`)
            .join("")}</ul>`;
        }
        return `<p>${lines[0]}</p>`;
      };

      if (p1Notes) p1Notes.innerHTML = toNotesBulletHtml(p1NotesValue);
      if (p2Notes) p2Notes.innerHTML = toNotesBulletHtml(p2NotesValue);
    } else {
      if (p1Notes) p1Notes.textContent = p1NotesValue;
      if (p2Notes) p2Notes.textContent = p2NotesValue;
    }

    const scoreElement = document.getElementById(`r_${category}_compatibility`);
    if (!scoreElement) return;

    const compatibility = calculateCompatibilityScore(
      { [category]: person1Traits },
      { [category]: person2Traits }
    );

    if (compatibility.score > 0) {
      scoreElement.textContent = `Compatibility Score: ${compatibility.score}% - ${compatibility.level}`;
      scoreElement.className = `compatibility-score ${
        compatibility.score >= 85 ? "score-high" : compatibility.score >= 70 ? "score-medium" : "score-low"
      }`;
      weightedScore += (compatibility.score / 100) * WEIGHTS[category];
      totalWeight += WEIGHTS[category];
    } else {
      scoreElement.textContent = "Select traits for both people to calculate compatibility";
      scoreElement.className = "compatibility-score score-medium";
    }
  });

  const overallScore = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;
  const scoreEl = document.getElementById("r_overall_score");
  if (scoreEl) scoreEl.textContent = `${overallScore}%`;

  let overallLevel = "Complete trait analysis to calculate overall compatibility";
  if (overallScore >= 85) overallLevel = "Exceptional Compatibility - Outstanding Match";
  else if (overallScore >= 70) overallLevel = "Strong Compatibility - Excellent Foundation for a Lasting Relationship";
  else if (overallScore >= 50) overallLevel = "Moderate Compatibility - Good Potential with Effort";
  else if (overallScore > 0) overallLevel = "Lower Compatibility - Requires Significant Understanding";

  const overallText = document.querySelector(".overall-analysis p");
  if (overallText) overallText.textContent = overallLevel;
}
