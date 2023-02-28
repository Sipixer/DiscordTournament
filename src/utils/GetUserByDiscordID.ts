import { prisma } from "../../app";
import { ErrorMessage } from "../constants/error";

export const GetUserByDiscordID = async (DiscordID: string) => {
  try {
    const user = await prisma.player.findUniqueOrThrow({
      where: {
        DiscordID,
      },
    });
    return user;
  } catch (e) {
    throw Error(ErrorMessage.ProfileNotFound);
  }
};
