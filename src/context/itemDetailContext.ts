import { createContext } from "react";

type IsNewContextValue = {
  isNew: boolean;
  setIsNew: (isNew: boolean) => void;
};

export const IsNewContext = createContext<IsNewContextValue>({
  isNew: false,
  setIsNew: () => {},
});
