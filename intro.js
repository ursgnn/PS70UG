const intro = document.querySelector(".site-intro");
const introStorageKey = "ps70-intro-played";
const introReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let introFinished = false;

function finishIntro() {
    if (!intro || introFinished) {
        return;
    }

    introFinished = true;
    intro.classList.add("site-intro--finished");
    document.body.classList.remove("intro-playing");

    window.setTimeout(() => {
        intro.remove();
    }, 700);
}

if (introReduceMotion.matches) {
    intro?.remove();
} else if (intro && !document.documentElement.classList.contains("intro-seen")) {
    document.body.classList.add("intro-playing");

    try {
        sessionStorage.setItem(introStorageKey, "true");
    } catch (error) {
        try {
            history.replaceState(
                { ...history.state, ps70IntroPlayed: true },
                document.title
            );
        } catch (historyError) {
            // The intro still works when local browser storage is unavailable.
        }
    }

    intro.addEventListener("click", finishIntro);
    window.addEventListener("keydown", finishIntro, { once: true });
    window.setTimeout(finishIntro, 4200);
} else if (intro) {
    intro.remove();
}

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        finishIntro();
    }
});
