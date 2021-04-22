window.onload = function() {

    var cards = document.getElementsByClassName('card-content')

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