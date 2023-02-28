import { Player } from "@prisma/client";
import { prisma } from "../../app";

import { PERMISSIONS } from "../constants/PERMISSIONS";
import { GetUserByDiscordID } from "./GetUserByDiscordID";
import { ErrorMessage } from "../constants/error";

export const GetUserPermissions = async (DiscordID: string) => {
  const user = await GetUserByDiscordID(DiscordID);
  return {
    team: (TeamName: string) => {
      return {
        delete: async () => {
          const allowedRoles = Object.keys(PERMISSIONS).filter(
            (key) => PERMISSIONS[key].team.delete
          );
          if (await HasRole(user, allowedRoles, TeamName)) {
            return true;
          }
          throw Error(ErrorMessage.PermissionDenied);
        },
      };
    },
  };
};

const HasRole = async (
  user: Player,
  roleneeded: string[],
  TeamName: string
) => {
  try {
    await prisma.team.findFirstOrThrow({
      where: {
        Name: TeamName,
        Member: {
          some: {
            Player: {
              DiscordID: user.DiscordID,
            },
            Role: {
              in: roleneeded,
            },
          },
        },
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
