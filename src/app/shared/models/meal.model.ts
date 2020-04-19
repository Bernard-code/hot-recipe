
export interface Meal {
  name?: string;
  img?: string;
  category?: string;
  tags?: string[];
  makingTime?: string;
  timestamp: number | Date;
  id?: string;
}
