/**
 * Компонент с меню
 */
export default class MenuComponent {
    _parent
    _activeItem
    _table = {
      'menu-feed': 0,
      'menu-likes': 1,
      'menu-chat': 2,
      'menu-profile': 3,
    }
    _actionsMenu = {
      actions: [
        {

          iconDeselected: 'icons/tapbar_feed_white_deselected.svg',
          iconSelected: 'icons/tapbar_feed_white_selected.svg',
          className: 'menu-feed',
          selected: 'y',
        },
        {
          iconDeselected: 'icons/tapbar_likes_white_deselected.svg',
          iconSelected: 'icons/tapbar_likes_white_selected.svg',
          className: 'menu-likes',
          selected: '',
        },
        {
          iconDeselected: 'icons/tapbar_chat_white_deselected.svg',
          iconSelected: 'icons/tapbar_chat_white_selected.svg',
          className: 'menu-chat',
          selected: '',
        },
        {
          iconDeselected: 'icons/tapbar_user_white_deselected.svg',
          iconSelected: 'icons/tapbar_user_white_selected.svg',
          className: 'menu-profile',
          selected: '',
        },
      ],
    }
    /**
   *
   * @param {HTMLElement} parent - Родительский элемент, в который будет рендерится страница
   */
    constructor(parent) {
      this._activeItem='menu-feed';
      this._parent = parent;
    }

    /**
     * Смена активного компонента меню
     * @param {string} data - Выбранный элемент для подсветки
     */
    set activeItem(data) {
      this._actionsMenu.actions[this._table[this._activeItem]].selected='';
      this._activeItem = data;

      this._actionsMenu.actions[this._table[this._activeItem]].selected='y';
    }

    /**
   * Функция отрисовки
   */
    _renderDOM() {
      const renderedHTML = Handlebars.templates['tapbar'];
      const element = document.createElement('div');
      element.innerHTML = renderedHTML(this._actionsMenu);
      this._parent.appendChild(element);
    }

    /**
   * Функция отрисовки ленты
   */
    render() {
      this._renderDOM();
    }
}
