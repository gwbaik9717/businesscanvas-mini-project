import { SVGProps } from "../types/type";

export const FilterIcon = ({ color, ...props }: SVGProps) => {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: color,
        ...props,
      }}
    >
      <path
        d="M3.0898 8.82031C3.0898 9.02773 3.25621 9.19531 3.46246 9.19531H6.53746C6.74371 9.19531 6.91011 9.02773 6.91011 8.82031V6.52344H3.0898V8.82031ZM9.31363 0.804688H0.686283C0.399174 0.804688 0.219877 1.11758 0.364018 1.36719L2.95738 5.77344H7.04488L9.63824 1.36719C9.78003 1.11758 9.60074 0.804688 9.31363 0.804688Z"
        fill-opacity="0.25"
      />
    </svg>
  );
};
