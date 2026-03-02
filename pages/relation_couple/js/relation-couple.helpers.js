/**
 * relation_couple/js/relation-couple.helpers.js
 *
 * Purpose:
 * Shared utility helpers used by multiple relation-couple modules.
 *
 * Section map:
 * 1) setTodayDate(): initializes report date input with today's date
 * 2) getSelectedCheckboxValues(): extracts checked trait ids from a category container
 * 3) handleImageUpload(): renders upload preview thumbnails in left panel
 * 4) formatAsBullets(): converts textarea text to single paragraph or bullet list
 *
 * Design goal:
 * Keep helpers pure and reusable so feature modules remain focused on workflow logic.
 */

export function setTodayDate(inputId = "reportDate") {
  const input = document.getElementById(inputId);
  if (!input) return;

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  input.value = today.toLocaleDateString("en-us", options);
}

export function getSelectedCheckboxValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];

  const checkboxes = container.querySelectorAll(
    'input[type="checkbox"]:checked',
  );
  return Array.from(checkboxes).map((cb) => cb.value);
}

export function handleImageUpload(input, person, type) {
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const previewDiv = document.getElementById(
      `${person}${type.charAt(0).toUpperCase() + type.slice(1)}Preview`,
    );
    if (!previewDiv) return;

    previewDiv.innerHTML = `<img src="${e.target.result}" style="max-width: 180px; max-height: 80px; border-radius: 4px;" alt="${type}">`;
  };
  reader.readAsDataURL(file);
}

export const formatAsBullets = (text) => {
  if (!text.trim())
    return '<div class="empty-state">No information provided</div>';
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line);
  if (lines.length > 1) {
    return `<ul>${lines.map((line) => `<li>${line}</li>`).join("")}</ul>`;
  }
  return `<p>${lines[0]}</p>`;
};
