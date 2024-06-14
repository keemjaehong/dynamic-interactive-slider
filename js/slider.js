function supportsTouch() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function initMobileSliders() {
    const e = new Swiper(".story-card__wrap.swiper", {
        slidesPerView: "auto",
        spaceBetween: 32,
        centeredSlides: false,
        speed: 2000,
        loop: true,
        autoplay: {
            delay: 1000,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            768: {
                init: !1
            }
        }
    })
};

function initCardsHover() {
    document.querySelectorAll("[data-card]").forEach((e => {
        const zIndex = e.style.zIndex || 0;
        if (!0 === ("static" === e.getAttribute("data-card")))
            return;
        const thumb = e.querySelector("img");
        e.addEventListener("mouseenter", (() => {
            e.style.zIndex = 2,
                gsap.to(e, {
                    scale: prefersReducedMotion() ? 1 : 1.15,
                    rotate: prefersReducedMotion() ? 0 : 16 * Math.random() - 8,
                    duration: .6,
                    ease: CustomEase.create("guides-bounce", "M0,0 C0.084,0.61 0.202,0.898 0.327,0.977 0.555,1.121 0.661,0.92 1,1 ")
                }),
                supportsTouch() || (gsap.to(thumb, {
                    duration: .2,
                    ease: "power2"
                })
                )
        }
        )),
            e.addEventListener("mouseleave", (() => {
                e.style.zIndex = zIndex,
                    gsap.to(e, {
                        scale: 1,
                        rotate: prefersReducedMotion() ? 0 : 0,
                        duration: .6,
                        ease: CustomEase.create("guides-bounce", "M0,0 C0.084,0.61 0.202,0.898 0.327,0.977 0.555,1.121 0.661,0.92 1,1 ")
                    }),
                    supportsTouch() || (gsap.to(thumb, {
                        // opacity: 1,
                        duration: .2,
                        ease: "power2"
                    })
                    )
            }
            ))
    }
    ))
}

initCardsHover();
initMobileSliders();