import React, { FunctionComponent, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { EventManagerTemplate } from '../hooks/EventManager';

type EventCallback = (args: any) => void;

interface EventContextType {
    subscribeEvent: (event: string, callback: EventCallback) => void;
    unsubscribeEvent: (event: string, callback: EventCallback) => void;
    emitEvent: (event: string, args?: any) => void;
}

const EventContext = createContext<EventContextType>({
    subscribeEvent: () => {},
    unsubscribeEvent: () => {},
    emitEvent: () => {},
});

export const EventProvider: FunctionComponent<{children: ReactNode}> = ({ children }) => {
    
    const subscribeEvent = EventManagerTemplate.subscribe;
    const emitEvent = EventManagerTemplate.emit;
    const unsubscribeEvent = EventManagerTemplate.unsubscribe;

    return (
        <EventContext.Provider value={{subscribeEvent, unsubscribeEvent, emitEvent}}>
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