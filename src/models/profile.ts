import { Model, DataTypes } from "sequelize";
const connectDB = require("./config/database");
export interface ProfileInterface {
  id: number;
  userId: number;
  image: string;
  bio: string;
}

export class Profile extends Model {
  public id!: number;
  public UserId!: number;
  public image!: string;
  public bio!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
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
  // underscored: true,
  tableName: "Profiles",
  sequelize: connectDB // this bit is important
}
);
export default Profile;
