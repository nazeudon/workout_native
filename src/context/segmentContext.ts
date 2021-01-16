import { createContext } from "react";

type SegmentContextValue = {
  segment: string | undefined;
  setSegment: (segment: string | undefined) => void;
};

export const SegmentContext = createContext<SegmentContextValue>({
  segment: undefined,
  setSegment: () => {},
});
