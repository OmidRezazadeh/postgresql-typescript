export const RoleCollection = (roles: any) => {
    // Extract roles from the input object
    const data = roles?.roles;
  
    // Transform the roles data into a simpler format
    const transformedData = data.map((role: any) => {
      return {
        id: role.id, // Include the role's id
        name: role.name, // Include the role's name
      };
    });
  
    // Return the transformed roles along with pagination metadata
    return {
      roles: transformedData, // The transformed list of roles
      meta: {
        total_pages: roles?.totalPages, // Total number of pages
        current_page: roles?.currentPage, // Current page number
        total: roles?.totalCount, // Total number of roles
        per_page: roles?.perPage, // Number of items per page
        next_page: roles?.nextPage, // Next page number, if any
      }
    };
  };
  