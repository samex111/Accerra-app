import { twMerge } from "tailwind-merge";
import classnames from "classnames";

export function cn(...inputs) {
  return twMerge(classnames(...inputs));
}
