import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Question from '../models/questionSchema';

export const getAllQuestion = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allQuestions = await Question.find();

      res.status(201).json(shuffleArray(allQuestions).slice(0, 20));
    } catch (error: any) {
      console.log(error);
      res.status(404);
      throw new Error(error);
    }
  }
);

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
