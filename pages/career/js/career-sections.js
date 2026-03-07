/**
 * career-sections.js
 *
 * Purpose:
 * Handle dynamic editable blocks in the left panel:
 * - Strengths
 * - Improvements
 * - Personalized Questions
 *
 * Pattern:
 * 1) Mutate state
 * 2) Re-render corresponding editor section
 * 3) Refresh preview
 */

import { careerState } from "./career-state.js";

/**
 * Shared post-change workflow for section mutations.
 * Re-renders the section and immediately refreshes preview output.
 */
function rerenderAndPreview(renderFn) {
  renderFn();
  globalThis.updatePreview?.();
}

/**
 * Render editable Strength items in the left panel.
 * Uses inline onchange handlers to keep edits in shared state.
 */
export function renderStrengths() {
  const container = document.getElementById("strengthsContainer");
  if (!container) return;

  container.innerHTML = "";
  careerState.strengths.forEach((item, index) => {
    container.innerHTML += `
      <div class="hardcoded-input" style="margin-bottom:8px;">
        <label>Title</label>
        <input type="text" value="${item.title}" onchange="window.careerState.strengths[${index}].title=this.value;window.updatePreview()">
        <label>Description</label>
        <textarea onchange="window.careerState.strengths[${index}].desc=this.value;window.updatePreview()">${item.desc}</textarea>
        <button class="add-line-btn" type="button" onclick="removeStrength(${index})">Remove</button>
      </div>
    `;
  });
}

/**
 * Render editable Improvement items in the left panel.
 * Uses inline onchange handlers to keep edits in shared state.
 */
export function renderImprovements() {
  const container = document.getElementById("improvementsContainer");
  if (!container) return;

  container.innerHTML = "";
  careerState.improvements.forEach((item, index) => {
    container.innerHTML += `
      <div class="hardcoded-input" style="margin-bottom:8px;">
        <label>Title</label>
        <input type="text" value="${item.title}" onchange="window.careerState.improvements[${index}].title=this.value;window.updatePreview()">
        <label>Description</label>
        <textarea onchange="window.careerState.improvements[${index}].desc=this.value;window.updatePreview()">${item.desc}</textarea>
        <button class="add-line-btn" type="button" onclick="removeImprovement(${index})">Remove</button>
      </div>
    `;
  });
}

/**
 * Render editable Personalized Question items in the left panel.
 */
export function renderPersonalizedq() {
  const container = document.getElementById("personalizedqContainer");
  if (!container) return;

  container.innerHTML = "";
  careerState.personalizedq.forEach((item, index) => {
    container.innerHTML += `
      <div class="hardcoded-input" style="margin-bottom:8px;">
        <label>Question</label>
        <input type="text" value="${item.title}" onchange="window.careerState.personalizedq[${index}].title=this.value;window.updatePreview()">
        <label>Expert Answer</label>
        <textarea onchange="window.careerState.personalizedq[${index}].desc=this.value;window.updatePreview()">${item.desc}</textarea>
        <button class="add-line-btn" type="button" onclick="removePersonalizedq(${index})">Remove</button>
      </div>
    `;
  });
}

/**
 * Add an empty Strength item and refresh UI + preview.
 */
export function addStrength() {
  careerState.strengths.push({ title: "", desc: "" });
  rerenderAndPreview(renderStrengths);
}

/**
 * Remove a Strength item by index and refresh UI + preview.
 */
export function removeStrength(index) {
  careerState.strengths.splice(index, 1);
  rerenderAndPreview(renderStrengths);
}

/**
 * Add an empty Improvement item and refresh UI + preview.
 */
export function addImprovement() {
  careerState.improvements.push({ title: "", desc: "" });
  rerenderAndPreview(renderImprovements);
}

/**
 * Remove an Improvement item by index and refresh UI + preview.
 */
export function removeImprovement(index) {
  careerState.improvements.splice(index, 1);
  rerenderAndPreview(renderImprovements);
}

/**
 * Add an empty Personalized Question item and refresh UI + preview.
 */
export function addPersonalizedq() {
  careerState.personalizedq.push({ title: "", desc: "" });
  rerenderAndPreview(renderPersonalizedq);
}

/**
 * Remove a Personalized Question item by index and refresh UI + preview.
 */
export function removePersonalizedq(index) {
  careerState.personalizedq.splice(index, 1);
  rerenderAndPreview(renderPersonalizedq);
}
