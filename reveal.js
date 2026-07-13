// Subtle scroll-reveal: fade + gentle rise as elements enter the viewport.
// Kept intentionally understated so the site feels hand-made, not over-animated.
(function () {
    const SELECTORS = [
        ".about_us > div",
        ".events > div",
        ".officers > div",
        ".join > div",
        ".sponsors > div",
        ".smallpages > div",
        ".event",
        ".officer",
        ".officer-section h3",
        ".department",
        ".major_events .event",
        ".sponsor",
        ".year-section"
    ];

    function init() {
        const reduceMotion = window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const nodes = document.querySelectorAll(SELECTORS.join(","));

        // If motion is reduced or the browser is old, just show everything.
        if (reduceMotion || !("IntersectionObserver" in window)) {
            nodes.forEach((el) => el.classList.add("reveal-visible"));
            return;
        }

        nodes.forEach((el) => el.classList.add("reveal"));

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        nodes.forEach((el) => observer.observe(el));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
