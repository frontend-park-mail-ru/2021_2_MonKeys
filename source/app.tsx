import { MonkeysVirtualDOM } from 'virtualDOM/virtualDOM';
import LoginView from './views/loginView';
import SignupView from "./views/signupView.js";
import EditView from "./views/editView.js";
import ProfileView from "./views/profileView.js";
import LikesView from "./views/likesView.js";
import FeedView from "./views/feedView.js";
import http from './utils/http';
import { serverAddress } from './constants/urls';

const $root = document.getElementById('app');

// const Login = new LoginView($root);
// Login.render();

// const Signup = new SignupView($root);
// Signup.render();

// const Edit = new EditView($root);
// Edit.render();

// const Profile = new ProfileView($root);
// Profile.render();

// const Likes = new LikesView($root);
// Likes.render();

const Feed = new FeedView($root);
Feed.render();

// TODO Необходимо при инициализации приложения. Чтобы все запросы с API шли на нужный сервак
http.baseURL(serverAddress);
