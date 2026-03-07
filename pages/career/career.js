/**
 * career.js
 *
 * Purpose:
 * Single entry-point module for the Career page.
 *
 * Responsibilities:
 * 1) Import all feature modules (state, sections, preview, PDF, utils)
 * 2) Expose selected functions on global scope for existing inline HTML handlers
 * 3) Run startup lifecycle on DOMContentLoaded
 *
 * Why this file exists:
 * The HTML uses inline onclick handlers (e.g., `onclick="addStrength()"`).
 * To preserve existing behavior without rewriting markup, we attach module
 * functions to `globalThis`.
 */

import { careerState } from "./js/career-state.js";
import {
  addStrength,
  addImprovement,
  addPersonalizedq,
  removeStrength,
  removeImprovement,
  removePersonalizedq,
  renderStrengths,
  renderImprovements,
  renderPersonalizedq,
} from "./js/career-sections.js";
import { updatePreview } from "./js/career-preview.js";
import { downloadPDF } from "./js/career-pdf.js";
import { addNewLine, initializeRangeDisplays } from "./js/career-utils.js";

// Expose shared state for inline onchange expressions generated in section renderers.
globalThis.careerState = careerState;

// Expose utility/actions used by existing inline onclick handlers in HTML.
globalThis.addNewLine = addNewLine;
globalThis.addStrength = addStrength;
globalThis.removeStrength = removeStrength;
globalThis.addImprovement = addImprovement;
globalThis.removeImprovement = removeImprovement;
globalThis.addPersonalizedq = addPersonalizedq;
globalThis.removePersonalizedq = removePersonalizedq;

// Expose renderers to keep manual refresh/debug operations available.
globalThis.renderStrengths = renderStrengths;
globalThis.renderImprovements = renderImprovements;
globalThis.renderPersonalizedq = renderPersonalizedq;

// Expose core preview/PDF actions expected by buttons.
globalThis.updatePreview = updatePreview;
globalThis.downloadPDF = downloadPDF;

/**
 * Startup lifecycle:
 * - Initialize all range-slider value labels
 * - Render dynamic editor sections
 * - Sync form state into preview immediately
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeRangeDisplays();
  renderStrengths();
  renderImprovements();
  renderPersonalizedq();
  updatePreview();
});
