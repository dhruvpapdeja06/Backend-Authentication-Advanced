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


/**
 * @route GET /api/auth/refresh-token
 * @desc Create an access token and with the help of refresh token
 * @access Private
 * 
 */

authRouter.get('/refresh-token',authController.refreshTokenController);

/**
 * @route GET /api/auth/logout
 * @desc Logout user 
 * @access Public
 */

authRouter.get('/logout',authController.logoutUserController);


/**
 * @route GET /api/auth/logoutAll
 */
authRouter.get('/logout-all',authController.logoutAllController);


/**
 * @route POST /api/auth/login
 * @desc Login user expect email and password
 */

authRouter.post('/login',authController.loginUserController);

export default authRouter;