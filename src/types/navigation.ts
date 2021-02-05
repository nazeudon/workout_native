import { EventType } from "./event";
import { ItemType, ItemDetailType } from "./item";
import { RecoveryType } from "./recovery";

export type RootStackParamList = {
  Home: undefined;
  Event: { event: EventType };
  Item: { item: ItemType };
  ItemDetail: { itemDetail: ItemDetailType; index: number };
  Recovery: { recovery: string };
  Main: undefined;
};
