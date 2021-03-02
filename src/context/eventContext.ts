import { createContext } from "react";
import { EventType } from "../types/event";

type EventContextValue = {
  events: EventType[];
  setEvents: (events: EventType[]) => void;
};

export const EventContext = createContext<EventContextValue>({
  events: [],
  setEvents: () => {},
});

type addEventContextValue = {
  addEvent: string;
  setAddEvent: (addEvent: string) => void;
};

export const addEventContext = createContext<addEventContextValue>({
  addEvent: "",
  setAddEvent: () => {},
});
