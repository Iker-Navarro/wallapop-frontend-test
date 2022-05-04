
export interface ItemsResponse {
  items: RawItem[];
}

export interface RawItem {
  title: string;
  description: string;
  email: string;
  image: string;
  price: string;
}
