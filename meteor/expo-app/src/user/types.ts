import { Meteor } from "@meteorrn/core";

export type PublicUser = {
  _id: Meteor.User["_id"];
  profile: { name: string };
};
