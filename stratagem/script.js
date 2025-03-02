import stratagems from "./stratagems.js";

const code_c = document.querySelector("#code-container");
const icon_c = document.querySelector("#icon-container");
const name_c = document.querySelector("#name-container");
const translate = {
    w: "u",
    a: "l",
    s: "d",
    d: "r",
};

let curr_code;
let i = 0;

function newStratagem() {
    let i = Math.floor(Math.random() * stratagems.length);
    let s = stratagems[i];
    s.code.forEach((i) => {
        const div = document.createElement("img");
        div.setAttribute("src", `/stratagem/assets/arrow/${i}.webp`);
        code_c.appendChild(div);
    });

    const icon = document.createElement("img");
    icon.setAttribute("src", `/stratagem/assets/icon/${s.img}.webp`);
    icon_c.appendChild(icon);

    const name = document.createElement("div");
    name.innerHTML = s.name;
    name_c.appendChild(name);

    curr_code = s.code;
}

function addControl() {
    window.addEventListener("keypress", (k) => {
        check(k.key);
    });
}

function check(key) {
    if (translate[key] === curr_code[i]) {
        code_c.children[i].classList.add("correct");

        if (i == curr_code.length - 1) {
            playAudio("correct");
            clear("code");
            newStratagem();
            i = 0;
        } else {
            i++;
            playAudio("hit");
        }
    } else {
        clear("class");
        playAudio("error");
        i = 0;
    }
}

function clear(type) {
    switch (type) {
        case "class":
            curr_code.forEach((l, i) => {
                code_c.children[i].classList.remove("correct");
            });
            break;
        case "code":
            code_c.innerHTML = "";
            icon_c.innerHTML = "";
            name_c.innerHTML = "";
            break;
    }
}

function playAudio(type) {
    switch (type) {
        case "hit":
            new Audio(`/stratagem/assets/sounds/hit${Math.floor(Math.random() * 3) + 1}.wav`).play();
            break;
        case "correct":
            new Audio(`/stratagem/assets/sounds/correct${Math.floor(Math.random() * 4) + 1}.wav`).play();
            break;
        case "error":
            new Audio(`/stratagem/assets/sounds/error${Math.floor(Math.random() * 4) + 1}.wav`).play();
            break;
    }
}

addControl();
newStratagem();
