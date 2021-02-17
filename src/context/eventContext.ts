import { createContext } from "react";

type EventContextValue = {
  event: string | undefined;
  setEvent: (event: string | undefined) => void;
};

export const EventContext = createContext<EventContextValue>({
  event: undefined,
  setEvent: () => {},
});

type addEventContextValue = {
  addEvent: string;
  setAddEvent: (addEvent: string) => void;
};

export const addEventContext = createContext<addEventContextValue>({
  addEvent: "",
  setAddEvent: () => {},
});
