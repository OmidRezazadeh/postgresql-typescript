import { CategoryInterface } from "../interfaces/CategoryInterface";
import Category from "../models/category";
export class CategoryRepository implements CategoryInterface {

  // Method to create a new category in the database
  async store(data: any) {
    // Uses Sequelize's create method to insert the category data into the database
    return await Category.create(data);
  }

  // Method to find a category by its name
  async findByName(name: any) {
    // Uses Sequelize's findOne method to search for a category with the specified name
    return await Category.findOne({ where: { name: name } });
  }

  // Method to find a category by its ID
  async findById(id: number) {
    // Uses Sequelize's findByPk method to search for a category by its primary key (ID)
    return await Category.findByPk(id);
  }

  // Method to update an existing category by its ID
  async edit(data: any, id: number) {
    // Uses Sequelize's update method to modify the category with the provided data, based on the specified ID
    return await Category.update(data, { where: { id: id } });
  }
}

