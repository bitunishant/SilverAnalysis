/**
 * sign-premium.ui.js (module hub)
 *
 * This file wires all UI section modules together and exposes selected functions
 * to global scope for legacy/non-module callers.
 */

import { createEditableDropdown, runLLMForSection } from "./ui/shared.js"; // Import shared dropdown + LLM helper utilities.
import { initSignatureMistakeDropdown, renderMistakeDescriptions } from "./ui/section-1.js"; // Import Section 1 init + renderer.
import {
  refreshHandwritingCategoryDropdown,
  promptAddHandwritingMistake,
  renderHandMistakeDescriptions
} from "./ui/section-2.js"; // Import Section 2 category refresh, add prompt, and description renderer.
import {
  renderCorrectionDescriptions,
  addCorrectionItem,
  removeCorrectionItem
} from "./ui/section-4.js"; // Import Section 4 correction render + legacy add/remove helpers.
import { generateOverallBenefit } from "./ui/section-5.js"; // Import Section 5 AI generation handler.
import {
  renderHandwritingCorrectionDescriptions,
  promptAddHandwritingCorrection
} from "./ui/section-6.js"; // Import Section 6 correction renderer + add prompt.
import {
  addMistakeItem,
  removeMistakeItem,
  addStrengthItem,
  removeStrengthItem,
  addWeaknessItem,
  removeWeaknessItem
} from "./ui/legacy.js"; // Import legacy helper APIs used by older flows.
import { setupImageUploads } from "./ui/uploads.js"; // Import uploader wiring for all image inputs.
import { applyFormToReport } from "./ui/report-sync.js"; // Import form-to-preview sync function.

// Expose shared helpers on global scope for inline HTML handlers and non-module scripts.
globalThis.createEditableDropdown = createEditableDropdown; // Allow global dropdown creation calls.
globalThis.runLLMForSection = runLLMForSection; // Allow global LLM generation calls.
globalThis.initSignatureMistakeDropdown = initSignatureMistakeDropdown; // Allow manual Section 1 re-init.
globalThis.renderMistakeDescriptions = renderMistakeDescriptions; // Allow global re-render of Section 1 descriptions.
globalThis.renderCorrectionDescriptions = renderCorrectionDescriptions; // Allow global re-render of Section 4 descriptions.
globalThis.renderHandwritingCorrectionDescriptions = renderHandwritingCorrectionDescriptions; // Allow global re-render of Section 6 descriptions.
globalThis.applyFormToReport = applyFormToReport; // Keep central preview sync callable everywhere.
globalThis.generateOverallBenefit = generateOverallBenefit; // Expose Section 5 AI button handler.
globalThis.promptAddHandwritingMistake = promptAddHandwritingMistake; // Expose Section 2 add-mistake prompt.
globalThis.promptAddHandwritingCorrection = promptAddHandwritingCorrection; // Expose Section 6 add-correction prompt.

// Expose legacy item add/remove utilities for existing UI hooks.
globalThis.addCorrectionItem = addCorrectionItem; // Legacy: add correction chip/item.
globalThis.removeCorrectionItem = removeCorrectionItem; // Legacy: remove correction chip/item.
globalThis.addMistakeItem = addMistakeItem; // Legacy: add mistake chip/item.
globalThis.removeMistakeItem = removeMistakeItem; // Legacy: remove mistake chip/item.
globalThis.addStrengthItem = addStrengthItem; // Legacy: add strength chip/item.
globalThis.removeStrengthItem = removeStrengthItem; // Legacy: remove strength chip/item.
globalThis.addWeaknessItem = addWeaknessItem; // Legacy: add weakness chip/item.
globalThis.removeWeaknessItem = removeWeaknessItem; // Legacy: remove weakness chip/item.

// Provide compatibility list expected by older correction dropdown flows.
globalThis.signatureCorrectionTitles = Object.keys(globalThis.getSignatureCorrectionStore()); // Snapshot correction titles into a legacy global.

// Run one-time initializers when this module loads.
refreshHandwritingCategoryDropdown(); // Populate Section 2 handwriting category select options.
setupImageUploads(); // Attach all image upload listeners/previews.
initSignatureMistakeDropdown(); // Initialize Section 1 mistakes dropdown input.

// Capture handwriting category select element used in Section 2.
const categorySelect = document.getElementById("handCategory"); // Read Section 2 category dropdown element once.
if (categorySelect) { // Guard against missing element in partial/test renders.
  categorySelect.addEventListener("change", () => { // Rebuild mistakes dropdown when category changes.
    const category = categorySelect.value; // Read selected category value.
    if (!category) return; // Stop if no valid category is selected.

    const currentCatalog = globalThis.getHandwritingCatalog(); // Read latest handwriting catalog from shared store.

    createEditableDropdown({ // Build dropdown for mistakes under selected category.
      inputId: "handMistakeInput", // Text input where user searches/selects mistakes.
      dropdownId: "handMistakeDropdown", // Suggestion list container id.
      tagContainerId: "handMistakeTagContainer", // Selected tags/chips container id.
      textareaId: "handMistakes", // Hidden textarea storing selected values.
      listKey: "handMistakeTemp", // localStorage key used by shared dropdown helper.
      defaultList: Object.keys(currentCatalog[category] || {}), // Populate options from selected category map.
      allowAdd: false, // Prevent freeform adding from this dropdown.
      allowRemove: false, // Prevent deleting default catalog entries from dropdown UI.
      onChange: renderHandMistakeDescriptions // Re-render Section 2 description blocks after selection changes.
    });
  });
}

// Wire Apply button to sync current form state into preview/report.
document.getElementById("applyBtn")?.addEventListener("click", applyFormToReport); // Optional chaining avoids errors if button missing.

// Wire Reset button to reload page after user confirmation.
document.getElementById("resetBtn")?.addEventListener("click", () => { // Attach reset click handler if reset button exists.
  if (!confirm("Reset form and report to defaults?")) return; // Ask confirmation; abort reset if cancelled.
  location.reload(); // Reload page to restore default initial state.
});
