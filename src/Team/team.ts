import { Prisma } from "@prisma/client";
import { prisma } from "../../app";
import { ErrorMessage } from "../constants/error";
import { GetUserByDiscordID } from "../utils/GetUserByDiscordID";
import { GetUserPermissions } from "../utils/GetUserPermissions";

export class Team {
  Name: string;
  DiscordID: string;
  constructor(Name: string, DiscordID: string) {
    this.Name = Name;
    this.DiscordID = DiscordID;
  }
  static async create({ Name, Logo }: { Name: string; Logo: string }) {
    try {
      return await prisma.team.create({
        data: {
          Name,
          Logo,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return ErrorMessage.TeamAlreadyExists;
        }
      }
      throw e;
    }
  }
  async delete() {
    const userPermissions = await GetUserPermissions(this.DiscordID);
    userPermissions.team(this.Name).delete();
    try {
      return await prisma.team.delete({
        where: {
          Name: this.Name,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return ErrorMessage.TeamNotFound;
        }
      }
      throw e;
    }
  }
  async change({ Name, Logo }: { Name?: string; Logo?: string }) {
    try {
      return await prisma.team.update({
        where: {
          Name: this.Name,
        },
        data: {
          Name,
          Logo,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return ErrorMessage.TeamNotFound;
        }
        if (e.code === "P2002") {
          return ErrorMessage.TeamAlreadyExists;
        }
      }
      throw e;
    }
  }
  async get() {
    try {
      return await prisma.team.findUnique({
        where: {
          Name: this.Name,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return ErrorMessage.TeamNotFound;
        }
      }
      throw e;
    }
  }
  static async getAll() {
    try {
      return await prisma.team.findMany();
    } catch (e) {
      throw e;
    }
  }
}
