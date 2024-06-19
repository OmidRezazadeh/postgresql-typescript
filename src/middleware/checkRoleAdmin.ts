import { Request, Response, NextFunction } from 'express'; // Importing necessary Express types
import Role from "../models/role";
import { getDecodedToken } from "../utils/token"; // Importing a function to decode tokens
import User from '../models/user';

// Middleware function to check if the user has an admin role
export const checkAdminRoleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = getDecodedToken(req.get('Authorization')); // Decode the token from the Authorization header
  try {
      // If the token is missing, respond with an error
      if (!token) {
          return res.status(400).json({ message: 'مجوز کافی ندارید' }); // Responding with an error if the token is missing
      }  

      const userId = token.user.userId; // Extract the user ID from the token
      // Find the user by their ID, including their roles
      const user = await User.findByPk(userId, {
          include: [
              {
                  model: Role, as: "roles", through: { attributes: [] } // Include the roles of the user without any additional attributes from the through table
              }
          ]
      });
      // Ensure user is an array for consistent handling
      const userDataArray = Array.isArray(user) ? user : [user];
      
      // Check if the user has the 'admin' role
      const isAdmin = userDataArray[0].roles.some((role: Role) => role.name === 'admin');

      // If the user is not an admin, respond with an error
      if (!isAdmin) {
          return res.status(403).json({ message: 'شما به این عملیات دسترسی ندارید' });
      }

      next(); // If the user is an admin, proceed to the next middleware

  } catch (error) {
      next(error); // Pass the error to the next middleware for handling
      console.log(error); // Log the error for debugging purposes
  }
}
