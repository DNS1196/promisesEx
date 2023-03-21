let baseURL = 'https://deckofcardsapi.com/api/deck'


$.getJSON(`${baseURL}/new/draw/`)
    .then((data) => {
        console.log(`${data.cards[0].value} of ${data.cards[0].suit}`)
    })


let card1 = null;
let card2 = null;
$.getJSON(`${baseURL}/new/draw/`)
    .then((data) => {
        card1 = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then((data) => {
        card2 = data.cards[0];

        for (let data of [card1, card2]) {
            console.log(`${data['value']} of ${data['suit']}`)
        }
    })


let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

$.getJSON(`${baseURL}/new/shuffle/`)
    .then(data => {
        deckId = data.deck_id
        $btn.show()
    })
$btn.on('click', function () {
    $.getJSON(`${baseURL}/${deckId}/draw`).then(data => {
        let cardSrc = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (data.remaining === 0) $btn.remove();
    });
});
