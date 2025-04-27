import { User } from "../models/user";
import { users } from "../data/userStorage";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const registerUser = async (
  userId: string,
  userData: Omit<User, "id">,
) => {
  const hashP = await bcrypt.hash(userData.password, SALT_ROUNDS);
  users[userId] = { id: userId, ...userData, password: hashP };
};

export const getAllUsers = (): User[] | null => {
  return users;
};

export const getUserById = (userId: string): User | null => {
  return users[userId] || null;
};

export const updateUser = (userId: string, updateData: Partial<User>) => {
  users[userId] = { ...users[userId], ...updateData };
};

export const deleteUser = (userId: string) => {
  delete users[userId];
};

export const changePassword = async (
  userId: string,
  currentP: string,
  newP: string,
): Promise<boolean> => {
  const user = users[userId];
  const isMatch = await bcrypt.compare(currentP, user.password);

  if (isMatch) {
    const hashedNewP = await bcrypt.hash(newP, SALT_ROUNDS);
    user.password = hashedNewP;
    return true;
  }

  return false;
};
