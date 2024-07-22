import { ProductInterface } from "../interfaces/ProductInterface";
import Product, { ProductAttributes } from "../models/product";
import Image from "../models/image";
import { Op } from "sequelize";
export class ProductRepository implements ProductInterface {
  async store(data: any, userId: number) {
    data.user_id = userId;
    return await Product.create(data);
  }

  async findById(productId: number) {
    return await Product.findByPk(productId);
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

  async edit(productId: number, data: any) {
    try {
      await Product.update(data, { where: { id: productId } });
    } catch (error) {
      console.log(error);
    }
  }
}
