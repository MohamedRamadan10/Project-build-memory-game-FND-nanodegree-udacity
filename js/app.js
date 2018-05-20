// declare variable of cards array holds all cards
let card = document.getElementsByClassName("card"),
    cards = [...card];
console.log(cards); // For Checking arrays at develope tools

// declare variable of deck of all cards variable
const deck = document.getElementById("card-deck");

// declare variable of move variable
let moves = 0,
    counter = document.querySelector(".moves");

// declare variable of star icons variable
const stars = document.querySelectorAll(".fa-star");

// declare variable of matched cards
let matchedCard = document.getElementsByClassName("match");

// declare variable of stars list
let starsList = document.querySelectorAll(".stars li");

// declare variable of declare modal
let modal = document.getElementById("popup");

// declare variable of array for opened cards
let openedCards = [];

// Decalare variable of restart
const restartButton = document.getElementById("restart");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// function shuffles cards when page is refreshed / loaded
document.body.onload = startGame();


// function function to start a new play 
function startGame() {
    // Start timer when user clicks 
    deck.onclick = function () {
        this.onclick = null;
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    };
    // shuffle deck
    cards = shuffle(cards);

    // remove all exisiting classes from each card
    var i = 0;
    for (i; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset rating
    for (i; i < stars.length; i++) {
        stars[i].style.color = "#ffd700";
        stars[i].style.visibility = "visible";
    }

    //reset timer 
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer").innerHTML = "0 " + "mins" + " : " + " 0 " + "secs";

    clearInterval(interval);

    // reset rating
    var i = 0;
    for (i; i < stars.length; i++) {
        stars[i].style.color = "#ffd700";
        stars[i].style.visibility = "visible";
    }
}


// function toggles open and show class to display cards
let displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// function add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    let len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].dataset.name === openedCards[1].dataset.name) {
            matched();
        } else {
            unmatched();
        }
    }
};


// function when cards match
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// function when cards don't match
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}


// function disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}


// function enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        var i = 0;
        for (i; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

// Declare varibale of rating stars
var rating;
// function count player's moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    // setting rates based on moves
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
                rating = 2;
            }
        }
    } else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
                rating = 1;
            }
        }
    }
}


// function game timer
var second = 0,
    minute = 0,
    hour = 0,
    timer = document.querySelector(".timer"),
    interval;

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + " mins" + " : " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


// function congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                title: 'Congratulations! You Won!',
                text: 'With ' + moves + ' Moves and ' + rating + ' Stars in ' + finalTime,
                type: 'success',
                confirmButtonColor: '#12ed09',
                confirmButtonText: 'Play again!'
            },
            function (isConfirm) {
                if (isConfirm) {
                    startGame()
                }
            })
    };
}

// Restart Button
restartButton.addEventListener('click', function () {
    swal({
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'Are you sure?',
        text: "Your progress will be Lost!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#12ed09',
        cancelButtonColor: '#de1010',
        confirmButtonText: 'Yes, Restart Game!'
    }, function (isConfirm) {
        if (isConfirm) {
            startGame()
        }
    })
});

// loop to add event listeners to each card
for (i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};
