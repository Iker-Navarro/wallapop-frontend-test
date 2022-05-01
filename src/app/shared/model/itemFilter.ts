import { MinMax } from "./minMax";

export interface ItemFilter{
  title: string;
  description: string;
  email: string;
  priceRange: MinMax | null;
}