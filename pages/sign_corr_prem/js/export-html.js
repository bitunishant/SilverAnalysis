/**
 * sign_corr_prem/js/export-html.js
 *
 * Encapsulates Download HTML behavior for the preview report.
 *
 * Flow summary:
 * 1) Capture all active CSS rules from loaded stylesheets.
 * 2) Clone the current preview DOM.
 * 3) Inline images as compressed data URLs for portability.
 * 4) Build a standalone HTML document and trigger download.
 */

function setupDownloadHtml() {
  const btn = document.getElementById("downloadHtml");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const previewArea = document.querySelector(".preview-area");
    if (!previewArea) return;

    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join("");
        } catch {
          return "";
        }
      })
      .join("");

    const clone = previewArea.cloneNode(true);
    const images = clone.querySelectorAll("img");

    for (const img of images) {
      if (!img.src) continue;
      try {
        img.src = await toCompressedDataURL(img.src, 0.7);
      } catch (e) {
        console.warn("Image failed:", img.src);
      }
    }

    const responsiveFallbackCss = `
/* Export-only responsive fallback so downloaded HTML works well on phones */
img { max-width: 100%; height: auto; }
@media (max-width: 900px) {
  body { margin: 0; padding: 8px; }
  .preview-area { padding: 10px !important; }
  .header { padding: 24px 14px !important; }
  .header h1 { font-size: clamp(1.5rem, 5vw, 2rem) !important; line-height: 1.25; }
  .header p { font-size: clamp(0.95rem, 3.4vw, 1.1rem) !important; }
  .client-info { padding: 18px 14px !important; }
  .client-info h2 { font-size: clamp(1.25rem, 4.5vw, 1.6rem) !important; }
  .info-grid, .personality-grid, .benefits-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
  .section { padding: 22px 14px !important; }
  .section-title { font-size: clamp(1.3rem, 5.2vw, 1.8rem) !important; margin-bottom: 16px !important; }
  .signature-box, .mistake-item, .benefit-card, .personality-card { padding: 14px !important; }
  .practice-table { display: block !important; overflow-x: auto !important; white-space: nowrap !important; }
  .footer { padding: 18px 14px !important; font-size: 0.92rem !important; }
}
@media (max-width: 480px) {
  body { padding: 6px !important; }
  .panel, .preview-area { padding: 10px !important; border-radius: 10px !important; }
  .controls-row .btn { width: 100% !important; }
  .info-item { display: block !important; }
  .info-label { display: block !important; margin: 0 0 4px 0 !important; min-width: 0 !important; }
  input[type="text"], textarea, select { font-size: 16px !important; }
}`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Signature Report</title>
<style>${styles}
${responsiveFallbackCss}
</style>
</head>
<body>${clone.outerHTML}</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const name =
      document.getElementById("r_name")?.textContent
        ?.trim()
        ?.replace(/\s+/g, "_")
        ?.toLowerCase() || "signature_report";

    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

function toCompressedDataURL(url, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

window.addEventListener("DOMContentLoaded", setupDownloadHtml);
