export default class FeedComponent {
    _parent
    _data


    constructor(parent) {
        this._parent = parent;
    }

    set data(data) {
        this._data = data;
    }

    /**
     * @param {String} tag - название тэга
     * @param {String} className - название класса
     * @return {HTMLElement} - Полученный элемент с тэгом
     */
    _createElementWithClass(tag, className) {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    }


    _renderDOM() {
        /**
         * @param {String} icon - путь до иконки для кнопки с действием
         * @param {String} action - класс действия
         * @return {HTMLButtonElement} - полученная кнопка
         */
        function createActionElement(icon, action) {
            const actionElement = document.createElement('button');
            actionElement.className = 'menu-icon';
            const Icon = document.createElement('img');
            Icon.src = icon;
            Icon.width = 40;
            Icon.height = 40;
            Icon.classList.add(action);

            actionElement.appendChild(Icon);

            return actionElement;
        }
        root.innerHTML = '';


        const currentobj = window.Feed.getCurrentProfile();

        if (!currentobj) {
            root.innerHTML = '';
            const outOfCardsContainer = this._createElementWithClass('div', 'center-container');
            const outOfCardsSVG = this._createElementWithClass('img', 'out-of-cards-svg');
            outOfCardsSVG.src = './svg/heart.svg';
            outOfCardsContainer.appendChild(outOfCardsSVG);
            root.appendChild(outOfCardsContainer);

            return;
        }
        const container = this._createElementWithClass('div', 'card-container');
        const card = this._createElementWithClass('div', 'card-main');
        const image = document.createElement('img');
        image.src = currentobj.photoSrc;
        image.className = 'profile-image';
        card.appendChild(image);
        const bottomPanel = this._createElementWithClass('div', 'bottom-panel');
        const nameContainer = this._createElementWithClass('div', 'name-container');
        const name = this._createElementWithClass('div', 'name');
        name.innerText = currentobj.firstName;
        const age = this._createElementWithClass('div', 'age');
        age.innerText = currentobj.age;
        nameContainer.appendChild(name);
        nameContainer.appendChild(age);
        bottomPanel.appendChild(nameContainer);
        const actionsContainer = this._createElementWithClass('div', 'actions-container');


        actionsContainer.appendChild(createActionElement('icons/button_dislike_white.svg', 'dislike-card'));

        actionsContainer.appendChild(createActionElement('icons/button_expand_white.svg', 'expand-card'));

        actionsContainer.appendChild(createActionElement('icons/tapbar_likes_white_selected.svg', 'like-card'));


        bottomPanel.appendChild(actionsContainer);
        card.appendChild(bottomPanel);


        container.appendChild(this._createElementWithClass('div', 'card3'));
        container.appendChild(this._createElementWithClass('div', 'card3'));
        container.appendChild(this._createElementWithClass('div', 'card2'));
        const cardNew = this._createElementWithClass('div', 'card');
        cardNew.appendChild(card);
        container.appendChild(cardNew);
        root.appendChild(container);
    }
    render() {
        this._renderDOM();
    }
}
