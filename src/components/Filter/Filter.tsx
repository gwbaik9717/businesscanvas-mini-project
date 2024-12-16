import React from "react";
import { RegisterOptionType, Select } from "../Select/Select";
import { SelectTrigger } from "../Select/SelectTrigger";
import { SelectMenu } from "../Select/SelectMenu";
import { FilterIcon } from "../Icons/FilterIcon";
import { color, padding } from "../../styles/theme/theme";
import { FilterMenuItem } from "./FilterMenuItem";
import { IconWrapper } from "../Icons/IconWrapper";

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
