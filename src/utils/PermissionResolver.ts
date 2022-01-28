import {
    ApplicationCommandPermissions,
    Collection,
    Guild,
    PermissionResolvable,
    Role
} from "discord.js";

export const getModerate = async (
  guild: Guild
): Promise<ApplicationCommandPermissions[]> => {
  const moderate = getFilterRolesByPermission(guild, "MODERATE_MEMBERS");
  return moderate.map((m) => ({ id: m.id, type: "ROLE", permission: true }));
};

const getFilterRolesByPermission = (
  guild: Guild,
  permission: PermissionResolvable
): Collection<string, Role> => {
  return guild.roles.cache.filter(
    (r) => !r.tags && r.permissions.has(permission)
  );
};
