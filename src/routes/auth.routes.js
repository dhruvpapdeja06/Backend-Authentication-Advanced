import { Router } from 'express';
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();



/**
 * @route POST /api/auth/register
 * @desc Register a user
 * @access Public
 */

authRouter.post('/register',authController.registerUserController);

/**
 * @route GET /api/auth/get-me
 * @desc Current User login 
 * @access Private
 */

authRouter.get('/get-me',authController.getMeUserController);

export default authRouter;