import { ProductInterface } from "../interfaces/ProductInterface";
import Product, { ProductAttributes } from "../models/product";
import Image from "../models/image";
import { Op } from "sequelize";
import User from "../models/user";

export class ProductRepository implements ProductInterface {
  async store(data: any, userId: number) {
    data.user_id = userId;
    return await Product.create(data);
  }

  async checkAccessUser(productId: number, userId: number) {
    return await Product.findOne({
      where: { [Op.and]: [{ user_id: userId }, { id: productId }] },
    });
  }

  async findImageByProductId(productId: number) {
    return await Product.findOne({
      where: { id: productId },
      include: [{ model: Image, as: "images" }],
    });
  }

  async findById(productId: number) {
    return await Product.findOne({
      where: { id: productId },
      include: [
        { model: Image, as: "images" },
        { model: User, as: "user" },
      ],
    });
  }


  async list(data: any) {

    let query: any = {
      include: [
        { model: Image, as: "images" },
        { model: User, as: "user" },
      ],
      order: [["id", "DESC"]],
    };
    try {
      const limit = data.limit || 5;
      const page = data.page || 1;
      const offset = (page - 1) * limit;
      if (data.name !== undefined) {
        const name = {
          where: {
            ["name"]: { [Op.like]: "%" + data.name + "%" }, // Use LIKE operator for partial matching
          },
        };
        query = name; // Assign the name filter to the query
      }
      if (data.category_id !== undefined) {
        const category_id = {
          where: { category_id: data.category_id },

        };
        query = category_id;
      }
      if (data.description !== undefined) {
        const description = {
          where: {
            ["description"]: { [Op.like]: "%" + data.description + "%" }, // Use LIKE operator for partial matching
          },
        };
        query = description; // Assign the description filter to the query
      }
      if (data.status) {
        const status = {
          where: { status: data.status },
        };
        query = status;
      }


      // Count total products matching the query
      const totalCount = Number(await Product.count(query)); // Get the total count of matching products
      const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages
      // Set ordering, limit, and offset for the query
      query.order = [["id", "DESC"]]; // Order the results by id in descending order
      query.limit = limit; // Limit the number of results per page
      query.offset = offset; // Set the offset for pagination

      // Fetch products based on the constructed query
      const products = await Product.findAll(query); // Retrieve the products from the database
      const nextPage = page < totalPages ? page + 1 : null; // Determine the next page number, if any
      const perPage = page > 1 ? page - 1 : 0; // Determine the previous page number, if any

      // Return products, total pages, and current page
      return {
        products, // The list of products retrieved from the database
        totalPages, // The total number of pages
        currentPage: page, // The current page number
        totalCount, // The total number of products matching the query
        nextPage, // The next page number, if it exists
        perPage, // The previous page number, if it exists
      };
    } catch (error) {
      console.log(error);
    }
  }

  async edit(productId: number, data: any) {
    try {
      await Product.update(data, { where: { id: productId } });
    } catch (error) {
      console.log(error);
    }
  }
}
