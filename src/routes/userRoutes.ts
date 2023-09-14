import { Router, Request, Response } from "express";
import userController from "../controllers/userController";
import authenticateToken from "../middlewares/Auth";

const userRoutes = Router();

userRoutes.post('/register', userController.registerUser);
userRoutes.post('/login', userController.loginUser);
userRoutes.get('/', userController.findAllUsers);
userRoutes.get('/:id', userController.findUserById);
userRoutes.put('/:id', authenticateToken, userController.updateUser);
userRoutes.delete('/:id', authenticateToken, userController.deleteUser);


export default userRoutes;