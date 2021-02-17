import { createContext } from "react";

type PartContextValue = {
  part: string;
  setPart: (part: string) => void;
};

export const partContext = createContext<PartContextValue>({
  part: "",
  setPart: () => {},
});

type PartDetailContextValue = {
  partDetail: string;
  setPartDetail: (partDetail: string) => void;
};

export const partDetailContext = createContext<PartDetailContextValue>({
  partDetail: "",
  setPartDetail: () => {},
});

type TrainingTypeContextValue = {
  trainingType: string;
  setTrainingType: (trainingType: string) => void;
};

export const TrainingTypeContext = createContext<TrainingTypeContextValue>({
  trainingType: "",
  setTrainingType: () => {},
});
