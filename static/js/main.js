import LoginComponent from './components/Login/Login.js';

import FeedComponent from './components/Feed/Feed.js';

import ProfileComponent from './components/Profile/Profile.js';

import FeedExpandedComponent from './components/Feed/FeedExpanded.js';

import SignupComponent from './components/Signup/Signup.js';

import MenuComponent from './components/Tapbar/Tapbar.js';

import EditComponent from './components/Edit/Edit.js';

const root = document.getElementById('root');

window.addEventListener('load', (e) => {
  e.preventDefault();
  window.User.loginWithCookie(() => {
    feedPage();
    addMenu('feed');
  });
});

document.addEventListener('click', clickButtons, false);

loginPage();

const configApp = {
  'login': {
    href: '/login',
    name: 'Авторизация',
    open: loginPage,
  },
  'signup': {
    href: '/signup',
    name: 'Регистрация',
    open: signupPage,
  },
  'menu-feed': {
    link: '/feed',
    name: 'feed',
    open: feedPage,
  },
  'menu-profile': {
    link: '/profile',
    name: 'profile',
    open: profilePage,
  },
  'expand-card': {
    link: '/feed',
    name: 'feed',
    open: feedExpandedPage,
  },
  'shrink-card': {
    link: '/feed',
    name: 'feed',
    open: feedPage,
  },
  'menu-likes': {
    link: '/likes',
    name: 'likes',
    open: notDoneYet,
  },
  'menu-chat': {
    link: '/likes',
    name: 'chat',
    open: notDoneYet,
  },
  'profile-edit': {
    link: '/profile/edit',
    name: 'edit profile',
    open: editPage,
  },
  'profile-logout': {
    link: '/',
    name: 'logging out',
    open: logout,
  },
};


/**
 * Функция отрисовки страницы редактирования профиля
 * Сделал - Ильягу Нагдимаев
 */
function editPage() {
  const edit = new EditComponent(root);
  edit.render();
}

/**
 * Функия страницы с профилем
 */
function profilePage() {
  root.innerHTML = '';
  const profile = new ProfileComponent(root);
  profile.render();
}

/**
 * Функция отрисовки страницы расширенного профиля
 */
function feedExpandedPage() {
  const feedExpanded = new FeedExpandedComponent(root);
  feedExpanded.render();
}

/**
 * Обрабатывает передвижение карточки по экрану
 * @param {Event} event - Событие движения карточки
 *
 */
function handleTouchMove(event) {
  const { touches } = event;
  x = touches[0].clientX;
  y = touches[0].clientY;
  if (window.innerHeight < y || window.innerWidth < x || y < 0 || x < 0) {
    return;
  }
  moveRight(currentCard, x - x1, y - y1);
}

/**
 * @param {HTMLElement} element - элемент для движения
 * @param {*} diffX - движение по оси X
 * @param {*} diffY - движение по оси Y
 */
function moveRight(element, diffX, diffY) {
  element.style.transform = `translate(${diffX}px, ${diffY}px)`;
  const topScale = 12 - Math.abs(diffX / 40);
  if (topScale > 5) {
    previousCard.style.top = `${topScale}%`;
  }
  const heightScale = 75 + Math.abs(diffX / 40);
  if (heightScale < 80) {
    previousCard.style.height = `${heightScale}%`;
  }

  const widthScale = 90 + Math.abs(diffX / 40);
  if (widthScale < 95) {
    previousCard.style.width = `${widthScale}%`;
  }

  const topScale2 = 19 - Math.abs(diffX / 40);
  if (topScale2 > 12) {
    previousCard2.style.top = `${topScale2}%`;
  }
  const heightScale2 = 70 + Math.abs(diffX / 40);
  if (heightScale2 < 75) {
    previousCard2.style.height = `${heightScale2}%`;
  }

  const widthScale2 = 85 + Math.abs(diffX / 40);
  if (widthScale2 < 90) {
    previousCard2.style.width = `${widthScale2}%`;
  }

  element.style.transform += `rotateZ(${diffX / 10}deg)`;
}

/**
 * Сбрасывает стили на всех карточках
 */
function returnToStart() {
  if (currentCard) {
    currentCard.style.transform = 'translate(0px, 0px)';
    previousCard.style.width = '90%';
    previousCard.style.height = '75%';
    previousCard.style.top = '12%';
    previousCard.style.animation = '';
    previousCard2.style.width = '85%';
    previousCard2.style.height = '70%';
    previousCard2.style.top = '19%';
    previousCard2.style.animation = '';
  }
}


/**
 * Функция страницы с лентой
 */
function feedPage() {
  const feed = new FeedComponent(root);
  feed.render();
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  document.addEventListener('touchend', handleTouchEnd, false);
  currentCard = document.getElementsByClassName('card')[0];

  previousCard = document.getElementsByClassName('card2')[0];
  previousCard2 = document.getElementsByClassName('card3')[1];
}


/**
 * чистит лишние обработчики событий, которые были на ленте
 */
function clearEventListeners() {
  document.removeEventListener('touchstart', handleTouchStart, false);
  document.removeEventListener('touchmove', handleTouchMove, false);
  document.removeEventListener('touchend', handleTouchEnd, false);
}

let currentCard;
let previousCard;
let previousCard2;

let x;
let y;
let x1;
let y1;

/**
 * Здесь фиксируется, что пользователь сделал с карточкой в ленте:
 *  1) Лайкнул
 *  2) Дизлайкнул
 *  3) Покрутил  по приколу
 * @param {Event} event - событие
 */
function handleTouchEnd(event) {
  if (!x1 || !y1) {
    return;
  }

  if (x === null) {
    x = x1;
  }
  if (x1 - x < -100) {
    currentCard.style.animation = 'liked 1s ease 1';
    const cardToRemove = currentCard;
    setTimeout(remove(cardToRemove), 1000);

    const { id } = window.Feed.getCurrentProfile();
    window.Feed.getNextUser(id, () => {
      feedPage();
      addMenu('feed');
    });

    x1 = null;
    x = null;
  } else if (x1 - x > 100) {
    currentCard.style.animation = 'liked 1s ease 1';
    const cardToRemove = currentCard;
    setTimeout(remove(cardToRemove), 1000);
    const { id } = window.Feed.getCurrentProfile();

    window.Feed.getNextUser(id, () => {
      feedPage();
      addMenu('feed');
    });

    x1 = null;
    x = null;
  } else {
    const { target } = event;
    if (!(target.class === 'expand-class' || target.alt === 'shrink')) {
      if (previousCard) {
        previousCard.style.animation = 'shrinkSecondary 1s linear 1';
      }
      if (previousCard2) {
        previousCard2.style.animation = 'shrinkThird 1s linear 1';
      }
      if (currentCard) {
        currentCard.style.animation = 'spin2 1s linear 1';
      }
      setTimeout(returnToStart, 1000);
    }
  }
}


/**
 * @param {HTMLElement} cardToRemove - карточка которую необходимо скрыть
 */
function remove(cardToRemove) {
  cardToRemove.style.opacity = 0;
}


/**
 * Функция обработки начала свайпа карточки в ленте
 * @param {Event} event - событие
 */
function handleTouchStart(event) {
  const { touches } = event;
  currentCard.style.animation = '';
  x1 = touches[0].clientX;
  y1 = touches[0].clientY;
}


/**
 * Функция для выхода из профиля, посылает запрос на выход
 */
function logout() {
  window.User.logoutCookie(() => {
    loginPage();
  });
}


/**
 * Функция для страницы с логином
 */
function loginPage() {
  root.innerHTML = '';
  const login = new LoginComponent(root);
  login.render();
}

/**
 * Функция для страницы с регистрацией
 */
function signupPage() {
  const signup = new SignupComponent(root);
  signup.render();
}


/**
 * Обработчик нажатий на кнопки в меню
 */
root.addEventListener('click', (e) => {
  const { target } = e;
  if (configApp[target.className]) {
    configApp[target.className].open();
    addMenu(configApp[target.className].name);
  }
  if (target instanceof HTMLAnchorElement) {
    e.preventDefault();

    configApp[target.dataset.section].open();
  }
});

/**
    Обрабатывает нажатия
 * @param {event} event - Событие
 */
function clickButtons(event) {
  const { target } = event;
  if (configApp[target.className]) {
    configApp[target.className].open();
    addMenu(configApp[target.className].name);
    if (
      target.className === 'menu-profile' ||
      target.className === 'expand-card' ||
      target.className === 'menu-chat' ||
      target.className === 'menu-likes'
    ) {
      clearEventListeners();
    }
  }
}

/**
 * Функция, которая рендерит несделанные страницы
 */
function notDoneYet() {
  root.innerHTML = 'Not done Yet';
}

/**
 * @param {String} activeItem - текущая страница в меню
 */
function addMenu(activeItem) {
  const menu = new MenuComponent();
  menu.activeItem = activeItem;
  menu.render();
}
