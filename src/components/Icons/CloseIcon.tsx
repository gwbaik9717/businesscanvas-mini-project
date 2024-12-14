import { SVGProps } from "./type";

export const CloseIcon = ({ color, ...props }: SVGProps) => {
  return (
    <svg
      viewBox="0 0 13 14"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: color,
        ...props,
      }}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.6404 0.826753C11.6407 0.826753 11.6411 0.82711 11.6418 0.827825L12.672 1.85818C12.6727 1.85872 12.6729 1.85907 12.6731 1.85961C12.6732 1.85996 12.6732 1.86033 12.6731 1.86068C12.6731 1.86122 12.6727 1.86157 12.672 1.86229L7.5345 6.99979L12.672 12.1373C12.6727 12.138 12.6729 12.1384 12.6731 12.1389C12.6732 12.1393 12.6732 12.1397 12.6731 12.1401C12.6731 12.1405 12.6727 12.1409 12.672 12.1416L11.6416 13.1718C11.6411 13.1725 11.6407 13.1726 11.6404 13.1728C11.64 13.1729 11.6395 13.1729 11.6391 13.1728C11.6386 13.1728 11.6382 13.1725 11.6375 13.1718L6.50003 8.03425L1.36253 13.1718C1.36182 13.1725 1.36146 13.1726 1.36093 13.1728C1.36052 13.1729 1.36008 13.1729 1.35968 13.1728C1.35932 13.1728 1.35896 13.1725 1.35825 13.1718L0.328069 12.1414C0.327355 12.1409 0.327176 12.1405 0.326997 12.1401C0.326873 12.1397 0.326873 12.1393 0.326997 12.1389C0.326997 12.1384 0.327355 12.138 0.328069 12.1373L5.46557 6.99979L0.328069 1.86229C0.327355 1.86157 0.327176 1.86122 0.326997 1.86068C0.326873 1.86027 0.326873 1.85984 0.326997 1.85943C0.326997 1.85907 0.327355 1.85872 0.328069 1.858L1.35843 0.827825C1.35896 0.82711 1.35932 0.826932 1.35968 0.826753C1.36008 0.826629 1.36052 0.826629 1.36093 0.826753C1.36146 0.826753 1.36182 0.82711 1.36253 0.827825L6.50003 5.96532L11.6375 0.827825C11.6382 0.82711 11.6386 0.826932 11.6391 0.826753C11.6395 0.826629 11.64 0.826629 11.6404 0.826753Z"
        fill-opacity="0.45"
      />
    </svg>
  );
};