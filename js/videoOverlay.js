let globalPlayState = true,
    globalMuteState = false;

function initVideoControls(e) {
    e || (e = document.querySelector('#story'));
    const videoControls = e.querySelectorAll("[data-video-controls]")
        , btnsVideoPlay = e.querySelectorAll(".play-button-icon")
        , btnsVideoSound = e.querySelectorAll(".sound-button-icon");

    globalPlayState || btnsVideoPlay.forEach(e => e.classList.add("active")),
        globalMuteState || btnsVideoSound.forEach(e => e.classList.add("muted")),

        videoControls.forEach((e => {
            const controllableVideo = e.querySelector("video");
            e.getAttribute("data-video-controls") || controllableVideo.addEventListener("click", (() => {
                controllableVideo.paused ? (controllableVideo.play(),
                    btnsVideoPlay.forEach((e => {
                        e.classList.remove("active")
                    }
                    )),
                    globalPlayState = !0) : (controllableVideo.pause(),
                        btnsVideoPlay.forEach((e => {
                            e.classList.add("active")
                        }
                        )),
                        globalPlayState = !1)
            }
            )),
                btnsVideoSound.forEach((e => {
                    e.addEventListener("click", (() => {
                        controllableVideo.muted = !controllableVideo.muted;
                        globalMuteState = controllableVideo.muted;

                        btnsVideoSound.forEach((e => {
                            if (globalMuteState) {
                                e.classList.remove("muted");
                            } else {
                                e.classList.add("muted");
                            }
                        }));
                    }));
                }));

        }
        ))
}

function initOverlay(e) {
    e || (e = document.querySelector('#story'));
    const t = e.querySelectorAll("[data-overlay-open]"),
        overlay = e.querySelector(".overlay-wrap"),
        overlayItems = e.querySelectorAll(".overlay-item"),
        a = e.querySelectorAll("[data-overlay-close]"),
        btnNextOverlay = e.querySelector("[data-overlay-next]"),
        btnPrevOverlay = e.querySelector("[data-overlay-prev]"),
        overlayFadeMotionElements = e.querySelectorAll("[data-overlay-fade]"),
        overlayTags = e.querySelectorAll("[data-overlay-tag]");

    function setContent(e, t) {
        const o = Array.from(overlayItems).findIndex((e => e.classList.contains("is--active")))
            , a = overlayItems[e]
            , n = overlayItems[o]
            , i = "next" === t ? -1 : 1;
        let l = n.querySelector("video"),
            s = a.querySelector("video");
        l.pause();
        const c = gsap.timeline({
            onComplete: () => {
                n && n.classList.remove("is--active"),
                    a.classList.add("is--active"),
                    function () {
                        globalPlayState && (s.muted = globalMuteState,
                            s.play());
                        const o = "next" === t ? "1rem" : "-1rem";
                        gsap.timeline()
                            .fromTo(a.querySelectorAll("[data-overlay-fade]"), {
                                opacity: 0,
                                y: o
                            }, {
                                opacity: 1,
                                y: "0rem",
                                stagger: .05,
                                duration: .45
                            }).fromTo(a.querySelectorAll("[data-overlay-tag]"), {
                                opacity: 0,
                                y: o
                            }, {
                                opacity: 1,
                                y: "0rem",
                                stagger: .05,
                                duration: .45,
                                ease: "back.out(2)"
                            }, "<")
                    }()
            }
        });
        n && (c.to(n.querySelectorAll("[data-overlay-fade]"), {
            opacity: 0,
            y: `${i}rem`,
            stagger: .05,
            duration: .3,
            ease: "power3"
        }, "<"),
            c.to(n.querySelectorAll("[data-overlay-tag]"), {
                opacity: 0,
                y: `${i}rem`,
                stagger: .1,
                duration: .3,
                ease: "power3"
            }, "<"))
    }
    gsap.set(".overlay-inner", {
        yPercent: 20,
        opacity: 0
    }),
        t.forEach(((t, a) => {
            t.addEventListener("click", (() => {
                gsap.timeline().set(overlay, {
                    display: "flex"
                }).fromTo(".overlay-bg", {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: .4
                }).fromTo(".overlay-inner", {
                    yPercent: 20,
                    opacity: 0
                }, {
                    yPercent: 0,
                    opacity: 1,
                    duration: .6,
                    ease: "back.out(2)"
                }, "<").fromTo(overlayFadeMotionElements, {
                    opacity: 0,
                    y: "1rem"
                }, {
                    opacity: 1,
                    y: "0rem",
                    stagger: .05,
                    duration: .45
                }, "<+=0.1").fromTo(overlayTags, {
                    opacity: 0,
                    y: "1rem"
                }, {
                    opacity: 1,
                    y: "0rem",
                    stagger: .05,
                    duration: .45,
                    ease: "back.out(2)"
                }, "<"),
                    a > 5 && (a -= 6);
                const t = 0 === a ? overlayItems.length - 1 : a - 1
                    , n = a === overlayItems.length - 1 ? 0 : a + 1
                    , i = overlayItems[a]
                    , g = i.querySelector("video");

                globalPlayState && (g.muted = globalMuteState,
                    g.play()),
                    overlayItems.forEach((e => e.classList.remove("is--active"))),
                    i.classList.add("is--active");
            }
            ))
        }
        )),
        a.forEach((e => {
            e.addEventListener("click", (() => {
                overlayItems.forEach((e => {
                    e.querySelector("video").pause()
                }
                )),
                    gsap.timeline().fromTo(".overlay-bg", {
                        opacity: 1
                    }, {
                        opacity: 0,
                        duration: .3,
                        ease: "power3"
                    }).fromTo(".overlay-inner", {
                        yPercent: 0,
                        opacity: 1
                    }, {
                        yPercent: 10,
                        opacity: 0,
                        duration: .3,
                        ease: "power3"
                    }, 0).set(overlay, {
                        display: "none"
                    }).then((() => {
                        overlayItems.forEach((e => {
                            e.classList.remove("is--active"),
                                gsap.set(e, {
                                    opacity: 0,
                                    xPercent: 0,
                                    clearProps: "all"
                                })
                        }
                        ))
                    }
                    ))
            }
            ))
        }
        )),
        btnNextOverlay && btnNextOverlay.addEventListener("click", (() => {
            let e = Array.from(overlayItems).findIndex((e => e.classList.contains("is--active")));
            setContent(e === overlayItems.length - 1 ? 0 : e + 1, "next")
        }
        )),
        btnPrevOverlay && btnPrevOverlay.addEventListener("click", (() => {
            let e = Array.from(overlayItems).findIndex((e => e.classList.contains("is--active")));
            setContent(0 === e ? overlayItems.length - 1 : e - 1, "prev")
        }
        ))
}

initVideoControls();
initOverlay();
