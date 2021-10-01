export default class FeedExpandedComponent {
    _parent
    _data

    constructor(parent) {
      this._parent = parent;
    }

    set data(data) {
      this._data = data;
    }
    _createElementWithClass(tag, className) {
      const element = document.createElement(tag);
      element.className = className;
      return element;
    }
    _renderDOM() {
      root.innerHTML = '';
      const container = this._createElementWithClass('div', 'card-container');
      const divCrad = document.createElement('div');
      divCrad.id = 'cardID';
      divCrad.className = 'card-expand';
      container.appendChild(divCrad);

      const divTapBar = document.createElement('div');
      divTapBar.id = 'tapbarID';
      divTapBar.className = 'tapbar-container';
      container.appendChild(divTapBar);
      root.appendChild(container);
      fillCard();

      function fillCard() {
        const divCrad = document.getElementById('cardID');

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
        divshrink.appendChild(buttonshrink);
        const imgshrink = document.createElement('img');
        imgshrink.src = 'icons/button_shrink_white.svg';
        imgshrink.className = 'shrink-card';
        imgshrink.style.width = '50px';
        imgshrink.style.height = '50px';
        imgshrink.alt = 'shrink';
        buttonshrink.appendChild(imgshrink);
      }


      /**
         * в будущем
         */
      function fillCardMain() {
        const cardMain = document.getElementById('cardMainID');

        const lol = window.Feed.getCurrentProfile();

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
        divTags.id = 'tagsID';
        divTags.className = 'card-el tags-container';
        cardMain.appendChild(divTags);

        for (const tag in lol.tags) {
          if (Object.prototype.hasOwnProperty.call(lol.tags, tag)) {
            const buttonTag = document.createElement('div');
            buttonTag.className = 'tag';
            buttonTag.innerHTML = `${lol.tags[tag]}`;
            divTags.appendChild(buttonTag);
          }
        }
      }
    }

    render() {
      this._renderDOM();
    }
}
