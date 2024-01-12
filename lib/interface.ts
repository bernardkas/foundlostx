export interface FoundLostItems {
  id: number;
  userId: number;
  user: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  title: string;
  city: string;
  whereDidFind: string;
  exatLocation: string;
  airoport: string;
  buss: string;
  hotel: string;
  InCity: string;
  description: string;
  findingDate: '';
  findingTime: '';
  mapAddress: string;
  photo: string;
  label: string;
  createdAt: string;
}

export interface UserInterface {
  id: number;
  extrenalId: string;
  attributes: string;
  name: string;
  lastname: string;
  password: string;
  username: string;
}
