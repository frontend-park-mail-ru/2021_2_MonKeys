import { MonkeysVirtualDOM } from 'virtualDOM/virtualDOM';
import LoginView from './views/loginView';
import http from './utils/http';
import { serverAddress } from './constants/urls';


const $root = document.getElementById('app');

const Login = new LoginView($root);
Login.render();

// TODO Необходимо при инициализации приложения. Чтобы все запросы с API шли на нужный сервак
http.baseURL(serverAddress);
