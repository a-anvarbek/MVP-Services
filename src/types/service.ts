export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface SelectedService extends Service {
  quantity: number;
}
