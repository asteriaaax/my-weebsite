/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   LANDING PAGE
========================================================= */

const enterButton = document.getElementById("enterButton");
const landing = document.getElementById("landing");
const mainContent = document.getElementById("main-content");


enterButton.addEventListener("click", () => {

    landing.classList.add("exit");

    setTimeout(() => {

        landing.style.display = "none";

        mainContent.style.display = "block";

        requestAnimationFrame(() => {
            mainContent.classList.add("visible");
        });

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 850);

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal-on-scroll");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   MODAL SYSTEM
========================================================= */

const modalButtons =
    document.querySelectorAll("[data-modal]");


const modalOverlays =
    document.querySelectorAll(".modal-overlay");


const closeButtons =
    document.querySelectorAll(".close-modal");


/* =========================================================
   OPEN MODAL
========================================================= */

modalButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modalId =
            button.getAttribute("data-modal");

        const modal =
            document.getElementById(modalId);

        if (!modal) return;

        modal.classList.remove("closing");

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    });

});


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(modal) {

    if (!modal) return;

    modal.classList.add("closing");

    setTimeout(() => {

        modal.classList.remove("active");
        modal.classList.remove("closing");

        document.body.classList.remove("modal-open");

    }, 500);

}


closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal =
            button.closest(".modal-overlay");

        closeModal(modal);

    });

});


/* =========================================================
   CLICK OUTSIDE MODAL
========================================================= */

modalOverlays.forEach((overlay) => {

    overlay.addEventListener("click", (event) => {

        if (event.target === overlay) {

            closeModal(overlay);

        }

    });

});


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        const activeModal =
            document.querySelector(
                ".modal-overlay.active"
            );

        if (activeModal) {

            closeModal(activeModal);

        }

    }

});


/* =========================================================
   PREVENT MODAL CONTENT FROM CLOSING
========================================================= */

document.querySelectorAll(".modal-card").forEach((card) => {

    card.addEventListener("click", (event) => {

        event.stopPropagation();

    });

});


/* =========================================================
   SUBTLE PARALLAX EFFECT
========================================================= */

const bubbles =
    document.querySelectorAll(".floating-bubble");


window.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);


    bubbles.forEach((bubble, index) => {

        const strength =
            (index + 1) * 5;

        bubble.style.transform =
            `translate(${x * strength}px, ${y * strength}px)`;

    });

});


/* =========================================================
   DYNAMIC CURRENT YEAR
========================================================= */

const footer =
    document.querySelector("footer");

if (footer) {

    footer.innerHTML =
        footer.innerHTML.replace(
            "2026",
            new Date().getFullYear()
        );

}