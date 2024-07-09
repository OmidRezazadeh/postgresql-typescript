import { Model, DataTypes, Sequelize } from "sequelize";
import Profile from "./profile";
interface ImageAttributes {
  id?: number;
  url: string;
  imageable_id: number;
  imageable_type: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
class Image extends Model<ImageAttributes> implements ImageAttributes {
  public id?: number;
  public url!: string;
  public imageable_id!: number;
  public imageable_type!: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  static initialize(sequelize: Sequelize) {
    Image.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        imageable_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        imageable_type: {
          type: DataTypes.STRING,
          allowNull: false,
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
      {
        modelName: "Image",
        sequelize,
        underscored: true,
        tableName: "Images", // Ensure this matches your actual table name
        createdAt: 'created_at', // Map createdAt to created_at column
        updatedAt: 'updated_at', // Map updatedAt to updated_at column
      }
    );
  }

  static associate(models: { Profile: typeof Profile }) {
    this.belongsTo(Profile, {
      foreignKey: 'imageable_id',
      constraints: false,
      as: 'imageable',
    });
  }
}
export default Image;
