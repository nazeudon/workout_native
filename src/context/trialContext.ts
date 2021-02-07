import { createContext } from "react";

type trialContextValue = {
  trial: string;
  setTrial: (trial: string) => void;
};

export const trialContext = createContext<trialContextValue>({
  trial: "1",
  setTrial: () => {},
});
