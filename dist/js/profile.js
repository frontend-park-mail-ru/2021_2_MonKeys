'use strict';

let sample = [{
        'name': 'Elon',
        'age': '25',
        'photoSrc': 'dist\\img\\Elon_Musk_2015.jpg',
        'text': `Инст: @elonmask<br>
        Всем привет меня зовут Илон Маск. Люблю играть в
        геншин импакт, обажаю гаремники. 
        Просто не могу жить без иссекаев,
        мое любимое аниме это конечно же Ван Пис ахахах)
        Я посмотрел все 1000+ серий
        так же у меня есть краш, поэтому ищу ТОЛЬКО ДРУГА
        в общем буду твоим сенпаем, писать в инсту, 
        а то drip лагает ахахахах)`,
        'tags' : [
            'anime',
            'IT',
            'music',
            'soccer',
        ]
    },
    {
        'name': 'Michail',
        'age': '20',
        'photoSrc': 'dist\\img\\Elon_Musk_2015.jpg',
        'text': `
        Инст: @marvin<br>
        Тг: @Marvin<br>
        Првиет я Миша мне 2 года
        люблю сосать члены, господи как же я люблю хуи
        по жизни пассив конченный
        обоссанцец. Обожаю играть в геншин
        `,
        'tags' : [
            'banana',
            'fullstack',
            'gay',
            'anal',
        ]
    },
]

function fillCardMain() {

    const cardMain = document.getElementById('cardMainID')

    const lol = sample[0];
    
    const img = document.createElement('img');
    img.src = `${lol.photoSrc}`;
    img.className = 'card-el profile-image';
    cardMain.appendChild(img);
    
    const divName = document.createElement('div');
    divName.className = 'name';
    divName.textContent = `${lol.name}, ${lol.age}`;
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

export default function profileRender() {
    const divMain = document.getElementById('main');

    const divCrad = document.createElement('div');
    divCrad.id = 'cardID';
    divCrad.className = 'card';
    divMain.appendChild(divCrad);

    const divTapBar = document.createElement('div');
    divTapBar.id = 'tapbarID';
    divTapBar.className = 'tapbar-container';
    divMain.appendChild(divTapBar);

    fillCard();
    fillTapBar();
}

function fillCard() {
    const divCrad = document.getElementById('cardID')

    const divCardMain = document.createElement('div');
    divCardMain.id = 'cardMainID';
    divCardMain.className = 'card-main';
    divCrad.appendChild(divCardMain);

    fillCardMain();

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

function fillTapBar() {
    const divTapBar = document.getElementById('tapbarID');

    const buttonDropDesel = document.createElement('button');
    buttonDropDesel .className = 'menu-icon';
    divTapBar.appendChild(buttonDropDesel)
    const imgDropDesel = document.createElement('img');
    imgDropDesel.src = 'dist/icons/tapbar_feed_white_deselected.svg';
    imgDropDesel.style.width = '50px';
    imgDropDesel.style.height = '50px';
    imgDropDesel.alt = 'drop';
    buttonDropDesel.appendChild(imgDropDesel);

    const buttonLikeDesel = document.createElement('button');
    buttonLikeDesel .className = 'menu-icon';
    divTapBar.appendChild(buttonLikeDesel)
    const imgLikeDesel = document.createElement('img');
    imgLikeDesel.src = 'dist/icons/tapbar_likes_white_deselected.svg';
    imgLikeDesel.style.width = '50px';
    imgLikeDesel.style.height = '50px';
    imgLikeDesel.alt = 'like';
    buttonLikeDesel.appendChild(imgLikeDesel);

    const buttonMessageDesel = document.createElement('button');
    buttonMessageDesel .className = 'menu-icon';
    divTapBar.appendChild(buttonMessageDesel)
    const imgMessageDesel = document.createElement('img');
    imgMessageDesel.src = 'dist/icons/tapbar_chat_white_deselected.svg';
    imgMessageDesel.style.width = '50px';
    imgMessageDesel.style.height = '50px';
    imgMessageDesel.alt = 'drop';
    buttonMessageDesel.appendChild(imgMessageDesel);

    const buttonProfileSelec = document.createElement('button');
    buttonProfileSelec .className = 'menu-icon';
    divTapBar.appendChild(buttonProfileSelec)
    const imgProfileSelec = document.createElement('img');
    imgProfileSelec.src = 'dist/icons/tapbar_user_white_selected.svg';
    imgProfileSelec.style.width = '50px';
    imgProfileSelec.style.height = '50px';
    imgProfileSelec.alt = 'drop';
    buttonProfileSelec.appendChild(imgProfileSelec); 
}

profileRender();