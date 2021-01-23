import { EventType } from "../../types/event";

export const setEvent = (event: EventType) => {
  return {
    type: "SET_EVENT",
    event: event,
  };
};
