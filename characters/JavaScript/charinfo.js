// Tabien vaihto Info <-> Memes
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");

      // Poista active kaikista napeista
      tabButtons.forEach((b) => b.classList.remove("active"));
      // Piilota kaikki paneelit
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      // Aktivoi valittu nappi ja paneeli
      btn.classList.add("active");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
});
