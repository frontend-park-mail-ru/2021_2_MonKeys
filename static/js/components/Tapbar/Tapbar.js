export default class MenuComponent {
    #parent
    #activeItem

    constructor(parent) {
      this.#parent = parent;
    }

    set activeItem(data) {
      this.#activeItem = data;
    }

    #renderDOM() {
      const menu = createElementWithClass('div', 'tapbar-container');
      if (this.#activeItem === 'feed') {
        menu.appendChild(createActionElement('icons/tapbar_feed_white_selected.svg', 'menu-feed'));
      } else {
        menu.appendChild(createActionElement('icons/tapbar_feed_white_deselected.svg', 'menu-feed'));
      }
      if (this.#activeItem === 'likes') {
        menu.appendChild(createActionElement('icons/tapbar_likes_white_selected.svg', 'menu-likes'));
      } else {
        menu.appendChild(createActionElement('icons/tapbar_likes_white_deselected.svg', 'menu-likes'));
      }
      if (this.#activeItem === 'chat') {
        menu.appendChild(createActionElement('icons/tapbar_chat_white_selected.svg', 'menu-chat'));
      } else {
        menu.appendChild(createActionElement('icons/tapbar_chat_white_deselected.svg', 'menu-chat'));
      }
      if (this.#activeItem === 'profile') {
        menu.appendChild(createActionElement('icons/tapbar_user_white_selected.svg', 'menu-profile'));
      } else {
        menu.appendChild(createActionElement('icons/tapbar_user_white_deselected.svg', 'menu-profile'));
      }

      root.appendChild(menu);
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
      function createElementWithClass(tag, className) {
        const element = document.createElement(tag);
        element.className = className;
        return element;
      }
    }

    render() {
      this.#renderDOM();
    }
}
