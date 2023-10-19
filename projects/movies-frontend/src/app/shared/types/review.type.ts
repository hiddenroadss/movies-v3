export type Review = {
  id: number;
  title: string;
  body: string;
  rating: number;
  movieId: number;
  createdAt?: Date;
};
