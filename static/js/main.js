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


// loginPAge()
feedPage();
addMenu('menu-feed');

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
    name: 'menu-feed',
    open: feedPage,
  },
  'menu-profile': {
    link: '/profile',
    name: 'menu-profile',
    open: profilePage,
  },
  'menu-likes': {
    link: '/likes',
    name: 'menu-likes',
    open: notDoneYet,
  },
  'menu-chat': {
    link: '/likes',
    name: 'menu-chat',
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
 * Функция страницы с лентой
 */
function feedPage() {
  const feed = new FeedComponent(root);
  window.Feed.getFeed();
  feed.render();
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
  const login = new LoginComponent(root);
  login.render();

  login.checkSubmit( (email, password)=> {
    window.User.loginWithCredentials(email, password, ()=> {
      feedPage();
      addMenu('feed');
    },
    );
  });
  login.checkPasswordInput();
  login.checkEmailInput();
}

/**
 * Функция для страницы с регистрацией
 */
function signupPage() {
  const signup = new SignupComponent(root);
  signup.render();

  signup.checkSubmit(()=> {
    editPage();
  });

  signup.checkEmailInput();
  signup.checkPasswordInput();
  signup.checkRepeatPasswordInput();
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
  const menu = new MenuComponent(root);
  menu.activeItem = activeItem;
  menu.render();
}
