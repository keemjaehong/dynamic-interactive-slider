function handleResize() {
    window.innerWidth !== previousWindowWidth && (clearTimeout(resizeTimer),
        resizeTimer = setTimeout((function () {
            window.location.reload(),
                previousWindowWidth = window.innerWidth;
        }
        ), 250))
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initCursorAndButtons(e) {
    e = document.querySelector("body");
    let cursor = document.querySelector(".cursor-item");
    if (!cursor)
        return;

    let currentX = 0,
        currentY = 0,
        translateX = 0,
        translateY = 0,
        eventX = 0,
        eventY = 0,
        ongoingY = 0,
        currentRotate = 0;

    !function getPosition() {
        eventX += .1 * (currentX - translateX);
        eventY += .1 * (currentY - translateY);

        eventX *= .6;
        eventY *= .6;

        translateX += eventX;
        translateY += eventY;

        let deg = currentY - ongoingY;

        let hesitater = 0.06;

        currentRotate =
            Math.abs(deg) > .2
                ? Math.max(Math.min(currentRotate + -.1 * deg, 90), -90)
                : (1 - hesitater) * currentRotate + hesitater * 0;
        cursor.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${currentRotate}deg)`;
        ongoingY = currentY;
        requestAnimationFrame(getPosition);
    }(),
        document.addEventListener("mousemove", (cursor => {
            currentX = cursor.clientX,
                currentY = cursor.clientY
        }
        )),
        document.querySelectorAll("[data-card]").forEach((card => {
            const cursor = document.querySelector(".cursor-item");

            card.addEventListener("mouseenter", (function () {
                cursor && (cursor.style.display = "flex");
                const dataCard = this.getAttribute("data-card");
                if (dataCard) {
                    const dataCursor = document.querySelector("[data-cursor-text]");
                    dataCursor && (dataCursor.textContent = dataCard)
                }
            }
            )),
                card.addEventListener("mouseleave", (function () {
                    cursor && (cursor.style.display = "")
                }
                ))
        }
        ))
}

function initGeneral(e) {
    initCursorAndButtons(e)
}

initGeneral();
