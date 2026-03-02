/**
 * relation_couple/js/relation-couple.constants.js
 *
 * Purpose:
 * Central source of static data for the Couple Compatibility tool.
 *
 * Contents:
 * 1) TRAIT_DATA: trait id -> human-readable interpretation text
 * 2) COMPATIBILITY_RULES: pairwise score matrices by category
 * 3) WEIGHTS: weighted contribution of each category to overall score
 * 4) CATEGORY_KEYS: canonical category ordering used across modules
 *
 * Why this file exists:
 * Isolating static data prevents accidental logic regressions when content
 * (descriptions/scores/weights) changes and makes reviews simpler.
 */

export const TRAIT_DATA = {
  emotional: {
    "emotional-1": "High emotional sensitivity with mood variations - needs understanding partner",
    "emotional-2": "Mixed approach - Mixed of Emotional and Practical personality",
    "emotional-3": "Practical approach - stable"
  },
  communication: {
    "comm-1": "Open and expressive communicator - shares feelings easily",
    "comm-2": "Confident communication style - comfortable expressing opinions",
    "comm-3": "Adaptable communication - sometimes take time to express, sometimes share easily",
    "comm-4": "Private communicator - takes time to open up",
    "comm-5": "Thoughtful communicator - prefers quality over quantity"
  },
  conflict: {
    "conflict-1": "Healthy conflict resolution - addresses issues constructively",
    "conflict-2": "Peaceful approach to disagreements - avoids confrontation",
    "conflict-3": "Quick to anger - reactive and impulsive",
    "conflict-4": "Open to feedback - willing to consider different perspectives",
    "conflict-5": "Relationship conflicts",
    "conflict-6": "Aggresive tendencies"
  },
  intimacy: {
    "intimacy-1": "High intimacy needs - requires close physical connection",
    "intimacy-2": "Balanced intimacy needs - healthy physical relationship approach",
    "intimacy-3": "Lower intimacy needs - hesitates/repel in physical connections"
  },
  family: {
    "family-1": "Only surname in signature - strong family identity",
    "family-2": "surname bigger than name  - family dominates decision",
    "family-3": "Surname before name - family first mentality",
    "family-4": "Balanced name and surname - Harmony between individual and family's perspective",
    "family-5": "Only name in signature - Independent identity",
    "family-6": "Name clashing surname - family -personal conflict"
  },
  financial: {
    "financial-1": "open ended \"j\" - impulsive spending",
    "financial-2": "Mixed variations - balanced approach",
    "financial-3": "closed \"j\" - Good at saving"
  }
};

export const COMPATIBILITY_RULES = {
  emotional: {
    "emotional-1": { "emotional-1": 0.1, "emotional-2": 0.5, "emotional-3": 0.5 },
    "emotional-2": { "emotional-1": 0.5, "emotional-2": 0.5, "emotional-3": 0.5 },
    "emotional-3": { "emotional-1": 0.5, "emotional-2": 0.5, "emotional-3": 0.95 }
  },
  communication: {
    "comm-1": { "comm-1": 0.95, "comm-2": 0.95, "comm-3": 0.95, "comm-4": 0.5, "comm-5": 0.5 },
    "comm-2": { "comm-1": 0.95, "comm-2": 0.95, "comm-3": 0.95, "comm-4": 0.5, "comm-5": 0.5 },
    "comm-3": { "comm-1": 0.95, "comm-2": 0.95, "comm-3": 0.95, "comm-4": 0.95, "comm-5": 0.95 },
    "comm-4": { "comm-1": 0.5, "comm-2": 0.5, "comm-3": 0.95, "comm-4": 0.5, "comm-5": 0.5 },
    "comm-5": { "comm-1": 0.5, "comm-2": 0.5, "comm-3": 0.95, "comm-4": 0.5, "comm-5": 0.5 }
  },
  conflict: {
    "conflict-1": { "conflict-1": 0.95, "conflict-2": 0.95, "conflict-3": 0.5, "conflict-4": 0.95, "conflict-5": 0.5, "conflict-6": 0.5 },
    "conflict-2": { "conflict-1": 0.95, "conflict-2": 0.95, "conflict-3": 0.5, "conflict-4": 0.95, "conflict-5": 0.5, "conflict-6": 0.5 },
    "conflict-3": { "conflict-1": 0.5, "conflict-2": 0.5, "conflict-3": 0.1, "conflict-4": 0.5, "conflict-5": 0.1, "conflict-6": 0.1 },
    "conflict-4": { "conflict-1": 0.95, "conflict-2": 0.95, "conflict-3": 0.5, "conflict-4": 0.95, "conflict-5": 0.5, "conflict-6": 0.1 },
    "conflict-5": { "conflict-1": 0.5, "conflict-2": 0.5, "conflict-3": 0.1, "conflict-4": 0.5, "conflict-5": 0.1, "conflict-6": 0.1 },
    "conflict-6": { "conflict-1": 0.5, "conflict-2": 0.5, "conflict-3": 0.1, "conflict-4": 0.1, "conflict-5": 0.1, "conflict-6": 0.1 }
  },
  intimacy: {
    "intimacy-1": { "intimacy-1": 0.95, "intimacy-2": 0.5, "intimacy-3": 0.1 },
    "intimacy-2": { "intimacy-1": 0.5, "intimacy-2": 0.95, "intimacy-3": 0.5 },
    "intimacy-3": { "intimacy-1": 0.1, "intimacy-2": 0.5, "intimacy-3": 0.95 }
  },
  family: {
    "family-1": { "family-1": 0.95, "family-2": 0.5, "family-3": 0.95, "family-4": 0.5, "family-5": 0.1, "family-6": 0.1 },
    "family-2": { "family-1": 0.5, "family-2": 0.95, "family-3": 0.95, "family-4": 0.5, "family-5": 0.1, "family-6": 0.1 },
    "family-3": { "family-1": 0.95, "family-2": 0.95, "family-3": 0.95, "family-4": 0.5, "family-5": 0.1, "family-6": 0.1 },
    "family-4": { "family-1": 0.5, "family-2": 0.5, "family-3": 0.5, "family-4": 0.95, "family-5": 0.5, "family-6": 0.5 },
    "family-5": { "family-1": 0.1, "family-2": 0.1, "family-3": 0.1, "family-4": 0.5, "family-5": 0.95, "family-6": 0.5 },
    "family-6": { "family-1": 0.1, "family-2": 0.1, "family-3": 0.1, "family-4": 0.5, "family-5": 0.5, "family-6": 0.5 }
  },
  financial: {
    "financial-1": { "financial-1": 0.1, "financial-2": 0.95, "financial-3": 0.5 },
    "financial-2": { "financial-1": 0.95, "financial-2": 0.95, "financial-3": 0.5 },
    "financial-3": { "financial-1": 0.5, "financial-2": 0.5, "financial-3": 0.95 }
  }
};

export const WEIGHTS = {
  emotional: 0.2,
  communication: 0.2,
  conflict: 0.2,
  intimacy: 0.15,
  family: 0.1,
  financial: 0.15
};

export const CATEGORY_KEYS = ["emotional", "communication", "conflict", "intimacy", "family", "financial"];
