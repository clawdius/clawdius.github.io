window.onload = function() {

    function intro() {
        var items = document.getElementsByClassName('item')
        var delay = 0;
        for (let i = 0; i < items.length; i++) {
            items[i].style.opacity = '0'

            if (i % 2 == 0) {
                items[i].style.animation = 'itemSlideToLeft 0.8s ease-out'
            } else {
                items[i].style.animation = 'itemSlideToRight 0.8s ease-out'
            }
            items[i].style.animationDelay = delay + 's'
            items[i].onanimationend = function() {
                items[i].style.opacity = '1'
            }

            delay += 0.25
        }
    }

    intro()

}