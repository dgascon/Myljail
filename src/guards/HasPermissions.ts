import {
  ButtonInteraction,
  CommandInteraction,
  ContextMenuInteraction,
  GuildMember,
  PermissionResolvable,
  SelectMenuInteraction
} from "discord.js";
import { ArgsOf, GuardFunction, SimpleCommandMessage } from "discordx";
import { CompareArrayEvery, CompareArraySome } from "../utils/Compare.js";
import { ToMember } from "./utils/ToMember.js";

/**
 * Middleware which check if all permissions or some permissions are obtained
 * @param permissionsFlags Array of permissions
 * @param allPermissionsChecked if true, all permissions must be obtained
 * @returns If all is ok, function continue else stop
 */
export function HasPermissions(
  permissionsFlags: PermissionResolvable[],
  allPermissionsChecked: Boolean = false
) {
  const guard: GuardFunction<
    | ArgsOf<"messageCreate" | "messageReactionAdd" | "voiceStateUpdate">
    | CommandInteraction
    | ContextMenuInteraction
    | SelectMenuInteraction
    | ButtonInteraction
    | SimpleCommandMessage
  > = async (arg, client, next) => {
    let member = ToMember(arg);

    // If not the type of member is not GuildMember
    if (!member || !(member instanceof GuildMember)) return;

    // If permissionFlags Array is empty
    if (permissionsFlags.length === 0) return;

    const memberPermission = member.permissions.toArray();

    if (allPermissionsChecked) {
      if (CompareArrayEvery(permissionsFlags, memberPermission)) await next();
    } else {
      if (CompareArraySome(permissionsFlags, memberPermission)) await next();
    }
  };

  return guard;
}
