import { METEOR_URL } from "@env";
import Meteor from "@meteorrn/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const connectToMeteor = () => {
  const meteorUrl = METEOR_URL || "";
  Meteor.connect(meteorUrl, { AsyncStorage });
};

export const callMeteorMethod = async <TResponse>(
  methodName: string,
  data: any[] = [],
): Promise<TResponse> =>
  new Promise((resolve, reject) => {
    Meteor.call(methodName, ...data, (err: Meteor.Error, res: TResponse) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
