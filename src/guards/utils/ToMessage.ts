import { Message, MessageReaction, PartialMessage } from "discord.js";
import { ArgsOf, SimpleCommandMessage } from "discordx";

/**
 * Transform Arg to Message Object
 * @param arg Argument containing Message
 * @returns Message Object, PartialMessage or Null
 */
export const ToMessage = (
  arg: ArgsOf<"messageCreate" | "messageReactionAdd"> | SimpleCommandMessage
): Message | PartialMessage | null => {
  const argObj = arg instanceof Array ? arg[0] : arg;

  if (argObj instanceof Message) {
    return argObj;
  } else if (
    argObj instanceof MessageReaction ||
    argObj instanceof SimpleCommandMessage
  ) {
    return argObj.message;
  }

  return null;
};
