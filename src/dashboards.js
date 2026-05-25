const concepts = [
  ["Ahimsa", "Nonviolence or non-harm in thought, speech, and action."],
  ["Aparigraha", "Non-attachment or non-possessiveness; reducing grasping and excess."],
  ["Anekantavada", "Many-sidedness; reality can be understood from multiple standpoints."],
  ["Tirthankara", "A liberated teacher who establishes a path across worldly existence."],
  ["Karma", "Subtle matter that binds to the soul through actions, intentions, and passions."],
  ["Samvara and nirjara", "Stopping new karmic influx and shedding existing karma."],
  ["Jiva and ajiva", "Living soul and non-soul categories in Jain philosophy."],
  ["Syadvada", "Qualified predication: speaking from a certain standpoint."],
  ["Moksha", "Liberation from karmic bondage and rebirth."]
];

const rewards = [
  { id: "skin-leaf", type: "skin", name: "Leaf robe", cost: 0, color: "#3f8f5b" },
  { id: "hat-none", type: "hat", name: "No hat", cost: 0, symbol: "" },
  { id: "hat-lotus", type: "hat", name: "Lotus cap", cost: 10, symbol: "LOTUS" },
  { id: "skin-sky", type: "skin", name: "Sky robe", cost: 20, color: "#5aa9c8" },
  { id: "hat-scholar", type: "hat", name: "Scholar wrap", cost: 35, symbol: "BOOK" },
  { id: "skin-gold", type: "skin", name: "Saffron robe", cost: 50, color: "#d8892f" },
  { id: "hat-crown", type: "hat", name: "Master crown", cost: 70, symbol: "STAR" }
];

export function renderReviewView(ctx) {
  const weak = ctx.getLessons()
    .filter((lesson) => ctx.isLessonUnlocked(lesson.id) && !ctx.state.progress.completedLessons.includes(lesson.id))
    .slice(0, 3);
  const completedLessons = ctx.getLessons().filter((lesson) => ctx.state.progress.completedLessons.includes(lesson.id));
  const current = ctx.getFirstAvailableLesson();
  ctx.els.review.innerHTML = `
    <article class="info-card lesson-summary-card">
      <p class="eyebrow">Teach again</p>
      <h3>${current.title}</h3>
      <p>${current.teaching[0].body}</p>
      <button class="small-btn" type="button" data-review="${current.id}">Review lesson</button>
    </article>
    <article class="info-card">
      <p class="eyebrow">Weak area</p>
      <h3>${weak[0]?.concept || "Start learning"}</h3>
      <p>${weak[0] ? weak[0].objectives.join(" ") : "Complete a lesson to build a review queue."}</p>
      <button class="small-btn" type="button" ${weak[0] ? "" : "disabled"} data-review="${weak[0]?.id || ""}">Practice</button>
    </article>
    ${completedLessons.slice(-4).reverse().map((lesson) => `
      <article class="info-card">
        <p class="eyebrow">Learned concept</p>
        <h3>${lesson.concept}</h3>
        <p>${lesson.teaching.map((card) => card.term).join(", ")}</p>
        <button class="small-btn" type="button" data-review="${lesson.id}">Relearn</button>
      </article>
    `).join("")}
  `;
  ctx.els.review.querySelectorAll("[data-review]").forEach((button) => {
    button.addEventListener("click", () => {
      ctx.setView("learn");
      ctx.startLesson(button.dataset.review);
    });
  });
}

export function renderLibraryView(ctx) {
  const taughtTerms = new Set(ctx.getLessons()
    .filter((lesson) => ctx.state.progress.completedLessons.includes(lesson.id))
    .flatMap((lesson) => lesson.teaching.map((card) => card.term)));
  ctx.els.library.innerHTML = concepts.map(([term, meaning]) => `
    <article class="info-card">
      <p class="eyebrow">${taughtTerms.has(term) ? "Learned" : "Upcoming"}</p>
      <h3>${term}</h3>
      <p>${meaning}</p>
    </article>
  `).join("");
}

export function renderProgressView(ctx) {
  const lessons = ctx.getLessons();
  const complete = ctx.state.progress.completedLessons.length;
  const percent = Math.round((complete / lessons.length) * 100);
  const owned = new Set(ctx.state.progress.ownedRewards);
  const equippedSkin = rewards.find((reward) => reward.id === ctx.state.progress.equipped.skin) || rewards[0];
  const equippedHat = rewards.find((reward) => reward.id === ctx.state.progress.equipped.hat) || rewards[1];
  const profileName = ctx.state.progress.profileName || "Learner";
  ctx.els.progress.innerHTML = `
    <article class="info-card avatar-card">
      <div class="avatar-preview" style="--avatar-color: ${equippedSkin.color || "#3f8f5b"}">
        <div class="avatar-hat">${equippedHat.symbol}</div>
        <div class="avatar-face">${getInitials(profileName)}</div>
      </div>
      <div>
        <p class="eyebrow">Avatar</p>
        <h3>${profileName}'s avatar</h3>
        <p>${equippedSkin.name} with ${equippedHat.name}. Earn XP from lessons, then redeem more styles below.</p>
        <form class="avatar-name-form" id="avatarNameForm">
          <label for="avatarNameInput">Avatar name</label>
          <div>
            <input id="avatarNameInput" maxlength="24" value="${escapeAttr(ctx.state.progress.profileName)}" placeholder="Your name" />
            <button class="small-btn" type="submit">Save</button>
          </div>
        </form>
      </div>
    </article>
    <article class="info-card">
      <h3>Course completion</h3>
      <p>${complete} of ${lessons.length} lessons complete. Each lesson now includes teaching cards before practice.</p>
      <div class="meter" role="progressbar" aria-label="Course completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="--value: ${percent}%"></span></div>
    </article>
    <article class="info-card">
      <h3>Next curriculum goal</h3>
      <p>${ctx.getFirstAvailableLesson().objectives.join(" ")}</p>
    </article>
    <section class="reward-shop" aria-label="Avatar rewards">
      <div class="shop-heading">
        <div>
          <p class="eyebrow">XP rewards</p>
          <h3>Redeem avatar skins and hats</h3>
        </div>
        <strong>${ctx.state.progress.xp} XP</strong>
      </div>
      <div class="reward-grid">
        ${rewards.map((reward) => renderReward(reward, owned, ctx.state.progress)).join("")}
      </div>
    </section>
  `;
  document.getElementById("avatarNameForm").addEventListener("submit", (event) => {
    event.preventDefault();
    ctx.setProfileName(document.getElementById("avatarNameInput").value);
    renderProgressView(ctx);
  });
  ctx.els.progress.querySelectorAll("[data-reward]").forEach((button) => {
    button.addEventListener("click", () => handleRewardClick(button.dataset.reward, ctx));
  });
}

function renderReward(reward, owned, progress) {
  const canRedeem = progress.xp >= reward.cost;
  const isOwned = owned.has(reward.id);
  const isEquipped = progress.equipped[reward.type] === reward.id;
  const action = isEquipped ? "Equipped" : isOwned ? "Equip" : canRedeem ? "Redeem" : `${reward.cost} XP`;
  return `
    <article class="reward-card ${isEquipped ? "is-equipped" : ""}">
      <div class="reward-swatch" style="--reward-color: ${reward.color || "#fffaf0"}">${reward.symbol || ""}</div>
      <div>
        <p class="eyebrow">${reward.type}</p>
        <h4>${reward.name}</h4>
        <p>${reward.cost ? `${reward.cost} XP required` : "Starter item"}</p>
      </div>
      <button class="small-btn" type="button" data-reward="${reward.id}" ${(!canRedeem && !isOwned) || isEquipped ? "disabled" : ""}>${action}</button>
    </article>
  `;
}

function handleRewardClick(rewardId, ctx) {
  const reward = rewards.find((item) => item.id === rewardId);
  if (!reward) return;
  if (!ctx.state.progress.ownedRewards.includes(reward.id)) {
    if (ctx.state.progress.xp < reward.cost) return;
    ctx.state.progress.ownedRewards.push(reward.id);
  }
  ctx.state.progress.equipped[reward.type] = reward.id;
  ctx.saveProgress();
  ctx.renderStats();
  renderProgressView(ctx);
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "L";
}

function escapeAttr(value) {
  return String(value || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
