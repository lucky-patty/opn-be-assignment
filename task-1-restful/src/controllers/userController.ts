import { Request, Response } from "express";
import * as userService from "../services/userService";
import { generateUserId, calculateAge } from "../utils/utils";

export const register = async (req: Request, res: Response) => {
  const userId = generateUserId();
  console.log("UserId: ", userId);
  await userService.registerUser(userId, req.body);
  res.status(201).json({
    message: "Successfully registerd",
    userId,
    token: `faketoken_${userId}`,
  });
};

export const getProfile = (req: Request, res: Response) => {
  const userId = (req as any).userId;
  console.log("Get Profile ID: ", userId);
  const user = userService.getUserById(userId);
  console.log("User: ", user);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { email, name, dob, gender, address, subscribeToNewsletter } = user;
  const age = calculateAge(dob);
  res
    .status(200)
    .json({ email, name, age, gender, address, subscribeToNewsletter });
};

export const getAllProfile = (req: Request, res: Response) => {
  const users = userService.getAllUsers();
  return res.status(200).json(users);
};

export const updateProfile = (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { dob, gender, address, subscribeToNewsletter } = req.body;

  userService.updateUser(userId, {
    dob,
    gender,
    address,
    subscribeToNewsletter,
  });
  res.json({ message: "Successfully update profile" });
};

export const deleteAccount = (req: Request, res: Response) => {
  const userId = (req as any).userId;
  userService.deleteUser(userId);
  res.json({ message: "Successfully deleted account" });
};

export const changePassword = (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "The password is mismatch" });
  }

  const success = userService.changePassword(
    userId,
    currentPassword,
    newPassword,
  );

  if (!success) {
    return res.status(400).json({ error: "Current password is mismatch" });
  }

  res.json({ message: "Successfully changed password" });
};
