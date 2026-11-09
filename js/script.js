window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.2)";

    } else {

        header.style.boxShadow = "none";

    }

});
const logo = document.getElementById("cursor-logo");
if (logo) {

    document.addEventListener("mousemove", function (e) {

        logo.style.left = e.clientX + "px";
        logo.style.top = e.clientY + "px";

    });

    document.body.addEventListener("mouseenter", () => {

        logo.style.opacity = "1";

    });

    document.body.addEventListener("mouseleave", () => {

        logo.style.opacity = "0";

    });

}

/* mobile navigation toggle */
const navToggle = document.querySelector(".nav-toggle");
if (navToggle) {
    navToggle.addEventListener("click", () => {
        const open = navToggle.closest("nav").classList.toggle("open");
        navToggle.setAttribute("aria-expanded", open);
    });
}

/*for services page*/
const cards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform = "translateY(60px)";

    card.style.transition = "all .8s ease";

    observer.observe(card);

});

/* picture slideshow in inner-page banners */
document.querySelectorAll(".service-banner .about-slideshow").forEach(function (show) {
    const slides = show.querySelectorAll("img");
    let current = 0;
    if (slides.length > 1) {
        setInterval(function () {
            slides[current].classList.remove("active");
            current = (current + 1) % slides.length;
            slides[current].classList.add("active");
        }, 4000);
    }
});