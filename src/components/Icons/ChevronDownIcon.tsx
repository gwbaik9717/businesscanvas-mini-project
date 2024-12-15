import { SVGProps } from "./type";

export const ChevronDownIcon = ({ color, ...props }: SVGProps) => {
  return (
    <svg
      viewBox="0 0 13 8"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: color,
        ...props,
      }}
    >
      <path
        d="M12.3125 0H11.1406C11.0609 0 10.9859 0.0390626 10.939 0.103125L6.49995 6.22188L2.06089 0.103125C2.01402 0.0390626 1.93902 0 1.85933 0H0.687454C0.585891 0 0.526516 0.115625 0.585891 0.198438L6.09527 7.79375C6.29527 8.06875 6.70464 8.06875 6.90308 7.79375L12.4125 0.198438C12.4734 0.115625 12.414 0 12.3125 0Z"
        fill-opacity="0.88"
      />
    </svg>
  );
};
