import { initialize } from "passport";
import { Model, DataTypes, Sequelize } from "sequelize";

interface CardItemAttributes {
  id: number;
  product_id: number;
  card_id: number;
  amount: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
class CardItem extends Model<CardItemAttributes> implements CardItemAttributes {
  id!: number;
  product_id!: number;
  amount!: number;
  card_id!: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  static initialize(sequelize: Sequelize) {
    CardItem.init({
      id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      product_id:{
        type: DataTypes.INTEGER,
      },
      amount:{
        type: DataTypes.INTEGER,
      },
      card_id:{
        type: DataTypes.INTEGER,
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
    modelName:'cardItem',
    sequelize,
    timestamps:true,
    underscored:true,
    tableName:'card_items',
    paranoid:true,
    createdAt: 'created_at', // Map createdAt to created_at column
    updatedAt: 'updated_at', // Map updatedAt to updated_at column
    deletedAt:'deleted_at', // Map deletedAt to deleted_at
  }
  
  )

  }
}
