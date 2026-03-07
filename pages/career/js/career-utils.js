/**
 * career-utils.js
 *
 * Purpose:
 * Small shared helper functions used across modules.
 */

/**
 * Append a newline to a textarea and keep focus there.
 * Used by "+ Add Line" buttons for bullet-style textareas.
 */
export function addNewLine(textareaId) {
  const textarea = document.getElementById(textareaId);
  if (!textarea) return;
  textarea.value += "\n";
  textarea.focus();
}

/**
 * Convert newline-separated textarea text into <li> elements in a target list.
 * Empty lines are ignored.
 */
export function updateListFromTextarea(textareaId, listId) {
  const textarea = document.getElementById(textareaId);
  const list = document.getElementById(listId);
  if (!textarea || !list) return;

  const points = textarea.value.split("\n");
  list.innerHTML = "";

  points.forEach((point) => {
    const value = point.trim();
    if (!value) return;
    const li = document.createElement("li");
    li.textContent = value;
    list.appendChild(li);
  });
}

/**
 * Initialize dynamic range slider labels (e.g., 89%) and keep them in sync.
 * Works by finding a sibling span id pattern: <rangeId> + "Value".
 */
export function initializeRangeDisplays() {
  const ranges = document.querySelectorAll('input[type="range"]');
  ranges.forEach((range) => {
    const valueSpan = document.getElementById(range.id + "Value");
    if (!valueSpan) return;

    const sync = () => {
      valueSpan.textContent = range.value + "%";
    };

    range.addEventListener("input", sync);
    sync();
  });
}
