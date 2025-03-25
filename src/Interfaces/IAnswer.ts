export interface Answer {
  id: number;
  text: string;
  questionId: number;
  nextQuestionId?: number;
}
