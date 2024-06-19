import { UserInterface } from "../interfaces/UserInterface";
import User from "../models/user";
import UserRole from "../models/userRole";
import Role from "../models/role";

import Profile from "../models/profile";
import { Op } from "sequelize";

export class UserRepository implements UserInterface {
  async findById(userId: number) {
    return await User.findByPk(userId, {
      include: [
        { model: Profile, as: "profile" },
        { model: Role, as: "roles", through: { attributes: [] } },
      ],
    });
  }

  async assignRole(userId: number, transaction: any) {
    return await UserRole.create(
      {
        user_id: userId,
        role_id: Role.ROLE_CLINT_ID,
      },
      { transaction }
    );
  }

  async list(data: any) {
    let query: any = {
      where: {},
      include: [],
      order: [["id", "DESC"]],
    };
    try {
      const limit = data.limit || 10;
      const page = data.page || 1;
      const offset = (page - 1) * limit;
  
      if (data.email) {
        query.where.email = { [Op.like]: "%" + data.email + "%" };
      }else{
        query.include.push({
          model: Role,
          as: "roles",
  
        });
      }
  

      if (data.name) {
        query.where.name = { [Op.like]: "%" + data.name + "%" };
      }
  

      if (data.role_name) {
        query.include.push({
          model: Role,
          as: "roles",
          where: {
            name: {
              [Op.like]: `%${data.role_name}%`
            }
          },
          through: {
            attributes: []
          }
        });
      }
      
      query.include.push({
        model: Profile,
        as: "profile",

      });



      const totalCount = await User.count({
        where: query.where,
        include: query.include
      });
    


      query.limit = limit;
      query.offset = offset;
      
      const users = await User.findAll(query);
      const totalPages = Math.ceil(totalCount / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const perPage = page > 1 ? page - 1 : 0;
  
      return {
        users,
        totalPages,
        currentPage: page,
        totalCount,
        nextPage,
        perPage,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
  
}
