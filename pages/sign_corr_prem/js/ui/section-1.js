import { createEditableDropdown } from "./shared.js";

/**
 * Section 1 module: Mistakes in Signature
 *
 * Responsibilities:
 * - Initialize the "mistakes" dropdown/tag selector
 * - Render editable blocks for each selected mistake
 * - Persist title/description updates back to signature mistake store
 * - Trigger report preview refresh after any change
 */
export function initSignatureMistakeDropdown() {
  const store = globalThis.getSignatureMistakeStore();

  createEditableDropdown({
    inputId: "mistakesInput",
    dropdownId: "mistakesDropdown",
    tagContainerId: "mistakesTagContainer",
    textareaId: "mistakes",
    listKey: "signatureMistakeKeys",
    defaultList: Object.keys(store),
    allowAdd: true,
    allowRemove: true,
    onChange: renderMistakeDescriptions
  });
}

/**
 * Resolve a description for a selected mistake title.
 *
 * Why this exists:
 * - Existing localStorage data can be partial/stale after refactors.
 * - We still want default catalog descriptions to prefill reliably.
 */
function resolveMistakeDescription(store, title) {
  const rawTitle = (title || "").trim();
  if (!rawTitle) return "";

  // 1) Exact value from persisted store (highest priority).
  if (Object.prototype.hasOwnProperty.call(store, rawTitle) && store[rawTitle]) {
    return store[rawTitle];
  }

  // 2) Exact value from default constants map.
  if (
    typeof DEFAULT_SIGNATURE_MISTAKES !== "undefined"
    && Object.prototype.hasOwnProperty.call(DEFAULT_SIGNATURE_MISTAKES, rawTitle)
    && DEFAULT_SIGNATURE_MISTAKES[rawTitle]
  ) {
    return DEFAULT_SIGNATURE_MISTAKES[rawTitle];
  }

  // 3) Normalized key match fallback (handles whitespace/casing inconsistencies).
  const normalized = rawTitle.toLowerCase().replace(/\s+/g, " ").trim();

  const storeMatch = Object.keys(store).find((k) =>
    k.toLowerCase().replace(/\s+/g, " ").trim() === normalized
  );
  if (storeMatch && store[storeMatch]) {
    return store[storeMatch];
  }

  if (typeof DEFAULT_SIGNATURE_MISTAKES !== "undefined") {
    const defaultMatch = Object.keys(DEFAULT_SIGNATURE_MISTAKES).find((k) =>
      k.toLowerCase().replace(/\s+/g, " ").trim() === normalized
    );
    if (defaultMatch && DEFAULT_SIGNATURE_MISTAKES[defaultMatch]) {
      return DEFAULT_SIGNATURE_MISTAKES[defaultMatch];
    }
  }

  return "";
}

function syncSection1Preview() {
  // Keep Section 1 right-panel list in sync, independent of other section failures.
  const mistakesList = document.getElementById("r_mistakes_list");
  if (!mistakesList) return;

  mistakesList.innerHTML = "";

  document.querySelectorAll("#mistakeDescriptions .mistake-desc-block").forEach((block) => {
    const titleInput = block.querySelector("input.editable-mistake-title");
    const title = titleInput ? titleInput.value.trim() : "Untitled Mistake";
    const desc = block.querySelector("textarea")?.value.trim() || "";

    const li = document.createElement("li");
    li.className = "mistake-item";

    const t = document.createElement("div");
    t.className = "mistake-title";
    t.textContent = title;

    const p = document.createElement("p");
    p.textContent = desc;

    li.appendChild(t);
    li.appendChild(p);
    mistakesList.appendChild(li);
  });
}

export function renderMistakeDescriptions(selectedTitles) {
  // Builds the dynamic editor list below "Mistakes in Signature" in left panel.
  const container = document.getElementById("mistakeDescriptions");
  const store = globalThis.getSignatureMistakeStore();
  container.innerHTML = "";

  selectedTitles.forEach((title) => {
    const block = document.createElement("div");
    block.className = "mistake-desc-block";

    let currentTitleKey = title;

    const heading = document.createElement("input");
    heading.type = "text";
    heading.value = currentTitleKey;
    heading.className = "editable-mistake-title";

    const textarea = document.createElement("textarea");
    textarea.className = "sign_mistake_desc";
    textarea.placeholder = "Enter graphological interpretation...";
    textarea.value = resolveMistakeDescription(store, currentTitleKey);

    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "save-desc-btn";
    saveBtn.textContent = "Save";

    const status = document.createElement("span");
    status.className = "save-status";
    status.style.marginLeft = "8px";

    heading.onchange = () => {
      // If title key changes, remap existing description to new key in store.
      const newTitle = heading.value.trim();
      if (newTitle && newTitle !== currentTitleKey) {
        store[newTitle] = store[currentTitleKey] || resolveMistakeDescription(store, currentTitleKey);
        delete store[currentTitleKey];
        currentTitleKey = newTitle;

        globalThis.saveSignatureMistakeStore(store);
        syncSection1Preview();
        globalThis.applyFormToReport?.();

        status.textContent = "Title Updated";
        status.style.color = "#28a745";
        setTimeout(() => {
          status.textContent = "";
        }, 1500);
      }
    };

    textarea.oninput = () => {
      // Live persistence + live preview updates while user types.
      store[currentTitleKey] = textarea.value;
      globalThis.saveSignatureMistakeStore(store);
      syncSection1Preview();
      globalThis.applyFormToReport?.();

      status.textContent = "Unsaved changes";
      status.style.color = "#d39e00";
    };

    saveBtn.onclick = () => {
      // Explicit save keeps UX parity with other sections that have Save buttons.
      store[currentTitleKey] = textarea.value;
      globalThis.saveSignatureMistakeStore(store);
      syncSection1Preview();
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

  syncSection1Preview();
  globalThis.applyFormToReport?.();
}