import { createContext } from "react";

type WeightsContextValue = {
  weights: number | string | undefined;
  setWeights: (weights: number | string | undefined) => void;
};

export const WeightsContext = createContext<WeightsContextValue>({
  weights: undefined,
  setWeights: () => {},
});
