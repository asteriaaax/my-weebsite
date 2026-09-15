// =========================================
// SEAN CEDRICK ALVAREZ — PORTFOLIO
// Cloud Scroll Animation
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const landing = document.querySelector(".landing");
    const clouds = document.querySelectorAll(".cloud");
    const intro = document.querySelector(".intro");
    const scrollIndicator = document.querySelector(".scroll-indicator");

    if (!landing || !intro || clouds.length === 0) {
        return;
    }


    // =========================================
    // CLOUD MOVEMENT
    // =========================================

    const cloudMovement = [
        { x: -850, y: -470, rotate: -18, scale: 1.10 },
        { x: -500, y: -520, rotate: 18, scale: 0.90 },
        { x: 0,    y: -570, rotate: -12, scale: 1.10 },
        { x: 500,  y: -500, rotate: 16, scale: 1.00 },
        { x: 850,  y: -400, rotate: -16, scale: 1.00 },

        { x: -900, y: -100, rotate: 14, scale: 1.00 },
        { x: -560, y: -140, rotate: -15, scale: 1.10 },
        { x: 560,  y: -130, rotate: 14, scale: 1.05 },
        { x: 900,  y: -80,  rotate: -15, scale: 0.95 },

        { x: -880, y: 210, rotate: -18, scale: 1.05 },
        { x: -520, y: 270, rotate: 15, scale: 1.00 },
        { x: 530,  y: 260, rotate: -14, scale: 1.10 },
        { x: 900,  y: 200, rotate: 15, scale: 0.95 },

        { x: -760, y: 500, rotate: 14, scale: 1.00 },
        { x: 0,    y: 510, rotate: -12, scale: 1.10 },
        { x: 770,  y: 500, rotate: 16, scale: 0.95 }
    ];


    // =========================================
    // CLAMP
    // =========================================

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }


    // =========================================
    // UPDATE
    // =========================================

    function updatePage() {

        const scrollTop = window.scrollY;

        const maxScroll =
            landing.offsetHeight - window.innerHeight;

        const progress =
            clamp(scrollTop / maxScroll, 0, 1);


        // Smooth easing
        const eased =
            progress * progress * (3 - 2 * progress);


        // =====================================
        // MOVE CLOUDS
        // =====================================

        clouds.forEach((cloud, index) => {

            const destination = cloudMovement[index];

            if (!destination) {
                return;
            }

            const stagger =
                clamp(
                    (eased - index * 0.015) / 0.85,
                    0,
                    1
                );


            const x =
                destination.x * stagger;

            const y =
                destination.y * stagger;

            const rotation =
                destination.rotate * stagger;

            const scale =
                1 + (
                    (destination.scale - 1) * stagger
                );


            cloud.style.transform = `
                translate(
                    calc(
                        -50%
                        + var(--x)
                        + ${x}px
                    ),
                    calc(
                        -50%
                        + var(--y)
                        + ${y}px
                    )
                )
                scale(
                    calc(
                        var(--scale) * ${scale}
                    )
                )
                rotate(
                    calc(
                        var(--rotate)
                        + ${rotation}deg
                    )
                )
            `;

        });


        // =====================================
        // INTRO REVEAL
        // =====================================

        const introProgress =
            clamp(
                (progress - 0.15) / 0.45,
                0,
                1
            );


        intro.style.opacity =
            introProgress;


        const introY =
            45 - (introProgress * 45);


        intro.style.transform = `
            translate(-50%, -50%)
            translateY(${introY}px)
        `;


        // =====================================
        // SCROLL INDICATOR
        // =====================================

        const indicatorOpacity =
            clamp(
                1 - progress * 4,
                0,
                1
            );


        const indicatorY =
            progress * 20;


        scrollIndicator.style.opacity =
            indicatorOpacity;


        scrollIndicator.style.transform = `
            translateX(-50%)
            translateY(${indicatorY}px)
        `;
    }


    // =========================================
    // PERFORMANCE
    // =========================================

    let ticking = false;

    function requestUpdate() {

        if (ticking) {
            return;
        }

        window.requestAnimationFrame(() => {

            updatePage();

            ticking = false;

        });

        ticking = true;
    }


    // =========================================
    // EVENTS
    // =========================================

    window.addEventListener(
        "scroll",
        requestUpdate,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updatePage
    );


    // Initial render
    updatePage();

});