import React from "react";
import { RegisterOptionType, Select } from "../Select/Select";
import { SelectTrigger } from "../Select/SelectTrigger";
import { SelectMenu } from "../Select/SelectMenu";
import { ButtonIconOnly } from "../Button/ButtonIconOnly";
import { FilterIcon } from "../Icons/FilterIcon";
import { color, padding } from "../../styles/theme/theme";
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
      <SelectTrigger as={ButtonIconOnly}>
        <FilterIcon width={10} height={10} color={color.primaryHover} />
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
