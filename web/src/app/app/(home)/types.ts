export type Word = {
  id: string;
  word: string;
  createdAt: Date;
};

export type Favorite = {
  id: string;
  userId: string;
  word: string;
};
