import { Request, Response } from 'express';
import Question from '../models/questionSchema';

export const getAllQuestion = async (req: Request, res: Response) => {
  try {
    const allQuestions = await Question.find();
    res.status(201).json(allQuestions);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
