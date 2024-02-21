type EventHandler = (...args: any[]) => void;

class EventManager {
    private listeners: { [event: string]: EventHandler[]}= {};

    subscribe(event: string, handler: EventHandler){
        if(!this.listeners[event])
        {
            this.listeners[event] = [];
        }
        this.listeners[event].push(handler);
    }

    emit(event: string, ...args: any[])
    {
        if(this.listeners[event])
        {
            this.listeners[event].forEach(handler => handler(...args));
        }
    }

    unsubscribe(event: string, handler: EventHandler){
        console.log("Exemplo de unsubscribe");
    }
}

export const EventManagerTemplate = new EventManager();