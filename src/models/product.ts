import { Model, DataTypes, Sequelize } from "sequelize";
import Category from "./category";
import User from "./user";
import Image from "./image";
export  interface ProductAttributes {
  id: number;
  name: string;
  user_id: number;
  price: number;
  description: string;
  category_id: number;
  count:number;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}
class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public user_id!: number;
  public price!: number;
  public description!: string;
  public category_id!: number;
  public count!:number;
  public status!: number;
  public created_at?: Date;
  public updated_at?: Date;

  static initialize(sequelize: Sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        name: {
          type: DataTypes.STRING, // Define lastName as string
          allowNull: false, // Disallow null values
        },
        category_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Categories",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        user_id: {
          type: DataTypes.INTEGER,
        },
        price: {
          type: DataTypes.INTEGER,
        },
        description: {
          type: DataTypes.STRING,
        },
        count:{
          type: DataTypes.INTEGER,
          defaultValue:0,
        },
        status:{
          type: DataTypes.INTEGER,
          defaultValue:0,
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
        createdAt: 'created_at', // Map createdAt to created_at column
        updatedAt: 'updated_at', // Map updatedAt to updated_at column
        deletedAt:'deleted_at', // Map deletedAt to deleted_at
        modelName: "Product",
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: "Products", // Ensure this matches your actual table name
      
      }
    );
  }
  static associate(models: {
    Category: typeof Category;
    User: typeof User;
    Image: typeof Image;
  }) {
    this.belongsTo(Category, {
      foreignKey: "category_id",
      as: "category",
    });

    this.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
    this.hasMany(Image, {
      foreignKey: "imageable_id",
      as: "images",
      constraints: false,
      scope: {
        imageable_type: "product",
      },
    });
  }
}
export default Product;
