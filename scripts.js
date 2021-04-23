window.onload = function() {

    var cards = document.getElementsByClassName('card-content')

    function openingAnim() {
        var delay = 0;
        var Index = cards.length;
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.zIndex = Index
            cards[i].style.animationName = 'slideIn'
            cards[i].style.animationDelay = delay + "s";
            delay += 0.15
            Index -= 1
            cards[i].onanimationstart = function() {
                cards[i].style.visibility = 'visible'
            }
            cards[cards.length - 1].onanimationend = function() {
                document.getElementsByClassName('container-main-wrap')[0].style.overflow = 'visible'
                document.getElementsByClassName('copyright')[0].style.opacity = '100%'
                document.getElementsByClassName('logo')[0].style.opacity = '100%'
            }
        }
    }

    openingAnim()

    if (window.matchMedia('(min-width: 1200px)').matches) {
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("mouseenter", function() {
                cards[i].getElementsByClassName('card-description')[0].style.height = '4em'
                cards[i].getElementsByClassName('card-link')[0].style.height = '24px'
            })
            cards[i].addEventListener("mouseleave", function() {
                cards[i].getElementsByClassName('card-description')[0].style.height = '0'
                cards[i].getElementsByClassName('card-link')[0].style.height = '0'
            })
        }
    } else if (window.matchMedia('(min-width: 850px)').matches) {
        for (let i = 0; i < cards.length; i++) {
            cards[i].getElementsByClassName('card-link')[0].style.height = '24px'
        }
    }

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
            openNewLink(cards[i].getAttribute('id'))
        })
    }

    function openNewLink(destination) {
        switch (destination) {
            case 'instagram':
                open('http://instagram.com/clawdius_/')
                break
            case 'twitter':
                open('http://twitter.com/clawdius_/')
                break
            case 'twitter-bot':
                open('http://twitter.com/clawdius_bot/')
                break
            case 'pinterest':
                open('http://pinterest.com/clawdius_/')
                break
            case 'steam':
                open('http://steamcommunity.com/id/2ez4clawdius')
                break
            case 'github':
                open('http://github.com/clawdius')
                break
        }
    }


}