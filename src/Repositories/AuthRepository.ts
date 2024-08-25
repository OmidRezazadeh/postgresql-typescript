import { AuthIfterface } from "../interfaces/AuthInterface";  // Importing the AuthInterface to ensure the repository implements required methods.
import User from "../models/user";  // Importing the User model for interacting with the database.

// AuthRepository class implements the AuthInterface to manage authentication-related operations.
export class AuthRepository implements AuthIfterface {

  // authenticate method is currently a placeholder for future implementation.
  async authenticate(): Promise<any> {
    // Implementation needed here.
  }

  // findByEmail method retrieves a user by their email address.
  async findByEmail(email: string): Promise<any> {
    // Query the User model to find a user with the specified email.
    const user = await User.findOne({ where: { email: email } });
    return user;  // Return the found user.
  }

  // createUser method creates a new user in the database.
  async createUser(
    email: string,
    name: string,
    password: string,
    transaction: any  // Transaction object for managing database transactions.
  ) {
    try {
      // Attempt to create a new user record in the database.
      const user = await User.create(
        {
          email: email,  // Set the user's email.
          name: name,  // Set the user's name.
          password: password,  // Set the user's password.
        },
        { transaction }  // Pass the transaction object to ensure atomicity.
      );
      return user;  // Return the created user.
    } catch (error) {
      // If an error occurs, throw it to be handled by the calling function.
      throw error;
    }
  }
}
