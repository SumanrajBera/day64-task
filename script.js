const screen = document.querySelector(".screen")
const menu = document.querySelector(".contextMenu")
const timeElem = document.querySelector(".end .time")
const dateElem = document.querySelector(".end .date")

const startBtn = document.querySelector(".start")

// document.addEventListener("contextmenu", function (e) {
//     e.preventDefault()
// })

screen.addEventListener("contextmenu", function (e) {
    e.preventDefault();

    menu.style.opacity = 1;

    let menuWidth = menu.offsetWidth;
    let menuHeight = menu.offsetHeight;

    let docWidth = screen.offsetWidth;
    let docHeight = screen.offsetHeight;

    let ribbonHeight = 60;

    let left = e.pageX;
    let top = e.pageY;

    if (left + menuWidth > docWidth) {
        left = docWidth - menuWidth - 10;
    }

    if (left < 0) {
        left = 0;
    }

    if (top + menuHeight + ribbonHeight > docHeight) {
        top = docHeight - menuHeight - ribbonHeight;
    }

    if (top < 0) {
        top = 0;
    }

    menu.style.left = left + "px";
    menu.style.top = top + "px";

    gsap.to(".startMenu", {
        transform: "translate(-50%, 100%)",
        opacity: 0
    })

    displayMenu = false
});

screen.addEventListener("click", function () {
    gsap.to(".startMenu", {
        transform: "translate(-50%, 100%)",
        opacity: 0
    })

    displayMenu = false
})

document.addEventListener("click", function (e) {
    menu.style.opacity = 0;
})

let displayMenu = false

startBtn.addEventListener("click", function () {
    if (!displayMenu) {
        gsap.to(".startMenu", {
            transform: "translate(-50%, 0)",
            opacity: 1,
            ease: "circ.out"
        })

        displayMenu = true
    } else {
        gsap.to(".startMenu", {
            transform: "translate(-50%, 100%)",
            opacity: 0

        })

        displayMenu = false
    }

})

function startClock() {
    function updateDateTime() {
        const now = new Date();

        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");

        timeElem.textContent = `${hh}:${mm}`;

        const fmt = new Intl.DateTimeFormat("en-CA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const [year, month, day] = fmt.format(now).split("-");
        dateElem.textContent = `${day}-${month}-${year}`;
    }

    updateDateTime();             // update immediately
    setInterval(updateDateTime, 1000); // update every second
}

startClock();


