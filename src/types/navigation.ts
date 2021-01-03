import { EventType } from "./event";

export type RootStackParamList = {
  Home: undefined;
  Event: { event: EventType };
  Main: undefined;
};
