import React, { FunctionComponent, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { EventManagerTemplate } from '../../../hooks/events/UseEventManager';

type EventCallback = (args: any) => void;

export interface EventSubscriptionType {
    event: string;
    handler: EventCallback;
}

interface EventContextType {
    subscribeEvent: (event: string, callback: EventCallback) => void;
    unsubscribeEvent: (event: string, callback: EventCallback) => void;
    emitEvent: (event: string, args?: any) => void;
    UseEventSubscription: (events: EventSubscriptionType[]) => void;
    UseEventUnsubscription: (events: EventSubscriptionType[]) => void;
}

const EventContext = createContext<EventContextType>({
    subscribeEvent: () => { },
    unsubscribeEvent: () => { },
    emitEvent: () => { },
    UseEventSubscription: () => { },
    UseEventUnsubscription: () => { }
});

export const EventProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {

    const subscribeEvent = EventManagerTemplate.subscribe;
    const emitEvent = EventManagerTemplate.emit;
    const unsubscribeEvent = EventManagerTemplate.unsubscribe;

    const UseEventSubscription = (events: EventSubscriptionType[]) => {
        console.log("(EventContext) USE EVENT SUBCRIPTION");
        events.forEach(({event, handler}) => {
            EventManagerTemplate.subscribe(event, handler);
            console.log("(EventContext) Subscription complete: ", event);
        });
    }

    const UseEventUnsubscription = (events: EventSubscriptionType[]) => {
        console.log("(EventContext) USE EVENT UNSUBCRIPTION");
        return () => {
            events.forEach(({event, handler}) => {
                EventManagerTemplate.unsubscribe(event, handler)
                console.log("(EventContext)  Unsubscription complete: ", event);
            });
        };
    }


    return (
        <EventContext.Provider value={{ subscribeEvent, unsubscribeEvent, emitEvent, UseEventSubscription, UseEventUnsubscription }}>
            {children}
        </EventContext.Provider>
    )
}

export const UseEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('Context deve ser usado dentro do Provider! (UseEvent)');
    }
    return context;
}