import { createContext } from "react";

type TimesContextValue = {
  times: number | undefined;
  setTimes: (times: number | undefined) => void;
};

export const TimesContext = createContext<TimesContextValue>({
  times: undefined,
  setTimes: () => {},
});
