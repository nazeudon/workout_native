import { createContext } from "react";
import { PART_DETAILS } from "../types/part";

type PartContextValue = {
  part: string;
  setPart: (part: string) => void;
};

export const partContext = createContext<PartContextValue>({
  part: "",
  setPart: () => {},
});

type PartDetailsContextValue = {
  partDetails: PART_DETAILS[];
  setPartDetails: (partDetails: PART_DETAILS[]) => void;
};

export const partDetailsContext = createContext<PartDetailsContextValue>({
  partDetails: [],
  setPartDetails: () => {},
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
