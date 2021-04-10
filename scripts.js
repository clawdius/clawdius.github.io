window.onload = function() {

    function intro() {
        var items = document.getElementsByClassName('item')
        var delay = 0;

        document.getElementById('title').style.animation = 'itemSlideUp 0.5s ease-in-out'
        document.getElementById('smallTitle').style.animation = 'itemSlideUp 0.85s ease-in-out'

        for (let i = 0; i < items.length; i++) {
            items[i].style.opacity = '0'

            if (i % 2 == 0) {
                items[i].style.animation = 'itemSlideToLeft 0.35s ease-out'
            } else {
                items[i].style.animation = 'itemSlideToRight 0.35s ease-out'
            }
            items[i].style.animationDelay = delay + 's'
            items[i].onanimationend = function() {
                items[i].style.opacity = '1'
            }

            delay += 0.1
        }
    }

    intro()


    //Declare array and orders
    bgcolors = ['#4b81e4', '#f59342', '#2dbd81', '#aa2dbd', '#bd2d7f', '#bd2d37', '#bd512d']
    colorsOrder = 0

    //Declare elements
    var Panel = document.getElementById('firstPanel')
    var Span = document.getElementById('firstSpan')

    //Declare dynamic color
    var root = document.querySelector(':root')
    root.style.setProperty('--DynamicColor', bgcolors[0])

    //Startup
    Panel.style.transition = ''
    Span.style.transition = ''

    Panel.style.backgroundColor = bgcolors[0]
    Span.style.color = bgcolors[0]

    function changeBG() {
        if (colorsOrder == bgcolors.length) {
            colorsOrder = 0
        }

        Span.style.color = bgcolors[colorsOrder]
        Panel.style.backgroundColor = bgcolors[colorsOrder]
        root.style.setProperty('--DynamicColor', bgcolors[colorsOrder])

        colorsOrder += 1
    }

    changeBG()

    //Change background every 4 secs
    setInterval(function() {
        changeBG()
        Panel.style.transition = 'background-color 2s ease-in-out'
        Span.style.transition = 'all 2s ease-in-out'
    }, 2000)


}