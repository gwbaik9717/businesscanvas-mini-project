import { SVGProps } from "./type";

export const PlusIcon = ({ color, ...props }: SVGProps) => {
  return (
    <svg
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: color,
        ...props,
      }}
    >
      <path d="M5.53125 0.375H6.46875C6.55208 0.375 6.59375 0.416667 6.59375 0.5V11.5C6.59375 11.5833 6.55208 11.625 6.46875 11.625H5.53125C5.44792 11.625 5.40625 11.5833 5.40625 11.5V0.5C5.40625 0.416667 5.44792 0.375 5.53125 0.375Z" />
      <path d="M0.75 5.40625H6H11.25C11.3333 5.40625 11.375 5.44792 11.375 5.53125V6.46875C11.375 6.55208 11.3333 6.59375 11.25 6.59375H0.75C0.666667 6.59375 0.625 6.55208 0.625 6.46875V5.53125C0.625 5.44792 0.666667 5.40625 0.75 5.40625Z" />
    </svg>
  );
};
