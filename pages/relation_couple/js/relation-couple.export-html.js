/**
 * relation_couple/js/relation-couple.export-html.js
 *
 * Purpose:
 * Exports current report preview as a standalone HTML file.
 *
 * Pipeline:
 * 1) Collect runtime CSS rules from active stylesheets
 * 2) Clone preview DOM and inline/compress image assets as base64 JPEG
 * 3) Compose full standalone HTML document string
 * 4) Trigger browser download with generated filename
 *
 * Why inlined images:
 * Keeps exported file self-contained and portable without external asset dependencies.
 */

async function toCompressedDataURL(url, quality = 0.7) {
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

export async function downloadHtmlSnapshot() {
  const previewArea = document.querySelector(".preview-area");
  if (!previewArea) return;

  const styles = Array.from(document.styleSheets)
    .map((ss) => {
      try {
        return Array.from(ss.cssRules).map((rule) => rule.cssText).join("");
      } catch {
        return "";
      }
    })
    .join("");

  const clone = previewArea.cloneNode(true);
  const images = clone.querySelectorAll("img");

  for (const img of images) {
    try {
      img.src = await toCompressedDataURL(img.src, 0.7);
    } catch (e) {
      console.warn("Could not inline image", img.src, e);
    }
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Relationship Analysis Snapshot</title>
<style>
${styles}
#printBtn {
  display:inline-block;
  padding:10px 15px;
  margin:10px 0;
  background:teal;
  color:#fff;
  border:none;
  cursor:pointer;
  font-size:16px;
}
</style>
</head>
<body>
${clone.outerHTML}
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  const nameEl = document.getElementById("r_person1_name");
  const filename = (nameEl?.textContent || "relationship_analysis")
    .trim()
    .replace(/\s+/g, "_")
    .toLowerCase();

  a.href = url;
  a.download = `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
