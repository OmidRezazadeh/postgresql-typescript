export const UserCollection = (users: any) => {
  const data = users?.users;
  const transFormedData = data.map((user: any) => {

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile
        ? {
            id: user.profile.id,
            bio: user.profile.bio,
          }
        : null,
        roles: user.roles
        ? user.roles.map((role: any) => ({
            id: role.id,
            name: role.name,
          }))
        : [],
    };
  });
  return {
    users: transFormedData,
    meta: {
      total_pages: users?.totalPages, // Total number of pages
      current_page: users?.currentPage, // Current page number
      total: users?.totalCount, // Total number of users
      per_page: users?.perPage, // Number of items per page
      next_page: users?.nextPage, // Next page number, if any
    },
  };
};
