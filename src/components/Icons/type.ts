export interface SVGProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  visibility?:
    | "visible"
    | "hidden"
    | "collapse"
    | "inherit"
    | "initial"
    | "unset";
}
