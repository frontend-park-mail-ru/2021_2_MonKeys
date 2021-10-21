export default class BaseStore<type>{
    private data: type;
    private observers: { (data: type): void; } [];
    constructor(){
        this.observers=[];
    }
    /**
     * subscribe
     */
    public subscribe(callback: {(data: type): void}) {
        this.observers.push(callback);
    }
    public unsubscribe(callback: {(data: type): void}) {
        this.observers = this.observers.filter(
            (subscriber)=> {
            return subscriber!==callback
        });
    }
    public get(): type{
        return this.data
    }
    public set(data: type){
        this.data = data;
        this.broadcast();
    }
    public broadcast() {
        this.observers.forEach((subscriber)=> {
            subscriber(this.data);
        });
    }
}