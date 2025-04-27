import { Request, Response, NextFunction } from "express";
import { users } from "../data/userStorage";
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or missing token" });
  }

  const token = authHeader.split(" ")[1];
  const userId = token.replace("faketoken_", "");

  console.log("UserID: ", userId);
  const user = users[userId];
  console.log("User: ", user);

  if (!users[userId]) {
    return res.status(401).json({ error: "Unauthorized: User not found" });
  }

  (req as any).user = user;
  (req as any).userId = userId;
  next();
};
