import { Model, DataTypes, Sequelize } from 'sequelize';
import User from './user';
import Image from "./image";

interface ProfileAttributes {
  id?: number;
  user_id: number;
  bio?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
  public id!: number;
  public user_id!: number;

  public bio?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static initialize(sequelize: Sequelize) {
    Profile.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bio: {
          type: DataTypes.STRING,
          allowNull: true,
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
        deleted_at: {
          allowNull: true,
          type: DataTypes.DATE,
        },
      },
      
      {
        modelName: 'Profile',
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'Profiles', // Ensure this matches your actual table name
        paranoid: true, // Enable soft deletion handling
      }
    );
  }

 
  static associate(models: { User: typeof User; Image: typeof Image }) {
    this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
    this.hasOne(Image, {
      foreignKey: 'imageable_id',
      constraints: false,
      scope: {
        imageable_type: 'profile',
      },
      as: 'image',
    });
  }
}
export default Profile;
