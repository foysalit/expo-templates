import { PublicUser } from "./types";
import { callMeteorMethod } from "../meteor";

export const getUserList = async (): Promise<PublicUser[] | null> =>
  callMeteorMethod<PublicUser[]>("users.list");
