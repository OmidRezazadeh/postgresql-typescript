import { Model, DataTypes, Sequelize } from 'sequelize';
import User from './user';

interface ProfileAttributes {
  id?: number;
  user_id: number;
  image?: string;
  bio?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
  public id!: number;
  public user_id!: number;
  public image?: string;
  public bio?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

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
        image: {
          type: DataTypes.STRING,
          allowNull: true,
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

  static associate(models: { [key: string]: typeof Model }) {
    this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
  }
}

export default Profile;
