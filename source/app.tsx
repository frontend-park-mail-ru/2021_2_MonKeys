import { MonkeysVirtualDOM } from "./virtualDOM/virtualDOM";
import LoginView from './views/loginView';


const $root = document.getElementById('app');

const Login = new LoginView($root);
Login.render();




