import { Answer } from "../Interfaces/IAnswer";

export interface Question {
  id: number;
  text: string;
  category: string;
  level: number;
  answers: Answer[];
}
