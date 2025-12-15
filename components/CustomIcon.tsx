import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";

type IconLibrary = "ionicons" | "fontawesome5";

type CustomIconProps = {
  library: IconLibrary;
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

export default function CustomIcon({
  library,
  name,
  size = 24,
  color = "#000000",
  style,
}: CustomIconProps) {
  switch (library) {
    case "ionicons":
      return (
        <Ionicons
          name={name as keyof typeof Ionicons.glyphMap}
          size={size}
          color={color}
          style={style}
        />
      );
    case "fontawesome5":
      return (
        <FontAwesome5
          name={name as keyof typeof FontAwesome5.glyphMap}
          size={size}
          color={color}
          style={style}
        />
      );
    default:
      return null;
  }
}

// Type-safe helper functions for better TypeScript support
export const IoniconsIcon = (props: {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: any;
}) => (
  <CustomIcon
    library="ionicons"
    name={props.name as string}
    size={props.size}
    color={props.color}
    style={props.style}
  />
);

export const FontAwesome5Icon = (props: {
  name: keyof typeof FontAwesome5.glyphMap;
  size?: number;
  color?: string;
  style?: any;
}) => (
  <CustomIcon
    library="fontawesome5"
    name={props.name as string}
    size={props.size}
    color={props.color}
    style={props.style}
  />
);
