let favNumber = 10;
let baseURL = 'http://numbersapi.com';

$.getJSON(`${baseURL}/${favNumber}?json`)
    .then(data => console.log(data))


let favNumbers = [3, 7, 13];
$.getJSON(`${baseURL}/${favNumbers}?json`)
    .then(data => {
        console.log(data)
        for (let number in data) {
            $('body').append(`<p>${data[number]}</p>`);
        }
    })
    .catch(error => console.log(error));


let fourFacts = [];
for (let i = 1; i < 5; i++) {
    fourFacts.push($.getJSON(`${baseURL}/${favNumber}?json`));
}
Promise.all(fourFacts)
    .then(facts => (
        facts.forEach(fact => {
            $("body").append(`<li>${fact.text}</li>`);
        })
    ))
    .catch(err => console.log("Error ocurred", err));

