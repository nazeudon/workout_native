import { createContext } from "react";

type ItemContextValue = {
  item: string | undefined;
  setItem: (item: string | undefined) => void;
};

export const ItemContext = createContext<ItemContextValue>({
  item: undefined,
  setItem: () => {},
});
