// =========================================
// SEAN CEDRICK ALVAREZ
// Portfolio Interaction
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const intro =
        document.querySelector(".intro");

    const scrollIndicator =
        document.querySelector(".scroll-indicator");

    const landing =
        document.querySelector(".landing");

    const clouds =
        document.querySelectorAll(".cloud");

    const sections =
        document.querySelectorAll(
            ".portfolio-section"
        );

    const cloudBreaks =
        document.querySelectorAll(
            ".cloud-break"
        );


    // =========================================
    // SAFETY
    // =========================================

    if (!intro || !landing) {
        return;
    }


    // =========================================
    // LANDING CLOUD DESTINATIONS
    // =========================================

    const cloudMovement = [

        { x: -850, y: -470, r: -18, s: 1.10 },

        { x: -500, y: -520, r: 18, s: 0.90 },

        { x: 0, y: -570, r: -12, s: 1.10 },

        { x: 500, y: -500, r: 16, s: 1.00 },

        { x: 850, y: -400, r: -16, s: 1.00 },

        { x: -900, y: -100, r: 14, s: 1.00 },

        { x: -560, y: -140, r: -15, s: 1.10 },

        { x: 560, y: -130, r: 14, s: 1.05 },

        { x: 900, y: -80, r: -15, s: 0.95 },

        { x: -880, y: 210, r: -18, s: 1.05 },

        { x: -520, y: 270, r: 15, s: 1.00 },

        { x: 530, y: 260, r: -14, s: 1.10 },

        { x: 900, y: 200, r: 15, s: 0.95 },

        { x: -760, y: 500, r: 14, s: 1.00 },

        { x: 0, y: 510, r: -12, s: 1.10 },

        { x: 770, y: 500, r: 16, s: 0.95 }

    ];


    // =========================================
    // HELPER
    // =========================================

    function clamp(
        value,
        min,
        max
    ) {

        return Math.min(
            Math.max(value, min),
            max
        );

    }


    function smoothStep(value) {

        return (
            value *
            value *
            (3 - 2 * value)
        );

    }


    // =========================================
    // LANDING ANIMATION
    // =========================================

    function updateLanding() {

        const scrollY =
            window.scrollY;


        /*
            0 = untouched landing page

            1 = clouds have completely
                separated
        */

        const progress =
            clamp(
                scrollY /
                window.innerHeight,

                0,
                1
            );


        const eased =
            smoothStep(progress);


        // =====================================
        // CLOUDS MOVE OUTWARD
        // =====================================

        clouds.forEach(
            (cloud, index) => {

                const movement =
                    cloudMovement[index];


                if (!movement) {
                    return;
                }


                /*
                    Different clouds move at
                    slightly different speeds.
                */

                const stagger =
                    clamp(
                        (
                            eased -
                            index * 0.012
                        ) / 0.88,

                        0,
                        1
                    );


                cloud.style.setProperty(
                    "--move-x",
                    `${movement.x * stagger}px`
                );


                cloud.style.setProperty(
                    "--move-y",
                    `${movement.y * stagger}px`
                );


                cloud.style.setProperty(
                    "--move-rotate",
                    `${movement.r * stagger}deg`
                );


                cloud.style.setProperty(
                    "--move-scale",
                    1 +
                    (
                        movement.s - 1
                    ) *
                    stagger
                );

            }
        );


        // =====================================
        // INTRO REVEAL
        // =====================================

        /*
            Intro remains completely invisible
            at the top.

            It begins appearing after a little
            bit of scrolling.
        */

        const introProgress =
            clamp(
                (
                    progress -
                    0.12
                ) / 0.42,

                0,
                1
            );


        intro.style.opacity =
            introProgress;


        const introY =
            45 -
            (
                introProgress *
                45
            );


        const introScale =
            0.96 +
            (
                introProgress *
                0.04
            );


        intro.style.transform = `
            translateY(${introY}px)
            scale(${introScale})
        `;


        // =====================================
        // SCROLL INDICATOR
        // =====================================

        scrollIndicator.style.opacity =
            clamp(
                1 -
                progress * 4,

                0,
                1
            );

    }


    // =========================================
    // TRANSITION CLOUDS
    // =========================================

    function updateCloudBreaks() {

        cloudBreaks.forEach(
            (breakZone) => {

                const rect =
                    breakZone.getBoundingClientRect();


                const center =
                    rect.top +
                    (
                        rect.height / 2
                    );


                /*
                    Clouds start flying when
                    the transition enters the
                    viewport.
                */

                const start =
                    window.innerHeight *
                    0.90;


                const end =
                    window.innerHeight *
                    0.10;


                const progress =
                    clamp(
                        (
                            start -
                            center
                        ) /
                        (
                            start -
                            end
                        ),

                        0,
                        1
                    );


                const eased =
                    smoothStep(
                        progress
                    );


                const transitionClouds =
                    breakZone.querySelectorAll(
                        ".float-cloud"
                    );


                transitionClouds.forEach(
                    (
                        cloud,
                        index
                    ) => {


                        let x = 0;
                        let y = 0;
                        let rotation = 0;
                        let scale = 1;


                        switch (index) {

                            case 0:

                                x =
                                    -750 *
                                    eased;

                                y =
                                    -180 *
                                    eased;

                                rotation =
                                    -35 *
                                    eased;

                                scale =
                                    1 -
                                    0.25 *
                                    eased;

                                break;


                            case 1:

                                x =
                                    -450 *
                                    eased;

                                y =
                                    270 *
                                    eased;

                                rotation =
                                    27 *
                                    eased;

                                scale =
                                    1 -
                                    0.15 *
                                    eased;

                                break;


                            case 2:

                                x =
                                    -200 *
                                    eased;

                                y =
                                    -330 *
                                    eased;

                                rotation =
                                    -28 *
                                    eased;

                                scale =
                                    1 -
                                    0.2 *
                                    eased;

                                break;


                            case 3:

                                x =
                                    280 *
                                    eased;

                                y =
                                    250 *
                                    eased;

                                rotation =
                                    33 *
                                    eased;

                                scale =
                                    1 -
                                    0.15 *
                                    eased;

                                break;


                            case 4:

                                x =
                                    560 *
                                    eased;

                                y =
                                    -240 *
                                    eased;

                                rotation =
                                    -30 *
                                    eased;

                                scale =
                                    1 -
                                    0.25 *
                                    eased;

                                break;


                            case 5:

                                x =
                                    850 *
                                    eased;

                                y =
                                    190 *
                                    eased;

                                rotation =
                                    35 *
                                    eased;

                                scale =
                                    1 -
                                    0.2 *
                                    eased;

                                break;


                            case 6:

                                x =
                                    -900 *
                                    eased;

                                y =
                                    380 *
                                    eased;

                                rotation =
                                    30 *
                                    eased;

                                scale =
                                    1 -
                                    0.25 *
                                    eased;

                                break;


                            case 7:

                                x =
                                    950 *
                                    eased;

                                y =
                                    -380 *
                                    eased;

                                rotation =
                                    -35 *
                                    eased;

                                scale =
                                    1 -
                                    0.2 *
                                    eased;

                                break;

                        }


                        /*
                            Read the original
                            transform so we don't
                            destroy its position.
                        */

                        const original =
                            getComputedStyle(
                                cloud
                            ).transform;


                        cloud.style.transform = `
                            translate(
                                ${x}px,
                                ${y}px
                            )
                            rotate(
                                ${rotation}deg
                            )
                            scale(
                                ${scale}
                            )
                        `;


                        cloud.style.opacity =
                            clamp(
                                1 -
                                Math.max(
                                    0,
                                    eased -
                                    0.3
                                ) *
                                1.4,

                                0,
                                1
                            );

                    }
                );

            }
        );

    }


    // =========================================
    // SECTION HOVER
    // =========================================

    sections.forEach(
        (section) => {

            section.addEventListener(
                "mouseenter",
                () => {

                    document.body.classList.add(
                        "section-active"
                    );

                }
            );


            section.addEventListener(
                "mouseleave",
                () => {

                    document.body.classList.remove(
                        "section-active"
                    );

                }
            );

        }
    );


    // =========================================
    // MAIN UPDATE
    // =========================================

    function updatePage() {

        updateLanding();

        updateCloudBreaks();

    }


    // =========================================
    // PERFORMANCE
    // =========================================

    let ticking = false;


    function requestUpdate() {

        if (ticking) {
            return;
        }


        ticking = true;


        window.requestAnimationFrame(
            () => {

                updatePage();

                ticking = false;

            }
        );

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
        requestUpdate
    );


    // =========================================
    // INITIAL STATE
    // =========================================

    updatePage();

});