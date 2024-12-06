const following = document.querySelector("input[name='following']");
const followers = document.querySelector("input[name='followers']");

const followingC = document.querySelector("div#followingContainer");
const followersC = document.querySelector("div#followersContainer");
const buttonCompare = document.querySelector("button#compare");
const resultDiv = document.querySelector("div#result");
const title = document.querySelector("div#title");

const resultC = document.querySelector("div#result-container");
const resultCP = document.querySelector("div#result-container-placeholder");

const overlay = document.querySelector("div#overlay");

(() => {
    // Reader helper
    const reader = (fileInput) => {
        return new Promise((resolve) => {
            const file = fileInput.files[0];

            if (!file) {
                resolve(alert(`Please insert the "${fileInput.name}" file first`));
                return;
            }

            const fileReader = new FileReader();

            fileReader.onload = () => {
                const res = JSON.parse(fileReader.result);
                resolve(res);
            };

            fileReader.readAsText(file);
        });
    };

    function compare(following, followers) {
        if (!following || !followers) return;

        if (!following.relationships_following) return alert(`"following" file is in incorrect format`);
        if (!followers[0]) return alert(`"followers" file is in incorrect format`);

        let mismatch = [];

        following.relationships_following.forEach((d) => {
            let dup = false;
            followers.forEach((e) => {
                d.string_list_data[0].value == e.string_list_data[0].value ? (dup = true) : null;
            });
            dup
                ? null
                : mismatch.push({
                      name: d.string_list_data[0].value,
                      link: d.string_list_data[0].href,
                  });
        });

        return mismatch;
    }

    buttonCompare.addEventListener("click", async () => {
        const result = compare(await reader(following), await reader(followers));

        if (result) {
            resultDiv.innerHTML = "";

            resultCP.classList.remove("d-md-block");
            resultCP.classList.add("d-none");

            resultC.classList.remove("d-none");
            resultC.classList.add("d-md-block");

            let c = 1;
            let rc = 0;
            let row;
            result.forEach((d, index) => {
                if (rc === 0) {
                    row = document.createElement("div");
                    row.classList = "row w-100";
                }

                const div = document.createElement("div");
                div.classList = "result-content col-12 col-md-3";
                div.innerHTML = `<a href=${d.link} target="_blank">${c}. ${d.name}</a>`;
                row.append(div);
                c += 1;
                rc += 1;

                if (rc === 4 || index === result.length - 1) {
                    resultDiv.append(row);
                    rc = 0;
                }
            });
        }
    });
})();

function firstEnter() {
    let delay = 0.1;
    let appearList = [title, followingC, followersC, buttonCompare, resultCP];

    for (const d of appearList) {
        d.style.animation = `appearBT 0.35s ease-in-out ${delay}s`;
        d.onanimationend = () => {
            d.style.opacity = "1";
        };
        delay += 0.2;
    }
}
