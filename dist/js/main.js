'use strict';


let root = document.getElementById('root');




const configApp = {
    'menu-feed': {
        link: '/feed',
        name: 'feed',
        open: renderFeed,
    },
    'menu-profile': {
        link: '/profile',
        name: 'profile',
        open: userProfileRender,
    },
    'expand-card': {
        link: '/feed',
        name: 'feed',
        open: profileRender,
    },
    'shrink-card': {
        link: '/feed',
        name: 'feed',
        open: renderFeed,
    },
    'menu-likes': {
        link: '/likes',
        name: 'likes',
        open: notDoneYet,
    },
    'menu-chat': {
        link: '/likes',
        name: 'chat',
        open: notDoneYet,
    },

}


function clickButtons(event) {
    const { target } = event;
    if (configApp[target.className]) {
        clearRoot();
        configApp[target.className].open();
        addMenu(configApp[target.className].name);
    }
}

function notDoneYet() {
    root.innerHTML = 'Not done Yet';
}




let currentCard;
let previousCard;
let previousCard2;



// START 
renderFeed();


function fillCardMain() {

    const cardMain = document.getElementById('cardMainID')

    const lol = sample[counter];

    const img = document.createElement('img');
    img.src = `${lol.photoSrc}`;
    img.className = 'card-el profile-image-expand';
    cardMain.appendChild(img);

    const divName = document.createElement('div');
    divName.className = 'name';
    divName.textContent = `${lol.firstName}, ${lol.age}`;
    cardMain.appendChild(divName);

    const divBord = document.createElement('div');
    divBord.className = 'card-el bord';
    cardMain.appendChild(divBord);

    const divDesc = document.createElement('div');
    divDesc.className = 'card-el desc';
    divDesc.innerHTML = `${lol.text}`;
    cardMain.appendChild(divDesc);

    const divBord2 = document.createElement('div');
    divBord2.className = 'card-el bord';
    cardMain.appendChild(divBord2);

    const divTags = document.createElement('div');
    divTags.id = 'tagsID'
    divTags.className = 'card-el tags-container';
    cardMain.appendChild(divTags);

    for (var tag in lol.tags) {
        const buttonTag = document.createElement('div');
        buttonTag.className = 'tag';
        buttonTag.innerHTML = `${lol.tags[tag]}`;
        divTags.appendChild(buttonTag)
    }
}

function profileRender() {

    const divCrad = document.createElement('div');
    divCrad.id = 'cardID';
    divCrad.className = 'card-expand';
    root.appendChild(divCrad);

    const divTapBar = document.createElement('div');
    divTapBar.id = 'tapbarID';
    divTapBar.className = 'tapbar-container';
    root.appendChild(divTapBar);

    fillCard();

}


function fillUserProfile() {

    const cardMain = document.getElementById('cardMainID')

    const lol = user;

    const img = document.createElement('img');
    img.src = `${lol.photoSrc}`;
    img.className = 'card-el profile-image-expand';
    cardMain.appendChild(img);

    const divName = document.createElement('div');
    divName.className = 'name';
    divName.textContent = `${lol.firstName}, ${lol.age}`;
    cardMain.appendChild(divName);

    const divBord = document.createElement('div');
    divBord.className = 'card-el bord';
    cardMain.appendChild(divBord);

    const divDesc = document.createElement('div');
    divDesc.className = 'card-el desc';
    divDesc.innerHTML = `${lol.text}`;
    cardMain.appendChild(divDesc);

    const divBord2 = document.createElement('div');
    divBord2.className = 'card-el bord';
    cardMain.appendChild(divBord2);

    const divTags = document.createElement('div');
    divTags.id = 'tagsID'
    divTags.className = 'card-el tags-container';
    cardMain.appendChild(divTags);

    for (var tag in lol.tags) {
        const buttonTag = document.createElement('button');
        buttonTag.className = 'tag';
        buttonTag.innerHTML = `${lol.tags[tag]}`;
        divTags.appendChild(buttonTag)
    }
}

function userProfileRender() {

    const divCrad = document.createElement('div');
    divCrad.id = 'cardID';
    divCrad.className = 'card-expand';
    root.appendChild(divCrad);

    const divTapBar = document.createElement('div');
    divTapBar.id = 'tapbarID';
    divTapBar.className = 'tapbar-container';
    root.appendChild(divTapBar);

    fillUser();
}

function fillUser() {
    const divCrad = document.getElementById('cardID')

    const divCardMain = document.createElement('div');
    divCardMain.id = 'cardMainID';
    divCardMain.className = 'card-main';
    divCrad.appendChild(divCardMain);

    fillUserProfile();

    const divEdit = document.createElement('div');
    divEdit.id = 'editID';
    divEdit.className = 'forEdit';
    divCrad.appendChild(divEdit);

    fillEdit();
}

function fillEdit() {
    const divEdit = document.getElementById('editID');

    const buttonEdit = document.createElement('button');
    buttonEdit.className = 'menu-icon';
    divEdit.appendChild(buttonEdit)
    const imgEdit = document.createElement('img');
    imgEdit.src = 'dist/icons/button_edit_white.svg';
    imgEdit.style.width = '50px';
    imgEdit.style.height = '50px';
    imgEdit.alt = 'edit';
    buttonEdit.appendChild(imgEdit);
}




function fillCard() {
    const divCrad = document.getElementById('cardID')

    const divCardMain = document.createElement('div');
    divCardMain.id = 'cardMainID';
    divCardMain.className = 'card-main-expand';
    divCrad.appendChild(divCardMain);

    fillCardMain();

    const divshrink = document.createElement('div');
    divshrink.id = 'shrinkID';
    divshrink.className = 'forshrink';
    divCrad.appendChild(divshrink);

    fillshrink();
}

function fillshrink() {
    const divshrink = document.getElementById('shrinkID');

    const buttonshrink = document.createElement('button');
    buttonshrink.className = 'menu-icon';
    divshrink.appendChild(buttonshrink)
    const imgshrink = document.createElement('img');
    imgshrink.src = 'dist/icons/button_shrink_white.svg';
    imgshrink.className = 'shrink-card'
    imgshrink.style.width = '50px';
    imgshrink.style.height = '50px';
    imgshrink.alt = 'shrink';
    buttonshrink.appendChild(imgshrink);
}











function createActionElement(icon, action) {

    let actionElement = document.createElement('button');
    actionElement.className = 'menu-icon';
    let Icon = document.createElement('img');
    Icon.src = icon;
    Icon.width = 40;
    Icon.height = 40;
    Icon.classList.add(action);

    actionElement.appendChild(Icon);

    return actionElement;
}

function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element
}

function addMenu(activeItem) {
    let menu = createElementWithClass('div', 'tapbar-container');
    if (activeItem === 'feed') {
        menu.appendChild(createActionElement('dist/icons/tapbar_feed_white_selected.svg', 'menu-feed'));
    } else {
        menu.appendChild(createActionElement('dist/icons/tapbar_feed_white_deselected.svg', 'menu-feed'));
    }
    if (activeItem === 'likes') {
        menu.appendChild(createActionElement('dist/icons/tapbar_likes_white_selected.svg', 'menu-likes'));
    } else {
        menu.appendChild(createActionElement('dist/icons/tapbar_likes_white_deselected.svg', 'menu-likes'));
    }
    if (activeItem === 'chat') {
        menu.appendChild(createActionElement('dist/icons/tapbar_chat_white_selected.svg', 'menu-chat'));
    } else {
        menu.appendChild(createActionElement('dist/icons/tapbar_chat_white_deselected.svg', 'menu-chat'));
    }
    if (activeItem === 'profile') {
        menu.appendChild(createActionElement('dist/icons/tapbar_user_white_selected.svg', 'menu-profile'));
    } else {
        menu.appendChild(createActionElement('dist/icons/tapbar_user_white_deselected.svg', 'menu-profile'));
    }

    root.appendChild(menu);
}




function clearRoot() {
    root.innerHTML = '';
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
}


document.addEventListener('click', clickButtons, false);
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);
addMenu('feed');

function renderFeed() {

    document.addEventListener('click', clickButtons, false);
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    const currentobj = sample[counter];

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


    actionsContainer.appendChild(createActionElement('dist/icons/button_dislike_white.svg', 'dislike-card'));

    actionsContainer.appendChild(createActionElement('dist/icons/button_expand_white.svg', 'expand-card'));

    actionsContainer.appendChild(createActionElement('dist/icons/tapbar_likes_white_selected.svg', 'like-card'));


    bottomPanel.appendChild(actionsContainer)
    card.appendChild(bottomPanel)



    root.appendChild(createElementWithClass('div', 'card3'));
    root.appendChild(createElementWithClass('div', 'card3'));
    root.appendChild(createElementWithClass('div', 'card2'));
    let cardNew = createElementWithClass('div', 'card');
    cardNew.appendChild(card);
    root.appendChild(cardNew);

    currentCard = document.getElementsByClassName("card")[0]
    previousCard = document.getElementsByClassName("card2")[0]
    previousCard2 = document.getElementsByClassName("card3")[1]
    let cardMain = document.getElementsByClassName('card-main')[0]

}

function nextCharacter() {
    const currentobj = sample[counter];

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


    actionsContainer.appendChild(createActionElement('dist/icons/button_dislike_white.svg', 'dislike-card'));

    actionsContainer.appendChild(createActionElement('dist/icons/button_expand_white.svg', 'expand-card'));

    actionsContainer.appendChild(createActionElement('dist/icons/tapbar_likes_white_selected.svg', 'like-card'));


    bottomPanel.appendChild(actionsContainer)
    card.appendChild(bottomPanel)
    root.appendChild(card)

    let mainCard = document.getElementsByClassName("card2")[0]
    if (mainCard) {
        mainCard.className = "card"
        mainCard.appendChild(card)
    } else {
        let mainCard = document.createElement('div');
        mainCard.className = "card"
        mainCard.appendChild(card)
    }

    let card3old = document.getElementsByClassName("card3")[1]
    if (card3old) {
        card3old.className = "card2";
    }
    let card1 = document.getElementsByClassName("card")[0]
    if (card1) {
        root.removeChild(document.getElementsByClassName("card")[1])
    }


    let newroot = '<div class="card3"></div>' + root.innerHTML;
    root.innerHTML = newroot;

    currentCard = document.getElementsByClassName("card")[0]
    previousCard = document.getElementsByClassName("card2")[0]
    previousCard2 = document.getElementsByClassName("card3")[1]
    let cardMain = document.getElementsByClassName('card-main')[0]
    if (cardMain) {
        cardMain.style.animation = "appearance 0.3s linear 1";
    }
}





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

    if (x === null) {
        x = x1;
    }
    if (x1 - x < -200) {
        currentCard.style.animation = "liked 1s ease 1";
        setTimeout(remove, 1000);
        setTimeout(nextCharacter, 1000);
        counter++;

        x1 = null;
        x = null;

    } else if (x1 - x > 200) {
        currentCard.style.animation = "liked 1s ease 1";

        setTimeout(remove, 1000);
        setTimeout(nextCharacter, 1000);
        counter++;
        x1 = null;
        x = null;

    } else {
        const { target } = event;
        if (!(target.class === 'expand-class' || target.alt === 'shrink')) {
            previousCard.style.animation = "shrinkSecondary 1s linear 1";
            previousCard2.style.animation = "shrinkThird 1s linear 1";
            currentCard.style.animation = "spin2 1s linear 1";
            setTimeout(returnToStart, 1000);

        }


    }
}