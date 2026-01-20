let shortcuts = [];

const searchInput = document.getElementById("search");
const results = document.getElementById("results");

window.api.getShortcuts().then(data => {
  shortcuts = data;
});

function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

searchInput.addEventListener("input", () => {
  if (!shortcuts.length) return;

  const query = normalize(searchInput.value);
  results.innerHTML = "";

  if (!query) return;

  const matches = shortcuts.filter(item =>
   normalize(item.shortcut || "").includes(query)
  );

  if (!matches.length) {
    results.innerHTML = `<div class="result-item">No results found</div>`;
    return;
  }

  matches.forEach(({ action, shortcut }) => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.innerHTML = `
      <div class="action">${action}</div>
      <div class="shortcut">${shortcut}</div>
    `;
    results.appendChild(div);
  });
});
