export type EventKey = {
  key: string;
};

export type EventData = {
  name: string;
  createdAt: string;
};

export type Event = {
  key: EventKey;
  data: EventData;
};
