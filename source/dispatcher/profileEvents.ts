import EventBus from "./eventBus.js"





export const ProfileEventsRegister = () =>{
    EventBus.register('profile:edit-button',()=>{
        //...
    })
    EventBus.register('profile:logout-button',()=>{
        //...
    })
}