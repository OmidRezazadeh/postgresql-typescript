import { Model, DataTypes, Sequelize } from "sequelize";
interface ImageAttributes {
  id?: number;
  url: string;
  imageable_id: string;
  imageable_type: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
class Image extends Model<ImageAttributes> implements ImageAttributes {
  public id?: number;
  public url!: string;
  public imageable_id!: string;
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
        timestamps: true,
        underscored: true,
        tableName: "Images", // Ensure this matches your actual table name
      }
    );
  }

  static associate(models: { Image: typeof Image }) {
    this.hasOne(Image, {
      foreignKey: "imageable_id",
      as: "imageable",
      constraints: false,
    });
  }
}
export default Image;
