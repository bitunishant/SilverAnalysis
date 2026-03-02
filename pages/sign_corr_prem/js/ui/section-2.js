import { createEditableDropdown } from "./shared.js";

/**
 * Section 2 module: Graphological Mistakes in Handwriting
 *
 * Responsibilities:
 * - Manage category dropdown options
 * - Allow adding new mistake entries into selected category
 * - Render interpretation textareas for selected handwriting mistakes
 * - Persist edits and keep preview in sync
 */
export function refreshHandwritingCategoryDropdown() {
  // Re-populates category <select> from persisted handwriting catalog.
  const select = document.getElementById("handCategory");
  const catalog = globalThis.getHandwritingCatalog();

  select.innerHTML = '<option value="">Select Category</option>';
  Object.keys(catalog).forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

export function addHandwritingCategory(categoryName) {
  // Adds new category bucket into catalog if missing, then refreshes UI options.
  if (!categoryName.trim()) return;

  const catalog = globalThis.getHandwritingCatalog();
  if (!catalog[categoryName]) {
    catalog[categoryName] = {};
    globalThis.saveHandwritingCatalog(catalog);
  }

  refreshHandwritingCategoryDropdown();
}

export function addHandwritingMistake(category, title, description) {
  // Inserts a mistake under current category and refreshes dependent dropdown list.
  if (!category || !title.trim()) return;

  const catalog = globalThis.getHandwritingCatalog();
  if (!catalog[category]) {
    catalog[category] = {};
  }

  catalog[category][title] = description || "";
  globalThis.saveHandwritingCatalog(catalog);

  createEditableDropdown({
    inputId: "handMistakeInput",
    dropdownId: "handMistakeDropdown",
    tagContainerId: "handMistakeTagContainer",
    textareaId: "handMistakes",
    listKey: "handMistakeTemp",
    defaultList: Object.keys(catalog[category]),
    allowAdd: false,
    allowRemove: false,
    onChange: renderHandMistakeDescriptions
  });
}

export function promptAddHandwritingMistake() {
  // Called from inline HTML button in section 2.
  // Uses prompt() flow to quickly append entries during report creation.
  const category = document.getElementById("handCategory").value;
  if (!category) {
    alert("Select a category first");
    return;
  }

  const title = prompt("Enter handwriting mistake title:");
  if (!title) return;

  const desc = prompt("Enter graphological interpretation:");
  addHandwritingMistake(category, title, desc);
}

export function renderHandMistakeDescriptions(selectedTitles) {
  // Renders editable interpretation textareas under selected handwriting mistakes.
  const container = document.getElementById("handMistakeDescriptions");
  const store = globalThis.getHandMistakeStore();
  const category = document.getElementById("handCategory").value;
  const catalog = globalThis.getHandwritingCatalog();
  const hiddenSelected = document.getElementById("handMistakes");

  container.innerHTML = "";

  selectedTitles.forEach((title) => {
    const block = document.createElement("div");
    block.className = "hmistake-desc-block";

    let currentTitleKey = title;

    const heading = document.createElement("input");
    heading.type = "text";
    heading.value = currentTitleKey;
    heading.className = "editable-mistake-title";

    const textarea = document.createElement("textarea");
    textarea.value = store[currentTitleKey] || catalog[category]?.[currentTitleKey] || "";

    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "save-desc-btn";
    saveBtn.textContent = "Save";

    const status = document.createElement("span");
    status.className = "save-status";
    status.style.marginLeft = "8px";

    heading.onchange = () => {
      const newTitle = heading.value.trim();
      if (!newTitle || newTitle === currentTitleKey) return;

      const categoryMap = catalog[category] || {};
      categoryMap[newTitle] = categoryMap[currentTitleKey] || store[currentTitleKey] || "";
      delete categoryMap[currentTitleKey];
      catalog[category] = categoryMap;

      if (Object.prototype.hasOwnProperty.call(store, currentTitleKey)) {
        store[newTitle] = store[currentTitleKey];
        delete store[currentTitleKey];
      }

      if (hiddenSelected) {
        const selected = hiddenSelected.value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
          .map((v) => (v === currentTitleKey ? newTitle : v));
        hiddenSelected.value = selected.join(", ");
      }

      currentTitleKey = newTitle;
      globalThis.saveHandwritingCatalog(catalog);
      globalThis.saveHandMistakeStore(store);
      globalThis.applyFormToReport?.();

      status.textContent = "Title Updated";
      status.style.color = "#28a745";
      setTimeout(() => {
        status.textContent = "";
      }, 1500);
    };

    textarea.oninput = () => {
      store[currentTitleKey] = textarea.value;
      globalThis.saveHandMistakeStore(store);
      globalThis.applyFormToReport?.();

      status.textContent = "Unsaved changes";
      status.style.color = "#d39e00";
    };

    saveBtn.onclick = () => {
      store[currentTitleKey] = textarea.value;
      globalThis.saveHandMistakeStore(store);
      globalThis.applyFormToReport?.();

      status.textContent = "Saved";
      status.style.color = "#28a745";
      setTimeout(() => {
        status.textContent = "";
      }, 1500);
    };

    block.appendChild(heading);
    block.appendChild(textarea);
    block.appendChild(saveBtn);
    block.appendChild(status);
    container.appendChild(block);
  });

  globalThis.applyFormToReport?.();
}

