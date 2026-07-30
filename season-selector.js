const seasonSelector = document.querySelector("#season-selector");
const seasonPanels = document.querySelectorAll("[data-season-panel]");
const seasonSummary = document.querySelector("#season-summary");

const seasonDetails = {
    "season-1": {
        summary: '11 chapters <span aria-hidden="true">•</span> Summer 2026'
    },
    "season-2": {
        summary: '6 blank projects <span aria-hidden="true">•</span> Add yours anytime'
    }
};

seasonSelector?.addEventListener("change", () => {
    const selectedSeason = seasonSelector.value;

    seasonPanels.forEach((panel) => {
        panel.hidden = panel.dataset.seasonPanel !== selectedSeason;
    });

    if (seasonSummary && seasonDetails[selectedSeason]) {
        seasonSummary.innerHTML = seasonDetails[selectedSeason].summary;
    }
});
