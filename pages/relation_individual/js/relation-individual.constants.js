/**
 * relation_individual/js/relation-individual.constants.js
 *
 * Centralized constants for the individual relationship analyzer.
 */

export const TRAIT_DATA = {
  emotional: {
    "emotional-1":
      "High emotional sensitivity with mood variations - needs understanding partner",
    "emotional-2":
      "Balanced emotional expression - healthy emotional processing",
    "emotional-3": "Practical emotional approach - stable and grounded",
  },
  communication: {
    "comm-1": "Open and expressive communicator - shares feelings easily",
    "comm-2": "Confident communication style - comfortable expressing opinions",
    "comm-3": "Adaptable communication - adjusts style to situation",
    "comm-4": "Private communicator - takes time to open up",
    "comm-5": "Thoughtful communicator - prefers quality over quantity",
  },
  conflict: {
    "conflict-1": "Healthy conflict resolution - addresses issues constructively",
    "conflict-2": "Peaceful approach to disagreements - avoids confrontation",
    "conflict-3": "Quick to anger - may need anger management techniques",
    "conflict-4": "Open to feedback - willing to consider different perspectives",
    "conflict-5": "Tendency for relationship conflicts - needs communication work",
    "conflict-6": "Aggressive conflict style - may escalate disagreements",
  },
  intimacy: {
    "intimacy-1": "High intimacy needs - requires close physical connection",
    "intimacy-2": "Balanced intimacy needs - healthy physical relationship approach",
    "intimacy-3": "Lower intimacy needs - values emotional over physical connection",
  },
  family: {
    "family-1": "Strong family identity - family influences major decisions",
    "family-2":
      "Family-dominated decision making - may struggle with independence",
    "family-3": "Family-first mentality - prioritizes family over individual needs",
    "family-4": "Balanced family-individual identity - healthy boundaries",
    "family-5": "Independent identity - makes decisions autonomously",
    "family-6":
      "Family-personal conflict - struggles between family and personal values",
  },
  financial: {
    "financial-1": "Impulsive spending patterns - may need budgeting support",
    "financial-2": "Balanced financial approach - saves and spends appropriately",
    "financial-3": "Conservative with money - excellent saving habits",
  },
};

export const TRAIT_CATEGORY_CONFIG = [
  { containerId: "emotionalSelect", listId: "r_emotional_list", dataKey: "emotional" },
  {
    containerId: "communicationSelect",
    listId: "r_communication_list",
    dataKey: "communication",
  },
  { containerId: "conflictSelect", listId: "r_conflict_list", dataKey: "conflict" },
  { containerId: "intimacySelect", listId: "r_intimacy_list", dataKey: "intimacy" },
  { containerId: "familySelect", listId: "r_family_list", dataKey: "family" },
  { containerId: "financialSelect", listId: "r_financial_list", dataKey: "financial" },
];

export const RESET_DEFAULTS = {
  userName: "Sarah Johnson",
  userAge: "28",
  relationshipStrengths:
    "Strong communication skills and emotional balance make this person a reliable and understanding partner.",
  areasForGrowth:
    "Working on conflict resolution strategies could enhance relationship harmony.",
  compatibilitySummary:
    "Best suited for partners who appreciate open communication and emotional stability.",
};

