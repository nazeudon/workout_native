import { createContext } from "react";

type RecoveryContextValue = {
  recovery: string;
  setRecovery: (recovery: string) => void;
};

export const recoveryContext = createContext<RecoveryContextValue>({
  recovery: "0",
  setRecovery: () => {},
});
