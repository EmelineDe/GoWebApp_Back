import { UserAnswer } from "../Interfaces/IUserAnswer";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
  answers: UserAnswer[];
}
