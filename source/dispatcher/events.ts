import EventBus from "./eventBus.js"
import { loginRequest } from "../requests/sessionRequest.js";
import router from '../route/router.js';
const $root = document.getElementById('app');

export const InitBus = () => {
    EventBus.register('login:login-button', (email: string) => {
        
        // ТОТАЛЬНЕЙШИЙ КРИНЖ ЭТО ДОЛЖНО БЫТЬ ЧЕРЕЗ ВИРТУАЛДОМ ПОТОМ 
        // НО ПОКА ТАК ААААААААААААААА
        const _emailInput = document.getElementsByTagName('input')[0];
        const _passwordInput = document.getElementsByTagName('input')[1];
        
        alert(_emailInput)
        alert(_passwordInput);
        //запрос
        
        // loginRequest(_emailInput.textContent, _passwordInput.textContent).then(
        //     async (status: number, data)=> {
        //         console.log(status)
        //         console.log(data);
        //     }
        // )
        
        router.go('/feed');

        //если норм
        //закинуть данные о ленте
        //перекинуть на ленту
        
        //если кринж
        //ошибка в форме логина
    });

    EventBus.register('login:login-error', (message: string) => {
        
        console.log('ошибка');
    });
    EventBus.register('user:logged-in', (message: string) => {
        // route to feed
        router.go('/feed');
        // feed request
        console.log('успех');
    });


    
}