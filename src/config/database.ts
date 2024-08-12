const { Sequelize } = require("sequelize");
import User from "../models/user";
import Profile from "../models/profile";
import Role from "../models/role";
import UserRole from "../models/userRole";
import Product from "../models/product";
import Category from "../models/category";
import Image from "../models/image";

import Transaction from "../models/transaction";
import Cart from "../models/cart";
import CartItem from "../models/cartItem";
interface DBConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: "postgres";
  pool?: {
    max?: number;
    min?: number;
    idle?: number;
  };
}

const dbConfig: DBConfig = {
  database: "postgres",
  username: "postgres",
  password: "admin",
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};
const connectDB = new Sequelize(dbConfig);
Profile.initialize(connectDB);
User.initialize(connectDB);
Role.initialize(connectDB);
UserRole.initialize(connectDB);
Product.initialize(connectDB);
Category.initialize(connectDB);
Image.initialize(connectDB);

Transaction.initialize(connectDB);
Cart.initialize(connectDB);
CartItem.initialize(connectDB);

// Set up associations
User.associate({ Profile, Role,Product,Cart });
Profile.associate({ User,Image });
Role.associate({ User });
Product.associate({ Category,User,Image,CartItem });
Image.associate({ Profile });

Transaction.associate({Cart,User});
Cart.associate({User,CartItem});
CartItem.associate({Cart,Product})

// Establish Many-to-Many relationships
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });

function authenticate() {
  return connectDB.authenticate();
}

// Export the sequelize instance and the authenticate function
module.exports = {
  connectDB,
  authenticate,
};
