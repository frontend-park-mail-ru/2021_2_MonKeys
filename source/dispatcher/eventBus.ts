import ViewBase from 'views/viewBase';

export interface Register {
    unregister: () => void;
}

export interface Callable {
    [key: number]: { (data, view?: ViewBase): void };
}

export interface Subscriber {
    [key: number]: Callable;
}

export interface IEventBus {
    dispatch<T>(event: number, payload?: T): void;
    register(event: number, callback: { (data, view?: ViewBase): void }): Register;
}

class EventBus implements IEventBus {
    private subscribers: Subscriber;
    private static nextId = 0;

    constructor() {
        this.subscribers = {};
    }

    public dispatch<T>(event: number, payload?: T): void {
        const subscriber = this.subscribers[event];

        if (!subscriber) {
            return;
        }

        Object.keys(subscriber).forEach((key) => subscriber[key](payload));
    }

    public register(event: number, callback: { (data, view?: ViewBase): void }): Register {
        const id = this.getNextId();

        if (!this.subscribers[event]) this.subscribers[event] = {};

        this.subscribers[event][id] = callback;

        return {
            unregister: () => {
                delete this.subscribers[event][id];
                if (Object.keys(this.subscribers[event]).length === 0) {
                    delete this.subscribers[event];
                }
            },
        };
    }

    private getNextId(): number {
        return EventBus.nextId++;
    }
}

export default new EventBus();
