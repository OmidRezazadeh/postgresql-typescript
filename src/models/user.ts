import { Model, DataTypes, Sequelize } from 'sequelize';
import Profile from './profile';
// Define an interface for User attributes
interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the User model extending Model and implementing UserAttributes interface
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number; // Define id as a public property of type number
  public name!: string; // Define lastName as a public property of type string
  public email!: string; // Define email as a public property of type string
  public password!: string; // Define password as a public property of type string
 
  // Timestamps - readonly ensures these properties cannot be modified
  public  created_at!: Date;
  public  updated_at!: Date;

  // A static method to initialize the User model
  static initialize(sequelize: Sequelize) {

    User.init(
      // Define model attributes
      {
        id: {
          type: DataTypes.INTEGER, // Define id as an integer
          autoIncrement: true, // Enable auto-increment
          primaryKey: true, // Define it as primary key
        },
        name: {
          type: DataTypes.STRING, // Define lastName as string
          allowNull: false, // Disallow null values
        },
        email: {
          type: DataTypes.STRING, // Define email as string
          allowNull: false, // Disallow null values
          unique: true, // Ensure email is unique
        },
        password: {
          type: DataTypes.STRING, // Define password as string
          allowNull: false, // Disallow null values
        },
        created_at: {
          type: DataTypes.DATE, // Define createdAt as Date
          allowNull: false, // Disallow null values
          defaultValue: DataTypes.NOW 
        },
        updated_at: {
          type: DataTypes.DATE, // Define updatedAt as Date
          allowNull: false, // Disallow null values
          defaultValue: DataTypes.NOW 
        },
      },
      // Define model options
      {
        sequelize, // Pass the Sequelize instance
        modelName: 'User', // Specify the model name
        timestamps: false, // Enable timestamps
        underscored: true, // Use snake_case for column names
        tableName: 'Users',

      }
    );
 
  }
  static associate(models: { User: typeof User }) {
    this.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
  }
}

// Export the User model
export default User;
