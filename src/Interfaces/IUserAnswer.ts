import { User } from "../Interfaces/IUser";
import { Answer } from "../Interfaces/IAnswer";

export interface UserAnswer {
  id: number;
  user: User;
  answer: Answer;
}
