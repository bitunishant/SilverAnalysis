/**
 * career-preview.js
 *
 * Purpose:
 * Sync all left-panel inputs/state into the right-panel report preview.
 *
 * Scope:
 * - Personal details
 * - Career match cards
 * - Recommendation and alternative paths
 * - Current job compatibility
 * - Dynamic strengths/improvements/personalized questions
 */

import { careerState } from "./career-state.js";
import { updateListFromTextarea } from "./career-utils.js";

/**
 * Read value from an input/textarea safely.
 */
function getValue(id) {
  return document.getElementById(id)?.value ?? "";
}

/**
 * Set plain text content safely.
 */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/**
 * Update the month/year label shown in report header details.
 */
function updateCurrentMonthYear() {
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  setText("current-month-year", `${monthNames[date.getMonth()]} ${date.getFullYear()}`);
}

/**
 * Sync one career match block (title, score, score bar, bullet points).
 */
export function updateCareerMatch(num) {
  const title = getValue(`career${num}Title`);
  const score = getValue(`career${num}Score`);

  setText(`previewCareer${num}Title`, title);
  setText(`previewCareer${num}Score`, `${score}%`);

  const scoreBar = document.getElementById(`career${num}ScoreBar`);
  if (scoreBar) scoreBar.style.width = `${score}%`;

  updateListFromTextarea(`career${num}Points`, `previewCareer${num}Points`);
}

/**
 * Show/hide current-job analysis elements based on Role Fit validity.
 * Invalid values hide visual score/recommendation content.
 */
function updateJobAnalysisVisibility() {
  const roleFitValue = getValue("roleFit");
  const n = Number(roleFitValue);
  const invalid =
    roleFitValue === "" ||
    Number.isNaN(n) ||
    n <= 0 ||
    n > 100;

  const fit = document.getElementById("current-job-analysis-fit");
  const recs = document.getElementById("previewJobRecommendations");
  const text = document.getElementById("recommendationtext");

  if (fit) fit.hidden = invalid;
  if (recs) recs.hidden = invalid;
  if (text) text.style.display = invalid ? "block" : "none";
}

/**
 * Rebuild strengths cards in preview from state.
 */
function updateStrengthsPreview() {
  const target = document.getElementById("previewStrengths");
  if (!target) return;

  target.innerHTML = "";
  careerState.strengths.forEach((s) => {
    target.innerHTML += `
      <div class="trait-card">
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </div>
    `;
  });
}

/**
 * Rebuild improvements cards in preview from state.
 * Splits leading emoji/icon prefix from title for visual badge rendering.
 */
function updateImprovementsPreview() {
  const target = document.getElementById("previewImprovements");
  if (!target) return;

  target.innerHTML = "";
  careerState.improvements.forEach((s) => {
    // Keep title unchanged; use a stable marker for the icon slot.
    const icon = "•";
    const title = s.title;
    target.innerHTML += `
      <div class="improvement-item">
        <div class="improvement-icon">${icon}</div>
        <div>
          <h4>${title}</h4>
          <p>${s.desc}</p>
        </div>
      </div>
    `;
  });
}

/**
 * Rebuild personalized question cards in preview from state.
 * Hides full section when no questions exist.
 */
function updatePersonalizedQuestionsPreview() {
  const list = document.getElementById("previewPersonalizedq");
  const section = document.getElementById("personalized-question-section");
  if (!list || !section) return;

  section.hidden = careerState.personalizedq.length === 0;
  list.innerHTML = "";

  careerState.personalizedq.forEach((s, index) => {
    list.innerHTML += `
      <div class="Personalizedq-item">
        <div class="Personalizedq-icon">Q${index + 1}</div>
        <div>
          <h4>${s.title.trim()}</h4>
          <p>${s.desc}</p>
        </div>
      </div>
    `;
  });
}

/**
 * Main preview synchronization function.
 * Called on:
 * - DOMContentLoaded
 * - manual Update Preview button
 * - every dynamic section mutation/edit
 */
export function updatePreview() {
  updateCurrentMonthYear();

  setText("previewName", getValue("fullName"));
  setText("name2", getValue("fullName"));
  setText("name3", getValue("fullName"));
  setText("previewAge", getValue("age"));
  setText("previewEducation", getValue("education"));
  setText("previewCurrentRole", getValue("currentRole"));

  updateCareerMatch(1);
  updateCareerMatch(2);
  updateCareerMatch(3);

  setText("previewRecommendationTitle", getValue("recommendationTitle"));
  updateListFromTextarea("growthPath", "previewGrowthPath");

  setText("previewBusinessScore", `${getValue("businessScore")}%`);
  setText("previewBestFit", getValue("bestFit"));
  setText("previewGovtScore", `${getValue("govtScore")}%`);

  updateListFromTextarea("businessStrengths", "previewBusinessStrengths");
  updateListFromTextarea("businessChallenges", "previewBusinessChallenges");
  updateListFromTextarea("recommendedExams", "previewRecommendedExams");
  updateListFromTextarea("govtAdvantages", "previewGovtAdvantages");

  updateJobAnalysisVisibility();
  setText("previewRoleFit", `${getValue("roleFit")}%`);
  updateListFromTextarea("jobRecommendations", "previewJobRecommendations");

  updateStrengthsPreview();
  updateImprovementsPreview();
  updatePersonalizedQuestionsPreview();
}
