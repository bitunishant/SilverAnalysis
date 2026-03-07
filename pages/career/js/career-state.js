/**
 * career-state.js
 *
 * Purpose:
 * Central in-memory state for dynamic Career page blocks.
 *
 * Notes:
 * - This state drives both editor UIs (left side) and preview rendering (right side).
 * - Arrays are mutated by section actions (add/remove/edit) and then re-rendered.
 */
export const careerState = {
  // Personality strengths shown in editable left-panel controls and preview cards.
  strengths: [
    {
      title: "Analytical Thinking",
      desc: "Exceptional ability to break down complex problems into manageable components and find logical solutions.",
    },
    {
      title: "Detail Orientation",
      desc: "Natural tendency to notice patterns, inconsistencies, and maintain high accuracy in work output.",
    },
    {
      title: "Pressure Management",
      desc: "Strong resilience under stress with ability to maintain performance quality during tight deadlines.",
    },
    {
      title: "Continuous Learning",
      desc: "Inherent curiosity and drive to acquire new skills and adapt to changing technologies and methodologies.",
    },
    {
      title: "Systematic Approach",
      desc: "Preference for organized, methodical work processes that ensure consistency and reliability.",
    },
    {
      title: "Decision Making",
      desc: "Balanced approach to decision-making, weighing risks and benefits before committing to actions.",
    },
  ],
  // Growth/improvement areas shown in editable left-panel controls and preview cards.
  improvements: [
    {
      title: "Public Speaking & Presentation Skills",
      desc: "Develop confidence in verbal communication and presentation delivery to enhance leadership potential and stakeholder engagement.",
    },
    {
      title: "Team Leadership & Delegation",
      desc: "Build skills in motivating teams, delegating effectively, and managing diverse personality types for senior role progression.",
    },
    {
      title: "Networking & Relationship Building",
      desc: "Expand professional network and develop stronger interpersonal relationships for career advancement opportunities.",
    },
    {
      title: "Creative Problem Solving",
      desc: "Balance analytical approach with creative thinking to develop innovative solutions and enhance adaptability.",
    },
  ],
  // Optional personalized Q&A cards; empty by default and user-generated.
  personalizedq: [],
};

