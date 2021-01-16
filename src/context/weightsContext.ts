import { createContext } from "react";

type WeightsContextValue = {
  weights: string | undefined;
  setWeights: (weights: string | undefined) => void;
};

export const WeightsContext = createContext<WeightsContextValue>({
  weights: undefined,
  setWeights: () => {},
});
