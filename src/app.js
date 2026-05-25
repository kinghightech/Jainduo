import { course } from "./course.js";
import { renderLibraryView, renderProgressView, renderReviewView } from "./dashboards.js";
import { getDefaultProgress, loadProgress, saveProgress as persistProgress } from "./storage.js";

(function () {
  const state = {
    progress: loadProgress(getLessons()),
    currentLessonId: null,
    phase: "teach",
    teachingIndex: 0,
    exerciseIndex: 0,
    selected: null,
    selectedSet: new Set(),
    matched: {},
    ordered: []
  };

  const els = {
    path: document.getElementById("coursePath"),
    lesson: document.getElementById("lessonRoot"),
    review: document.getElementById("reviewRoot"),
    library: document.getElementById("libraryRoot"),
    progress: document.getElementById("progressRoot"),
    xp: document.getElementById("xpValue"),
    streak: document.getElementById("streakValue"),
    accuracy: document.getElementById("accuracyValue"),
    resume: document.getElementById("resumeButton"),
    reset: document.getElementById("resetButton"),
    landingNameForm: document.getElementById("landingNameForm"),
    landingNameInput: document.getElementById("landingNameInput"),
    welcomeName: document.getElementById("welcomeName"),
    live: document.getElementById("liveRegion"),
    unitBadge: document.getElementById("unitBadge")
  };

  function init() {
    state.currentLessonId = getFirstAvailableLesson().id;
    bindShell();
    render();
    setView("home");
  }

  function bindShell() {
    document.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.view));
    });
    els.resume.addEventListener("click", () => {
      saveLandingName();
      setView("learn");
      startLesson(getFirstAvailableLesson().id);
    });
    els.landingNameForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveLandingName();
      renderProgressView(getDashboardContext());
    });
    els.reset.addEventListener("click", () => {
      if (confirm("Reset all local progress for Jina Path?")) {
        state.progress = getDefaultProgress(getLessons());
        saveProgress();
        state.currentLessonId = getFirstAvailableLesson().id;
        state.phase = "teach";
        state.teachingIndex = 0;
        state.exerciseIndex = 0;
        render();
      }
    });
  }

  function setView(view) {
    document.body.classList.toggle("is-home", view === "home");
    document.querySelectorAll("[data-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.panel !== view;
    });
    document.querySelectorAll("[data-view]").forEach((button) => {
      const active = button.dataset.view === view;
      button.classList.toggle("is-active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    if (view === "review") renderReviewView(getDashboardContext());
    if (view === "library") renderLibraryView(getDashboardContext());
    if (view === "progress") renderProgressView(getDashboardContext());
  }

  function render() {
    renderStats();
    syncLandingName();
    renderPath();
    renderLesson();
    renderReviewView(getDashboardContext());
    renderLibraryView(getDashboardContext());
    renderProgressView(getDashboardContext());
  }

  function renderStats() {
    const attempts = Object.values(state.progress.results).reduce((sum, result) => sum + result.attempts, 0);
    const correct = Object.values(state.progress.results).reduce((sum, result) => sum + result.correct, 0);
    els.xp.textContent = String(state.progress.xp);
    els.streak.textContent = String(state.progress.streak);
    els.accuracy.textContent = attempts ? `${Math.round((correct / attempts) * 100)}%` : "0%";
  }

  function renderProfile() {
    const name = state.progress.profileName;
    els.welcomeName.textContent = name ? `, ${name}` : "";
  }

  function syncLandingName() {
    els.landingNameInput.value = state.progress.profileName;
    renderProfile();
  }

  function saveLandingName() {
    if (!els.landingNameInput.value.trim()) return;
    setProfileName(els.landingNameInput.value);
  }

  function setProfileName(value) {
    state.progress.profileName = cleanName(value);
    saveProgress();
    renderProfile();
  }

  function renderPath() {
    els.path.innerHTML = "";
    getLessons().forEach((lesson, index) => {
      const unlocked = isLessonUnlocked(lesson.id);
      const complete = state.progress.completedLessons.includes(lesson.id);
      const current = state.currentLessonId === lesson.id;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `lesson-node ${complete ? "is-complete" : ""} ${current ? "is-current" : ""} ${unlocked ? "" : "is-locked"}`;
      button.disabled = !unlocked;
      if (current) button.setAttribute("aria-current", "step");
      button.innerHTML = `
        <span class="node-orb">${complete ? "OK" : unlocked ? index + 1 : "Lock"}</span>
        <span class="node-card">
          <strong>${lesson.title}</strong>
          <span>${lesson.level} - ${lesson.summary}</span>
        </span>
      `;
      button.addEventListener("click", () => startLesson(lesson.id));
      els.path.appendChild(button);
    });
    const currentUnit = course.findIndex((unit) => unit.lessons.some((lesson) => lesson.id === state.currentLessonId)) + 1;
    els.unitBadge.textContent = `Unit ${Math.max(currentUnit, 1)}`;
  }

  function renderLesson() {
    resetInteractionState();
    const lesson = getLesson(state.currentLessonId);
    if (!lesson) return;
    if (state.phase === "teach") {
      renderTeaching(lesson);
      return;
    }
    const exercise = lesson.exercises[state.exerciseIndex];
    if (!exercise) {
      renderCompletion(lesson);
      return;
    }

    const totalSteps = lesson.teaching.length + lesson.exercises.length;
    const currentStep = lesson.teaching.length + state.exerciseIndex;
    const progress = Math.round((currentStep / totalSteps) * 100);
    els.lesson.innerHTML = `
      <article class="exercise-card">
        <div class="progress-bar" role="progressbar" aria-label="Lesson progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}" aria-valuetext="Practice ${state.exerciseIndex + 1} of ${lesson.exercises.length}">
          <div class="progress-fill" style="--progress: ${progress}%"></div>
        </div>
        <div class="lesson-visual">
          <div class="flat-illustration" aria-hidden="true"></div>
          <div>
            <p class="eyebrow">${lesson.concept}</p>
            <h2>${lesson.title}</h2>
            <p>${lesson.summary}</p>
            <div class="lesson-meta">
              <span class="meta-pill">${lesson.level}</span>
              <span class="meta-pill">Practice ${state.exerciseIndex + 1} of ${lesson.exercises.length}</span>
              <span class="meta-pill">${getUnitTitle(lesson.id)}</span>
            </div>
          </div>
        </div>
        <div class="question">
          <h3>${exercise.prompt}</h3>
          ${exercise.hint ? `<p>${exercise.hint}</p>` : ""}
        </div>
        <div id="exerciseBody"></div>
        <div id="feedback" class="feedback">Choose an answer, then check it.</div>
        <div class="lesson-actions">
          <button class="secondary-btn" id="skipButton" type="button">Skip</button>
          <button class="primary-btn" id="checkButton" type="button">Check</button>
        </div>
      </article>
    `;
    renderExerciseBody(exercise);
    document.getElementById("checkButton").addEventListener("click", checkAnswer);
    document.getElementById("skipButton").addEventListener("click", nextExercise);
  }

  function renderTeaching(lesson) {
    const card = lesson.teaching[state.teachingIndex];
    const totalSteps = lesson.teaching.length + lesson.exercises.length;
    const progress = Math.round((state.teachingIndex / totalSteps) * 100);
    const finalTeachCard = state.teachingIndex === lesson.teaching.length - 1;
    els.lesson.innerHTML = `
      <article class="exercise-card">
        <div class="progress-bar" role="progressbar" aria-label="Lesson progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}" aria-valuetext="Teaching card ${state.teachingIndex + 1} of ${lesson.teaching.length}">
          <div class="progress-fill" style="--progress: ${progress}%"></div>
        </div>
        <div class="lesson-visual">
          <div class="flat-illustration" aria-hidden="true"></div>
          <div>
            <p class="eyebrow">Learn first</p>
            <h2>${lesson.title}</h2>
            <p>${lesson.summary}</p>
            <div class="lesson-meta">
              <span class="meta-pill">${lesson.level}</span>
              <span class="meta-pill">Card ${state.teachingIndex + 1} of ${lesson.teaching.length}</span>
              <span class="meta-pill">${lesson.concept}</span>
            </div>
          </div>
        </div>
        ${state.teachingIndex === 0 ? renderObjectives(lesson) : ""}
        <section class="teach-card">
          <p class="eyebrow">${card.term}</p>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
          <div class="model-box">
            <strong>Example</strong>
            <span>${card.example}</span>
          </div>
        </section>
        ${finalTeachCard ? renderMisconceptions(lesson) : ""}
        <div class="lesson-actions">
          <button class="secondary-btn" id="backTeachButton" type="button" ${state.teachingIndex === 0 ? "disabled" : ""}>Back</button>
          <button class="primary-btn" id="nextTeachButton" type="button">${finalTeachCard ? "Start practice" : "Continue"}</button>
        </div>
      </article>
    `;
    document.getElementById("backTeachButton").addEventListener("click", () => {
      state.teachingIndex = Math.max(0, state.teachingIndex - 1);
      renderLesson();
    });
    document.getElementById("nextTeachButton").addEventListener("click", () => {
      if (finalTeachCard) {
        state.phase = "practice";
        state.exerciseIndex = 0;
      } else {
        state.teachingIndex += 1;
      }
      renderLesson();
    });
  }

  function renderObjectives(lesson) {
    return `<section class="objective-list"><h3>In this lesson</h3><ul>${lesson.objectives.map((item) => `<li>${item}</li>`).join("")}</ul></section>`;
  }

  function renderMisconceptions(lesson) {
    return `<section class="misconception-list"><h3>Do not mix this up</h3><ul>${lesson.misconceptions.map((item) => `<li>${item}</li>`).join("")}</ul></section>`;
  }

  function renderExerciseBody(exercise) {
    const body = document.getElementById("exerciseBody");
    if (exercise.type === "choice" || exercise.type === "trueFalse") {
      const options = exercise.type === "trueFalse" ? ["True", "False"] : exercise.options;
      body.innerHTML = `<div class="choices">${options.map((option) => `<button class="choice" type="button" aria-pressed="false">${option}</button>`).join("")}</div>`;
      body.querySelectorAll(".choice").forEach((button) => {
        button.addEventListener("click", () => {
          state.selected = button.textContent;
          body.querySelectorAll(".choice").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        });
      });
    }

    if (exercise.type === "select") {
      body.innerHTML = `<div class="chips">${exercise.options.map((option) => `<button class="chip" type="button" aria-pressed="false">${option}</button>`).join("")}</div>`;
      body.querySelectorAll(".chip").forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.textContent;
          if (state.selectedSet.has(value)) state.selectedSet.delete(value);
          else state.selectedSet.add(value);
          button.setAttribute("aria-pressed", String(state.selectedSet.has(value)));
        });
      });
    }

    if (exercise.type === "fill") {
      body.innerHTML = `<label class="sr-only" for="textAnswer">Answer</label><input class="text-answer" id="textAnswer" autocomplete="off" />`;
    }

    if (exercise.type === "match") {
      const terms = exercise.pairs.map((pair) => pair[0]);
      const definitions = exercise.pairs.map((pair) => pair[1]).sort();
      body.innerHTML = `
        <div class="match-board">
          <div class="match-column" aria-label="Terms">${terms.map((term) => `<button class="chip" type="button" data-term="${term}" aria-pressed="false">${term}</button>`).join("")}</div>
          <div class="match-column" aria-label="Meanings">${definitions.map((definition) => `<button class="chip" type="button" data-definition="${definition}" aria-pressed="false">${definition}</button>`).join("")}</div>
        </div>
      `;
      let activeTerm = null;
      body.querySelectorAll("[data-term]").forEach((button) => {
        button.addEventListener("click", () => {
          activeTerm = button.dataset.term;
          body.querySelectorAll("[data-term]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        });
      });
      body.querySelectorAll("[data-definition]").forEach((button) => {
        button.addEventListener("click", () => {
          if (!activeTerm) return;
          state.matched[activeTerm] = button.dataset.definition;
          button.classList.add("is-matched");
          button.textContent = `${button.dataset.definition} -> ${activeTerm}`;
          activeTerm = null;
          body.querySelectorAll("[data-term]").forEach((item) => item.setAttribute("aria-pressed", "false"));
        });
      });
    }

    if (exercise.type === "order") {
      state.ordered = [];
      const shuffled = [...exercise.items].reverse();
      body.innerHTML = `
        <p class="eyebrow">Tap items in order</p>
        <div class="chips">${shuffled.map((item) => `<button class="chip" type="button">${item}</button>`).join("")}</div>
        <ol id="orderList" class="sort-list"></ol>
      `;
      const list = document.getElementById("orderList");
      body.querySelectorAll(".chip").forEach((button) => {
        button.addEventListener("click", () => {
          if (state.ordered.includes(button.textContent)) return;
          state.ordered.push(button.textContent);
          button.disabled = true;
          list.innerHTML = state.ordered.map((item) => `<li>${item}</li>`).join("");
        });
      });
    }

    if (exercise.type === "reflection") {
      body.innerHTML = `<label class="sr-only" for="reflectionAnswer">Reflection</label><textarea class="text-answer" id="reflectionAnswer" rows="5" placeholder="Write two or three sentences."></textarea>`;
    }
  }

  function checkAnswer() {
    const lesson = getLesson(state.currentLessonId);
    const exercise = lesson.exercises[state.exerciseIndex];
    const result = grade(exercise);
    const feedback = document.getElementById("feedback");
    feedback.classList.toggle("is-good", result.correct);
    feedback.classList.toggle("is-bad", !result.correct);
    feedback.textContent = `${result.correct ? "Correct." : "Try again."} ${exercise.explain}`;
    els.live.textContent = feedback.textContent;
    recordResult(lesson.id, result.correct);

    if (result.correct) {
      document.getElementById("checkButton").textContent = "Continue";
      document.getElementById("checkButton").removeEventListener("click", checkAnswer);
      document.getElementById("checkButton").addEventListener("click", nextExercise, { once: true });
    }
    renderStats();
  }

  function grade(exercise) {
    if (exercise.type === "choice") return { correct: state.selected === exercise.answer };
    if (exercise.type === "trueFalse") return { correct: state.selected !== null && (state.selected === "True") === exercise.answer };
    if (exercise.type === "select") return { correct: sameSet([...state.selectedSet], exercise.answer) };
    if (exercise.type === "fill") {
      const value = normalize(document.getElementById("textAnswer").value);
      return { correct: value === normalize(exercise.answer) };
    }
    if (exercise.type === "match") {
      const expected = Object.fromEntries(exercise.pairs);
      return { correct: Object.keys(expected).every((term) => state.matched[term] === expected[term]) };
    }
    if (exercise.type === "order") return { correct: JSON.stringify(state.ordered) === JSON.stringify(exercise.answer) };
    if (exercise.type === "reflection") return { correct: document.getElementById("reflectionAnswer").value.trim().length >= 20 };
    return { correct: false };
  }

  function nextExercise() {
    state.exerciseIndex += 1;
    const lesson = getLesson(state.currentLessonId);
    if (state.exerciseIndex >= lesson.exercises.length) {
      completeLesson(lesson);
      renderCompletion(lesson);
    } else {
      renderLesson();
    }
  }

  function completeLesson(lesson) {
    if (!state.progress.completedLessons.includes(lesson.id)) {
      state.progress.completedLessons.push(lesson.id);
      state.progress.xp += 10;
      state.progress.streak = Math.max(1, state.progress.streak + 1);
      unlockNextLesson(lesson.id);
      saveProgress();
    }
  }

  function renderCompletion(lesson) {
    const next = getNextLesson(lesson.id);
    els.lesson.innerHTML = `
      <article class="completion">
        <div class="completion-medal">XP</div>
        <p class="eyebrow">Lesson complete</p>
        <h2>${lesson.title}</h2>
        <p>You earned 10 XP and unlocked the next step when available.</p>
        <div class="lesson-actions">
          <button class="secondary-btn" id="reviewLessonButton" type="button">Practice again</button>
          <button class="primary-btn" id="nextLessonButton" type="button">${next ? "Next lesson" : "View progress"}</button>
        </div>
      </article>
    `;
    document.getElementById("reviewLessonButton").addEventListener("click", () => startLesson(lesson.id));
    document.getElementById("nextLessonButton").addEventListener("click", () => {
      if (next) startLesson(next.id);
      else setView("progress");
    });
    renderStats();
    renderPath();
  }

  function startLesson(id) {
    if (!isLessonUnlocked(id)) return;
    state.currentLessonId = id;
    state.phase = "teach";
    state.teachingIndex = 0;
    state.exerciseIndex = 0;
    renderStats();
    renderPath();
    renderLesson();
  }

  function recordResult(lessonId, correct) {
    const result = state.progress.results[lessonId] || { attempts: 0, correct: 0 };
    result.attempts += 1;
    if (correct) result.correct += 1;
    state.progress.results[lessonId] = result;
    saveProgress();
  }

  function unlockNextLesson(lessonId) {
    const next = getNextLesson(lessonId);
    if (next && !state.progress.unlockedLessons.includes(next.id)) {
      state.progress.unlockedLessons.push(next.id);
    }
  }

  function resetInteractionState() {
    state.selected = null;
    state.selectedSet = new Set();
    state.matched = {};
    state.ordered = [];
  }

  function getLessons() { return course.flatMap((unit) => unit.lessons); }
  function getLesson(id) { return getLessons().find((lesson) => lesson.id === id); }

  function getNextLesson(id) {
    const lessons = getLessons();
    return lessons[lessons.findIndex((lesson) => lesson.id === id) + 1] || null;
  }

  function getUnitTitle(lessonId) { return course.find((unit) => unit.lessons.some((lesson) => lesson.id === lessonId))?.title || "Course"; }
  function isLessonUnlocked(id) { return state.progress.unlockedLessons.includes(id); }

  function getFirstAvailableLesson() {
    return getLessons().find((lesson) => isLessonUnlocked(lesson.id) && !state.progress.completedLessons.includes(lesson.id)) ||
      getLessons().find((lesson) => isLessonUnlocked(lesson.id)) ||
      getLessons()[0];
  }

  function getDashboardContext() {
    return { course, els, getFirstAvailableLesson, getLessons, isLessonUnlocked, renderStats, saveProgress, setProfileName, setView, startLesson, state };
  }

  function saveProgress() {
    if (!persistProgress(state.progress)) {
      els.live.textContent = "Progress could not be saved in this browser.";
    }
  }

  function sameSet(left, right) { return left.length === right.length && left.every((item) => right.includes(item)); }
  function normalize(value) { return value.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim(); }
  function cleanName(value) { return value.replace(/[^a-zA-Z0-9 .'_-]/g, "").replace(/\s+/g, " ").trim().slice(0, 24); }

  init();
})();
