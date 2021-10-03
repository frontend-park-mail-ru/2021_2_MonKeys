export default class FeedComponent {
    _parent
    _data = {
      actions: [
        {
          actionIcon: "icons/button_dislike_white.svg",
          actionClass: "dislike-card",
        },
        {
          actionIcon: "icons/button_expand_white.svg",
          actionClass: "expand-card",
        },
        {
          actionIcon: "icons/tapbar_likes_white_selected.svg",
          actionClass: "like-card",
        },
      ]
    }


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
      this._parent.innerHTML = '';
      const renderedHTML = Handlebars.templates['feed'];
      this._parent.innerHTML = renderedHTML();
      this._getElems();
    }
    render() {
      this._renderDOM();
    }
}
