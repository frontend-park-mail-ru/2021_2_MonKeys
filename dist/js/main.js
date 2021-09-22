'use strict';

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

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



let body = document.querySelector('body');

let createActionElement = (icon) => {

    let actionElement = document.createElement('button');
    actionElement.className = 'menu-icon';

    let Icon = document.createElement('img');
    Icon.src = icon;
    Icon.width = 40;
    Icon.height = 40;

    actionElement.appendChild(Icon);

    return actionElement;
}

let createElementWithClass = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element
}

let addMenu = () => {
    let menu = createElementWithClass('div', 'tapbar-container');
    menu.appendChild(createActionElement('dist/icons/tapbar_feed_white_selected.svg'));
    menu.appendChild(createActionElement('dist/icons/tapbar_likes_white_deselected.svg'));
    menu.appendChild(createActionElement('dist/icons/tapbar_chat_white_deselected.svg'));
    menu.appendChild(createActionElement('dist/icons/tapbar_user_white_deselected.svg'));
    body.appendChild(menu);
}

addMenu();


function nextCharacter() {
    const currentobj = sample[counter];
    counter++;
    let card = createElementWithClass('div', 'card-main');
    let image = document.createElement('img');
    image.src = currentobj.photoSrc;
    image.className = 'profile-image';
    card.appendChild(image);
    let bottomPanel = createElementWithClass('div', 'bottom-panel');
    let nameContainer = createElementWithClass('div', 'name-container');
    let name = createElementWithClass('div', 'name')
    name.innerText = currentobj.firstName;
    let age = createElementWithClass('div', 'age');
    age.innerText = currentobj.age;
    nameContainer.appendChild(name)
    nameContainer.appendChild(age)
    bottomPanel.appendChild(nameContainer);
    let actionsContainer = createElementWithClass('div', 'actions-container');
    actionsContainer.appendChild(createActionElement('dist/icons/button_dislike_white.svg'));
    actionsContainer.appendChild(createActionElement('dist/icons/button_expand_white.svg'));
    actionsContainer.appendChild(createActionElement('dist/icons/tapbar_likes_white_selected.svg'));
    bottomPanel.appendChild(actionsContainer)
    card.appendChild(bottomPanel)
    body.appendChild(card)

    let mainCard = document.getElementsByClassName("card2")[0]
    mainCard.className = "card"
    mainCard.appendChild(card)

    document.getElementsByClassName("card3")[1].className = "card2";
    body.removeChild(document.getElementsByClassName("card")[1])

    let newBody = '<div class="card3"></div>' + body.innerHTML;
    body.innerHTML = newBody;

    currentCard = document.getElementsByClassName("card")[0]
    previousCard = document.getElementsByClassName("card2")[0]
    previousCard2 = document.getElementsByClassName("card3")[1]
    document.getElementsByClassName('card-main')[0].style.animation = "appearance 0.3s linear 1";

}


let temp = body.innerHTML
let newBody = '<div class="card3"></div>' + temp;
body.innerHTML = newBody;
let currentCard;
let previousCard;
let previousCard2;


nextCharacter();

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
    const topScale = 12 - Math.abs(diffX / 40);
    if (topScale > 5) {
        previousCard.style.top = `${topScale}%`;
    }
    const heightScale = 75 + Math.abs(diffX / 40);
    if (heightScale < 80) {
        previousCard.style.height = `${heightScale}%`;
    }

    const widthScale = 90 + Math.abs(diffX / 40);
    if (widthScale < 95) {
        previousCard.style.width = `${widthScale}%`;
    }

    const topScale2 = 19 - Math.abs(diffX / 40);
    if (topScale2 > 12) {
        previousCard2.style.top = `${topScale2}%`;
    }
    const heightScale2 = 70 + Math.abs(diffX / 40);
    if (heightScale2 < 75) {
        previousCard2.style.height = `${heightScale2}%`;
    }

    const widthScale2 = 85 + Math.abs(diffX / 40);
    if (widthScale2 < 90) {
        previousCard2.style.width = `${widthScale2}%`;
    }



    element.style.transform += `rotateZ(${(diffX/10)}deg)`;
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
    currentCard.style.transform = "translate(0px, 0px)";
    previousCard.style.width = "90%";
    previousCard.style.height = "75%";
    previousCard.style.top = "12%";
    previousCard.style.animation = ""
    previousCard2.style.width = "85%";
    previousCard2.style.height = "70%";
    previousCard2.style.top = "19%";
    previousCard2.style.animation = ""
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
        previousCard.style.animation = "shrinkSecondary 1s linear 1";
        previousCard2.style.animation = "shrinkThird 1s linear 1";
        currentCard.style.animation = "spin2 1s linear 1";
        setTimeout(returnToStart, 1000);
    }
}