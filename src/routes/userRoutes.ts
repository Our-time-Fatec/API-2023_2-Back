import { Router, Request, Response } from "express";
import userController from "../controllers/userController";

const userRoutes = Router();

userRoutes.post('/register', userController.registerUser);
userRoutes.post('/login', userController.loginUser);
userRoutes.get('/', userController.findAllUsers);
userRoutes.get('/:id', userController.findUserById);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser);


export default userRoutes;