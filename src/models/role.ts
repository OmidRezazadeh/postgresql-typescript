
import { Model, DataTypes, Sequelize } from "sequelize";

interface RoleAttributes {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}
class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
  public  created_at!: Date;
  public  updated_at!: Date;
  static readonly ROLE_CLINT_ID = 1;

  // A static method to initialize the User model
  static initialize(sequelize: Sequelize) {

    Role.init(
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
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
       

      },
      // Define model options
      {
        sequelize, // Pass the Sequelize instance
        modelName: 'Role', // Specify the model name
        timestamps: false, // Enable timestamps
        underscored: true, // Use snake_case for column names
        tableName: 'Roles',

      }
    );
 
  }
}

// Export the User model
export default Role;
