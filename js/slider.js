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
        speed: 1000,
        loop: true,
        autoplay: {
            delay: 1500,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            768: {
                init: !1
            }
        }
    })
    // , t = document.querySelectorAll(".g-nav__item");
    // function switchSlideThumb(e, t) {
    //     gsap.to(e, {
    //         opacity: 0,
    //         duration: .3,
    //         ease: "power1.inOut"
    //     }),
    //         gsap.to(t, {
    //             opacity: 1,
    //             duration: .3,
    //             ease: "power1.inOut",
    //             // onComplete: () => {
    //             //     t.play()
    //             // }
    //         })
    // }
    // function r(e, t) {
    //     gsap.to(e, {
    //         opacity: 1,
    //         duration: .3,
    //         ease: "power1.inOut"
    //     }),
    //         gsap.to(t, {
    //             opacity: 0,
    //             duration: .3,
    //             ease: "power1.inOut",
    //             onComplete: () => {
    //                 t.pause()
    //             }
    //         })
    // }
    // t[2].classList.add("active"),
    //     t.forEach(((o, r) => {
    //         o.addEventListener("click", (function () {
    //             t.forEach((e => e.classList.remove("active"))),
    //                 this.classList.add("active"),
    //                 e.slideTo(r)
    //         }
    //         ))
    //     }
    // ));
    // var a = document.querySelector(".story-card.swiper-slide-active");

    // switchSlideThumb(a.querySelector("img"), a.querySelector("video")),
    //     e.on("beforeSlideChangeStart", (function () {
    //         var e = document.querySelector(".story-card.swiper-slide-active");
    //         r(e.querySelector("img"), e.querySelector("video"))
    //     }
    //     ))
    // e.on("slideChangeTransitionEnd", (function () {
    //     t.forEach((e => e.classList.remove("active")));
    //     const r = e.activeIndex;
    //     t[r].classList.add("active");
    //     var a = document.querySelector(".story-card.swiper-slide-active");
    //     o(a.querySelector("img"), a.querySelector("video"))
    // }
    // ));
    // const n = new Swiper(".t-card__wrap", {
    //     slidesPerView: "auto",
    //     spaceBetween: 0,
    //     // centeredSlides: !0,
    //     speed: 800,
    //     init: !0,
    //     initialSlide: 2,
    //     breakpoints: {
    //         768: {
    //             init: !1
    //         }
    //     }
    // });
    // var i = document.querySelector(".t-card.swiper-slide-active");
    // o(i.querySelector("img"), i.querySelector("video")),
    // n.on("beforeSlideChangeStart", (function () {
    //     var e = document.querySelector(".t-card.swiper-slide-active");
    //     r(e.querySelector("img"), e.querySelector("video"))
    // }
    // )),
    // n.on("slideChangeTransitionEnd", (function () {
    //     var e = document.querySelector(".t-card.swiper-slide-active");
    //     o(e.querySelector("img"), e.querySelector("video"))
    // }
    // ))
};
function initCardsHover() {
    document.querySelectorAll("[data-card]").forEach((e => {
        const t = e.style.zIndex || 0;
        if (!0 === ("static" === e.getAttribute("data-card")))
            return;
        const o = e.querySelector("video")
            , r = e.querySelector("img");
        e.addEventListener("mouseenter", (() => {
            e.style.zIndex = 2,
                gsap.to(e, {
                    scale: prefersReducedMotion() ? 1 : 1.15,
                    rotate: prefersReducedMotion() ? 0 : 16 * Math.random() - 8,
                    duration: .6,
                    ease: CustomEase.create("guides-bounce", "M0,0 C0.084,0.61 0.202,0.898 0.327,0.977 0.555,1.121 0.661,0.92 1,1 ")
                }),
                supportsTouch() || (gsap.to(r, {
                    opacity: 0,
                    duration: .2,
                    ease: "power2"
                }),
                    gsap.to(o, {
                        opacity: 1,
                        duration: .2,
                        ease: "power2",
                        onComplete: () => {
                            o.play()
                        }
                    }))
        }
        )),
            e.addEventListener("mouseleave", (() => {
                e.style.zIndex = t,
                    gsap.to(e, {
                        scale: 1,
                        // rotate: prefersReducedMotion() ? 0 : 6 * Math.random() - 3,
                        rotate: prefersReducedMotion() ? 0 : 0,
                        duration: .6,
                        ease: CustomEase.create("guides-bounce", "M0,0 C0.084,0.61 0.202,0.898 0.327,0.977 0.555,1.121 0.661,0.92 1,1 ")
                    }),
                    supportsTouch() || (gsap.to(r, {
                        opacity: 1,
                        duration: .2,
                        ease: "power2"
                    }),
                        gsap.to(o, {
                            opacity: 0,
                            duration: .2,
                            ease: "power2",
                            onComplete: () => {
                                o.pause()
                            }
                        }))
            }
            ))
    }
    ))
}

function initVideoOnHover() {
    if (supportsTouch())
        return;
    let e = document.querySelectorAll("[data-video-hover]");
    e && e.forEach((e => {
        let t = e.querySelector("img")
            , o = e.querySelector("video");
        e.addEventListener("mouseenter", (() => {
            gsap.to(t, {
                opacity: 0,
                duration: .2,
                ease: "power2"
            }),
                gsap.to(o, {
                    opacity: 1,
                    duration: .2,
                    ease: "power2",
                    onComplete: () => {
                        o.play()
                    }
                })
        }
        )),
            e.addEventListener("mouseleave", (() => {
                gsap.to(t, {
                    opacity: 1,
                    duration: .2,
                    ease: "power2"
                }),
                    gsap.to(o, {
                        opacity: 0,
                        duration: .2,
                        ease: "power2",
                        onComplete: () => {
                            o.pause()
                        }
                    })
            }
            ))
    }
    ))
}
initCardsHover();
initVideoOnHover();
initMobileSliders();