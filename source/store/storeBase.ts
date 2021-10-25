export default class BaseStore<type>{
    private data: type;
    private view: any;
    private observers: { (data: type, curView): void; } [];
    constructor(){
        this.observers=[];
    }
    /**
     * subscribe
     */
    public subscribe(callback: {(data: type, curView): void}, view) {
        this.view = view;
        this.observers.push(callback);
    }
    public unsubscribe(callback: {(data: type, curView): void}) {
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
            subscriber(this.data, this.view);
        });
    }
}