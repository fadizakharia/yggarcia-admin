export function getPermissionRoutes(permissions: string[]) {
  let permissionRoutes = [] as Array<"Blog" | "Books" | "Character">;
  let currentPerm;
  let currentRoute;
  permissions.forEach((perm) => {
    currentPerm = perm.split(":");
    currentRoute = (currentPerm[1].charAt(0).toUpperCase() +
      currentPerm[1].slice(1)) as "Blog" | "Books" | "Character";
    if (permissionRoutes.includes(currentRoute)) {
      return;
    }
    permissionRoutes.push(currentRoute);
  });
  return permissionRoutes;
}
export function getPermissionSubRoutes(permissions: string[]) {
  let permissionRoutes = {} as {
    Books?: Array<"add" | "update" | "delete">;
    Blog?: Array<"add" | "update" | "delete">;
    Character?: Array<"add" | "update" | "delete">;
  };
  let currentPerm;
  let currentRoute;
  permissions.forEach((perm) => {
    currentPerm = perm.split(":");
    currentRoute = (currentPerm[1].charAt(0).toUpperCase() +
      currentPerm[1].slice(1)) as "Blog" | "Books" | "Character";
    if (permissionRoutes[currentRoute]) {
      permissionRoutes[currentRoute] = [
        ...permissionRoutes[currentRoute]!,
        currentPerm[0] as "add" | "update" | "delete",
      ];
    } else {
      permissionRoutes = {
        ...permissionRoutes,
        [currentRoute]: [currentPerm[0]],
      };
    }
  });
  return permissionRoutes;
}
// result: {books:["add","delete"]...etc}
