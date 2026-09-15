// =========================================
// SEAN CEDRICK ALVAREZ — PORTFOLIO
// Cloud + Scroll Animation
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const clouds = document.querySelectorAll(".cloud");
    const intro = document.querySelector(".intro");
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const landing = document.querySelector(".landing");

    const cloudBreaks = document.querySelectorAll(".cloud-break");


    if (!landing || !intro) {
        return;
    }


    // =========================================
    // LANDING CLOUD MOVEMENT
    // =========================================

    const landingCloudMovement = [

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

        return Math.min(
            Math.max(value, min),
            max
        );

    }


    // =========================================
    // EASING
    // =========================================

    function easeInOut(value) {

        return value * value * (3 - 2 * value);

    }


    // =========================================
    // LANDING UPDATE
    // =========================================

    function updateLanding() {

        const scrollTop = window.scrollY;

        const landingHeight =
            landing.offsetHeight;

        const progress =
            clamp(
                scrollTop / landingHeight,
                0,
                1
            );


        const eased =
            easeInOut(progress);


        // =====================================
        // LANDING CLOUDS
        // =====================================

        clouds.forEach((cloud, index) => {

            const destination =
                landingCloudMovement[index];

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
                1 +
                (
                    (destination.scale - 1)
                    * stagger
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
        // INTRO
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
            45 -
            (introProgress * 45);


        intro.style.transform = `
            translateY(${introY}px)
        `;


        // =====================================
        // SCROLL INDICATOR
        // =====================================

        scrollIndicator.style.opacity =
            clamp(
                1 - progress * 4,
                0,
                1
            );

    }


    // =========================================
    // TRANSITION CLOUD ANIMATION
    // =========================================

    function updateTransitionClouds() {

        cloudBreaks.forEach((breakZone) => {

            const rect =
                breakZone.getBoundingClientRect();

            const center =
                rect.top +
                (rect.height / 2);


            /*
                When the cloud zone is below the
                viewport, progress = 0.

                When it moves through the screen,
                clouds begin flying away.

                When it has passed,
                progress = 1.
            */

            const startPoint =
                window.innerHeight * 0.85;

            const endPoint =
                window.innerHeight * 0.10;


            const progress =
                clamp(
                    (startPoint - center) /
                    (startPoint - endPoint),
                    0,
                    1
                );


            const eased =
                easeInOut(progress);


            const transitionClouds =
                breakZone.querySelectorAll(
                    ".float-cloud"
                );


            transitionClouds.forEach(
                (cloud, index) => {

                    let x = 0;
                    let y = 0;
                    let rotation = 0;
                    let scale = 1;


                    /*
                        Each cloud gets a different
                        escape direction.

                        This makes them feel like
                        individual fluffy objects
                        being blown away.
                    */

                    switch (index) {

                        case 0:
                            x = -700 * eased;
                            y = -180 * eased;
                            rotation = -35 * eased;
                            scale = 1 - (0.25 * eased);
                            break;

                        case 1:
                            x = -420 * eased;
                            y = 260 * eased;
                            rotation = 25 * eased;
                            scale = 1 - (0.15 * eased);
                            break;

                        case 2:
                            x = -180 * eased;
                            y = -300 * eased;
                            rotation = -28 * eased;
                            scale = 1 - (0.20 * eased);
                            break;

                        case 3:
                            x = 260 * eased;
                            y = 240 * eased;
                            rotation = 35 * eased;
                            scale = 1 - (0.15 * eased);
                            break;

                        case 4:
                            x = 520 * eased;
                            y = -230 * eased;
                            rotation = -30 * eased;
                            scale = 1 - (0.25 * eased);
                            break;

                        case 5:
                            x = 800 * eased;
                            y = 170 * eased;
                            rotation = 35 * eased;
                            scale = 1 - (0.20 * eased);
                            break;

                        case 6:
                            x = -850 * eased;
                            y = 350 * eased;
                            rotation = 30 * eased;
                            scale = 1 - (0.25 * eased);
                            break;

                        case 7:
                            x = 900 * eased;
                            y = -350 * eased;
                            rotation = -35 * eased;
                            scale = 1 - (0.20 * eased);
                            break;

                    }


                    cloud.style.transform = `
                        translate(
                            calc(
                                -50%
                                + var(--base-x)
                                + ${x}px
                            ),
                            calc(
                                -50%
                                + var(--base-y)
                                + ${y}px
                            )
                        )
                        scale(
                            calc(
                                var(--base-scale)
                                * ${scale}
                            )
                        )
                        rotate(
                            calc(
                                var(--base-rotate)
                                + ${rotation}deg
                            )
                        )
                    `;


                    /*
                        Clouds slowly fade only after
                        they've started flying away.
                    */

                    const opacity =
                        1 -
                        Math.max(
                            0,
                            eased - 0.35
                        ) *
                        1.5;


                    cloud.style.opacity =
                        clamp(
                            opacity,
                            0,
                            1
                        );

                }
            );

        });

    }


    // =========================================
    // MAIN UPDATE
    // =========================================

    function updatePage() {

        updateLanding();

        updateTransitionClouds();

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
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updatePage
    );


    // Initial state

    updatePage();

});