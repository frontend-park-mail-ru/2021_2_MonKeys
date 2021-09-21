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

    // previousCard = document.getElementsByClassName("card2")[0]
    // previousCard2 = document.getElementsByClassName("card3")[1]

    x1 = null;
    y1 = null;

    x = null;
    y = null;
}