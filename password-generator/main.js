// Dirtiest code I've ever written, holy moly I'm getting stroke writing this code.
// "It just works" -Todd Howard.

const caseConts = document.querySelector("#case-container");
const caseWrap = document.querySelector("#container-wrapper");
const baseOffset = -4870; // The "magic" number

const overlay = document.querySelector("#gamble-overlay");
const pw = document.querySelector("#pw");

const gambleButton = document.querySelector("#gambleButton");

// Bypass pesky "change" event for pw field because we add it via JS
const pwChange = new Event("change");

const innerCase = (r, c) => {
    return `
        <div class="${r} inner m-1">${c}</div>
    `;
};

const waitIcon = () => {
    return `
    <span class="material-symbols-outlined" id="loading">
        refresh
    </span>
    `;
};

function generate(val) {
    let r = 0;
    let e = [];

    const iBlue = "abcdefghijklmnopqrstuvwxyz";
    const iPurple = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const iPink = "1234567890";
    const iRed = "!@#$%^&*()";
    const iGold = "[];',./";

    for (let i = 0; i < val; i++) {
        r = Math.random();

        // "Source for the probability?"
        // https://csgoskins.gg/blog/csgo-case-odds-the-official-numbers-published-by-valve

        if (r < 0.0026) {
            e.push({
                r: "gold",
                c: iGold.charAt(Math.floor(Math.random() * iGold.length)),
            });
            continue;
        }
        if (r < 0.0064) {
            e.push({
                r: "red",
                c: iRed.charAt(Math.floor(Math.random() * iRed.length)),
            });
            continue;
        }
        if (r < 0.032) {
            e.push({
                r: "pink",
                c: iPink.charAt(Math.floor(Math.random() * iPink.length)),
            });
            continue;
        }
        if (r < 0.1598) {
            e.push({
                r: "purple",
                c: iPurple.charAt(Math.floor(Math.random() * iPurple.length)),
            });
            continue;
        }

        e.push({
            r: "blue",
            c: iBlue.charAt(Math.floor(Math.random() * iBlue.length)),
        });
    }

    return e;
}

function open() {
    // The truth is, it's ALWAYS the index number 57, sad truth, but it's true since I'm garbage at coding.
    // Can actually be randomed by modifying end transform location, but hey, I'm too lazy for this fun project.
    // 1536 pixels to div index 57 at the middle. Added a bit of randomness via `xOffset`.
    // `wOffset` is here to adjust the device width difference, so it will always points to index number 57 at the middle.

    const sNormal = new Audio("media/case normal.mp3");
    const sGold = new Audio("media/case gold.mp3");

    gambleButton.innerHTML = waitIcon();

    sNormal.oncanplay = () => {
        overlay.classList.remove("hidden");
        overlay.style.opacity = 0;
        overlay.animate([{ opacity: 0 }, { opacity: 1 }], 100).onfinish = () => {
            overlay.style.opacity = 1;
        };

        caseConts.innerHTML = "";

        const g = generate(70);
        let s = ``;

        for (let j of g) {
            s += `${innerCase(j.r, j.c)} `;
        }

        /* 
        - Straight up stealing from StackOverflow for me in the future:
            function randomInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        - In below case, the min-maxxing values are {-40, 40} pixels respectively
        */
        const xOffset = Math.floor(Math.random() * (40 + 40 + 1)) - 40;
        const wOffset = (caseWrap.clientWidth - 1536) / 2;

        caseConts.innerHTML = s;
        let spin = caseConts.animate([{ transform: "translateX(0px)" }, { transform: `translateX(${baseOffset + wOffset + xOffset}px)` }], {
            duration: 5200,
            easing: "ease-out",
        });

        if (g[57].r === "gold") {
            sGold.play();
        } else {
            sNormal.play();
        }

        spin.onfinish = () => {
            caseConts.style.transform = `translateX(${baseOffset + wOffset + xOffset}px)`;
            setTimeout(() => {
                overlay.animate([{ opacity: 1 }, { opacity: 0 }], 200).onfinish = () => {
                    gambleButton.innerText = "Open Character";
                    overlay.classList.add("hidden");
                    pw.dispatchEvent(pwChange);
                };
                pw.value = `${pw.value}${g[57].c}`;
            }, 1000);
        };
    };
}

window.onload = () => {
    const gambleButton = document.querySelector("#gambleButton");
    const copyButton = document.querySelector("#copyToClipboard");
    const resetButton = document.querySelector("#resetButton");

    copyButton.addEventListener("click", () => {
        if (pw.value != "") {
            pw.select();
            pw.setSelectionRange(0, 9999);

            navigator.clipboard.writeText(pw.value);
            alert("Copied to clipboard!");
        } else {
            alert("You haven't gambled yet");
        }
    });

    pw.addEventListener("change", () => {
        if (pw.value != "") {
            resetButton.classList.remove("hidden");
        } else {
            resetButton.classList.add("hidden");
        }
    });

    resetButton.addEventListener("click", () => {
        pw.value = "";
        pw.dispatchEvent(pwChange);
    });

    gambleButton.addEventListener("click", () => {
        open();
    });
};
