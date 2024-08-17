import express from "express";
import { AuthController } from "../controllers/AuthController";
import { isLoggedIn } from "../middleware/LoggedInWithGoogle";
const authRoutes = express.Router();
/**
 * @openapi
 * /auth/home:
 *   get:
 *     summary: Displays the home page for authentication.
 *     responses:
 *       200:
 *         description: Home page displayed successfully.
 */
authRoutes.get("/auth/home", AuthController.home.bind(AuthController));


/**
 * @openapi
 * /auth/google:
 *   get:
 *     summary: Initiates Google OAuth2 authentication.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication.
 */
authRoutes.get("/auth/google", AuthController.googleAuth.bind(AuthController));
/**
 * @openapi
 * /auth/google/callback:
 *   get:
 *     summary: Callback route for Google OAuth2.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Google OAuth2 callback was successful.
 *       401:
 *         description: Google OAuth2 callback failed.
 */
authRoutes.get(
  "/auth/google/callback",
  AuthController.googleAuthCallback.bind(AuthController)
);
/**
 * @openapi
 * /auth/google/failure:
 *   get:
 *     summary: Google OAuth2 authentication failure route.
 *     tags:
 *       - Authentication
 *     responses:
 *       401:
 *         description: User failed to authenticate with Google.
 */

authRoutes.get(
  "/auth/google/failure",
  AuthController.googleAuthFailure.bind(AuthController)
);

/**
 * @openapi
 * /auth/google/success:
 *   get:
 *     summary: Google OAuth2 authentication success route.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully authenticated with Google.
 *       401:
 *         description: User is not authenticated.
 */
authRoutes.get(
  "/auth/google/success",
  isLoggedIn,
  AuthController.googleAuthSuccess.bind(AuthController)
);
/**
 * @openapi
 * /auth/logout:
 *   get:
 *     summary: Logs out the authenticated user.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User successfully logged out.
 */
authRoutes.get("/auth/logout", AuthController.logout.bind(AuthController));

export default authRoutes;
