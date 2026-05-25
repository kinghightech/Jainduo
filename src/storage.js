const STORAGE_KEY = "jinaPath.progress.v1";

export function getDefaultProgress(lessons) {
  return {
    version: 1,
    profileName: "",
    xp: 0,
    streak: 0,
    completedLessons: [],
    unlockedLessons: [lessons[0]?.id].filter(Boolean),
    results: {},
    ownedRewards: ["skin-leaf", "hat-none"],
    equipped: {
      skin: "skin-leaf",
      hat: "hat-none"
    }
  };
}

export function loadProgress(lessons) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress(lessons);

    const parsed = JSON.parse(raw);
    const defaults = getDefaultProgress(lessons);
    return {
      ...defaults,
      ...parsed,
      profileName: typeof parsed.profileName === "string" ? parsed.profileName : "",
      unlockedLessons: Array.isArray(parsed.unlockedLessons) && parsed.unlockedLessons.length
        ? parsed.unlockedLessons
        : defaults.unlockedLessons,
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      results: parsed.results && typeof parsed.results === "object" ? parsed.results : {},
      ownedRewards: Array.isArray(parsed.ownedRewards)
        ? [...new Set([...defaults.ownedRewards, ...parsed.ownedRewards])]
        : defaults.ownedRewards,
      equipped: parsed.equipped && typeof parsed.equipped === "object" ? { ...defaults.equipped, ...parsed.equipped } : defaults.equipped
    };
  } catch {
    return getDefaultProgress(lessons);
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}
