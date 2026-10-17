"use strict";
// shortcut: feste Übungsabstände in 24-Stunden-Tagen, bei Nutzertests neu abstimmen.
const reviewIntervals = [1, 3, 7, 14];

function parseReviewState(raw, lessonIds) {
  const saved = JSON.parse(raw || "{}");
  const state = new Map();
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return state;
  for (const id of lessonIds) {
    const entry = saved[id];
    if (entry && Number.isInteger(entry.step) && entry.step >= 0 && entry.step <= reviewIntervals.length &&
        Number.isFinite(entry.due) && entry.due >= 0 && entry.due <= 8.64e15) {
      state.set(id, {step: entry.step, due: entry.due});
    }
  }
  return state;
}

function planReview(previous, correct, now = Date.now()) {
  if (!correct) return {step: 0, due: now};
  // Wiederholtes Klicken vor dem Termin darf die Abstände nicht hochzählen.
  if (previous && now < previous.due) return previous;
  const step = Math.min((previous?.step || 0) + 1, reviewIntervals.length);
  return {step, due: now + reviewIntervals[step - 1] * 86400000};
}
