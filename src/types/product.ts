export interface Product {
  id: number;
  img?: string;
  title: string;
  color: string;
  price: string;
  producer: string;
  createdAt: string;
  inStock: boolean;
  info?: Record<string, any>; // optional, for extra details
  chart?: any; // optional, for chart data
  activities?: any[]; // optional, for activities
}
