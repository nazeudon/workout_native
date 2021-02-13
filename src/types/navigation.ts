import { EventType } from "./event";
import { ItemType, ItemDetailType } from "./item";
import { RecoveryType } from "./recovery";
import { TrialType } from "./trial";

export type RootStackParamList = {
  Home: undefined;
  AddEvent: undefined;
  Event: { event: EventType };
  Item: { item: ItemType };
  ItemDetail: {
    itemDetail: ItemDetailType;
    index: number;
    totalWeights: number;
    itemLength: number;
  };
  Recovery: { recovery: RecoveryType };
  Trial: { trial: TrialType };
  Main: undefined;
};
