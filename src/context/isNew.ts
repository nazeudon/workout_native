import { createContext } from "react";

type IsNewContextValue = {
  isNew: boolean;
  setIsNew: (isNew: boolean) => void;
};

export const IsNewContext = createContext<IsNewContextValue>({
  isNew: false,
  setIsNew: () => {},
});

type IsNewEventContextValue = {
  isNewEvent: boolean;
  setIsNewEvent: (isNew: boolean) => void;
};

export const IsNewEventContext = createContext<IsNewEventContextValue>({
  isNewEvent: false,
  setIsNewEvent: () => {},
});
