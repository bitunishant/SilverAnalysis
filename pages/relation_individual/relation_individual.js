/**
 * Legacy bridge file.
 *
 * This file keeps backward compatibility for any old references to
 * `relation_individual.js` by loading the modular UI entrypoint.
 */

import("./js/relation-individual.ui.js").catch((err) => {
  console.error("Failed to load relation-individual.ui.js", err);
});

