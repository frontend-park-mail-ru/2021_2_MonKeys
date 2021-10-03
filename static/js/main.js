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
 * Функция страницы с лентой
 */
function feedPage() {
  const feed = new FeedComponent(root);
  window.Feed.getFeed();
  feed.render();
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
