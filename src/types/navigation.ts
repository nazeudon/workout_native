import { EventType } from "./event";
import { ItemType, ItemDetailType } from "./item";

export type RootStackParamList = {
  Home: undefined;
  Event: { event: EventType };
  Item: { item: ItemType };
  ItemDetail: { itemDetail: ItemDetailType };
  Main: undefined;
};
