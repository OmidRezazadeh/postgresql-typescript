
import { Model, DataTypes, Sequelize } from "sequelize";
import Product from "./product";
interface CategoryAttributes {
  id:number ;
  name:string ;
  created_at?: Date;
  updated_at?: Date; 
}
 class Category extends Model<CategoryAttributes> implements CategoryAttributes  {


  public id!:number ;
  public name!:string ;
  public created_at?: Date;
  public updated_at?: Date; 

  static initialize(sequelize: Sequelize){
    Category.init({
      id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
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

    {
      modelName: 'Category',
      sequelize,
      timestamps: true,
      underscored: true,
      tableName: 'Categories', // Ensure this matches your actual table name
      paranoid: true, // Enable soft deletion handling
    }
  )
  }


  static associate(models:{Product:typeof Product}){
    this.belongsTo(Product, {
      foreignKey: 'category_id',
      as:"products"
    });
  }
 }
export default Category;