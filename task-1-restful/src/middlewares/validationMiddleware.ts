import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  console.log("Errors: ", errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
