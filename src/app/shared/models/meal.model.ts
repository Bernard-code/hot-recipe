
export interface Meal {
  name: string;
  makingTime?: string;
  
  description?: string;
  ingredients?: string[];
  steps?: string[];
  img?: string;
  
  category?: string;
  tags?: string[];

  timestamp: number | Date;
  id?: string;
}
