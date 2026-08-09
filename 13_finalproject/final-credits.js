const creditsOpenButton = document.querySelector("#play-final-credits");
const creditsOverlay = document.querySelector("#end-credits");
const creditsRoll = document.querySelector(".credits-roll");
const creditsReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let creditsAreOpen = false;
let creditsAreEnding = false;
let creditsEndTimer;
let creditsFadeTimer;

function startCreditsRoll() {
    if (!creditsRoll) {
        return;
    }

    creditsRoll.classList.remove("credits-roll--playing");
    void creditsRoll.offsetWidth;
    creditsRoll.classList.add("credits-roll--playing");
}

function closeCredits({ restoreFocus = true } = {}) {
    if (!creditsOverlay) {
        return;
    }

    window.clearTimeout(creditsEndTimer);
    window.clearTimeout(creditsFadeTimer);
    creditsAreOpen = false;
    creditsAreEnding = false;
    creditsOverlay.classList.remove("end-credits--active", "end-credits--ending");
    creditsOverlay.setAttribute("aria-hidden", "true");
    creditsRoll?.classList.remove("credits-roll--playing");
    document.body.classList.remove("credits-are-playing");

    if (restoreFocus) {
        creditsOpenButton?.focus();
    }
}

function finishCredits() {
    if (!creditsOverlay || !creditsAreOpen || creditsAreEnding) {
        return;
    }

    creditsAreEnding = true;
    window.clearTimeout(creditsEndTimer);
    creditsOverlay.classList.add("end-credits--ending");
    creditsFadeTimer = window.setTimeout(() => closeCredits(), 1150);
}

function openCredits() {
    if (!creditsOverlay || creditsAreOpen) {
        return;
    }

    creditsAreOpen = true;
    creditsAreEnding = false;
    creditsOverlay.setAttribute("aria-hidden", "false");
    creditsOverlay.classList.add("end-credits--active");
    document.body.classList.add("credits-are-playing");
    startCreditsRoll();
    creditsOverlay.focus();

    creditsEndTimer = window.setTimeout(
        finishCredits,
        creditsReduceMotion.matches ? 12000 : 32500
    );
}

creditsOpenButton?.addEventListener("click", openCredits);
creditsRoll?.addEventListener("animationend", (event) => {
    if (event.animationName === "roll-final-credits") {
        finishCredits();
    }
});

window.addEventListener("keydown", (event) => {
    if (creditsAreOpen && event.key === "Escape") {
        closeCredits();
    }
});

window.addEventListener("pageshow", () => closeCredits({ restoreFocus: false }));
