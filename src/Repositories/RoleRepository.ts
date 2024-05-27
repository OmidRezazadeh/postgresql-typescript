import { ProfileInterface } from "../interfaces/RoleInterface";
import Role from "../models/role";
const { Op } = require("sequelize");
export class RoleRepository implements ProfileInterface {
  async create(data: any) {
    try {
      const role = await Role.create(data);
      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number) {
    const role = await Role.findByPk(id);
    return role;
  }
  async edit(data: any, id: number) {
    const role = await Role.update(data, { where: { id: id } });
    console.log(role);
  }
 
  async list(data: any) {
    let query: any = {}; // Initialize query as an empty object
    try {
      const page = data.page || 1; // Default page is 1 if not provided
      const limit = data.limit || 10; // Default limit is 10 if not provided
      const offset = (page - 1) * limit; // Calculate the offset for pagination
  
      // If name filter is provided, construct a query to filter by name
      if (data.name !== undefined) {
        const name = {
          where: {
            ["name"]: { [Op.like]: "%" + data.name + "%" }, // Use LIKE operator for partial matching
          },
        };
        query = name; // Assign the name filter to the query
      }
  
      // Count total roles matching the query
      const totalCount = Number(await Role.count(query)); // Get the total count of matching roles
      const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages
  
      // Set ordering, limit, and offset for the query
      query.order = [["id", "DESC"]]; // Order the results by id in descending order
      query.limit = limit; // Limit the number of results per page
      query.offset = offset; // Set the offset for pagination
  
      // Fetch roles based on the constructed query
      const roles = await Role.findAll(query); // Retrieve the roles from the database
      const nextPage = page < totalPages ? page + 1 : null; // Determine the next page number, if any
      const perPage = page > 1 ? page - 1 : 0; // Determine the previous page number, if any
      
      // Return roles, total pages, and current page
      return {
        roles, // The list of roles retrieved from the database
        totalPages, // The total number of pages
        currentPage: page, // The current page number
        totalCount, // The total number of roles matching the query
        nextPage, // The next page number, if it exists
        perPage, // The previous page number, if it exists
      };
    } catch (error) {
      console.log(error); // Log any errors that occur during execution
    }
  }
  
}
