import { APIInteractionGuildMember } from "discord-api-types/v9";
import {
  ButtonInteraction,
  CommandInteraction,
  ContextMenuInteraction,
  GuildMember,
  Message,
  MessageReaction,
  SelectMenuInteraction,
  VoiceState
} from "discord.js";
import { ArgsOf, SimpleCommandMessage } from "discordx";

/**
 * Transform Arg to Member Object
 * @param arg Argument containing Member
 * @returns GuildMember, APIInteractionGuildMember or Null
 */
export const ToMember = (
  arg:
    | ArgsOf<"messageCreate" | "messageReactionAdd" | "voiceStateUpdate">
    | CommandInteraction
    | ContextMenuInteraction
    | SelectMenuInteraction
    | ButtonInteraction
    | SimpleCommandMessage
): GuildMember | APIInteractionGuildMember | null => {
  const argObj = arg instanceof Array ? arg[0] : arg;

  if (argObj instanceof Message) {
    return argObj.member;
  } else if (
    argObj instanceof MessageReaction ||
    argObj instanceof SimpleCommandMessage
  ) {
    return argObj.message.member;
  } else if (
    argObj instanceof CommandInteraction ||
    argObj instanceof ContextMenuInteraction ||
    argObj instanceof SelectMenuInteraction ||
    argObj instanceof ButtonInteraction
  ) {
    return argObj.member;
  } else if (argObj instanceof VoiceState) {
    return argObj.member;
  }
  return null;
};
