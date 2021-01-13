import { createContext } from "react";

type WeightsContextValue = {
  weights: number | undefined;
  setWeights: (weights: number | undefined) => void;
};

export const WeightsContext = createContext<WeightsContextValue>({
  weights: undefined,
  setWeights: () => {},
});
