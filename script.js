window.onload = function() {

    var WaypointGoal = new Object;

    var UrutanFoto = [7, 3, 2, 5, 4, 6]
    var TopFoto = [200, 200, 50, 180, 110, 150]
    var LeftFoto = [150, 150, 210, 210, 210, 150]

    // Loader
    {
        var loading = document.getElementById('loading')

        loading.style.animation = 'slideDownMain 1s ease'
        loading.onanimationstart = () => {
            slideUpMain()
        }
        loading.onanimationend = () => {
            loading.style.visibility = 'hidden';
        }
    }


    // Add event special Image clickable
    var specialImages = document.getElementsByClassName('specialImage');

    {
        for (let i = 0; i < specialImages.length; i++) {
            specialImages[i].style.opacity = '0.25';
            specialImages[i].addEventListener('click', function() {
                clearSpecial();
                setActiveSpecial(i);
                setActiveImage(UrutanFoto[i], TopFoto[i], LeftFoto[i]);
                changeText(i)
            })
        }
        setActiveSpecial(0);
        changeText(0)
    }

    // Ini semacem checkpoint

    var video = new Waypoint({
        element: document.getElementById('videoStart'),
        handler: function(direction) {
            if (direction == 'down') {
                removeMain();
            }
            if (direction == 'up') {
                slideUpMain();
            }
        },
        offset: 250
    })

    var concept1 = new Waypoint({
        element: document.getElementById('concept1'),
        handler: function(direction) {
            if (direction == 'down') {
                setActiveList(1, 0);
                sidebarIntro();
                document.body.style.backgroundColor = '#1d0022';
                // document.getElementById('vid1').removeAttribute('src')
            }
            if (direction == 'up') {
                sidebarOutro();
                clearList();
                document.body.style.backgroundColor = '#000000'
                    // document.getElementById('vid1').setAttribute('src', 'https://www.youtube.com/embed/fzr-VVE7Gnk?autoplay=1&loop=1&controls=0&hd=1&autohide=1&playlist=fzr-VVE7Gnk&mute=1')
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

    var special = new Waypoint({
        element: document.getElementById('specialPresent'),
        handler: function(direction) {
            if (direction == 'down') {
                setActiveList(5, 4);
            }
            if (direction == 'up') {
                setActiveList(4, 3);
            }
        },
        group: 'list',
        offset: 100
    })

    var teaser = new Waypoint({
        element: document.getElementById('mvTeaser'),
        handler: function(direction) {
            if (direction == 'down') {
                setActiveList(6, 5);
            }
            if (direction == 'up') {
                setActiveList(5, 4);
            }
        },
        group: 'list',
        offset: 100
    })

    var endGame = new Waypoint({
        element: document.getElementById('mvTeaser'),
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

        if (!((list - 1) == 0)) {
            document.getElementById('list' + (list - 1)).style.fontSize = '14pt';
        }
        if (!((list + 1) == lists.length)) {
            document.getElementById('list' + (list + 1)).style.fontSize = '14pt';
        }

        document.getElementById('list' + list).style.fontSize = '16pt';
        document.getElementById('list' + list).style.fontWeight = 'bold';
        flashAnchor(rectangle);
    }

    function clearSpecial() {
        var specialImage = document.getElementsByClassName('specialImage');
        for (let i = 0; i < specialImages.length; i++) {
            specialImages[i].style.opacity = '0.25';
        }
    }

    function setActiveSpecial(index) {
        var specialImage = document.getElementsByClassName('specialImage');
        var indexBefore = index - 1
        var indexAfter = index + 1

        specialImage[index].style.opacity = '1';
        if (!((indexBefore) == -1)) {
            specialImage[indexBefore].style.opacity = '0.65';
        }
        if (!((indexAfter) == specialImage.length)) {
            specialImage[indexAfter].style.opacity = '0.65';
        }
    }

    function setActiveImage(index, top, left) {
        var picture = document.getElementById('picSpecial');
        picture.removeAttribute('src');
        picture.setAttribute('src', 'media/pics/concept3 ' + index + '.jpg')
        picture.style.top = '-' + top + 'px'
        picture.style.left = '-' + left + 'px'
    }

    function changeText(index) {
        var text = document.getElementById('mobileMessage');
        switch (index) {
            case 0:
                text.innerHTML = '[이런]<br> 포에버 안녕! 에버글로우의 이런이 왔어요<br> 어 이번에 저희가 6개월 만에 컴백했잖아요,<br> 이렇게 오랫동안 기다려주셔서 너무너무 감사합니다!<br> 그리고 이번에 타이틀곡 LA DI DA도 정말 열심히 준비하고 있는데요<br> 항상 힘들었지만 이번에 LA DI DA 안무도 정말 너무너무 어렵고<br> 너무 힘들었었는데 <br> 연습할 때 포에버 생각하면 정말 신기하게<br>잘할 수 있게 된 것 같아요!<br> 저희도 포에버 너무 보고 싶어서 얼른 준비하고<br> 얼른 보려고 열심히 노력하고 있습니다!<br> 포에버, 조금만 더 기다려 주세요!<br> 저희 이번에 정말 멋있게 준비하고 있으니까<br> 이번에도 많은 관심과 많은 응원 부탁드립니다!<br> 안녕~ 너무너무 사랑해요! 안녕!';
                break;
            case 1:
                text.innerHTML = '[온다]<br> 헬로헬로~ 안녕~ 포에버 안뇽!<br> 온다! 온다! 포에버를 향한 편지가 온다!<br> 오랜만에 온다 온다 멘트 해봤어요<br> 포에버 또 오랜만에 이렇게 제가 포에버에게 편지를 쓰게 되었는데요<br> 울 포에버! 솔직히 많이 기다렸죠?<br> 사실 저도 포에버 보고 싶어서 진짜 죽는 줄 알았는데<br> 포에버는 진짜 얼마나 기다렸을지 저는 상상이 안되는 거에요<br> 하지만 우리 포에버가 깜짝 놀랄 만큼<br> 저희 진짜 열심히 정말 멋있게 준비했단 말이에요<br> 그래서 진짜 맨날 맨날 얼른 포에버한테 보여주고 싶다<br> 이렇게 생각하고 있거든요<br> 아무튼 우리 포에버 많이 많이 기대해주고!<br> 우리 금방 만나요! 포에버 고마워!<br> 항상 사랑해~ 알러뷰~ 담에 봐~';
                break;
            case 2:
                text.innerHTML = '[시현]<br> 안녕하세요 여러분~ 저는 시현입니다.<br> 정말 정말 오랜만에 이렇게 보이스 레터를 준비하게 되었는데요,<br> 이번에 저희가 좀만 있으면 컴백 앨범이 나와요! 우와 짝짝짝짝짝<br> 앨범 준비를 굉장히 오래 하기도 했고<br> 이번에 그만큼 최선을 다한 정말 멋진 앨범이니까요 기대 많이 해주셨으면 좋겠고<br> 그리고, 오래오래 기다려준 우리 포에버 여러분들 너무 감사합니다<br>                                저도 얼른 하루빨리 나가고 싶은 마음이 큰데<br> 아직 며칠 남았으니까 좀만 더 기다려 주시구요!<br> 이번에 오래 기다리신 만큼<br> 훨씬 더 업그레이드되고 예쁘고 멋지고 카리스마 넘치는 모습으로 돌아올 거니까<br> 여러분 ! 기대 많~~~이 해주세요! 사랑해요 안녕!';
                break;
            case 3:
                text.innerHTML = '[이유]<br> 포에버, 안녕하세요 제가 누구게요?<br> 목소리만 들어도 알겠죠?<br> 우리 에버글로우의 듬직한 리더! 이유입니다.<br> 우리가 21일에 타이틀곡 LA DI DA로 우리 포에버 만나러 가려고 열심히 준비하고 있는데<br> 너무너무 보고 싶어서 이렇게 또 찾아왔어요<br> 저희 타이틀곡 LA DI DA 노래도 너무 좋고 안무도 진짜 멋있는데<br> 포에버한테 가장 먼저 보여주고 싶어서<br> 열심히 준비하고 있으니까<br> 우리 포에버들도 에글이들 멋진 모습, 그리고 또 멋진 무대<br> 기대 많이 해주셨으면 좋겠구요<br> 언제 어디서나 우리 에글이들은 포에버 생각하고 있으니까<br> 잊지 마시고, 앞으로도 더 좋은 모습 보여드리려고 열심히 할 테니까<br> 어디 가지 말고 항상 우리 옆에 함께 있어야 해요, 알았죠?<br> 그럼 우리는 또 포에버 만날 준비를 하러 가볼게요<br> 안녕!';
                break;
            case 4:
                text.innerHTML = '[미아]<br> 우리 포에버 예쁜이들 안뇽~ 미아에요!<br> 우리 포에버들, 에글이들 많이 기다렸죠?<br> 잘 지냈나 모르겠네<br> 에글이들도 우리 포에버 못 봐서 너무너무 힘들었어요<br> 진짜 너무너무 보고 싶어!<br> 방금 우리 티져 보고 왔는데, 아 우리 포에버가 기대해도 좋을 만큼 멋있으니까 <br> 많이 많이 기대들 하고 있어요!<br> 우리 정~말 정~말 열심히 준비했거든요! 그러니까<br> 이번 곡 LA DI DA 많이 좋아해 주고 사랑해주고 응원해줄 거죠?<br> 저 기대하고 있어요!<br> 다들 건강 조심하고 하루하루 행복한 날들만 보내요<br> 지금 포에버 못 봐서 죽을 수도 있어<br> 나는 더이상 못 기다려!<br> 하지만 포에버는 잘 참고 기다려줄 수 있을 거라고 믿어요<br> 우리 사랑둥이들 사랑해요<br> 안뇽! Bye Bye!';
                break;
            case 5:
                text.innerHTML = '[아샤]<br> 포에버 안녕하세요 아샤입니다<br> 드디어 이제 여러분께 제가 편지를 전할 수 있게 되었는데요!<br> 이거 되게 오랜만에 쓰는 편지 같은데<br> 뭔가 제가 잘 써보겠습니다!<br> 벌써 우리가 네 번째 앨범을 준비하고 있는데요,<br> LA DI DA 다들 티져 사진 보셨죠 완전 궁금하시죠<br> 저희 티져 사진을 보시면은 엄청 기대가 되실 텐데요<br> 사실 저희가 오늘 티져를 봤거든요!!! 근데 너무 잘 나와 가지고 엄청 기대 중인데<br> 앞으로도 저희 많이 사랑해 주실 거죠?<br> 저희 여태까지 정말 사랑해주신 만큼<br> 앞으로 더 열심히 할 테니까 이번 앨범 정말 사랑해주시고<br> 우리 포에버 너무너무 보고 싶은데<br> 빨리 이렇게 대화하고 볼 수 있는 날이 있었으면 좋겠어요<br> 항상 너무너무 고맙고 사랑하고 앞으로도 더 많이 사랑할 테니까<br>저희에버글로우이번 LA DI DA 앨범 많이 기대해주시고<br> 저희 나오는 날까지 아프지 말고 다들 행복합시다! 안녕!!';
                break;
        }


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