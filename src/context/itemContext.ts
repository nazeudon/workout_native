import { createContext } from "react";

type ItemContextValue = {
  createdAt: string | undefined;
  setCreatedAt: (item: string | undefined) => void;
};

export const ItemContext = createContext<ItemContextValue>({
  createdAt: undefined,
  setCreatedAt: () => {},
});
