import { CATEGORIES } from "../data";

export const getBackgroundColor = (name) => {
  const color =
    CATEGORIES.find((category) => category.name === name)?.color || "#000000";

  return { backgroundColor: color };
};
