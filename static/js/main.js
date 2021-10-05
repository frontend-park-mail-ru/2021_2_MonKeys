import LoginComponent from './components/Login/Login.js';
import FeedComponent from './components/Feed/Feed.js';
import ProfileComponent from './components/Profile/Profile.js';
import SignupComponent from './components/Signup/Signup.js';
import MenuComponent from './components/Tapbar/Tapbar.js';
import EditComponent from './components/Edit/Edit.js';
import LikesComponent from './components/Likes/Likes.js';
import ChatComponent from './components/Chat/Chat.js';

const root = document.getElementById('root');

let currentComponent;

window.addEventListener('load', (e) => {
  e.preventDefault();
  window.User.loginWithCookie(() => {
    feedPage();
    addMenu('menu-feed');
  });
});



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
  currentComponent = likes;
  likes.render();
}

function chatPage() {
  const chat = new ChatComponent(root);
  currentComponent = chat;
  chat.render();
}


/**
 * Функция отрисовки страницы редактирования профиля
 */

function editPage() {
  const edit = new EditComponent(root);
  currentComponent = edit;
  edit.render();
  edit.checkSubmit();
}

/**
 * Функия страницы с профилем
 */
function profilePage() {
  const profile = new ProfileComponent(root);
  currentComponent = profile
  profile.render();
}


/**
 * Функция страницы с лентой
 */
function feedPage() {
  const feed = new FeedComponent(root);
  window.Feed.getFeed();
  currentComponent = feed;
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
      addMenu('menu-feed');
    },
    );
  });
  login.checkSubmit((email, password)=> {
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
  signup.checkSubmit((email, password)=> {
    window.User.loginWithCredentials(email, password, ()=> {
      editPage();
    });
  });

  signup.checkEmailInput();
  signup.checkPasswordInput();
  signup.checkRepeatPasswordInput();
}


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
 * @param {String} activeItem - текущая страница в меню
 */
function addMenu(activeItem) {
  const CardContainer=document.getElementsByClassName('card-container')[0];
  const menu = new MenuComponent(CardContainer);
  menu.activeItem = activeItem;
  menu.render();
}
