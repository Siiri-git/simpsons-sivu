// Tabien vaihto Info / Memes
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;

      // Poista active kaikista napeista
      tabButtons.forEach((b) => b.classList.remove("active"));
      // Piilota kaikki panelit
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      // Aktivoi valittu
      btn.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });
});
