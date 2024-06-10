function handleResize() {
    window.innerWidth !== previousWindowWidth && (clearTimeout(resizeTimer),
        resizeTimer = setTimeout((function () {
            window.location.reload(),
                previousWindowWidth = window.innerWidth
        }
        ), 250))
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function initCursorAndButtons(e) {
    // !1 === generalFlag && (e = document.querySelector("body"));
    e = document.querySelector("body");
    let t = document.querySelector(".cursor-item");
    if (!t)
        return;
    let o = 0
        , r = 0
        , a = 0
        , n = 0
        , i = 0
        , l = 0
        , s = 0
        , c = 0;
    function d(e, t) {
        switch (t) {
            case "top-left":
                e.style.left = "0px",
                    e.style.top = "0px",
                    e.style.transform = "translate(-50%, -50%)";
                break;
            case "top-right":
                e.style.right = "0px",
                    e.style.top = "0px",
                    e.style.transform = "translate(50%, -50%)";
                break;
            case "bottom-left":
                e.style.left = "0px",
                    e.style.bottom = "0px",
                    e.style.transform = "translate(-50%, 50%)";
                break;
            case "bottom-right":
                e.style.right = "0px",
                    e.style.bottom = "0px",
                    e.style.transform = "translate(50%, 50%)"
        }
    }
    !function e() {
        i += .1 * (o - a),
            l += .1 * (r - n),
            i *= .55,
            l *= .55,
            a += i,
            n += l;
        let d = r - s;
        var u;
        c = Math.abs(d) > .2 ? Math.max(Math.min(c + -.1 * d, 90), -90) : (1 - (u = .06)) * c + u * 0,
            t.style.transform = `translate(${a}px, ${n}px) rotate(${c}deg)`,
            s = r,
            requestAnimationFrame(e)
    }(),
        document.addEventListener("mousemove", (e => {
            o = e.clientX,
                r = e.clientY
        }
        )),
        document.querySelectorAll("[data-cursor]").forEach((e => {
            e.addEventListener("mouseenter", (function () {
                const e = document.querySelector(".cursor-item");
                e && (e.style.display = "flex");
                const t = this.getAttribute("data-cursor");
                if (t) {
                    const e = document.querySelector("[data-cursor-text]");
                    e && (e.textContent = t)
                }
            }
            )),
                e.addEventListener("mouseleave", (function () {
                    const e = document.querySelector(".cursor-item");
                    e && (e.style.display = "")
                }
                ))
        }
        ))
}
function initGeneral(e) {
    initCursorAndButtons(e)
    // initToolTips(),
    // initVideoControls(e),
    // prefersReducedMotion() || (initDocumentClick(),
    //     setTimeout((() => {
    //         initHeadlines(e)
    //     }
    //     ), 1e3))
}

initGeneral();
