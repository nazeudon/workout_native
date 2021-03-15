import { EventType } from "./event";
import { ItemType, ItemDetailType } from "./item";

export type RootStackParamList = {
  Home: undefined;
  AddEvent: { id: number };
  Event: { event: EventType };
  Item: { item: ItemType };
  ItemDetail: {
    itemDetail: ItemDetailType;
    index: number;
    totalWeights: number;
    itemLength: number;
  };
  Recovery: { item: ItemType };
  Trial: { item: ItemType };
  CountDown: undefined;
  Main: undefined;
};
