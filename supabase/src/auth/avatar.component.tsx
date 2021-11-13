import React from "react";
import { Image } from "react-native";
import tailwind from "tailwind-rn";

export const AvatarProfileComponent = ({ size = 40 }: { size: number }) => {
  return (
    <Image
      style={{ width: size, height: size, ...tailwind("rounded-full") }}
      source={{ uri: `https://i.pravatar.cc/${size}` }}
    />
  );
};
