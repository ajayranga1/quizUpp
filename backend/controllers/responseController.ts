import { Request, Response } from 'express';
import User from '../models/userSchema';

export const submitResponse = async (req: Request, res: Response) => {
  try {
    const {
      name,
      dob,
      fatherName,
      address,
      docType,
      docNum,
      email,
      //   pic ,
      score,
      responses,
    } = req.body;
    if (
      name &&
      dob &&
      fatherName &&
      address &&
      docType &&
      docNum &&
      email &&
      score !== null &&
      responses
    ) {
      const newUser = new User({
        name,
        dob,
        fatherName,
        address,
        docType,
        docNum,
        email,
        //   pic ,
        score,
        responses,
      });
      var userData = await newUser.save();
      res.status(201).json(userData);
    } else {
      res.status(400).json({ error: 'Some details are missing' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
