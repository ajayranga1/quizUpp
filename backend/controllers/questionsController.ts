import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Question from '../models/questionSchema';

export const getAllQuestion = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allQuestions = await Question.find();
      res.status(201).json(allQuestions);
    } catch (error: any) {
      console.log(error);
      res.status(404);
      throw new Error(error);
    }
  }
);
