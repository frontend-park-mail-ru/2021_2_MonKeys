'use strict';

function fillUserProfile() {

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

function userProfileRender() {
    const divMain = document.getElementById('main');

    const divCrad = document.createElement('div');
    divCrad.id = 'cardID';
    divCrad.className = 'card';
    divMain.appendChild(divCrad);

    const divTapBar = document.createElement('div');
    divTapBar.id = 'tapbarID';
    divTapBar.className = 'tapbar-container';
    divMain.appendChild(divTapBar);

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


userProfileRender();