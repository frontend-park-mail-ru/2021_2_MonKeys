import LoginComponent from './components/Login/Login.js';
import FeedComponent from './components/Feed/Feed.js';
import ProfileComponent from './components/Profile/Profile.js';
import SignupComponent from './components/Signup/Signup.js';
import MenuComponent from './components/Tapbar/Tapbar.js';
import EditComponent from './components/Edit/Edit.js';
import LikesComponent from './components/Likes/Likes.js';
import ChatComponent from './components/Chat/Chat.js';

const root = document.getElementById('root');

window.addEventListener('load', (e) => {
  e.preventDefault();
  window.User.loginWithCookie(() => {
    feedPage();
    addMenu('menu-feed');
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
    open: likesPage,
  },
  'menu-chat': {
    link: '/likes',
    name: 'menu-chat',
    open: chatPage,
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


function likesPage() {
  const likes = new LikesComponent(root);
  likes.render();
}

function chatPage() {
  const chat = new ChatComponent(root);
  chat.render();
}


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
  document.removeEventListener('touchstart');
  document.removeEventListener('touchmove');
  document.removeEventListener('touchend');
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
      addMenu('menu-feed');
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
 * @param {String} activeItem - текущая страница в меню
 */
function addMenu(activeItem) {
  const CardContainer=document.getElementsByClassName('card-container')[0];
  const menu = new MenuComponent(CardContainer);
  menu.activeItem = activeItem;
  menu.render();
}
