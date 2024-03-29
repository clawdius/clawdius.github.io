let pairContent = [
    ['twitter.com/', 'clawdius_', 'Twitter', 'This is where i share my memes and also worshipping idols.', 'Visit My Twitter', 'https://twitter.com/clawdius_', 'blue'],
    ['instagram.com/', 'clawdius_', 'Instagram', 'I like to create instastory about why my idols never loved me.', 'Visit My Instagram', 'https://instagram.com/clawdius_', 'cyan'],
    ['pinterest.com/', 'clawdius_', 'Pinterest', 'I spend 8 hours looking at minimalist website design and get mad about it.', 'Visit My Pinterest', 'https://pinterest.com/clawdius_', 'red'],
    ['steamcommunity.com/id/', 'clawdius_', 'Steam', 'From Rainbow Six: Siege to Stardew Valley, i enjoy wide variety of games.', 'Visit My Steam', 'https://steamcommunity.com/id/clawdius_', 'grey'],
    ['github.com/', 'clawdius', 'Github', 'Thank you Github for hosting this static website for free.', 'Visit My Github', 'https://github.com/clawdius', 'black-grey'],
    ['mailto:', 'adityalilasaputra@gmail.com', 'Email', 'Have any question or something you want to say?', 'Mail Me', 'mailto:adityalilasaputra@gmail.com', 'purple']
]

let mainContent = document.getElementById('main-content').children
let logoList = document.getElementById('logo-list').children

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    h = checkTime(h);
    m = checkTime(m);
    document.getElementById('clock-small').innerHTML = h + ":" + m;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

function changeLogoState(index) {
    let logo = document.getElementsByClassName('logo-list')
    for (let i = 0; i < logo.length; i++) {
        logo[i].style.opacity = '50%'
        logo[i].style.backgroundColor = null
    }
    logo[index].style.opacity = '1'
    logo[index].style.backgroundColor = 'var(--' + pairContent[index][6] + ')'
}

function transitionList() {
    delay = 0;
    for (let i = 0; i < logoList.length; i++) {
        logoList[i].style.animation = 'appearBT-logo 0.2s ease-in-out ' + delay + 's';
        logoList[i].onanimationend = () => {
            logoList[i].style.opacity = '1'
        }
        delay += 0.1;
    }
}

function transitionEnter() {
    delay = 0;
    for (let i = 0; i < mainContent.length; i++) {
        mainContent[i].style.animation = 'appearBT 0.35s ease-in-out ' + delay + 's';
        mainContent[i].onanimationend = () => {
            mainContent[i].style.opacity = '1'
        }
        delay += 0.15;
    }

    setTimeout(function() {
        for (let i = 0; i < logoList.length; i++) {
            logoList[i].setAttribute('onclick', 'changeMainContent(' + i + ')');
        }
    }, 900)
}

function transitionQuit() {
    delay = 0;
    for (let i = 0; i < mainContent.length; i++) {
        mainContent[i].style.animation = 'disappearBT 0.35s ease-in-out ' + delay + 's';
        mainContent[i].onanimationend = () => {
            mainContent[i].style.opacity = '0'
        }
        delay += 0.15;
    }

    for (let i = 0; i < logoList.length; i++) {
        logoList[i].setAttribute('onclick', '');
    }
}

function changeMainContent(index) {
    changeLogoState(index)
    transitionQuit()
    setTimeout(function() {
        onanimationend = () => {
            document.getElementById('text-link').innerText = pairContent[index][0]
            document.getElementById('text-username').innerHTML = pairContent[index][1]
            document.getElementById('media-name').innerHTML = pairContent[index][2]
            document.getElementById('media-desc').innerHTML = pairContent[index][3]
            document.getElementById('media-button').innerHTML = pairContent[index][4]
            document.getElementById('media-link').href = pairContent[index][5]
        }
    }, 800)
    setTimeout(transitionEnter, 900)

}