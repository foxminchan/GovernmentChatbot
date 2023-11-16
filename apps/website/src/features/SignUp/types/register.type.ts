export type RegisterPayload = {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    id_card: string;
  };
  password: string;
};

export type RegisterResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  id_card: string;
};
