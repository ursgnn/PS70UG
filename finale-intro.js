const finaleCard = document.querySelector(".episode-card.finale[href]");
const finaleIntro = document.querySelector(".finale-intro");
const finaleSkip = document.querySelector(".finale-skip");
const finaleReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let finaleIsPlaying = false;
let finaleTimer;
let finaleDestination;

function resetFinaleIntro() {
    window.clearTimeout(finaleTimer);
    finaleIsPlaying = false;
    finaleDestination = undefined;
    document.body.classList.remove("finale-is-opening");
    finaleIntro?.classList.remove("finale-intro--active");
    finaleIntro?.setAttribute("aria-hidden", "true");
}

function openFinale() {
    if (!finaleIsPlaying || !finaleDestination) {
        return;
    }

    const destination = finaleDestination;
    finaleIsPlaying = false;
    window.clearTimeout(finaleTimer);
    window.location.assign(destination);
}

function startFinaleIntro(event) {
    if (
        !finaleCard ||
        !finaleIntro ||
        finaleIsPlaying ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return;
    }

    event.preventDefault();
    finaleIsPlaying = true;
    finaleDestination = finaleCard.href;
    finaleIntro.setAttribute("aria-hidden", "false");
    document.body.classList.add("finale-is-opening");

    window.requestAnimationFrame(() => {
        finaleIntro.classList.add("finale-intro--active");
    });

    finaleTimer = window.setTimeout(
        openFinale,
        finaleReduceMotion.matches ? 1200 : 8400
    );
}

finaleCard?.addEventListener("click", startFinaleIntro);
finaleSkip?.addEventListener("click", openFinale);

window.addEventListener("keydown", (event) => {
    if (finaleIsPlaying && event.key === "Escape") {
        openFinale();
    }
});

window.addEventListener("pageshow", resetFinaleIntro);
