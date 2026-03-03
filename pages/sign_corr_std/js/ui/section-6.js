import { createEditableDropdown } from "./shared.js";

/**
 * Section 6 module: Graphological Corrections in Handwriting
 *
 * Responsibility:
 * - Render correction blocks with editable title + description
 * - Trigger live preview updates on input changes
 * - Add new correction entries into selected correction category
 */
export function renderHandwritingCorrectionDescriptions(selectedTitles) {
  const container = document.getElementById("handCorrectionDescriptions");
  container.innerHTML = "";

  selectedTitles.forEach((title) => {
    const block = document.createElement("div");
    block.className = "correction-desc-block";

    const heading = document.createElement("input");
    heading.type = "text";
    heading.value = title;
    heading.className = "editable-mistake-title";
    heading.oninput = () => globalThis.applyFormToReport?.();

    const textarea = document.createElement("textarea");
    textarea.value = title;
    textarea.placeholder = "Edit handwriting correction...";
    textarea.oninput = () => globalThis.applyFormToReport?.();

    block.appendChild(heading);
    block.appendChild(textarea);
    container.appendChild(block);
  });

  globalThis.applyFormToReport?.();
}

export function addHandwritingCorrection(category, title) {
  if (!category || !title.trim()) return;

  const store = globalThis.getHandwritingCorrectionStore();
  if (!Array.isArray(store[category])) {
    store[category] = [];
  }

  if (!store[category].includes(title)) {
    store[category].push(title);
    globalThis.saveHandwritingCorrectionStore(store);
  }

  createEditableDropdown({
    inputId: "handCorrectionInput",
    dropdownId: "handCorrectionDropdown",
    tagContainerId: "handCorrectionTagContainer",
    textareaId: "handCorrections",
    listKey: "handCorrectionTemp",
    defaultList: store[category],
    allowAdd: false,
    allowRemove: false,
    onChange: renderHandwritingCorrectionDescriptions
  });
}

export function promptAddHandwritingCorrection() {
  // Called from inline HTML button in section 6.
  // Uses prompt() flow to append a new correction under selected category.
  const category = document.getElementById("handCorrectionCategory").value;
  if (!category) {
    alert("Select a category first");
    return;
  }

  const title = prompt("Enter handwriting correction title:");
  if (!title) return;

  addHandwritingCorrection(category, title.trim());
  globalThis.applyFormToReport?.();
}
