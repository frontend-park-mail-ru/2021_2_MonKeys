
export default class FeedComponent {
    #parent
    #data


    constructor(parent) {
      this.#parent = parent;
    }

    set data(data) {
      this.#data = data;
    }

    /**
 * @param {String} tag - название тэга
 * @param {String} className - название класса
 * @return {HTMLElement} - Полученный элемент с тэгом
 */
   #createElementWithClass(tag, className) {
      const element = document.createElement(tag);
      element.className = className;
      return element;
    }


    #renderDOM() {
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
       root.innerHTML='';
       const outOfCards = this.#createElementWithClass('div', 'out-of-cards');
       outOfCards.innerText = 'Карточки кончились';
       root.appendChild(outOfCards);

       return;
     }
     const card = this.#createElementWithClass('div', 'card-main');
     const image = document.createElement('img');
     image.src = currentobj.photoSrc;
     image.className = 'profile-image';
     card.appendChild(image);
     const bottomPanel = this.#createElementWithClass('div', 'bottom-panel');
     const nameContainer = this.#createElementWithClass('div', 'name-container');
     const name = this.#createElementWithClass('div', 'name');
     name.innerText = currentobj.firstName;
     const age = this.#createElementWithClass('div', 'age');
     age.innerText = currentobj.age;
     nameContainer.appendChild(name);
     nameContainer.appendChild(age);
     bottomPanel.appendChild(nameContainer);
     const actionsContainer = this.#createElementWithClass('div', 'actions-container');


     actionsContainer.appendChild(createActionElement('icons/button_dislike_white.svg', 'dislike-card'));

     actionsContainer.appendChild(createActionElement('icons/button_expand_white.svg', 'expand-card'));

     actionsContainer.appendChild(createActionElement('icons/tapbar_likes_white_selected.svg', 'like-card'));


     bottomPanel.appendChild(actionsContainer);
     card.appendChild(bottomPanel);


     root.appendChild(this.#createElementWithClass('div', 'card3'));
     root.appendChild(this.#createElementWithClass('div', 'card3'));
     root.appendChild(this.#createElementWithClass('div', 'card2'));
     const cardNew = this.#createElementWithClass('div', 'card');
     cardNew.appendChild(card);
     root.appendChild(cardNew);
   }
    render() {
      this.#renderDOM();
    }
}
