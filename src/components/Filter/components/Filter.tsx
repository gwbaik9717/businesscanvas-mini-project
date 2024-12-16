import React from "react";
import {
  Select,
  SelectTrigger,
  SelectMenu,
  RegisterOptionType,
} from "../../Select";
import { FilterIcon, IconWrapper } from "../../Icons";
import { color, padding } from "../../../styles/theme";
import { FilterMenuItem } from "./FilterMenuItem";

interface FilterProps {
  options: RegisterOptionType[];
  onSelectionChange?: (values: any[]) => void;
}

export const Filter: React.FC<FilterProps> = ({
  options,
  onSelectionChange,
}) => {
  return (
    <Select selectionMode="multiple" onSelectionChange={onSelectionChange}>
      <SelectTrigger
        as={IconWrapper}
        size={24}
        style={{
          cursor: "pointer",
        }}
      >
        <FilterIcon width={12} height={12} color={color.placeholder} />
      </SelectTrigger>
      <SelectMenu
        style={{
          padding: padding.paddingSm,
          width: "150px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
        variant="right"
      >
        {options.map((option) => (
          <FilterMenuItem key={option.value} option={option} />
        ))}
      </SelectMenu>
    </Select>
  );
};
