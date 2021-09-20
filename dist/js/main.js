'use strict';

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

let body = document.querySelector('body');
let counter = 0;
let sample = [{
        'firstName': 'Elon',
        'age': "25",
        'photoSrc': "dist/img/Elon_Musk_2015.jpg",
        'colorFrom': 'grey',
        'colorTo': 'black',
    },
    {
        'firstName': 'Ilyagu',
        'age': "20",
        'photoSrc': "dist/img/kUoqFCTbj0Y.jpg",
        'colorFrom': 'white',
        'colorTo': 'red',
    },
    {
        'firstName': 'Ilyagu2',
        'age': "21",
        'photoSrc': "dist/img/aj1-V9h9GGM.jpg",
        'colorFrom': 'pink',
        'colorTo': 'red',
    },
    {
        'firstName': 'Ilyagu3',
        'age': "22",
        'photoSrc': "dist/img/kUoqFCTbj0Y.jpg",
        'colorFrom': 'white',
        'colorTo': 'red',
    }
]



function nextCharacter() {
    const currentobj = sample[counter];
    counter++;
    let elonInside = `
    <img src="${currentobj.photoSrc}" class="profile-image">

            <div class="bottom-panel">
                <div class="name">
                    ${currentobj.firstName}
                    ${currentobj.age}
                </div>
                <div class="class actions-container">
                    <button class="menu-icon">
                        <img src="dist/icons/button_dislike_white.svg" width="50px" height="50px" alt="drop">           
                    </button>
                    <button class="menu-icon">
                        <img src="dist/icons/button_expand_white.svg" width="50px" height="50px" alt="drop">           
                    </button>
                    <button class="menu-icon">
                        <img src="dist/icons/tapbar_likes_white_selected.svg" width="50px" height="50px" alt="drop">           
                    </button>
                </div>
            </div>
    `;
    body.style.background = `linear-gradient(120deg, ${currentobj.colorFrom}, ${currentobj.colorTo})`;
    let card1new = document.getElementsByClassName("card2")[0]
    card1new.className = "card"
    card1new.innerHTML = elonInside;
    let card3new = document.getElementsByClassName("card3")[1]
    card3new.className = "card2"
    let cardOld = document.getElementsByClassName("card")[1];
    body.removeChild(cardOld)
    let nextCard = document.createElement('div');
    nextCard.className = 'card3'
    let temp = body.innerHTML
    let newBody = '<div class="card3"></div>' + temp;
    body.innerHTML = newBody;
    currentCard = document.getElementsByClassName("card")[0]

    previousCard = document.getElementsByClassName("card2")[0]
    previousCard2 = document.getElementsByClassName("card3")[1]

    x1 = null;
    y1 = null;

    x = null;
    y = null;
}

let nextCard = document.createElement('div');
nextCard.className = 'card3'
let temp = body.innerHTML
let newBody = '<div class="card3"></div>' + temp;
body.innerHTML = newBody;
let currentCard = document.getElementsByClassName("card")[0]

let previousCard = document.getElementsByClassName("card2")[0]
let previousCard2 = document.getElementsByClassName("card3")[1]

let x1 = null;
let y1 = null;

let x = null;
let y = null;

function remove() {
    currentCard.style.opacity = 0;
}

function handleTouchStart(event) {
    let { touches } = event;
    currentCard.style.animation = "";
    x1 = touches[0].clientX;
    y1 = touches[0].clientY;

}

function moveRight(element, diffX, diffY) {
    var elStyle = window.getComputedStyle(element);
    var leftValue = elStyle.getPropertyValue("left").replace("px", "");
    element.style.transform = `translate(${diffX}px, ${diffY}px)`;
    const topScale = 12 - (diffX / 40);
    if (topScale > 5) {
        previousCard.style.top = `${topScale}%`;
    }
    const heightScale = 75 + (diffX / 40);
    if (heightScale < 80) {
        previousCard.style.height = `${heightScale}%`;
    }

    const widthScale = 90 + (diffX / 40);
    if (widthScale < 95) {
        previousCard.style.width = `${widthScale}%`;
    }

    const topScale2 = 19 - (diffX / 40);
    if (topScale2 > 12) {
        previousCard2.style.top = `${topScale2}%`;
    }
    const heightScale2 = 70 + (diffX / 40);
    if (heightScale2 < 75) {
        previousCard2.style.height = `${heightScale2}%`;
    }

    const widthScale2 = 85 + (diffX / 40);
    if (widthScale2 < 90) {
        previousCard2.style.width = `${widthScale2}%`;
    }

    console.log(topScale, heightScale, widthScale)

    // previousCard2.style.height = `${70+(diffX/40)}%`;
    // previousCard2.style.width = `${85+(diffX/40)}%`;
    // previousCard2.style.top = `${19-(diffX/60)}%`;
    // console.log(19 - (diffX / 60));
    element.style.transform += `rotateZ(${Math.abs(diffX/10)}deg)`;
}

function handleTouchMove(event) {

    let { touches } = event;
    x = touches[0].clientX;
    y = touches[0].clientY;
    if (window.innerHeight < y || window.innerWidth < x || y < 0 || x < 0) {

        return false;
    }
    moveRight(currentCard, x - x1, y - y1);

}

function returnToStart() {
    currentCard.style.animation = "";
    currentCard.style.transform = "translate(0px, 0px)";
}

function handleTouchEnd(event) {
    if (!x1 || !y1) {
        return false;
    }
    if (x1 - x < -200) {
        currentCard.style.animation = "liked 1s ease 1";
        setTimeout(remove, 1000);
        setTimeout(nextCharacter, 1000);
    } else if (x1 - x > 200) {
        currentCard.style.animation = "liked 1s ease 1";
        setTimeout(remove, 1000);
        setTimeout(nextCharacter, 1000);
    } else {
        currentCard.style.animation = "spin2 1s linear 1";
        setTimeout(returnToStart, 1000);
    }
}