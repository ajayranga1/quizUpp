import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../models/userSchema';

export const submitResponse = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        dob,
        fatherName,
        address,
        docType,
        docNum,
        email,
        image,
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
        const mailExist = await User.findOne({ email });
        if (mailExist) {
          res.status(400);
          throw new Error(`Email ${email} has already submitted their quiz`);
        }
        const docNumExist = await User.findOne({ docNum });
        if (mailExist) {
          res.status(400);
          throw new Error(`Document Number ${docNum} has already used`);
        }
        const newUser = new User({
          name,
          dob,
          fatherName,
          address,
          docType,
          docNum,
          email,
          image,
          score,
          responses,
        });
        var userData = await newUser.save();
        res.status(201).json(userData);
      } else {
        res.status(400);
        throw new Error('Some details are missing');
      }
    } catch (error: any) {
      console.log(error);
      res.status(400);
      throw new Error(error);
    }
  }
);
