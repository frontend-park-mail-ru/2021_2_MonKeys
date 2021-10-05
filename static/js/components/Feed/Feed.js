let currentCard;
let previousCard;
let previousCard2;

let thisIsNeverThat;

/**
 * Компонент с лентой
 */
export default class FeedComponent {
  _parent;
  _x;
  _y;
  _x1;
  _y1;
  _expandedActions =
    {
      'dislike-card': {
        actionIcon: 'icons/button_dislike_white.svg',
        actionClass: 'dislike-card',
        function: this._dislikeCard,
      },
      'shrink-card': {
        actionIcon: 'icons/button_shrink_white.svg',
        actionClass: 'shrink-card',
        function: this._shrinkCard,
      },
      'like-card': {
        actionIcon: 'icons/tapbar_likes_white_selected.svg',
        actionClass: 'like-card',
        function: this._likeCard,
      },
    }
  _shrinkActions = {
    'dislike-card': {
      actionIcon: 'icons/button_dislike_white.svg',
      actionClass: 'dislike-card',
      function: this._dislikeCard,
    },
    'expand-card': {
      actionIcon: 'icons/button_expand_white.svg',
      actionClass: 'expand-card',
      function: this._expandCard,
    },
    'like-card': {
      actionIcon: 'icons/tapbar_likes_white_selected.svg',
      actionClass: 'like-card',
      function: this._likeCard,
    },
  }
  _data = {
    actions: this._shrinkActions,
    card: {},
  };

  /**
   *
   * @param {HTMLElement} parent - Родительский элемент, в который будет рендерится страница
   */
  constructor(parent) {
    this._parent = parent;
  }

  /**
   * @param {data} data - Данные для отрисовки
   */
  set data(data) {
    this._data = data;
  }

  /**
   * Функция обработки события расширения карты в ленте, начинает анимации расширения
   */
  _expandCard() {
    const expandCard = document.getElementsByClassName('expand-card')[0];
    const profileImage = document.getElementsByClassName('profile-image')[0];
    const bottomPanel = document.getElementsByClassName('bottom-panel')[0];
    profileImage.style.animation='shrink-profile-img 1s ease 1';
    expandCard.style.animation='rotate180 1s ease 1';

    bottomPanel.style.animation='shrink-profile-bottom-panel 1s ease 1';
    setTimeout(thisIsNeverThat._expandMainCard, 1000);
  }
  /**
   * Отрисовка расширенной карты
   */
  _expandMainCard() {
    currentCard.innerHTML = '';
    currentCard.style='';
    thisIsNeverThat._data.actions= thisIsNeverThat._expandedActions;
    thisIsNeverThat._data.card = window.Feed.getCurrentProfile();
    const renderedHTML = Handlebars.templates['feedExpanded'];
    currentCard.innerHTML = renderedHTML(thisIsNeverThat._data);
  }

  /**
   * Обработчик события лайка карты в ленте
   */
  _likeCard() {
    // ЗАПРОС НА ЛАЙК
    console.log('liked');
    window.Feed.next();

    this._x1 = null;
    this._x = null;
    currentCard.style.animation = 'swipedRight 1s ease 1';
    setTimeout(thisIsNeverThat._reRenderMainCard, 1000);
  }

  /**
   * Обработчик события дизлайка карты
   */
  _dislikeCard() {
    console.log('disliked');
    // ЗАПРОС НА ДИЗЛАЙК
    window.Feed.next();

    this._x1 = null;
    this._x = null;
    currentCard.style.animation = 'swipedLeft 1s ease 1';
    setTimeout(thisIsNeverThat._reRenderMainCard, 1000);
  }


  /**
   * Обработчик события сжатия карты, здесь начинаются анимации перед переходом к сжатию
   */
  _shrinkCard() {
    const shrinkCard = document.getElementsByClassName('shrink-card')[0];
    const profileImage = document.getElementsByClassName('profile-image-expand')[0];
    const bottomPanel = document.getElementsByClassName('actions-container')[0];
    profileImage.style.animation='expand-profile-img 1s ease 1';
    shrinkCard.style.animation='rotate180 1s ease 1';
    bottomPanel.style.animation='shrink-profile-bottom-panel 1s ease 1';
    thisIsNeverThat._data.actions= thisIsNeverThat._shrinkActions;

    setTimeout(thisIsNeverThat._reRenderMainCard, 1000);
  }

  /**
   * Обрыботчик события свайпа в процессе 'touchmove'
   * @param {Event} event - событие
   *
   */
  _handleTouchMove(event) {
    if (!this._x1 || !this._y1) {
      return;
    }
    const { touches } = event;
    if (event.touches) {
      this._x = touches[0].clientX;
      this._y = touches[0].clientY;
    } else {
      this._x = event.offsetX;
      this._y = event.offsetY;
    }
    if (window.innerHeight < this._y || window.innerWidth < this._x || this._y < 0 || this._x < 0) {
      return;
    }
    const diffX= this._x - this._x1;
    const diffY= this._y - this._y1;
    if (diffX<280) {
      const diffBig = Math.abs(diffX / 40);
      const diffSmall = Math.abs(diffX / 56);
      previousCard.style.top = `${12 - diffSmall}%`;
      previousCard.style.height = `${75 + diffSmall}%`;
      previousCard.style.width = `${90 + diffSmall}%`;
      previousCard2.style.top = `${19 - diffBig }%`;
      previousCard2.style.height = `${70 + diffBig}%`;
      previousCard2.style.width = `${85 + diffBig}%`;
    }
    currentCard.style.transform = `translate(${diffX}px, ${diffY}px)`;
    currentCard.style.transform += `rotateZ(${diffX / 10}deg)`;
  }

  /**
   * рендер основной (сжатой) карты в ленте
   */
  _reRenderMainCard() {
    currentCard.innerHTML = '';
    currentCard.style='';
    const renderedHTML = Handlebars.templates['feedCard'];
    thisIsNeverThat._data.actions= thisIsNeverThat._shrinkActions;
    thisIsNeverThat._data.card = window.Feed.getCurrentProfile();
    currentCard.innerHTML = renderedHTML(thisIsNeverThat._data);
  }

  /**
   * Обработчик окончания свайпа - фиксирует событие и вызывает его обработчик
   * Либо произошёл:
   * 1) Лайк
   * 2) Дизлайк
   * 3) Карту просто подёргали
   * @param {Event} event - событие 'touchend'
   *
   */
  _handleTouchEnd(event) {
    console.log('END');
    if (!this._x1 || !this._y1 || !this._x || !this._y) {
      return;
    }
    console.log(this._x, this._x1);
    if (this._x1 - this._x < -100) {
      currentCard.style.animation = 'liked 1s ease 1';
      // ЗАПРОС НА ЛАЙК
      window.Feed.next();
      console.log('liked');
      this._x1 = null;
      this._x = null;

      setTimeout(thisIsNeverThat._reRenderMainCard, 1000);
    } else if (this._x1 - this._x > 100) {
      currentCard.style.animation = 'liked 1s ease 1';
      // ЗАПРОС НА ДИЗЛАЙК

      console.log('disliked');
      window.Feed.next();
      this._x1 = null;
      this._x = null;
      setTimeout(thisIsNeverThat._reRenderMainCard, 1000);
    } else {
      const { target } = event;
      if (!(target.class === 'expand-class' || target.alt === 'shrink')) {
        previousCard.style.animation = 'shrinkSecondary 1s linear 1';
        previousCard2.style.animation = 'shrinkThird 1s linear 1';
        currentCard.style.animation = 'spin2 1s linear 1';
        setTimeout( () => {
          currentCard.style='';
          currentCard.style.transform = 'translate(0px, 0px)';
          previousCard.style.width = '90%';

          previousCard.style.height = '75%';
          previousCard.style.top = '12%';
          previousCard.style.animation = '';
          previousCard2.style.width = '85%';
          previousCard2.style.height = '70%';
          previousCard2.style.top = '19%';
          previousCard2.style.animation = '';
        }, 1000);
        this._x1 = null;
        this._x = null;
      }
    }
  }

  /**
   * Обработчик события 'touchstart'
   * @param {Even} event - событие 'touchstart'
   */
  _handleTouchStart(event) {
    const { touches } = event;
    if (event.touches) {
      this._x1 = touches[0].clientX;
      this._y1 = touches[0].clientY;
    } else {
      event.preventDefault();
      this._x1 = event.offsetX;
      this._y1 = event.offsetY;
    }
  }

  /**
       * чистит лишние обработчики событий, которые были на ленте
       */
  clearEventListeners() {
    console.log('removing');
    document.removeEventListener('click', this._handleClicks, false);
    document.removeEventListener('touchstart', this._handleTouchStart, false);
    document.removeEventListener('touchmove', this._handleTouchMove, false);
    document.removeEventListener('touchend', this._handleTouchEnd, false);
    // document.removeEventListener('mousedown', this._handleTouchStart, false);
    // document.removeEventListener('mousemove', this._handleTouchMove, false);
    // document.removeEventListener('mouseup', this._handleTouchEnd, false);
  }

  /**
   * Обработчик кликов, здесь фиксируется произошёл ли клик
   * по кнопке, чтобы вызвать обработчик
   * Сжатия карты, расширения карты, лайка карты и т.д.
   * @param {Event} event - событие клика
   */
  _handleClicks(event) {
    const { target } = event;

    if (thisIsNeverThat._data.actions[target.className]) {
      thisIsNeverThat._data.actions[target.className].function();
    }
  }

  /**
   * Добавляет необходимые для Feed EventListener-ы
   */
  _addEventListeners() {
    document.addEventListener('click', this._handleClicks, false);
    document.addEventListener('touchstart', this._handleTouchStart, false);
    // document.addEventListener('mousedown', this._handleTouchStart, false);
    document.addEventListener('touchmove', this._handleTouchMove, false);
    // document.addEventListener('mousemove', this._handleTouchMove, false);
    document.addEventListener('touchend', this._handleTouchEnd, false);
    // document.addEventListener('mouseup', this._handleTouchEnd, false);
  }

  /**
   * Находит элементы для их будущей анимации
   */
  _getElems() {
    currentCard = document.getElementsByClassName('card')[0];
    previousCard = document.getElementsByClassName('card2')[0];
    previousCard2 = document.getElementsByClassName('card3')[1];
  }

  /**
   * Функция отрисовки
   */
  _renderDOM() {
    this._parent.innerHTML = '';
    const renderedHTML = Handlebars.templates['feed'];
    this._data.card = window.Feed.getCurrentProfile();
    this._parent.innerHTML = renderedHTML(this._data);
    this._getElems();
    this._addEventListeners();
    thisIsNeverThat = this;
  }
  /**
   * Функция отрисовки ленты
   */
  render() {
    this._renderDOM();
  }
}
