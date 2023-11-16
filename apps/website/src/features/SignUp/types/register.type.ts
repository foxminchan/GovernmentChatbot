export type RegisterResponse = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  id_card: string;
};

export type RegisterPayload = {
  user: Omit<RegisterResponse, 'id'>;
  password: string;
};
