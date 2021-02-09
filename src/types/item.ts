export type ItemType = {
  id: number;
  eventId: number;
  createdAt: string;
  sets: number;
  totalWeights: number;
};

export type ItemDetailType = {
  id: number;
  itemsId: number;
  weights: number;
  times: number;
};
