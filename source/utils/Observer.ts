export default class Observer {
    private listeners: any;

    on(event, callback) {
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        this.listeners[event] = this.listeners[event].filter(function (listener) {
            return listener !== callback;
        });
    }
    emit(event, data) {
        this.listeners[event].forEach(function (listener) {
            listener(data);
        });
    }
}
