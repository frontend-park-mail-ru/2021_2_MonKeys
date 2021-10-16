import { MonkeysVirtualDOM } from "./virtualDOM/virtualDOM.js";
import LoginView from './views/loginView.js';
import SignupView from "./views/signupView.js";
import EditView from "./views/editView.js";


const $root = document.getElementById('app');

// const Login = new LoginView($root);
// Login.render();

// const Signup = new SignupView($root);
// Signup.render();

const Edit = new EditView($root);
Edit.render();
