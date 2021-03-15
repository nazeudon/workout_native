export type ItemType = {
  id: number;
  eventId: number;
  createdAt: string;
  sets: number;
  totalWeights: number;
  recovery: number;
  trial: number;
};

export type ItemDetailType = {
  id: number;
  itemsId: number;
  weights: number;
  times: number;
};
