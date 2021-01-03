import { createContext } from "react";
/* types */
import { EventType } from "../types/event";

type EventContextValue = {
  event: string | undefined;
  setEvent: (event: string | undefined) => void;
};

export const EventContext = createContext<EventContextValue>({
  event: undefined,
  setEvent: () => {},
});
