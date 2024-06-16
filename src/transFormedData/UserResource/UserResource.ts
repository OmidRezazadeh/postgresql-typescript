import Role from "../../models/role";
export const UserResource = (user: any) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  
    profile: user.profile
    ? {
        id:user.profile.id,
        bio: user.profile.bio,
      }
      : null,
      roles: user.roles
      ? user.roles.map((role: Role) => ({
          id: role.id,
          name: role.name,
        }))
      : [],
  };
};
