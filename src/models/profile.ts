import { Model, DataTypes, Sequelize } from "sequelize";
import User from "./user";

interface ProfileAttributes {
  id?: number;
  userId: number;
  image: string;
  bio: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
  public id!: number;
  public userId!: number; // Change UserId to userId
  public image!: string;
  public bio!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Profile.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: { // Change UserId to userId
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        bio: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE,
        },
      },

      {
        modelName: "Profile",
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: "Profiles",
        paranoid: true, // Enable soft deletion handling
      }
    );
  }

  static associate(models: { [key: string]: typeof Model }) {
    this.belongsTo(User, { as: "user", foreignKey: "userId" });
  }
}

export default Profile;
