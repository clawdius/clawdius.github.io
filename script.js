window.onload = function() {

    var WaypointGoal = new Object;

    // Loader
    var loading = document.getElementById('loading')

    loading.style.animation = 'slideDownMain 1s ease'
    loading.onanimationstart = () => {
        slideUpMain()
    }
    loading.onanimationend = () => {
        loading.style.visibility = 'hidden';
    }


    // Ini semacem checkpoint
    var concept1 = new Waypoint({
        element: document.getElementById('concept1'),
        handler: function(direction) {
            if (direction == 'down') {
                setActiveList(1, 0);
                sidebarIntro();
                removeMain();
            }
            if (direction == 'up') {
                sidebarOutro();
                clearList();
                slideUpMain();
            }
        },
        group: 'list',
        offset: 250
    })

    var concept2 = new Waypoint({
        element: document.getElementById('concept2'),
        handler: function(direction) {
            if (direction == 'down') {
                document.body.style.backgroundColor = '#8f091d';
                setActiveList(2, 1)
            }
            if (direction == 'up') {
                setActiveList(1, 0);
                document.body.style.backgroundColor = '#1d0022';
            }
        },
        group: 'list',
        offset: 150
    })

    var concept3 = new Waypoint({
        element: document.getElementById('concept3'),
        handler: function(direction) {
            if (direction == 'down') {
                document.body.style.backgroundColor = '#781473';
                setActiveList(3, 2)
            }
            if (direction == 'up') {
                setActiveList(2, 1);
                document.body.style.backgroundColor = '#8f091d';
            }
        },
        group: 'list',
        offset: 150
    })

    var track = new Waypoint({
        element: document.getElementById('track'),
        handler: function(direction) {
            if (direction == 'down') {
                document.body.style.backgroundColor = '#1d0022';
                setActiveList(4, 3);
                tracklistIntro()
            }
            if (direction == 'up') {
                setActiveList(3, 2);
                document.body.style.backgroundColor = '#781473';
                tracklistOutro()
            }
        },
        group: 'list',
        offset: 300
    })

    var endGame = new Waypoint({
        element: document.getElementById('track'),
        handler: function(direction) {
            if (direction == 'down') {
                sidebarOutro();
                footerIn()
            }
            if (direction == 'up') {
                sidebarIntro();
                footerOut()
            }
        },
        group: 'list',
        offset: 'bottom-in-view'
    })


    // Functions
    function clearList() {
        var lists = document.getElementsByClassName('listText');
        var rectangleList = document.getElementsByClassName('rectangleList');
        for (let i = 1; i <= lists.length; i++) {
            list = document.getElementById('list' + i);
            list.style.fontSize = '12pt';
            list.style.fontWeight = 'normal';
            rectangleList[i - 1].classList.remove('active');
        }
    }

    function flashAnchor(list) {
        rectangleList = document.getElementsByClassName('rectangleList');
        var active = rectangleList[list];
        active.style.float = 'left'
        active.style.width = '100%'
        active.ontransitionend = () => {
            active.style.float = 'right'
            active.style.width = '0'
        }
    }

    function setActiveList(list, rectangle) {
        clearList();
        var lists = document.getElementsByClassName('listText');
        var listBefore = list - 1;
        var listAfter = list + 1;

        if (!(listBefore == 0)) {
            document.getElementById('list' + listBefore).style.fontSize = '14pt';
        }
        if (!(listAfter == lists.length)) {
            document.getElementById('list' + listAfter).style.fontSize = '14pt';
        }

        document.getElementById('list' + list).style.fontSize = '16pt';
        document.getElementById('list' + list).style.fontWeight = 'bold';
        flashAnchor(rectangle);
    }

    //Function animation

    function sidebarIntro() {
        document.getElementById('sidebar').visibility = 'visible';
        var sidebar = document.getElementsByClassName('lists');
        var Delay = 0;

        for (let i = 0; i < sidebar.length; i++) {
            sidebar[i].style.opacity = '0';
            sidebar[i].style.visibility = 'visible';
            sidebar[i].style.animation = 'sidebarShow 0.5s';
            sidebar[i].onanimationend = () => {
                sidebar[i].style.opacity = '1';
                sidebar[i].style.removeProperty('animation')
            }

            Delay += 0.05;
            sidebar[i].style.animationDelay = Delay + 's';

        }
    }

    function sidebarOutro() {
        var sidebar = document.getElementsByClassName('lists');
        var Delay = 0;

        for (let i = 0; i < sidebar.length; i++) {
            sidebar[i].style.animation = 'sidebarHide 0.3s ease';
            sidebar[i].onanimationend = () => {
                sidebar[i].style.visibility = 'hidden';
                sidebar[i].style.opacity = '0';
            }
            Delay += 0.05;
            sidebar[i].style.animationDelay = Delay + 's';
        }

        document.getElementById('sidebar').visibility = 'hidden';
    }

    function slideUpMain() {
        var listStartPage = document.getElementById('startPage').children;
        var Delay = 0;
        for (let i = 0; i < listStartPage.length; i++) {
            listStartPage[i].style.animation = 'slideUpMain 0.5s ease';
            listStartPage[i].onanimationend = () => {
                listStartPage[i].style.opacity = '1';
                listStartPage[i].style.removeProperty('animation');
            }

            Delay = Delay + 0.05;
            listStartPage[i].style.animationDelay = Delay + 's';
        }
    }

    function removeMain() {
        var listStartPage = document.getElementById('startPage').children;
        for (let i = 0; i < listStartPage.length; i++) {
            listStartPage[i].style.opacity = '0';


        }
    }

    function tracklistIntro() {
        var track = document.getElementsByClassName('trackContent');
        var Delay = 0;

        for (let i = 0; i < track.length; i++) {

            track[i].style.animation = 'slideLeftTrack 1s ease';
            track[i].onanimationend = () => {
                track[i].style.removeProperty('animation')
                track[i].style.visibility = 'visible'
            }

            Delay += 0.2;
            track[i].style.animationDelay = Delay + 's';

        }
    }

    function tracklistOutro() {
        var track = document.getElementsByClassName('trackContent');
        var Delay = 0;

        for (let i = 0; i < track.length; i++) {
            track[i].style.animation = 'slideLeftTrack reverse 1s ease';
            track[i].onanimationcancel = () => {
                track[i].style.removeProperty('animation')
                track[i].style.visibility = 'hidden'
            }
            track[i].onanimationend = () => {
                track[i].style.removeProperty('animation')
                track[i].style.visibility = 'hidden'
            }

            Delay += 0.2;
            track[i].style.animationDelay = Delay + 's';
        }

    }

    function footerIn() {
        var footer = document.getElementById('footer');
        var quotes = document.getElementById('quotes');
        var profile = document.getElementById('profile');

        quotes.style.opacity = '0';
        quotes.style.display = 'block';
        quotes.style.animation = 'slideLeftQuotes 2s ease';

        quotes.onanimationend = () => {
            quotes.style.removeProperty('animation');
            quotes.style.opacity = '1';
        }

        profile.style.opacity = '0';
        profile.style.display = 'flex';
        profile.style.animation = 'slideLeftProfile 2s 0.1s ease';

        profile.onanimationend = () => {
            profile.style.removeProperty('animation');
            profile.style.opacity = '1';
        }

    }

    function footerOut() {
        var footer = document.getElementById('footer');
        var quotes = document.getElementById('quotes');
        var profile = document.getElementById('profile');

        quotes.style.opacity = '0';
        quotes.style.display = 'none';
        quotes.style.removeProperty('animation');

        profile.style.opacity = '0';
        profile.style.display = 'none';
        profile.style.removeProperty('animation');
    }
    //------------------------------------------------------------------//
    // Halted soalnya saya pusing mikirnya

    // function progress() {
    //     var progress = document.getElementById('progressJalan');
    //     var progressHeight;

    //     var scrollHeightChrome = document.documentElement.scrollTop;
    //     var scrollHeight = document.body.scrollTop;
    //     var scrolls = scrollHeight + scrollHeightChrome

    //     progressHeight = (scrolls) / (document.documentElement.scrollHeight - window.innerHeight) * 50
    //     progress.style.height = progressHeight + "%"

    // }

}