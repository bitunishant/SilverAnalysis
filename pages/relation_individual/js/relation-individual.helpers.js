/**
 * relation_individual/js/relation-individual.helpers.js
 *
 * Shared helpers used across individual analyzer modules.
 */

export function setTodayDate(inputId = "reportDate") {
  const input = document.getElementById(inputId);
  if (!input) return;

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  input.value = today.toLocaleDateString("en-us", options);
}

export function handleImageUpload(input, type) {
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const previewDiv = document.getElementById(`${type}Preview`);
    if (!previewDiv) return;

    previewDiv.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; max-height: 100px; border-radius: 4px;" alt="${type}">`;
  };
  reader.readAsDataURL(file);
}

export function getTraitLabel(containerId, traitValue) {
  const container = document.getElementById(containerId);
  if (!container) return traitValue;

  const checkbox = container.querySelector(
    `input[type="checkbox"][value="${traitValue}"]`,
  );
  if (!checkbox) return traitValue;

  const id = checkbox.getAttribute("id");
  if (!id) return traitValue;

  const label = container.querySelector(`label[for="${id}"]`);
  return label?.textContent?.trim() || traitValue;
}

export function getSelectedCheckboxValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];

  const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checkboxes).map((cb) => ({
    value: cb.value,
    textContent: getTraitLabel(containerId, cb.value),
  }));
}

export function formatAsBullets(text) {
  if (!text.trim()) return '<div class="empty-state">No information provided</div>';
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line);

  if (lines.length > 1) {
    return `<ul>${lines.map((line) => `<li>${line}</li>`).join("")}</ul>`;
  }
  return `<p>${lines[0]}</p>`;
}

export async function toCompressedDataURL(url, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

