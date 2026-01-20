let shortcuts = [];

const searchInput = document.getElementById("search");
const results = document.getElementById("results");

window.api.getShortcuts().then(data => {
  shortcuts = data;
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  results.innerHTML = "";

  if (!query) return;

  const matches = shortcuts.filter(item =>
    item.action.toLowerCase().includes(query)
  );

  if (!matches.length) {
    results.innerHTML = "<p>No results found</p>";
    return;
  }

  matches.forEach(({ action, shortcut }) => {
    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `
      <div class="action">${action}</div>
      <div class="shortcut">${shortcut}</div>
    `;
    results.appendChild(div);
  });
});
