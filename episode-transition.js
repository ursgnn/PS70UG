const episodeCards = document.querySelectorAll(".episode-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let transitionInProgress = false;

function resetEpisodeTransition() {
    document.querySelectorAll(".episode-transition-clone").forEach((clone) => clone.remove());
    document.body.classList.remove("episode-is-opening");
    transitionInProgress = false;
}

window.addEventListener("pageshow", resetEpisodeTransition);

episodeCards.forEach((card) => {
    card.addEventListener("click", (event) => {
        if (
            transitionInProgress ||
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        const destination = card.href;

        if (reduceMotion.matches) {
            return;
        }

        event.preventDefault();
        transitionInProgress = true;

        const bounds = card.getBoundingClientRect();
        const expandingCard = card.cloneNode(true);
        const cardStyle = window.getComputedStyle(card);

        expandingCard.classList.add("episode-transition-clone");
        expandingCard.setAttribute("aria-hidden", "true");
        expandingCard.style.backgroundImage = cardStyle.backgroundImage;
        expandingCard.style.backgroundPosition = cardStyle.backgroundPosition;
        expandingCard.style.backgroundSize = cardStyle.backgroundSize;
        expandingCard.style.top = `${bounds.top}px`;
        expandingCard.style.left = `${bounds.left}px`;
        expandingCard.style.width = `${bounds.width}px`;
        expandingCard.style.height = `${bounds.height}px`;

        document.body.appendChild(expandingCard);
        document.body.classList.add("episode-is-opening");
        let navigationStarted = false;
        let navigationScheduled = false;

        const openEpisode = () => {
            if (navigationStarted) {
                return;
            }

            navigationStarted = true;
            resetEpisodeTransition();
            window.location.assign(destination);
        };

        const scheduleEpisodeOpening = () => {
            if (navigationScheduled) {
                return;
            }

            navigationScheduled = true;
            window.setTimeout(openEpisode, 1000);
        };

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                expandingCard.classList.add("episode-transition-clone--expanded");
            });
        });

        expandingCard.addEventListener(
            "transitionend",
            (transitionEvent) => {
                if (transitionEvent.propertyName === "width") {
                    scheduleEpisodeOpening();
                }
            }
        );

        window.setTimeout(scheduleEpisodeOpening, 900);
    });
});
