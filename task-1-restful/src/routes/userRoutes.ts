import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middlewares/authMiddleware.ts";
import { validateInput } from "../middlewares/validationMiddleware.ts";
import {
  register,
  getProfile,
  getAllProfile,
  updateProfile,
  deleteAccount,
  changePassword,
} from "../controllers/userController.ts";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("name").notEmpty().withMessage("Name is required"),
    body("dob").isISO8601().withMessage("Date of birth is not valid"),
    body("gender")
      .isIn(["male", "female", "other"])
      .withMessage("Gender must me male, female, or other"),
    body("address").notEmpty().withMessage("Address should not be empty"),
    body("subscribeToNewsletter")
      .isBoolean()
      .withMessage("Subscribe must be either true or false"),
    validateInput,
  ],
  register,
);

router.get("/profile", auth, getProfile);
router.get("/profile/findAll", getAllProfile);
router.put("/profile", auth, updateProfile);
router.delete("/user", auth, deleteAccount);
router.post("/change-password", auth, changePassword);

export default router;
