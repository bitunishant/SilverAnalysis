/**
 * relation_individual/js/relation-individual.compatibility.js
 *
 * Owns trait-analysis rendering and compatible/incompatible summary logic.
 */

import {
  TRAIT_CATEGORY_CONFIG,
  TRAIT_DATA,
} from "./relation-individual.constants.js";
import { getSelectedCheckboxValues } from "./relation-individual.helpers.js";

export function updateCompatibility() {
  const compatibleList = document.getElementById("r_compatible_list");
  const incompatibleList = document.getElementById("r_incompatible_list");
  if (!compatibleList || !incompatibleList) return;

  const compatible = [];
  const incompatible = [];

  const emotionalValues = getSelectedCheckboxValues("emotionalSelect").map(
    (item) => item.value,
  );
  const communicationValues = getSelectedCheckboxValues(
    "communicationSelect",
  ).map((item) => item.value);
  const conflictValues = getSelectedCheckboxValues("conflictSelect").map(
    (item) => item.value,
  );

  if (emotionalValues.includes("emotional-3")) {
    compatible.push(
      "Partners who value emotional stability and practical approaches",
    );
    incompatible.push("Highly emotional or dramatic personalities");
  }
  if (emotionalValues.includes("emotional-1")) {
    compatible.push("Understanding partners who can handle mood variations");
    incompatible.push("Partners who need constant emotional consistency");
  }

  if (
    communicationValues.includes("comm-1") ||
    communicationValues.includes("comm-2")
  ) {
    compatible.push("Open communicators who enjoy sharing and discussion");
    incompatible.push("Very private or reserved individuals");
  }
  if (
    communicationValues.includes("comm-4") ||
    communicationValues.includes("comm-5")
  ) {
    compatible.push("Respectful partners who understand need for privacy");
    incompatible.push("Partners who need constant communication and sharing");
  }

  if (
    conflictValues.includes("conflict-1") ||
    conflictValues.includes("conflict-2")
  ) {
    compatible.push("Peaceful partners who prefer calm discussion");
    incompatible.push("Aggressive or confrontational personalities");
  }
  if (
    conflictValues.includes("conflict-3") ||
    conflictValues.includes("conflict-6")
  ) {
    compatible.push("Strong personalities who can handle direct communication");
    incompatible.push("Sensitive individuals who avoid confrontation");
  }

  if (compatible.length === 0) {
    compatible.push("Select personality traits to see compatibility analysis");
  }
  if (incompatible.length === 0) {
    incompatible.push("Select personality traits to see potential challenges");
  }

  compatibleList.innerHTML = compatible.map((item) => `<li>${item}</li>`).join("");
  incompatibleList.innerHTML = incompatible
    .map((item) => `<li>${item}</li>`)
    .join("");
}

export function updateTraitAnalyses() {
  TRAIT_CATEGORY_CONFIG.forEach((category) => {
    const selectedItems = getSelectedCheckboxValues(category.containerId);
    const list = document.getElementById(category.listId);
    if (!list) return;

    if (selectedItems.length > 0) {
      const analyses = selectedItems
        .map((item) => {
          const analysis = TRAIT_DATA[category.dataKey][item.value];
          return analysis
            ? `<li><strong>${item.textContent}: </strong>${analysis}</li>`
            : "";
        })
        .filter((item) => item !== "");

      list.innerHTML =
        analyses.length > 0
          ? analyses.join("")
          : "<li>No analysis available for selected traits</li>";
    } else {
      list.innerHTML = "<li>Select traits to see analysis</li>";
    }
  });
}

